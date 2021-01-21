# Copyright (c) 2017-2019 Uber Technologies, Inc.
# SPDX-License-Identifier: Apache-2.0

import pickle
from pathlib import Path

import pyro
import pyro.distributions as dist
import torch
import torch.nn as nn
from pyro.contrib.examples.util import print_and_log
from pyro.infer import (SVI, JitTrace_ELBO, JitTraceEnum_ELBO, Trace_ELBO,
                        TraceEnum_ELBO, config_enumerate)
from pyro.optim import Adam
from sklearn.preprocessing import LabelEncoder
from torch.utils.data import DataLoader, TensorDataset

from mlp import MLP, Exp


class Exp(nn.Module):
    """
    a custom module for exponentiation of tensors
    """
    def __init__(self):
        super().__init__()

    def forward(self, val):
        return torch.exp(val)


class SSVAE(nn.Module):
    """
    This class encapsulates the parameters (neural networks) and models & guides needed to train a
    semi-supervised variational auto-encoder on the MNIST image dataset
    :param output_size: size of the tensor representing the class label (10 for MNIST since
                        we represent the class labels as a one-hot vector with 10 components)
    :param input_size: size of the tensor representing the image (28*28 = 784 for our MNIST dataset
                       since we flatten the images and scale the pixels to be in [0,1])
    :param z_dim: size of the tensor representing the latent random variable z
                  (handwriting style for our MNIST dataset)
    :param hidden_layers: a tuple (or list) of MLP layers to be used in the neural networks
                          representing the parameters of the distributions in our model
    :param use_cuda: use GPUs for faster training
    :param aux_loss_multiplier: the multiplier to use with the auxiliary loss
    """
    def __init__(self, output_size=10, input_size=784, z_dim=50, hidden_layers=(500,),
                 config_enum=None, use_cuda=False, aux_loss_multiplier=None):

        super().__init__()

        # initialize the class with all arguments provided to the constructor
        self.output_size = output_size
        self.input_size = input_size
        self.z_dim = z_dim
        self.hidden_layers = hidden_layers
        self.allow_broadcast = config_enum == 'parallel'
        self.use_cuda = use_cuda
        self.aux_loss_multiplier = aux_loss_multiplier

        # define and instantiate the neural networks representing
        # the paramters of various distributions in the model
        self.setup_networks()

    def setup_networks(self):

        z_dim = self.z_dim
        hidden_sizes = self.hidden_layers

        # define the neural networks used later in the model and the guide.
        # these networks are MLPs (multi-layered perceptrons or simple feed-forward networks)
        # where the provided activation parameter is used on every linear layer except
        # for the output layer where we use the provided output_activation parameter
        self.encoder_y = MLP([self.input_size] + hidden_sizes + [self.output_size],
                             activation=nn.Softplus,
                             output_activation=nn.Softmax,
                             allow_broadcast=self.allow_broadcast,
                             use_cuda=self.use_cuda)

        # a split in the final layer's size is used for multiple outputs
        # and potentially applying separate activation functions on them
        # e.g. in this network the final output is of size [z_dim,z_dim]
        # to produce loc and scale, and apply different activations [None,Exp] on them
        self.encoder_z = MLP([self.input_size + self.output_size] +
                             hidden_sizes + [[z_dim, z_dim]],
                             activation=nn.Softplus,
                             output_activation=[None, Exp],
                             allow_broadcast=self.allow_broadcast,
                             use_cuda=self.use_cuda)

        self.decoder = MLP([z_dim + self.output_size] +
                           hidden_sizes + [self.input_size],
                           activation=nn.Softplus,
                           output_activation=nn.Sigmoid,
                           allow_broadcast=self.allow_broadcast,
                           use_cuda=self.use_cuda)

        # using GPUs for faster training of the networks
        if self.use_cuda:
            self.cuda()

    def model(self, xs, ys=None):
        """
        The model corresponds to the following generative process:
        p(z) = normal(0,I)              # handwriting style (latent)
        p(y|x) = categorical(I/10.)     # which digit (semi-supervised)
        p(x|y,z) = bernoulli(loc(y,z))   # an image
        loc is given by a neural network  `decoder`
        :param xs: a batch of scaled vectors of pixels from an image
        :param ys: (optional) a batch of the class labels i.e.
                   the digit corresponding to the image(s)
        :return: None
        """
        # register this pytorch module and all of its sub-modules with pyro
        pyro.module("ss_vae", self)

        batch_size = xs.size(0)
        options = dict(dtype=xs.dtype, device=xs.device)
        with pyro.plate("data"):

            # sample the handwriting style from the constant prior distribution
            prior_loc = torch.zeros(batch_size, self.z_dim, **options)
            prior_scale = torch.ones(batch_size, self.z_dim, **options)
            zs = pyro.sample("z", dist.Normal(prior_loc, prior_scale).to_event(1))

            # if the label y (which digit to write) is supervised, sample from the
            # constant prior, otherwise, observe the value (i.e. score it against the constant prior)
            alpha_prior = torch.ones(batch_size, self.output_size, **options) / (1.0 * self.output_size)
            ys = pyro.sample("y", dist.OneHotCategorical(alpha_prior), obs=ys)

            # Finally, score the image (x) using the handwriting style (z) and
            # the class label y (which digit to write) against the
            # parametrized distribution p(x|y,z) = bernoulli(decoder(y,z))
            # where `decoder` is a neural network. We disable validation
            # since the decoder output is a relaxed Bernoulli value.
            loc = self.decoder.forward([zs, ys])
            pyro.sample("x", dist.Bernoulli(loc, validate_args=False).to_event(1),
                        obs=xs)
            # return the loc so we can visualize it later
            return loc

    def guide(self, xs, ys=None):
        """
        The guide corresponds to the following:
        q(y|x) = categorical(alpha(x))              # infer digit from an image
        q(z|x,y) = normal(loc(x,y),scale(x,y))       # infer handwriting style from an image and the digit
        loc, scale are given by a neural network `encoder_z`
        alpha is given by a neural network `encoder_y`
        :param xs: a batch of scaled vectors of pixels from an image
        :param ys: (optional) a batch of the class labels i.e.
                   the digit corresponding to the image(s)
        :return: None
        """
        # inform Pyro that the variables in the batch of xs, ys are conditionally independent
        with pyro.plate("data"):

            # if the class label (the digit) is not supervised, sample
            # (and score) the digit with the variational distribution
            # q(y|x) = categorical(alpha(x))
            if ys is None:
                alpha = self.encoder_y.forward(xs)
                ys = pyro.sample("y", dist.OneHotCategorical(alpha))

            # sample (and score) the latent handwriting-style with the variational
            # distribution q(z|x,y) = normal(loc(x,y),scale(x,y))
            loc, scale = self.encoder_z.forward([xs, ys])
            pyro.sample("z", dist.Normal(loc, scale).to_event(1))

    def classifier(self, xs):
        """
        classify an image (or a batch of images)
        :param xs: a batch of scaled vectors of pixels from an image
        :return: a batch of the corresponding class labels (as one-hots)
        """
        # use the trained model q(y|x) = categorical(alpha(x))
        # compute all class probabilities for the image(s)
        alpha = self.encoder_y.forward(xs)

        # get the index (digit) that corresponds to
        # the maximum predicted class probability
        res, ind = torch.topk(alpha, 1)

        # convert the digit(s) to one-hot tensor(s)
        ys = torch.zeros_like(alpha).scatter_(1, ind, 1.0)
        return ys

    def model_classify(self, xs, ys=None):
        """
        this model is used to add an auxiliary (supervised) loss as described in the
        Kingma et al., "Semi-Supervised Learning with Deep Generative Models".
        """
        # register all pytorch (sub)modules with pyro
        pyro.module("ss_vae", self)

        # inform Pyro that the variables in the batch of xs, ys are conditionally independent
        with pyro.plate("data"):
            # this here is the extra term to yield an auxiliary loss that we do gradient descent on
            if ys is not None:
                alpha = self.encoder_y.forward(xs)
                with pyro.poutine.scale(scale=self.aux_loss_multiplier):
                    pyro.sample("y_aux", dist.OneHotCategorical(alpha), obs=ys)

    def guide_classify(self, xs, ys=None):
        """
        dummy guide function to accompany model_classify in inference
        """
        pass


def run_inference_for_epoch(
    sup_dl,
    unsup_dl,
    losses,
    periodic_interval_batches
):
    """
    runs the inference algorithm for an epoch
    returns the values of all losses separately on supervised and unsupervised parts
    """
    num_losses = len(losses)

    # compute number of batches for an epoch
    sup_batches = len(sup_dl)
    unsup_batches = len(unsup_dl)
    batches_per_epoch = sup_batches + unsup_batches

    # initialize variables to store loss values
    epoch_losses_sup = [0.] * num_losses
    epoch_losses_unsup = [0.] * num_losses

    # setup the iterators for training data loaders
    sup_iter = iter(sup_dl)
    unsup_iter = iter(unsup_dl)

    # count the number of supervised batches seen in this epoch
    ctr_sup = 0
    for i in range(batches_per_epoch):

        # whether this batch is supervised or not
        is_supervised = (i % periodic_interval_batches == 1) and ctr_sup < sup_batches

        # extract the corresponding batch
        if is_supervised:
            (xs, ys) = next(sup_iter)
            ctr_sup += 1
        else:
            xs = next(unsup_iter)[0]

        # run the inference for each loss with supervised or un-supervised
        # data as arguments
        for loss_id in range(num_losses):
            if is_supervised:
                new_loss = losses[loss_id].step(xs, ys)
                epoch_losses_sup[loss_id] += new_loss
            else:
                new_loss = losses[loss_id].step(xs)
                epoch_losses_unsup[loss_id] += new_loss

    # return the values of all losses
    return epoch_losses_sup, epoch_losses_unsup


def get_accuracy(data_loader, classifier_fn, batch_size):
    """
    compute the accuracy over the supervised training set or the testing set
    """
    predictions, actuals = [], []

    # use the appropriate data loader
    for (xs, ys) in data_loader:
        # use classification function to compute all predictions for each batch
        predictions.append(classifier_fn(xs))
        actuals.append(ys)

    # compute the number of accurate predictions
    accurate_preds = 0
    for pred, act in zip(predictions, actuals):
        for i in range(pred.size(0)):
            v = torch.sum(pred[i] == act[i])
            accurate_preds += (v.item() == 10)

    # calculate the accuracy between 0 and 1
    accuracy = (accurate_preds * 1.0) / (len(predictions) * batch_size)
    return accuracy


SEED = 42
Z_DIM = 50  # size of the tensor representing the latent variable z
HIDDEN_LAYERS = [500]  # a tuple (or list) of MLP layers to be used in the neural networks representing the parameters of the distributions in our model
CUDA = False  # use GPU(s) to speed up training
ENUM_DISCRETE = 'sequential'  # parallel, sequential or none. uses parallel enumeration by default

AUX_LOSS = False  # whether to use the auxiliary loss from NIPS 14 paper (Kingma et al)
AUX_LOSS_MULTIPLIER = 46  # the multiplier to use with the auxiliary loss

LEARNING_RATE = 0.00042
BETA_1 = 0.9
USE_JIT = False  # use PyTorch jit to speed up training

LOGFILE = './tmp.log'

BATCH_SIZE = 100
NUM_EPOCHS = 50

WUST_TRAIN_PATH = Path('../data/wust_train_embeddings.pickle')
WUST_TEST_PATH = Path('../data/wust_test_embeddings.pickle')
WEAK_SMALL_ENCODED_PATH = Path('../data/weak_small_encoded.pickle')


def main():

    with WUST_TRAIN_PATH.open('rb') as file:
        wust_train = pickle.load(file)

    with WUST_TEST_PATH.open('rb') as file:
        wust_test = pickle.load(file)

    with WEAK_SMALL_ENCODED_PATH.open('rb') as file:
        weak_small_x = pickle.load(file)
        weak_small_x = torch.FloatTensor(weak_small_x)

    wust_train_x = torch.FloatTensor(wust_train[1])
    wust_test_x = torch.FloatTensor(wust_test[1])

    wust_train_labels = wust_train[2]
    wust_test_labels = wust_test[2]

    label_encoder = LabelEncoder()
    label_encoder.fit(wust_train_labels)

    wust_train_y = label_encoder.transform(wust_train_labels)
    wust_test_y = label_encoder.transform(wust_test_labels)
    wust_train_y = torch.LongTensor(wust_train_y.reshape(-1, 1))
    wust_test_y = torch.LongTensor(wust_test_y.reshape(-1, 1))

    wust_train_ds = TensorDataset(wust_train_x, wust_train_y)
    wust_train_dl = DataLoader(
        wust_train_ds,
        batch_size=BATCH_SIZE,
        shuffle=True
    )

    wust_test_ds = TensorDataset(wust_test_x, wust_test_y)
    wust_test_dl = DataLoader(
        wust_test_ds,
        batch_size=BATCH_SIZE,
        shuffle=True
    )

    weak_train_ds = TensorDataset(weak_small_x)
    weak_train_dl = DataLoader(
        weak_train_ds,
        batch_size=BATCH_SIZE,
        shuffle=True
    )

    pyro.set_rng_seed(SEED)

    # batch_size: number of images (and labels) to be considered in a batch
    ss_vae = SSVAE(
        input_size=wust_train_x.shape[1],
        output_size=len(label_encoder.classes_),
        z_dim=Z_DIM,
        hidden_layers=HIDDEN_LAYERS,
        use_cuda=CUDA,
        config_enum=ENUM_DISCRETE,
        aux_loss_multiplier=AUX_LOSS_MULTIPLIER
    )

    # setup the optimizer
    optimizer = Adam({"lr": LEARNING_RATE, "betas": (BETA_1, 0.999)})

    # set up the loss(es) for inference. wrapping the guide in config_enumerate builds the loss as a sum
    # by enumerating each class label for the sampled discrete categorical distribution in the model
    guide = config_enumerate(ss_vae.guide, ENUM_DISCRETE, expand=True)
    Elbo = JitTraceEnum_ELBO if USE_JIT else TraceEnum_ELBO
    elbo = Elbo(max_plate_nesting=1, strict_enumeration_warning=False)
    loss_basic = SVI(ss_vae.model, guide, optimizer, loss=elbo)

    # build a list of all losses considered
    losses = [loss_basic]

    # aux_loss: whether to use the auxiliary loss from NIPS 14 paper (Kingma et al)
    if AUX_LOSS:
        elbo = JitTrace_ELBO() if USE_JIT else Trace_ELBO()
        loss_aux = SVI(ss_vae.model_classify, ss_vae.guide_classify, optimizer, loss=elbo)
        losses.append(loss_aux)

    try:
        # setup the logger if a filename is provided
        logger = open(LOGFILE, "w") if LOGFILE else None

        # data_loaders = setup_data_loaders(MNISTCached, CUDA, BATCH_SIZE, sup_num=SUP_NUM)

        # how often would a supervised batch be encountered during inference
        # e.g. if sup_num is 3000, we would have every 16th = int(50000/3000) batch supervised
        # until we have traversed through the all supervised batches

        # number of unsupervised examples
        sup_num = len(wust_train_ds)
        unsup_num = len(weak_train_ds)
        periodic_interval_batches = int(unsup_num / sup_num)

        # initializing local variables to maintain the best validation accuracy
        # seen across epochs over the supervised training set
        # and the corresponding testing set and the state of the networks
        best_valid_acc, corresponding_test_acc = 0.0, 0.0

        # run inference for a certain number of epochs
        for i in range(0, NUM_EPOCHS):

            # get the losses for an epoch
            epoch_losses_sup, epoch_losses_unsup = run_inference_for_epoch(
                wust_train_dl,
                weak_train_dl,
                losses,
                periodic_interval_batches
            )

            # compute average epoch losses i.e. losses per example
            avg_epoch_losses_sup = map(lambda v: v / sup_num, epoch_losses_sup)
            avg_epoch_losses_unsup = map(lambda v: v / unsup_num, epoch_losses_unsup)

            # store the loss and validation/testing accuracies in the logfile
            str_loss_sup = " ".join(map(str, avg_epoch_losses_sup))
            str_loss_unsup = " ".join(map(str, avg_epoch_losses_unsup))

            str_print = f"{i} epoch: avg losses {str_loss_sup} {str_loss_unsup}"

            # validation_accuracy = get_accuracy(data_loaders["valid"], ss_vae.classifier, BATCH_SIZE)
            # str_print += " validation accuracy {}".format(validation_accuracy)

            # this test accuracy is only for logging, this is not used
            # to make any decisions during training
            test_accuracy = get_accuracy(wust_test_dl, ss_vae.classifier, BATCH_SIZE)
            str_print += " test accuracy {}".format(test_accuracy)

            # update the best validation accuracy and the corresponding
            # testing accuracy and the state of the parent module (including the networks)
            if best_valid_acc < test_accuracy:
                best_valid_acc = test_accuracy
                corresponding_test_acc = test_accuracy

            print_and_log(logger, str_print)

        final_test_accuracy = get_accuracy(wust_test_dl, ss_vae.classifier, BATCH_SIZE)
        print_and_log(logger, f"best validation accuracy {best_valid_acc} corresponding testing accuracy {corresponding_test_acc} "
                      f"last testing accuracy {final_test_accuracy}")

    finally:
        if LOGFILE:
            logger.close()


if __name__ == '__main__':
    main()

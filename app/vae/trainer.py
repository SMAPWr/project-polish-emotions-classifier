from dataclasses import dataclass
from typing import List

import torch
from sklearn import metrics
from sklearn.preprocessing import OneHotEncoder
from torch.utils.data import DataLoader
from tqdm.auto import tqdm

from vae.ss_vae import SSVAE


@dataclass
class Metrics:
    accuracy: float
    precision: float
    recall: float
    f1: float


def calculate_metrics(
    x_test: torch.Tensor,
    y_test: torch.Tensor,
    classifier_fn,
    encoder: OneHotEncoder
) -> Metrics:
    y_pred = classifier_fn(x_test)
    y_pred = encoder.inverse_transform(y_pred.numpy())
    y_test = encoder.inverse_transform(y_test.numpy())

    accuracy = metrics.accuracy_score(y_test, y_pred)
    precision = metrics.precision_score(y_test, y_pred, average='macro')
    recall = metrics.recall_score(y_test, y_pred, average='macro')
    f1 = metrics.f1_score(y_test, y_pred, average='macro')

    return Metrics(accuracy, precision, recall, f1)


@dataclass
class FitStats:
    sup_loss_history: List[float]
    aux_sup_loss_history: List[float]

    unsup_loss_history: List[float]
    aux_unsup_loss_history: List[float]

    test_metric_history: List[Metrics]


class Trainer:

    def fit(
        self,
        epochs: int,
        sup_train_data_loader: DataLoader,
        unsup_train_data_loader: DataLoader,
        losses,
        sup_test_x: torch.FloatTensor,
        sup_test_y: torch.LongTensor,
        ss_vae: SSVAE,
        encoder: OneHotEncoder,
        verbose: int = 0
    ) -> FitStats:

        # number of unsupervised examples
        sup_num = len(sup_train_data_loader.dataset)
        unsup_num = len(unsup_train_data_loader.dataset)
        periodic_interval_batches = int(unsup_num / sup_num)

        fit_stats = FitStats([], [], [], [], [])

        for epoch in tqdm(range(0, epochs), desc='Epochs'):

            # get the losses for an epoch
            losses_sup, losses_unsup = self._run_inference_for_epoch(
                sup_train_data_loader,
                unsup_train_data_loader,
                losses,
                periodic_interval_batches
            )

            # compute average epoch losses i.e. losses per example
            avg_sup_loss = list([loss / sup_num for loss in losses_sup])
            avg_unsup_loss = list([loss / unsup_num for loss in losses_unsup])

            sup_loss = avg_sup_loss[0]
            unsup_loss = avg_unsup_loss[0]
            aux_sup_loss = avg_sup_loss[1] if len(avg_sup_loss) > 1 else None
            aux_unsup_loss = avg_unsup_loss[1] if len(avg_unsup_loss) > 1 else None

            test_metrics = calculate_metrics(
                sup_test_x,
                sup_test_y,
                ss_vae.classifier,
                encoder
            )

            fit_stats.sup_loss_history.append(sup_loss)
            fit_stats.unsup_loss_history.append(unsup_loss)
            if aux_sup_loss is not None:
                fit_stats.aux_sup_loss_history.append(aux_sup_loss)
            if aux_unsup_loss is not None:
                fit_stats.aux_unsup_loss_history.append(aux_unsup_loss)
            fit_stats.test_metric_history.append(test_metrics)

            if verbose:
                self._print_progress(
                    epoch,
                    sup_loss,
                    unsup_loss,
                    aux_sup_loss,
                    aux_unsup_loss,
                    test_metrics
                )

        return fit_stats

    def _print_progress(
        self,
        epoch: int,
        sup_loss: float,
        unsup_loss: float,
        aux_sup_loss: float,
        aux_unsup_loss: float,
        test_metrics: Metrics
    ):
        progress_msg = f'{epoch} epoch:'
        progress_msg += f' loss sup: {sup_loss:.4f} loss unsup: {unsup_loss:.4f}'

        if aux_sup_loss is not None and aux_unsup_loss is not None:
            progress_msg += f' loss aux sup: {aux_sup_loss:.4f} aux unsup: {aux_unsup_loss:.4f}'

        progress_msg += f' test acc: {test_metrics.accuracy:.4f},'
        progress_msg += f' prec: {test_metrics.precision:.4f}'
        progress_msg += f' recall: {test_metrics.recall:.4f}'
        progress_msg += f' f1: {test_metrics.f1:.4f}'

        print(progress_msg)

    def _run_inference_for_epoch(
        self,
        sup_dl: DataLoader,
        unsup_dl: DataLoader,
        losses,
        periodic_interval_batches: int
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
            is_supervised = (
                (i % periodic_interval_batches == 1)
                and ctr_sup < sup_batches
            )

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

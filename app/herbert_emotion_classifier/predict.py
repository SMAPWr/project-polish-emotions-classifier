import torch
import numpy as np


def predict(model, dataloader, device):
    """
    :param model:
    :param dataloader:
    :param device:
    :param get_x_fun:
    :return:
    """
    model = model.to(device)

    num_elements = len(dataloader.dataset)
    num_batches = len(dataloader)

    batch_size = dataloader.batch_size

    predictions = torch.zeros(num_elements)
    true_labels = torch.zeros(num_elements)

    for i, batch in enumerate(dataloader):
        start = i * batch_size
        end = start + batch_size
        if i == num_batches - 1:
            end = num_elements

        x, y = batch
        logits = model.forward(x.to(device))
        pred = torch.argmax(logits, dim=1)
        predictions[start:end] = pred.detach()
        true_labels[start:end] = y.detach()

    return predictions, true_labels


def get_predicton_from_list_of_predictions(list_of_predictios):
    data = np.array([prediction for prediction in list_of_predictios])
    axis = 0
    u, indices = np.unique(data, return_inverse=True)
    ensamble_pred = u[
        np.argmax(
            np.apply_along_axis(
                np.bincount,
                axis,
                indices.reshape(data.shape),
                None,
                np.max(indices) + 1,
            ),
            axis=axis,
        )
    ]

    return ensamble_pred

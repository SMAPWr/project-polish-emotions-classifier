import torch
from torch.nn import Softmax

from .models.conv_model import HerbertConvEmotionClassifier
from .emotion_dict import emotion_dict
from .embedding import DEVICE
from os.path import join, dirname, realpath
from typing import Dict

state_dict_path = join(
    dirname(realpath(__file__)), "models", "models_parameters", "conv_model.pth"
)


def predict_emotions_with_conv_model(sentence_embeddings_tensor: torch.tensor) -> Dict:
    """
    Function applies emotion classification mode to the given embedding
    :param sentence_embedding: embedding averaged over all tokens, of size (N, 768)
    :return: list of dictionaries with a probability distribution over emotions [{"radość: 0.2137, smutek:0.01 ....}, ..] of len N
    """
    classification_model = HerbertConvEmotionClassifier()
    classification_model.load_state_dict(torch.load(state_dict_path), strict=False)
    classification_model = classification_model.eval().to(DEVICE)

    softmax = Softmax(dim=1)

    predictions = classification_model(sentence_embeddings_tensor)
    predictions = softmax(predictions).detach()

    list_of_predicted_emotions = []

    for pred in predictions:
        predicted_emotions = {}

        for label_num, emotion in zip(pred.tolist(), emotion_dict.values()):
            predicted_emotions[emotion] = label_num

        list_of_predicted_emotions.append(predicted_emotions)

    return list_of_predicted_emotions

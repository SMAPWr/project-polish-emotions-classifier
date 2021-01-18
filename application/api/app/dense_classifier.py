import torch
from torch.nn import Softmax
from .models.dense_model import HerbertEmotionClassifier
from .emotion_dict import emotion_dict
from .embedding import DEVICE
from os.path import join, dirname, realpath
from typing import Dict

state_dict_path = join(
    dirname(realpath(__file__)), "models", "models_parameters", "dense_model.pth"
)


def predict_emotion(sentence_embedding: torch.tensor) -> Dict:
    """
    Function applies emotion classification mode to the given embedding
    :param sentence_embedding: embedding averaged over all tokens, of size (768,)
    :return: dictionary with a probability distribution over emotions {"radość: 0.2137, smutek:0.01 ....}
    """
    classification_model = HerbertEmotionClassifier()
    classification_model.load_state_dict(torch.load(state_dict_path), strict=False)
    classification_model = classification_model.eval().to(DEVICE)

    softmax = Softmax(dim=1)

    predictions = classification_model(sentence_embedding.unsqueeze(0))
    predictions = softmax(predictions).squeeze(0)
    predictions = predictions.tolist()

    predicted_emotions = {}

    for pred, emotion in zip(predictions, emotion_dict.values()):
        predicted_emotions[emotion] = pred

    return predicted_emotions

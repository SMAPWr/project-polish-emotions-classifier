import pickle
from torch.utils.data import Dataset
import torch

from .emotion_dict import emotion_dict


class EmotionsInTextDataset(Dataset):
    def __init__(self, embedding_pickle_path):
        with open(embedding_pickle_path, "rb") as handle:
            texts, embeddings, emotions = pickle.load(handle)

        self.texts = texts
        self.sentence_embeddings = embeddings
        self.emotions = emotions

        self.emotion_dict = emotion_dict
        self.emotions = list(map(lambda label: self.emotion_dict[label], self.emotions))

    def __getitem__(self, idx):
        text = self.texts[idx]
        sentence_embedding = torch.tensor(self.sentence_embeddings[idx])
        label = torch.tensor(self.emotions[idx])

        return {"text": text, "sentence_embedding": sentence_embedding, "label": label}

    def __len__(self):
        return len(self.texts)

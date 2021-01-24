import pickle
from torch.utils.data import Dataset
import torch

from .emotion_dict import emotion_dict


class EmotionsInTextDataset(Dataset):
    def __init__(self, embedding_pickle_path):
        with open(embedding_pickle_path, "rb") as handle:
            text_data = pickle.load(handle)

        self.texts = text_data["texts"]
        self.sentence_embeddings = text_data["sentence_embeddings"]
        self.seq_embeddings = text_data["sequence_embeddings"]
        self.emotions = text_data["labels"]

        self.emotion_dict = emotion_dict
        self.emotions = list(map(lambda label: self.emotion_dict[label], self.emotions))

    def __getitem__(self, idx):
        text = self.texts[idx]
        sentence_embedding = torch.tensor(self.sentence_embeddings[idx])
        seq_embedding = torch.tensor(self.seq_embeddings[idx])
        label = torch.tensor(self.emotions[idx])

        return {"text": text, "sentence_embedding": sentence_embedding, "seq_embedding": seq_embedding, "label": label}

    def __len__(self):
        return len(self.texts)

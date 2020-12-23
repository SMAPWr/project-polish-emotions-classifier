import pickle
from torch.utils.data import Dataset
from os.path import join

from .emotion_dict import emotion_dict

DEFAULT_EMBEDDING_PICKLE_PATH = join(
    "..", "..", "data", "slowosiec_all_data_embeddings.pickle"
)


class EmotionsInTextSlowosieclineDataset(Dataset):
    def __init__(self, embedding_pickle_path=DEFAULT_EMBEDDING_PICKLE_PATH):
        with open(embedding_pickle_path, "rb") as handle:
            texts, embeddings, emotions = pickle.load(handle)

        self.texts = texts
        self.sentence_embeddings = embeddings
        self.emotions = emotions

        self.emotion_dict = emotion_dict
        self.emotions = list(map(lambda label: self.emotion_dict[label], self.emotions))

    def __getitem__(self, idx):
        text = self.texts[idx]
        sentence_embedding = self.sentence_embeddings[idx]
        label = self.emotions[idx]

        return {"text": text, "sentence_embedding": sentence_embedding, "label": label}

    def __len__(self):
        return len(self.texts)

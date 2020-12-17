from torch.utils.data import Dataset
from os.path import join, relpath, dirname
import pandas as pd

from emotion_dict import emotion_dict

DEFAULT_JSON_PATH = json_path = join(
    dirname(relpath(__file__)), "..", "..", "data", "slowosiec_data.json.gz"
)


class EmotionsInTextDataset(Dataset):
    def __init__(self, json_path=DEFAULT_JSON_PATH):
        df = pd.read_json(json_path, compression="gzip")

        self.texts = df["('text',)"].tolist()

        self.emotions = df["('emotions',)"].tolist()

        self.emotion_dict = emotion_dict

    def __getitem__(self, idx):
        x = self.texts[idx]

        y = self.emotions[idx]
        y = self.emotion_dict[y]

        return x, y

    def __len__(self):
        return len(self.texts)

# from torch.utils.data import Dataset
from os.path import join, relpath, dirname
import gzip
import json

from emotion_dict import emotion_dict

DEFAULT_JSON_PATH = json_path = join(
            dirname(relpath(__file__)), "..", "..", "data", "slowosiec_data.json.gz"
        )


class EmotionsInTextDataset():
    def __init__(self, json_path=DEFAULT_JSON_PATH):
        self.json_path = json_path

        data = self._load_data()

        self.texts = data["('text',)"].values()

        self.emotions = data["('emotions',)"].values()

        self.emotion_dict = emotion_dict

    def __getitem__(self, idx):
        x = self.texts[idx]

        y = self.emotions[idx]
        y = self.emotion_dict[y]

        return x, y

    def __len__(self):
        return len(self.texts)

    def _load_data(self):
        with gzip.open(self.json_path, "r") as fin:
            json_bytes = fin.read()

        json_str = json_bytes.decode("utf-8")
        data = json.loads(json_str)

        return data


if __name__ == "__main__":
    print(EmotionsInTextDataset()[0])

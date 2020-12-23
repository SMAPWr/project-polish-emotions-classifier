from torch.utils.data import Dataset
import pandas as pd
from os.path import join

from .emotion_dict import emotion_dict
from transformers import RobertaModel, XLMTokenizer
import torch

DEFAULT_JSON_PATH = join("..", "..", "data", "wust_test.json")


DEVICE = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")


class EmotionsInTextBaselineDataset(Dataset):
    def __init__(self, json_path):
        df = pd.read_json(json_path)

        self.texts = df.text.tolist()

        self.emotion_dict = emotion_dict

        self.emotions = df.emotion.tolist()
        self.emotions = list(map(lambda label: self.emotion_dict[label], self.emotions))

        self.tokenizer = XLMTokenizer.from_pretrained(
            "allegro/herbert-klej-cased-tokenizer-v1"
        )

        self.model = RobertaModel.from_pretrained("allegro/herbert-klej-cased-v1").to(
            DEVICE
        )

    def __getitem__(self, idx):
        text = self.texts[idx]
        tokenized_text = self.tokenizer.encode(text, return_tensors="pt").to(DEVICE)

        label = self.emotions[idx]

        with torch.no_grad():
            outputs = self.model(tokenized_text)
            sentence_embedding = outputs[1].cpu()

        return {"text": text, "sentence_embedding": sentence_embedding, "label": label}

    def __len__(self):
        return len(self.texts)

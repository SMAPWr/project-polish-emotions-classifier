from torch.utils.data import Dataset
from os.path import join, relpath, dirname
import pandas as pd
from transformers import XLMTokenizer
import torch
from .emotion_dict import emotion_dict

DEFAULT_JSON_PATH = json_path = join(
    dirname(relpath(__file__)), "..", "..", "data", "slowosiec_data.json.gz"
)


class EmotionsInTextDataset(Dataset):
    def __init__(self, json_path=DEFAULT_JSON_PATH):
        df = pd.read_json(json_path, compression="gzip")

        self.texts = df["('text',)"].tolist()

        self.emotions = df["('emotions',)"].tolist()

        self.emotion_dict = emotion_dict
        
        self.tokenizer = XLMTokenizer.from_pretrained(
            "allegro/herbert-klej-cased-tokenizer-v1"
        )

    def __getitem__(self, idx):
        text = self.texts[idx]
        tokenized_text = self.tokenizer.encode(text, return_tensors='pt').squeeze(dim=0)

        label = self.emotions[idx]
        label = self.emotion_dict[label]
        
        result_dict = {"text": text, "tokenized_text": tokenized_text, "label": label}
        
        return result_dict

    def __len__(self):
        return len(self.texts)

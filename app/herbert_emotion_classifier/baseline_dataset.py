from torch.utils.data import Dataset
import pandas as pd
from os.path import join

from .emotion_dict import emotion_dict
from transformers import XLMTokenizer

DEFAULT_JSON_PATH = join("reliable_df.json")

class EmotionsInTextBaselineDataset(Dataset):

    def __init__(self, json_path=DEFAULT_JSON_PATH):
        df = pd.read_json(json_path)

        self.texts = df.tweet.tolist()

        self.emotions = df.most_common_annotation.tolist()

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

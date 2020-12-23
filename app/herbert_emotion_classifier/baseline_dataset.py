from torch.utils.data import Dataset
import pandas as pd
from os.path import join

from .emotion_dict import emotion_dict
from transformers import XLMTokenizer

DEFAULT_JSON_PATH = join("..", "..", "data", "wust_test.json")

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

    def __getitem__(self, idx):
        text = self.texts[idx]
        tokenized_text = self.tokenizer.encode(text, return_tensors='pt').squeeze(dim=0)

        label = self.emotions[idx]
        
        result_dict = {"text": text, "tokenized_text": tokenized_text, "label": label}
        
        return result_dict

    def __len__(self):
        return len(self.texts)

import pytorch_lightning as pl
from torch.utils.data import DataLoader
import torch


class EmotionsInTextDatamodule(pl.LightningDataModule):
    def __init__(self, batch_size, train_set, val_set):
        super().__init__()
        self.batch_size = batch_size

        self.train_set = train_set

        self.val_set = val_set

    def setup(self, stage=None):
        pass

    def train_dataloader(self):
        return DataLoader(
            self.train_set, batch_size=self.batch_size, collate_fn=collate_fn, shuffle=True, num_workers=4
        )

    def val_dataloader(self):
        return DataLoader(
            self.val_set, batch_size=self.batch_size, collate_fn=collate_fn, shuffle=False, num_workers=4
        )


def collate_fn(data):
    def merge(sequences):
        "https://github.com/yunjey/seq2seq-dataloader/blob/master/data_loader.py"

        lengths = [len(seq) for seq in sequences]
        padded_seqs = torch.zeros(len(sequences), max(lengths)).long()
        
        for i, seq in enumerate(sequences):
            end = lengths[i]
            padded_seqs[i, :end] = seq[:end]
        return padded_seqs, lengths
    
#     texts = [x["text"] for x in data]
    
    tokenized_texts = [x["tokenized_text"] for x in data]
    tokenized_texts, _ = merge(tokenized_texts)

    labels = [x["label"] for x in data]
    labels = torch.tensor(labels)

    return tokenized_texts, labels
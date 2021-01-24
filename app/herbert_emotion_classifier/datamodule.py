import pytorch_lightning as pl
from torch.utils.data import DataLoader
import torch


def collate_fn(data):
    def merge(sequences):
        lengths = [len(seq) for seq in sequences]
        vector_size=768
        padded_seqs = torch.zeros(len(sequences), max(lengths), vector_size)
        for i, seq in enumerate(sequences):
            end = lengths[i]
            padded_seqs[i, (max(lengths) - end):] = seq[:end]
        return padded_seqs, lengths

    texts = [x["text"] for x in data]          
    
    sentence_embeddings = torch.stack([x["sentence_embedding"] for x in data])
    
    seq_embeddings = [x["seq_embedding"] for x in data]
    seq_embeddings, _ = merge(seq_embeddings)
    
    labels = torch.tensor([x["label"] for x in data])
    
    return {"text": texts, "sentence_embedding": sentence_embeddings, "seq_embedding": seq_embeddings , "label": labels}


class EmotionsInTextDatamodule(pl.LightningDataModule):
    def __init__(self, batch_size, train_set, val_set):
        super().__init__()
        self.batch_size = batch_size

        self.train_set = train_set

        self.val_set = val_set
        
    def setup(self, stage=None):
        pass

    def train_dataloader(self):
        collate = collate_fn
        
        return DataLoader(
            self.train_set,
            batch_size=self.batch_size,
            shuffle=True,
            num_workers=4,
            collate_fn=collate
        )

    def val_dataloader(self):
        collate = collate_fn
        
        return DataLoader(
            self.val_set,
            batch_size=self.batch_size,
            shuffle=False,
            num_workers=4,
            collate_fn=collate
        )

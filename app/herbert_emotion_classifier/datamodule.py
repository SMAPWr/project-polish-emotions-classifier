import pytorch_lightning as pl
from torch.utils.data import DataLoader
from os.path import join, dirname, realpath

from .wordnet_dataset import EmotionsInText


class ImageSegmentationDatamodule(pl.LightningDataModule):
    def __init__(self, batch_size, train_set, val_set):
        super().__init__()
        self.batch_size = batch_size

        self.train_set = train_set

        self.val_set = val_set

    def setup(self, stage=None):
        pass

    def train_dataloader(self):
        return DataLoader(
            self.train_set, batch_size=self.batch_size, shuffle=True, num_workers=4
        )

    def val_dataloader(self):
        return DataLoader(
            self.val_set, batch_size=self.batch_size, shuffle=False, num_workers=4
        )

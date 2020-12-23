from torch.optim import Adam, lr_scheduler
import pytorch_lightning as pl
from torch import nn
from .emotion_dict import emotion_dict
from pytorch_lightning.metrics import Accuracy, Precision, Recall
import torch


class HerbertEmotionClassifier(pl.LightningModule):
    lr = 1e-3

    def __init__(self):
        super().__init__()

        num_classes = len(emotion_dict)

        weight = torch.tensor(
            [
                0.01030928,
                0.00552486,
                0.00344828,
                0.01388889,
                0.02222222,
                0.01204819,
                0.02272727,
                0.00307692,
                0.00055249,
            ]
        )

        # self.criterion = nn.CrossEntropyLoss(weight=weight)
        self.criterion = nn.CrossEntropyLoss()
        self.metrics = {
            "accuracy": Accuracy(),
            "recall_macro": Recall(num_classes=num_classes, average="macro"),
            "precision_macro": Precision(num_classes=num_classes, average="macro"),
        }

        self.classifier = nn.Sequential(
            nn.Linear(768, 256),
            nn.Dropout(0.8),
            nn.ReLU(),
            nn.Linear(256, 128),
            nn.Dropout(0.7),
            nn.ReLU(),
            nn.Linear(128, num_classes),
        )

    def forward(self, embedded_inputs):
        return self.classifier(embedded_inputs)

    def configure_optimizers(self):
        optimizer = Adam(self.parameters(), self.lr)
        scheduler = lr_scheduler.StepLR(optimizer, step_size=7, gamma=0.1)

        return [optimizer], [scheduler]

    def training_step(self, batch, batch_idx):
        x = batch["sentence_embedding"]
        y = batch["label"]

        logits = self.forward(x)

        loss = self.criterion(logits, y)

        self.log("train/loss", loss)

        return loss

    def validation_step(self, batch, batch_idx):
        x = batch["sentence_embedding"]
        y = batch["label"]

        logits = self.forward(x)

        loss = self.criterion(logits, y)

        metrics_dict = {
            f"val/{name}": metric.to(self.device)(logits, y)
            for name, metric in self.metrics.items()
        }

        self.log_dict({**{"val/loss": loss}, **metrics_dict})

        return loss

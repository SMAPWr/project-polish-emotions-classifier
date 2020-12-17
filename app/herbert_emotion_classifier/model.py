from torch.optim import Adam, lr_scheduler
import pytorch_lightning as pl
from typing import List
from torch import nn
from emotion_dict import emotion_dict
from pytorch_lightning.metrics import Accuracy, Precision, Recall
import torch
from transformers import XLMTokenizer, RobertaModel


class HerbertEmotionClassifier(pl.LightningModule):
    lr = 1e-3

    def __init__(self):
        super().__init__()

        num_classes = len(emotion_dict)

        self.criterion = nn.CrossEntropyLoss()
        self.metrics = {
            "accuracy": Accuracy(),
            "recall_macro": Recall(num_classes=num_classes, average="macro"),
            "precision_macro": Precision(num_classes=num_classes, average="macro"),
        }

        self.tokenizer = XLMTokenizer.from_pretrained(
            "allegro/herbert-klej-cased-tokenizer-v1"
        )
        self.model = RobertaModel.from_pretrained("allegro/herbert-klej-cased-v1")

        self.classifier = nn.Sequential(
            nn.Linear(768, 256),
            nn.Dropout(0.5),
            nn.ReLU(),
            nn.Linear(256, 128),
            nn.Dropout(0.5),
            nn.ReLU(),
            nn.Linear(128, num_classes),
        )

    def forward(self, inputs: List[str]):
        encoded_inputs = []

        for text in inputs:
            encoded_inputs.append(
                self.tokenizer.encode(text, return_tensors="pt").squeeze(dim=0)
            )

        encoded_input = torch.stack(encoded_inputs, dim=0)

        return self.model(encoded_input)

    def configure_optimizers(self):
        optimizer = Adam(self.parameters(), self.lr)
        scheduler = lr_scheduler.StepLR(optimizer, step_size=7, gamma=0.1)

        return [optimizer], [scheduler]

    def training_step(self, batch, batch_idx):
        x, y = batch
        logits = self.forward(x)

        loss = self.criterion(logits, y)

        self.log("train/loss", loss)

        return loss

    def validation_step(self, batch, batch_idx):
        x, y = batch
        logits = self.forward(x)

        loss = self.criterion(logits, y)

        metrics_dict = {
            f"val/{name}": metric.to(self.device)(logits, y)
            for name, metric in self.metrics.items()
        }

        self.log_dict({**{"val/loss": loss}, **metrics_dict})

        return loss

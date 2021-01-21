from torch.optim import Adam, lr_scheduler
import pytorch_lightning as pl
from torch import nn
from .emotion_dict import emotion_dict
from pytorch_lightning.metrics import Accuracy, Precision, Recall
import torch


class HerbertEmotionSequenceClassifier(pl.LightningModule):
    lr = 1e-3

    def __init__(self):
        super().__init__()

        num_classes = len(emotion_dict)
        num_classes = 9

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
        
        rnn_hidden_size = 256
        
        self.rnn = nn.GRU(768, rnn_hidden_size, 2, batch_first=True, bidirectional=False, dropout=0.3)

        self.criterion = nn.CrossEntropyLoss(weight=weight)
#         self.criterion = nn.CrossEntropyLoss()
        self.metrics = {
            "accuracy": Accuracy(),
            "recall_macro": Recall(num_classes=num_classes, average="macro"),
            "precision_macro": Precision(num_classes=num_classes, average="macro"),
        }

        self.classifier = nn.Sequential(
            nn.ReLU(),
            nn.Linear(rnn_hidden_size*1, 128),
            nn.Dropout(0.3),
            nn.ReLU(),
            nn.Linear(128, 64),
            nn.Dropout(0.3),
            nn.ReLU(),
            nn.Linear(64, num_classes),
        )

    def forward(self, embedded_inputs):
        o, h = self.rnn(embedded_inputs)
        hidden_latent_vector=torch.cat([h[0],h[1]],dim=1)
        hidden_latent_vector=h[0]
        
#         last_output = o[:, -1, :]
        
        return self.classifier(hidden_latent_vector)

    def configure_optimizers(self):
        optimizer = Adam(self.parameters(), self.lr)
        scheduler = lr_scheduler.StepLR(optimizer, step_size=7, gamma=0.1)

        return [optimizer], [scheduler]

    def training_step(self, batch, batch_idx):
        x = batch["sentence_embedding"]
        y = batch["label"]

        logits = self.forward(x)

        loss = self.criterion(logits, y)
        
        metrics_dict = {
            f"train/{name}": metric.to(self.device)(logits, y)
            for name, metric in self.metrics.items()
        }

        self.log_dict({**{"train/loss": loss}, **metrics_dict})

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

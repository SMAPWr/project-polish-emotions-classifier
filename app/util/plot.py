from typing import List

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import seaborn as sns
from sklearn.manifold import TSNE
from sklearn.metrics import confusion_matrix as get_confusion_matrix
from sklearn.preprocessing import LabelEncoder


class Plot:

    def feature_distribution(self, x: np.ndarray, y: List[str] = None):
        tsne = TSNE()
        embedded = tsne.fit_transform(x)

        sns.scatterplot(
            x=embedded[:, 0],
            y=embedded[:, 1],
            hue=y if y else None,
            legend='full'
        )

    def convergence(self, losses: List[List[float]], names: List[str]):
        data = {
            'epoch': [],
            'loss': [],
            'name': []
        }

        for loss_history, name in zip(losses, names):
            data['loss'] += loss_history
            data['epoch'] += list(range(0, len(loss_history)))
            data['name'] += [name] * len(loss_history)

        data = pd.DataFrame.from_dict(data)

        sns.lineplot(
            data=data,
            x='epoch',
            y='loss',
            hue='name'
        ).set_title('Convergence')

    def confusion_matrix(self, y_test: List[str], y_pred: List[str]):
        encoder = LabelEncoder()
        y_test = encoder.fit_transform(y_test)
        y_pred = encoder.transform(y_pred)

        cm = get_confusion_matrix(y_test, y_pred)

        df_cm = pd.DataFrame(cm, encoder.classes_, encoder.classes_)
        sns.heatmap(df_cm, annot=True, fmt='d')

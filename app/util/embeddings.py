from typing import Dict, List

import numpy as np
import torch
from tqdm.auto import tqdm
from transformers import RobertaModel, XLMTokenizer


class Embedder:

    def __init__(self):
        self.device = torch.device(
            "cuda:0" if torch.cuda.is_available() else "cpu"
        )
        self.tokenizer = XLMTokenizer.from_pretrained(
            'allegro/herbert-klej-cased-tokenizer-v1'
        )
        self.model = RobertaModel.from_pretrained(
            'allegro/herbert-klej-cased-v1'
        )
        self.model = self.model.to(self.device)

    def calculate_embeddings(
        self,
        texts: List[str],
        emote_to_text: Dict[str, str],
        labels: List[str] = None
    ) -> dict:

        processed_texts = []
        processed_labels = []
        sentence_embeddings = []
        sequence_embeddings = []

        texts = [
            self._replace_emotes_with_text(text, emote_to_text)
            for text in texts
        ]

        for text, label in tqdm(
            zip(texts, labels if labels else [None] * len(texts)),
            desc='Encoding texts'
        ):
            try:
                tokenized = self.tokenizer.encode(
                    text, return_tensors='pt'
                ).to(self.device)

                with torch.no_grad():
                    outputs = self.model(tokenized)

                    sequence_embedding = outputs[0].squeeze(dim=0).cpu().numpy()
                    sentence_embedding = outputs[1].squeeze(dim=0).cpu().numpy()

                    processed_texts.append(text)
                    sentence_embeddings.append(sentence_embedding)
                    sequence_embeddings.append(sequence_embedding)
                    processed_labels.append(label)

            except Exception:
                pass

        return {
            'texts': processed_texts,
            'labels': processed_labels if labels else [],
            'sentence_embeddings': np.array(sentence_embeddings),
            'sequence_embeddings': sequence_embeddings
        }

    def _replace_emotes_with_text(
        self,
        text: str,
        emote_to_text: Dict[str, str]
    ) -> str:
        for emote, emote_text in emote_to_text.items():
            text = text.replace(emote, emote_text)

        return text

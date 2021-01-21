from typing import Dict, List

import numpy as np
import torch
from tqdm.auto import tqdm
from transformers import RobertaModel, XLMTokenizer

tokenizer = XLMTokenizer.from_pretrained(
    'allegro/herbert-klej-cased-tokenizer-v1'
)
model = RobertaModel.from_pretrained('allegro/herbert-klej-cased-v1')


def _replace_emotes_with_text(text: str, emote_to_text: Dict[str, str]) -> str:
    for emote, emote_text in emote_to_text.items():
        text = text.replace(emote, emote_text)

    return text


def calculate_embeddings(
    data: List[str],
    emote_to_text: Dict[str, str],
) -> List[np.ndarray]:

    embeddings = []

    for text in tqdm(data, desc='Encoding texts'):
        try:
            text = _replace_emotes_with_text(text, emote_to_text)
            tokenized = tokenizer.encode(text, return_tensors='pt')

            with torch.no_grad():
                encoded = model(tokenized)
                encoded = encoded[1].squeeze(0).detach().numpy()
                embeddings.append(encoded)

        except Exception:
            pass

    return np.array(embeddings)

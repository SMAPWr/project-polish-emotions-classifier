from typing import Dict, List

import numpy as np
from pytest import fixture

from ..embeddings import Embedder


@fixture(scope='session')
def embedder() -> Embedder:
    return Embedder()


@fixture
def emote_to_text() -> Dict[str, str]:
    return {
        ':)': 'uśmiechnięta twarz',
        ':(': 'smutna twarz'
    }


@fixture
def texts() -> List[str]:
    return [
        "@lkwarzecha Odkąd to przeszkadza liberalnemu :)",
        "To znaczy, że SH jest za aborcja. :(",
        "PRAWDA ? mega sexy ta fota co wyslalam w odp http://sexyfoty.pl",
    ]


def test_embeddings(
    embedder: Embedder,
    emote_to_text: Dict[str, str],
    texts: List[str]
):
    data = embedder.calculate_embeddings(texts, emote_to_text)

    assert isinstance(data, dict)
    assert 'texts' in data
    assert 'labels' in data
    assert 'sentence_embeddings' in data
    assert 'sequence_embeddings' in data

    sentence_embeddings = data['sentence_embeddings']

    assert isinstance(sentence_embeddings, np.ndarray)
    assert sentence_embeddings.shape == [3, 768]

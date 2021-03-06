import json
import re
import torch
from itertools import starmap
from os.path import join, dirname, realpath
from transformers import XLMTokenizer, RobertaModel
from typing import Dict, List

DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
print(f"Running on: {DEVICE}")


@torch.no_grad()
def get_embedding_for_text(text: str) -> (torch.tensor, torch.tensor):
    """
    For a given sentence the function return embedding generated by BERT
    :param text: Sentence for which u want to get an embedding
    :return: (tensor of embeddings for each token in sentnece, average embedding of a sentence)
    """
    tokenizer = XLMTokenizer.from_pretrained(join(dirname(realpath(__file__)), "models", "tokenizer"))
    bert_model = RobertaModel.from_pretrained(join(dirname(realpath(__file__)), "models", "bert"))

    encoded_input = tokenizer.encode(text, return_tensors="pt").to(DEVICE)
    outputs = bert_model(encoded_input)

    sequence_tokens_embedding = outputs[0].squeeze(dim=0)
    sentence_embedding = outputs[1].squeeze(dim=0)
    return sequence_tokens_embedding, sentence_embedding


def merge(sequences: List[torch.tensor]):
    """
    Given the list of sequences embeddings where every seq has a different num of tokens the method converts
    the list into a tensor of size (N, L, 768) where N is the num of sequences in list and L is the longest sequence
    :param sequences: List of tensors of embeddings for tokens in sentences
    :return: tensor of size (N, L, 768)
    """
    lengths = [len(seq) for seq in sequences]
    vector_size = 768
    padded_seqs = torch.zeros(len(sequences), max(lengths), vector_size)
    for i, seq in enumerate(sequences):
        end = lengths[i]
        padded_seqs[i, (max(lengths) - end) :] = seq[:end]
    return padded_seqs


@torch.no_grad()
def get_embedding_for_list_of_texts(
    list_of_texts: List[str],
) -> (torch.tensor, torch.tensor):
    """
    For a given list of sentences the function return embedding generated by BERT
    :param text: Sentence for which u want to get an embedding
    :return: (tensor of embeddings for each token in sentneces, average embedding of a sentences)
    """
    tokenizer = XLMTokenizer.from_pretrained(
        join(dirname(realpath(__file__)), "models", "tokenizer")
    )
    bert_model = RobertaModel.from_pretrained(
        join(dirname(realpath(__file__)), "models", "bert")
    )

    emote_to_text = {}
    with open(join(dirname(realpath(__file__)), "emote_to_text.json"), encoding='utf8') as file:
        emote_to_text = json.load(file)

    list_of_texts = starmap(
        _replace_emotes_with_text,
        zip(list_of_texts, [emote_to_text] * len(list_of_texts))
    )

    list_of_texts = map(_remove_urls_from_text, list_of_texts)

    list_of_sentence_embeddings = []
    list_of_sequence_embeddings = []

    for text in list_of_texts:
        encoded_input = tokenizer.encode(text, return_tensors="pt").to(DEVICE)
        outputs = bert_model(encoded_input)

        sequence_tokens_embedding = outputs[0].squeeze(dim=0)
        sentence_embedding = outputs[1].squeeze(dim=0)

        list_of_sequence_embeddings.append(sequence_tokens_embedding)
        list_of_sentence_embeddings.append(sentence_embedding)

    seq_embeddings_tensor = merge(list_of_sequence_embeddings)
    sentence_embeddings_tensor = torch.stack(list_of_sentence_embeddings, dim=0)

    return seq_embeddings_tensor, sentence_embeddings_tensor


def _replace_emotes_with_text(text: str, emote_to_text: Dict[str, str]) -> str:
    for emote, emote_text in emote_to_text.items():
        text = text.replace(emote, emote_text)

    return text

def _remove_urls_from_text(text: str) -> str:
    text = re.sub(r'\S+://\S+', '', text, flags=re.MULTILINE)
    return text

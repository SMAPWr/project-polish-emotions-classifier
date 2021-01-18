from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from .dense_classifier import predict_emotion
from .embedding import get_embedding_for_text
from copy import deepcopy

app = FastAPI()


@app.get("/")
def read_root():
    return RedirectResponse("/docs")


@app.post("/get_predictions/{text}")
async def get_predictions(text: str):
    sequence_tokens_embedding, sentence_embedding = get_embedding_for_text(text)

    emotions_dense_classifier = predict_emotion(sentence_embedding)

    emotions_sequence_classifier = deepcopy(emotions_dense_classifier)

    emotions_teacher_student_classifier = deepcopy(emotions_dense_classifier)

    return {
        "data": [
            {
                "text": text,
                "emotions": emotions_dense_classifier,
            },
            {
                "text": text,
                "emotions": emotions_sequence_classifier,
            },
            {
                "text": text,
                "emotions": emotions_teacher_student_classifier,
            },
        ]
    }

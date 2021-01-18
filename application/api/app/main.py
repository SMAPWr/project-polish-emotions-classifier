from typing import Optional, List, Dict

from fastapi import Request, FastAPI
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from .dense_classifier import predict_emotion
from .embedding import get_embedding_for_text
from copy import deepcopy

from pydantic import BaseModel


class Item(BaseModel):
    tweets: List[Dict[str, str]] = []


app = FastAPI()

origins = [
    "https://smapwr.github.io",
    "http://127.0.0.1",
    "http://127.0.0.1:8002",
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:3001",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return RedirectResponse("/docs")


@app.get("/status")
def read_root():
    return {
        "status": True
    }


@app.post("/predictions/")
async def get_predictions(request: Item):
    """
    :param request:
        [
            {
                "text": str,
                "id": str
            }
        ]
    :return: {
        "data": [
            {
                "id": str,
                "text": str,
                "model1": {

                },
                "model2": {

                },
                "model3": {

                }
            }
        ]
    }
    """
    body = request.dict()
    print(body)

    response = {
        "data": [

        ]
    }
    for item in list(body["tweets"]):
        sequence_tokens_embedding, sentence_embedding = get_embedding_for_text(item["text"])

        emotions_dense_classifier = predict_emotion(sentence_embedding)

        emotions_sequence_classifier = deepcopy(emotions_dense_classifier)

        emotions_teacher_student_classifier = deepcopy(emotions_dense_classifier)

        response["data"].append({
            "id": item["id"],
            "text": item["text"],
            "model1": emotions_dense_classifier,
            "model2": emotions_sequence_classifier,
            "model3": emotions_teacher_student_classifier
        })

    return response

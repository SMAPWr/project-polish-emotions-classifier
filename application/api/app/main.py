from typing import Optional, List, Dict

from fastapi import Request, FastAPI
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from .dense_classifier import predict_emotions_with_dense_model
from .embedding import get_embedding_for_list_of_texts
from .seq_classifier import predict_emotions_with_seq_model
from copy import deepcopy

from pydantic import BaseModel


class Item(BaseModel):
    tweets: List[Dict[str, str]] = []


app = FastAPI()

origins = [
    "*",
    "https://smapwr.github.io",
    "http://127.0.0.1",
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
    return {"status": True}


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

    response = {"data": []}

    texts = [item["text"] for item in body["tweets"]]

    (
        seq_embeddings_tensor,
        sentence_embeddings_tensor,
    ) = get_embedding_for_list_of_texts(texts)

    list_of_predicted_emotions_in_dense_model = predict_emotions_with_dense_model(
        sentence_embeddings_tensor
    )

    list_of_predicted_emotions_in_sequence_model = predict_emotions_with_seq_model(
        seq_embeddings_tensor
    )

    list_of_predicted_emotions_in_teacher_student_model = deepcopy(
        list_of_predicted_emotions_in_dense_model
    )

    for idx, item in enumerate(body["tweets"]):

        response["data"].append(
            {
                "id": item["id"],
                "text": item["text"],
                "model1": list_of_predicted_emotions_in_dense_model[idx],
                "model2": list_of_predicted_emotions_in_sequence_model[idx],
                "model3": list_of_predicted_emotions_in_teacher_student_model[idx],
            }
        )

    return response

"""This is a FastAPI application that serves as a backend for a RAG (Retrieval-Augmented Generation) system."""

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from rag_pipeline import (
    create_vector_store,
    load_documents,
    query_document_with_context,
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_event():
    global documents, vector_store
    documents = load_documents("data/doc.txt")
    vector_store = create_vector_store(documents)


@app.post("/query")
async def query(request: Request):
    body = await request.json()
    question = body.get("question", "")
    if not question:
        return {"error": "Question cannot be empty."}
    result = query_document_with_context(vector_store, question)
    print(f"Query: {question}, Answer: {result}")
    return {"answer": result}

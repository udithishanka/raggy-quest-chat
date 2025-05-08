"""This is a FastAPI application that serves as a backend for a RAG (Retrieval-Augmented Generation) system."""

import os
import shutil

from fastapi import FastAPI, File, Request, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from rag_pipeline import (
    chat_without_context,
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

documents = None
vector_store = None
FileUploadDep = File(...)


@app.on_event("startup")
async def startup_event() -> None:
    """Startup hook (currently empty)."""
    global documents, vector_store


@app.post("/query")
async def query(request: Request) -> dict:
    """Handle query requests, using context if available."""
    global documents, vector_store

    body = await request.json()
    question = body.get("question", "")
    if not question:
        return {"error": "Question cannot be empty."}

    if vector_store:
        result = query_document_with_context(vector_store, question)
    else:
        result = chat_without_context(question)

    print(f"Query: {question}, Answer: {result}")
    return {"answer": result}


@app.post("/upload-document")
async def upload_document(file: UploadFile = FileUploadDep) -> dict:
    """Upload a document, extract its content, and build a vector store."""
    file_location = os.path.join("data", file.filename)
    os.makedirs("data", exist_ok=True)

    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    global documents, vector_store
    documents = load_documents(file_location)
    vector_store = create_vector_store(documents)

    return {"message": f"{file.filename} uploaded and vector store updated."}

"""FastAPI backend for the RAG system using the hybrid pipeline."""
import os
import shutil

from fastapi import FastAPI, File, Request, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from rag_pipeline import (
    chat_without_context,
    create_vector_store,
    load_documents,
    build_hybrid_retrievers,
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

# Globals (simple in-memory demo store)
documents = None
vector_store = None
bm25 = None
dense = None

FileUploadDep = File(...)


@app.on_event("startup")
async def startup_event() -> None:
    # Nothing to pre-warm right now; CrossEncoder loads on first use.
    pass


@app.post("/query")
async def query(request: Request) -> dict:
    """Handle query requests; prefer grounded answers, else abstain politely."""
    global documents, vector_store, bm25, dense

    body = await request.json()
    question = body.get("question", "").strip()
    if not question:
        return {"error": "Question cannot be empty."}

    if vector_store and bm25 and dense:
        result = query_document_with_context(vector_store, bm25, dense, question)
    else:
        result = chat_without_context(question)

    print(f"[RAG] Q: {question}\nA: {result[:500]}{'...' if len(result) > 500 else ''}")
    return {"answer": result}


@app.post("/upload-document")
async def upload_document(file: UploadFile = FileUploadDep) -> dict:
    """Upload a document, index it, and (re)build hybrid retrievers."""
    global documents, vector_store, bm25, dense

    os.makedirs("data", exist_ok=True)
    file_location = os.path.join("data", file.filename)

    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Index single-file flow (append/merge if you want multi-file later)
    documents = load_documents(file_location)
    vector_store = create_vector_store(documents)
    bm25, dense = build_hybrid_retrievers(documents, vector_store)

    return {"message": f"{file.filename} uploaded; index & retrievers refreshed."}

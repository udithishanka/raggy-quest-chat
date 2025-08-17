"""RAG pipeline with Hybrid Retrieval (BM25 + FAISS), RRF fusion, Cross-Encoder rerank, and score gating."""
import os
import re
from typing import List, Tuple

from dotenv import load_dotenv

from langchain_community.document_loaders import (
    PyPDFLoader,
    TextLoader,
    UnstructuredWordDocumentLoader,
)
from langchain_community.retrievers import BM25Retriever
from langchain_community.vectorstores import FAISS

from langchain_core.documents import Document
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter

# Reranker
from sentence_transformers import CrossEncoder

load_dotenv()

# ---------- Config ----------
CHUNK_SIZE = 320
CHUNK_OVERLAP = 60
FINAL_K = 6                 # passages given to the LLM
RERANK_POOL = 50            # fused candidates to rerank with cross-encoder
BM25_K = 200                # initial BM25 candidates
DENSE_FETCH_K = 200         # dense recall pool
DENSE_MMR_K = 50            # after MMR diversification
MMR_LAMBDA = 0.5            # 0 = more diverse, 1 = more similar to query
RRF_K = 60                  # RRF stabilization constant
CE_MODEL = "cross-encoder/ms-marco-MiniLM-L-6-v2"
CE_SCORE_GATE = 0.25        # abstain if top rerank score below this

# Load once
_CE = CrossEncoder(CE_MODEL)


# ---------- Utilities ----------
def _safe_basename(path: str) -> str:
    try:
        return os.path.basename(path)
    except Exception:
        return "unknown"


def _add_ids(docs: List[Document], source_name: str) -> List[Document]:
    for i, d in enumerate(docs):
        d.metadata = dict(d.metadata or {})
        d.metadata.setdefault("source", source_name)
        d.metadata["chunk_id"] = i
        d.metadata["doc_id"] = f"{source_name}#{i}"
    return docs


def _format_docs(docs: List[Document]) -> str:
    # Each chunk is prefixed with its [doc_id] for easy citation.
    return "\n\n".join(f"[{d.metadata.get('doc_id')}] {d.page_content}" for d in docs)


# ---------- Load & Index ----------
def load_documents(file_path: str) -> List[Document]:
    """Load, chunk, and tag documents."""
    ext = os.path.splitext(file_path)[-1].lower()
    if ext == ".pdf":
        loader = PyPDFLoader(file_path)
    elif ext == ".txt":
        loader = TextLoader(file_path, encoding="utf-8")
    elif ext == ".docx":
        loader = UnstructuredWordDocumentLoader(file_path)
    else:
        raise ValueError(f"Unsupported file format: {ext}")

    raw = loader.load()
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=CHUNK_SIZE, chunk_overlap=CHUNK_OVERLAP
    )
    docs = text_splitter.split_documents(raw)
    return _add_ids(docs, _safe_basename(file_path))


def create_vector_store(documents: List[Document]) -> FAISS:
    """Create a FAISS vector store from the documents."""
    # You can specify model="text-embedding-3-small" for cost efficiency.
    embeddings = OpenAIEmbeddings()
    return FAISS.from_documents(documents, embeddings)


def build_hybrid_retrievers(
    documents: List[Document], vector_store: FAISS
):
    """Return BM25 retriever (lexical) and dense retriever (MMR diversified)."""
    # Lexical
    bm25 = BM25Retriever.from_documents(documents)
    bm25.k = BM25_K

    # Dense with MMR for diversity
    dense = vector_store.as_retriever(
        search_type="mmr",
        search_kwargs={"k": DENSE_MMR_K, "fetch_k": DENSE_FETCH_K, "lambda_mult": MMR_LAMBDA},
    )
    return bm25, dense


# ---------- Fusion & Rerank ----------
def rrf_fuse(
    bm25_docs: List[Document], dense_docs: List[Document], rrf_k: int = RRF_K, take: int = RERANK_POOL
) -> List[Document]:
    """Reciprocal Rank Fusion over two ranked lists."""
    scored = {}  # doc_id -> (Document, score)
    for rank, d in enumerate(bm25_docs):
        did = d.metadata["doc_id"]
        scored.setdefault(did, [d, 0.0])
        scored[did][1] += 1.0 / (rrf_k + rank + 1)
    for rank, d in enumerate(dense_docs):
        did = d.metadata["doc_id"]
        scored.setdefault(did, [d, 0.0])
        scored[did][1] += 1.0 / (rrf_k + rank + 1)
    fused = sorted(scored.values(), key=lambda x: x[1], reverse=True)
    return [d for d, _ in fused[:take]]


def rerank(
    query: str, docs: List[Document], top_k: int = FINAL_K
) -> List[Tuple[Document, float]]:
    """Cross-encoder rerank; returns (doc, score)."""
    if not docs:
        return []
    pairs = [(query, d.page_content) for d in docs]
    scores = _CE.predict(pairs).tolist()
    ranked = sorted(zip(docs, scores), key=lambda t: t[1], reverse=True)
    return ranked[:top_k]


# ---------- Prompting ----------
STRICT_PROMPT = ChatPromptTemplate.from_template(
    """You are a retrieval-grounded assistant.
Use ONLY the provided context to answer. If the context is insufficient, reply exactly:
"I don't know based on the provided sources."
Every factual statement should include a citation like [source#chunk].

Question:
{question}

Context:
{context}
"""
)


# ---------- Query ----------
def query_document_with_context(
    vector_store: FAISS, bm25, dense, query: str
) -> str:
    """Hybrid retrieve → fuse → rerank → score gate → grounded generation."""
    # 1) Retrieve
    bm25_docs = bm25.get_relevant_documents(query)
    dense_docs = dense.get_relevant_documents(query)

    # 2) Fuse (RRF)
    fused = rrf_fuse(bm25_docs, dense_docs, take=RERANK_POOL)

    # 3) Rerank (Cross-Encoder)
    top = rerank(query, fused, top_k=FINAL_K)

    # 4) Score gate → abstain if evidence weak
    if not top or top[0][1] < CE_SCORE_GATE:
        return "I don't know based on the provided sources."

    # 5) LLM grounded generation with strict prompt
    ctx = _format_docs([d for d, _ in top])
    prompt_msgs = STRICT_PROMPT.format_messages(question=query, context=ctx)
    model = ChatOpenAI(model="gpt-4o-mini", temperature=0.2, top_p=0.5)
    out = model.invoke(prompt_msgs)
    return StrOutputParser().invoke(out)


def chat_without_context(question: str) -> str:
    """Fallback when no docs are loaded (kept, but will not fabricate sources)."""
    fallback_prompt = ChatPromptTemplate.from_template(
        """You are a helpful assistant. Answer the question if you can.
If you lack supporting documents, say that clearly.

Question: {question}"""
    )
    model = ChatOpenAI(model="gpt-4o-mini", temperature=0.2, top_p=0.5)
    messages = fallback_prompt.format_messages(question=question)
    return StrOutputParser().invoke(model.invoke(messages))

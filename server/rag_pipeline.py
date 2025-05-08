"""This script contains the RAG pipeline using LangChain and FAISS."""

import os
from dotenv import load_dotenv

from langchain_community.document_loaders import (
    PyPDFLoader,
    TextLoader,
    UnstructuredWordDocumentLoader,
)
from langchain_community.vectorstores import FAISS
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter

load_dotenv()


def load_documents(file_path: str) -> list:
    """Load documents from a given file path."""
    ext = os.path.splitext(file_path)[-1].lower()

    if ext == ".pdf":
        loader = PyPDFLoader(file_path)
    elif ext == ".txt":
        loader = TextLoader(file_path, encoding="utf-8")
    elif ext == ".docx":
        loader = UnstructuredWordDocumentLoader(file_path)
    else:
        raise ValueError(f"Unsupported file format: {ext}")

    documents = loader.load()
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    return text_splitter.split_documents(documents)


def create_vector_store(documents: list) -> FAISS:
    """Create a vector store from the documents."""
    embeddings = OpenAIEmbeddings()
    return FAISS.from_documents(documents, embeddings)


def query_document_with_context(vector_store: FAISS, query: str) -> str:
    """Query the vector store with context from the documents."""
    retriever = vector_store.as_retriever(search_kwargs={"k": 5})
    prompt = ChatPromptTemplate.from_template(
        """
        You are a friendly and helpful assistant.
        Use the context provided below to answer the user's question clearly and helpfully.
        If the answer cannot be found in the context, say so politely and suggest what the document appears to be about.

        ==========
        Question: {question}
        ==========
        {context}
        ==========
        """
    )
    model = ChatOpenAI(model="gpt-4o-mini", temperature=0)

    chain = (
        {"context": retriever, "question": RunnablePassthrough()}
        | prompt
        | model
        | StrOutputParser()
    )

    return chain.invoke(query)


def chat_without_context(question: str) -> str:
    """Chat without any context. This is a fallback for when no documents are loaded."""
    fallback_prompt = ChatPromptTemplate.from_template(
        """
        You are a helpful assistant. Answer the following question as best as you can.
        If unsure, explain that you don't have supporting documents yet.

        Question: {question}
        """
    )
    model = ChatOpenAI(model="gpt-4o-mini", temperature=0)
    chain = {"question": lambda x: x} | fallback_prompt | model | StrOutputParser()
    result = chain.invoke(question)
    return result

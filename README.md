# 🔍 RAG Quest Chat

A Retrieval-Augmented Generation (RAG) based chatbot application that retrieves relevant context from documents to enhance language model responses.

## 🌟 Features

- **Document Ingestion**: Upload and process various document types (PDF, TXT, DOCX, etc.)
- **Semantic Search**: Find contextually relevant information from your document repository
- **Conversational UI**: User-friendly chat interface for natural interactions

## 🛠️ Tech Stack

- **Backend**: FastAPI + Uvicorn
- **Frontend**: Vite + React
- **Vector Store**: FAISS
- **Embedding Model**: OpenAI
- **LLM**: OpenAI
- **Document Processing**: LangChain document loaders and text splitters

## 🚀 Getting Started

## 🎥 Demo

[Click to watch the demo video](video.mp4)


### Prerequisites

- Python 3.10+
- Node.js 16+
- OpenAI API key

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/raggy-quest-chat.git
cd raggy-quest-chat
```

### 2. Install dependencies

#### Backend

```bash
cd server
pip install -r requirements.txt
```

Create a `.env` file inside the root directory with the following content:

```
OPENAI_API_KEY=your-openai-key
```

Start the FastAPI server:

```bash
uvicorn app:app --reload --port 8000
```

The backend will run at: http://127.0.0.1:8000

#### Frontend

```bash
cd client
npm install
npm run dev
```

Visit the app at: http://localhost:8080

## 📚 Usage

### Document Upload

1. Click on the "Add Document" section
2. Drag and drop files or click to select files
3. The system will process and index the documents

### Chat Interface

1. Type your question in the chat input
2. The system will retrieve relevant context from your documents
3. Continue the conversation with follow-up questions

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [LangChain](https://github.com/hwchase17/langchain) for the document processing pipelines
- [FAISS](https://github.com/facebookresearch/faiss) for efficient similarity search
- [OpenAI](https://openai.com/) for their powerful embedding and language models

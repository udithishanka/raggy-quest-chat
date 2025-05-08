# 🔍 RAG Quest Chat

A Retrieval-Augmented Generation (RAG) based chatbot application that retrieves relevant context from documents to enhance language model responses.

## 🌟 Features

- **Document Ingestion**: Upload and process various document types (PDF, TXT, DOCX, etc.)
- **Semantic Search**: Find contextually relevant information from your document repository
- **Conversational UI**: User-friendly chat interface for natural interactions
- **Citation Support**: Responses include citations to source documents
- **Context Management**: Maintains conversation history for coherent exchanges
- **Configurable Pipeline**: Easily swap embedding models, vector stores, and LLMs

## 🛠️ Tech Stack

- **Backend**: FastAPI + Uvicorn
- **Frontend**: Vite + React
- **Vector Store**: FAISS / Chroma (pluggable)
- **Embedding Model**: OpenAI (can be swapped for local models)
- **LLM**: OpenAI / Local LLM support (e.g., LLaMA)
- **Document Processing**: LangChain document loaders and text splitters

## 🚀 Getting Started

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
pip install -r ../requirements.txt
```

Create a `.env` file inside the root directory with the following content:

```
OPENAI_API_KEY=your-openai-key
VECTOR_STORE_PATH=./data/vector_store
```

Start the FastAPI server:

```bash
uvicorn app:app --reload
```

By default, the backend runs at: http://127.0.0.1:8000

#### Frontend

```bash
cd client
npm install
npm run dev
```

Visit the app at: http://localhost:5173

## 📚 Usage

### Document Upload

1. Navigate to the "Document Upload" section
2. Drag and drop files or click to select files
3. The system will process and index the documents

### Chat Interface

1. Type your question in the chat input
2. The system will retrieve relevant context from your documents
3. View responses with citations to the source material
4. Continue the conversation with follow-up questions

### Administration

Access the admin panel at `/admin` to:
- Monitor system usage
- View document status
- Configure system parameters

## 🔧 Configuration

### Vector Store Options

In `config.py`, you can select your preferred vector store:

```python
VECTOR_STORE_TYPE = "faiss"  # Options: "faiss", "chroma"
```

### Embedding Model Configuration

Configure the embedding model in `config.py`:

```python
EMBEDDING_MODEL = {
    "type": "openai",  # Options: "openai", "local"
    "model_name": "text-embedding-ada-002"  # For OpenAI
    # "model_path": "./models/embedding_model"  # For local models
}
```

### LLM Selection

Configure the language model in `config.py`:

```python
LLM_CONFIG = {
    "type": "openai",  # Options: "openai", "local"
    "model_name": "gpt-3.5-turbo",  # For OpenAI
    # "model_path": "./models/llm"  # For local models
}
```

## 🔒 Security Considerations

- API keys are stored as environment variables and not committed to version control
- Document processing is performed in a sandboxed environment
- User authentication is required for accessing sensitive information
- All API endpoints implement proper rate limiting

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📬 Contact

Project Link: [https://github.com/yourusername/raggy-quest-chat](https://github.com/yourusername/raggy-quest-chat)

## 🙏 Acknowledgments

- [LangChain](https://github.com/hwchase17/langchain) for the document processing pipelines
- [FAISS](https://github.com/facebookresearch/faiss) for efficient similarity search
- [OpenAI](https://openai.com/) for their powerful embedding and language models

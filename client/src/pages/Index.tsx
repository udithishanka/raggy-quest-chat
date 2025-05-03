
import { Card } from "@/components/ui/card";
import { ChatContainer } from "@/components/chat-container";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 dark:from-slate-900 dark:via-purple-950/20 dark:to-blue-950/30 flex flex-col p-4 md:p-8 overflow-hidden">
      <header className="container mx-auto mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400">
          Smart Document Assistant
        </h1>
        <p className="text-lg text-slate-700 dark:text-slate-300 max-w-2xl">
          Leverage the power of AI with Retrieval-Augmented Generation (RAG) to get accurate answers from your documents. 
          Upload your files and start asking questions instantly.
        </p>
      </header>
      
      <main className="container mx-auto flex-1 flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-br from-white to-blue-50 dark:from-slate-900 dark:to-blue-950/20 shadow-lg border-blue-100 dark:border-blue-900/20 flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">Upload Documents</h2>
            <p className="text-slate-600 dark:text-slate-400">
              Add your PDFs, TXT files, or other documents to create a knowledge base for the AI assistant.
            </p>
          </Card>
          
          <Card className="p-6 bg-gradient-to-br from-white to-purple-50 dark:from-slate-900 dark:to-purple-950/20 shadow-lg border-purple-100 dark:border-purple-900/20 flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <div className="h-16 w-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600 dark:text-purple-400">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">Intelligent Queries</h2>
            <p className="text-slate-600 dark:text-slate-400">
              Our AI uses RAG technology to provide accurate, contextual answers based on your documents.
            </p>
          </Card>
          
          <Card className="p-6 bg-gradient-to-br from-white to-indigo-50 dark:from-slate-900 dark:to-indigo-950/20 shadow-lg border-indigo-100 dark:border-indigo-900/20 flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <div className="h-16 w-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600 dark:text-indigo-400">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">Natural Conversation</h2>
            <p className="text-slate-600 dark:text-slate-400">
              Chat naturally with the assistant and get relevant responses sourced directly from your documents.
            </p>
          </Card>
        </div>
        
        <Card className="flex-1 flex flex-col border shadow-xl overflow-hidden rounded-2xl bg-white/90 dark:bg-slate-950/90 backdrop-blur-sm mb-12">
          <ChatContainer />
        </Card>
      </main>
      
      <footer className="container mx-auto mt-4 py-6 text-center text-sm text-muted-foreground border-t border-gray-200 dark:border-gray-800">
        <p className="mb-2">RAG-powered AI Assistant using FastAPI backend</p>
        <p>Upload your documents and enhance your knowledge base for more accurate responses</p>
      </footer>
    </div>
  );
};

export default Index;

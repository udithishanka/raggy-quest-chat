
import { Card } from "@/components/ui/card";
import { ChatContainer } from "@/components/chat-container";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 dark:from-slate-900 dark:to-slate-800 flex flex-col p-4 md:p-8">
      <header className="container mx-auto mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400">
          RAG-powered Document Assistant
        </h1>
        <p className="text-muted-foreground text-lg">
          Ask questions about your documents using Retrieval-Augmented Generation
        </p>
      </header>
      
      <main className="container mx-auto flex-1 flex flex-col">
        <Card className="flex-1 flex flex-col border shadow-xl overflow-hidden rounded-2xl bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm">
          <ChatContainer />
        </Card>
      </main>
      
      <footer className="container mx-auto mt-8 text-center text-sm text-muted-foreground">
        <p>RAG-powered AI Assistant using FastAPI backend</p>
      </footer>
    </div>
  );
};

export default Index;

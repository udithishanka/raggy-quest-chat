
import { Card } from "@/components/ui/card";
import { ChatContainer } from "@/components/chat-container";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/50 flex flex-col p-4 md:p-8">
      <header className="container mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          RAG-powered Document Assistant
        </h1>
        <p className="text-muted-foreground">
          Ask questions about your documents using Retrieval-Augmented Generation
        </p>
      </header>
      
      <main className="container mx-auto flex-1 flex flex-col">
        <Card className="flex-1 flex flex-col border shadow-lg overflow-hidden">
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

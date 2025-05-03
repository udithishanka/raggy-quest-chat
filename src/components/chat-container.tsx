
import React, { useEffect, useRef, useState } from "react";
import { ChatMessage } from "./chat-message";
import { ChatInput } from "./chat-input";
import { DocumentUpload } from "./document-upload";
import { DocumentList } from "./document-list";
import { queryRag } from "@/lib/api";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Plus } from "lucide-react";

interface Message {
  id: string;
  type: "user" | "assistant" | "system" | "error";
  content: string;
}

interface Document {
  id: string;
  name: string;
}

export function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "system",
      content: "Welcome to the RAG-powered chatbot! Ask me questions about the document database.",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [documents, setDocuments] = useState<Document[]>([
    { id: "default-doc", name: "sample-document.txt" }
  ]);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await queryRag(content);
      
      if (response.error) {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            type: "error",
            content: `Error: ${response.error}`,
          },
        ]);
        toast({
          variant: "destructive",
          title: "Query failed",
          description: response.error,
        });
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            type: "assistant",
            content: response.answer,
          },
        ]);
      }
    } catch (error) {
      console.error("Error in handleSendMessage:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          type: "error",
          content: "Sorry, there was an error processing your request. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddDocument = (fileName: string) => {
    const newDoc = {
      id: `doc-${Date.now()}`,
      name: fileName,
    };
    setDocuments((prev) => [...prev, newDoc]);
    
    setMessages((prev) => [
      ...prev,
      {
        id: `system-${Date.now()}`,
        type: "system",
        content: `Document "${fileName}" has been added to the knowledge base.`,
      },
    ]);
  };

  const handleDeleteDocument = (id: string) => {
    const docToDelete = documents.find(doc => doc.id === id);
    if (!docToDelete) return;
    
    setDocuments(documents.filter(doc => doc.id !== id));
    
    toast({
      title: "Document removed",
      description: `"${docToDelete.name}" has been removed from the knowledge base.`,
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 shadow-md">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">Document Chat Assistant</h2>
            <p className="text-sm opacity-80">Ask questions about your documents</p>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-none">
                <Plus className="h-4 w-4 mr-2" />
                Add Document
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Add Documents to Knowledge Base</SheetTitle>
              </SheetHeader>
              <div className="py-4">
                <DocumentUpload onUploadSuccess={handleAddDocument} />
              </div>
              <Separator className="my-4" />
              <DocumentList 
                documents={documents}
                onDeleteDocument={handleDeleteDocument}
              />
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col">
          <ScrollArea className="flex-1">
            <div className="divide-y divide-border">
              {messages.map((message) => (
                <ChatMessage key={message.id} type={message.type} content={message.content} />
              ))}
              {isLoading && (
                <ChatMessage type="assistant" content="" isLoading={true} />
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          <div className="p-4 border-t border-blue-100 dark:border-blue-900">
            <ChatInput onSend={handleSendMessage} disabled={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}

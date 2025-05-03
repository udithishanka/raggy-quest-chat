
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

type MessageType = "user" | "assistant" | "system" | "error";

export interface ChatMessageProps {
  type: MessageType;
  content: string;
  isLoading?: boolean;
}

export function ChatMessage({ type, content, isLoading = false }: ChatMessageProps) {
  return (
    <div
      className={cn(
        "py-6 px-4 md:px-8 flex items-start gap-4 transition-colors",
        type === "user" 
          ? "bg-white dark:bg-slate-900" 
          : type === "assistant" 
            ? "bg-blue-50/80 dark:bg-slate-800/80" 
            : type === "system" 
              ? "bg-purple-50/80 dark:bg-purple-950/80" 
              : "bg-red-50/80 dark:bg-red-950/80"
      )}
    >
      <div className="flex-shrink-0">
        {type === "user" ? (
          <div className="h-10 w-10 rounded-full bg-chatbot-user text-white flex items-center justify-center text-sm font-medium shadow-md">
            U
          </div>
        ) : type === "assistant" ? (
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center justify-center text-sm font-medium shadow-md">
            A
          </div>
        ) : type === "system" ? (
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center text-sm font-medium shadow-md">
            S
          </div>
        ) : (
          <div className="h-10 w-10 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center shadow-md">
            <AlertCircle className="h-5 w-5" />
          </div>
        )}
      </div>
      <div className="flex-1 overflow-hidden">
        {isLoading ? (
          <div className="animate-pulse-slow flex space-x-2">
            <div className="h-2 w-2 rounded-full bg-blue-400 animate-bounce"></div>
            <div className="h-2 w-2 rounded-full bg-blue-400 animate-bounce [animation-delay:0.2s]"></div>
            <div className="h-2 w-2 rounded-full bg-blue-400 animate-bounce [animation-delay:0.4s]"></div>
          </div>
        ) : (
          <div className="message-content">
            {content.split("\n").map((paragraph, i) => (
              <p key={i} className="mb-2 last:mb-0">{paragraph}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

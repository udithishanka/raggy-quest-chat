
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
              : "bg-red-50/80 dark:bg-red-950/80",
        type === "user" && "border-l-4 border-blue-500",
        type === "assistant" && "border-l-4 border-green-500",
        type === "system" && "border-l-4 border-purple-500",
        type === "error" && "border-l-4 border-red-500"
      )}
    >
      <div className="flex-shrink-0">
        {type === "user" ? (
          <div className="h-11 w-11 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center text-sm font-medium shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
        ) : type === "assistant" ? (
          <div className="h-11 w-11 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white flex items-center justify-center text-sm font-medium shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="m9 12 2 2 4-4"/>
            </svg>
          </div>
        ) : type === "system" ? (
          <div className="h-11 w-11 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center text-sm font-medium shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
        ) : (
          <div className="h-11 w-11 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white flex items-center justify-center shadow-md">
            <AlertCircle className="h-6 w-6" />
          </div>
        )}
      </div>
      <div className="flex-1 overflow-hidden">
        {isLoading ? (
          <div className="flex space-x-2">
            <div className="h-2.5 w-2.5 rounded-full bg-blue-500 animate-bounce"></div>
            <div className="h-2.5 w-2.5 rounded-full bg-blue-500 animate-bounce [animation-delay:0.2s]"></div>
            <div className="h-2.5 w-2.5 rounded-full bg-blue-500 animate-bounce [animation-delay:0.4s]"></div>
          </div>
        ) : (
          <div className="message-content prose prose-sm dark:prose-invert max-w-none">
            {content.split("\n").map((paragraph, i) => (
              <p key={i} className="mb-2 last:mb-0">{paragraph}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

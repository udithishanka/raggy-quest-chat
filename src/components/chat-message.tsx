
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
        "py-6 px-4 md:px-8 flex items-start gap-4",
        type === "user" ? "bg-background" : "bg-muted/50"
      )}
    >
      <div className="flex-shrink-0">
        {type === "user" ? (
          <div className="h-8 w-8 rounded-full bg-chatbot-user text-primary-foreground flex items-center justify-center text-sm font-medium">
            U
          </div>
        ) : type === "assistant" ? (
          <div className="h-8 w-8 rounded-full bg-chatbot-assistant text-primary-foreground flex items-center justify-center text-sm font-medium">
            A
          </div>
        ) : type === "system" ? (
          <div className="h-8 w-8 rounded-full bg-chatbot-system text-primary-foreground flex items-center justify-center text-sm font-medium">
            S
          </div>
        ) : (
          <div className="h-8 w-8 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center">
            <AlertCircle className="h-5 w-5" />
          </div>
        )}
      </div>
      <div className="flex-1 overflow-hidden">
        {isLoading ? (
          <div className="animate-pulse-slow">Loading response...</div>
        ) : (
          <div className="message-content">
            {content.split("\n").map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

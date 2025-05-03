
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled = false }: ChatInputProps) {
  const [input, setInput] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && input.trim()) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (input.trim()) {
      onSend(input.trim());
      setInput("");
    }
  };

  return (
    <div className="relative bg-white dark:bg-slate-900 rounded-lg shadow-xl border border-blue-100 dark:border-blue-800">
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask about your documents... (Press Enter to send)"
        className={cn(
          "w-full resize-none pr-14 focus-visible:ring-1 border-none shadow-none min-h-[80px] rounded-md",
          disabled && "opacity-60"
        )}
        rows={3}
        disabled={disabled}
      />
      <Button
        onClick={handleSend}
        size="icon"
        className="absolute right-3 bottom-3 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 hover:from-blue-600 hover:via-purple-600 hover:to-indigo-600 shadow-md rounded-full"
        disabled={disabled || !input.trim()}
      >
        <Send className="h-5 w-5" />
        <span className="sr-only">Send</span>
      </Button>
    </div>
  );
}

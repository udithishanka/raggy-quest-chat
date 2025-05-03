
import { FileText, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Document {
  id: string;
  name: string;
}

interface DocumentListProps {
  documents: Document[];
  onDeleteDocument: (id: string) => void;
}

export function DocumentList({ documents, onDeleteDocument }: DocumentListProps) {
  if (documents.length === 0) {
    return null;
  }

  return (
    <div className="rounded-lg border bg-card">
      <div className="p-4 border-b">
        <h3 className="text-lg font-medium">Knowledge Base Documents</h3>
      </div>
      <div className="p-2">
        {documents.map((doc) => (
          <div 
            key={doc.id} 
            className="flex items-center justify-between p-2 rounded-md hover:bg-accent group"
          >
            <div className="flex items-center space-x-3">
              <FileText className="h-5 w-5 text-blue-500" />
              <span className="text-sm font-medium">{doc.name}</span>
            </div>
            <Button 
              size="icon" 
              variant="ghost" 
              className="opacity-0 group-hover:opacity-100 transition-opacity" 
              onClick={() => onDeleteDocument(doc.id)}
            >
              <Trash className="h-4 w-4 text-muted-foreground" />
              <span className="sr-only">Delete document</span>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}


import { FileText, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
    return (
      <div className="text-center py-8 px-4">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4">
          <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="text-lg font-medium mb-2">No documents yet</h3>
        <p className="text-sm text-muted-foreground">
          Upload documents to get started with your knowledge base
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card overflow-hidden shadow-sm">
      <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-800/80">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Knowledge Base Documents</h3>
          <Badge variant="outline" className="bg-white/80 dark:bg-slate-900/80">
            {documents.length} {documents.length === 1 ? 'document' : 'documents'}
          </Badge>
        </div>
      </div>
      <div className="p-2">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between p-3 rounded-md hover:bg-accent group animate-fade-in"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-md bg-blue-50 dark:bg-blue-900/20">
                <FileText className="h-5 w-5 text-blue-500" />
              </div>
              <span className="text-sm font-medium">{doc.name}</span>
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30"
              onClick={() => onDeleteDocument(doc.id)}
            >
              <Trash className="h-4 w-4" />
              <span className="sr-only">Delete document</span>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

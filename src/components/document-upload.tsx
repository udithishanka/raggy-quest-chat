
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DocumentUploadProps {
  onUploadSuccess: (fileName: string) => void;
}

export function DocumentUpload({ onUploadSuccess }: DocumentUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const file = files[0];

    // In a real application, we would upload the file to the backend
    // For this demo, we'll simulate a successful upload after a delay
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success notification
      toast({
        title: "Document uploaded",
        description: `${file.name} has been successfully uploaded to the knowledge base.`,
      });
      
      onUploadSuccess(file.name);
    } catch (error) {
      console.error("Error uploading file:", error);
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: "There was an error uploading your document.",
      });
    } finally {
      setIsUploading(false);
      // Reset the input
      e.target.value = "";
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-6 border-2 border-dashed border-blue-300 dark:border-blue-800 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 transition-all hover:border-blue-400 dark:hover:border-blue-700">
      <FileText className="h-12 w-12 text-blue-500 dark:text-blue-400" />
      <div className="text-center">
        <h3 className="font-medium mb-1">Upload Documents</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Upload PDF, TXT, or DOCX files to enhance your RAG knowledge base
        </p>
        <div className="flex justify-center">
          <label htmlFor="file-upload">
            <Button 
              disabled={isUploading}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Upload className="mr-2 h-4 w-4" />
              {isUploading ? "Uploading..." : "Select Document"}
            </Button>
            <input
              id="file-upload"
              type="file"
              accept=".pdf,.txt,.docx"
              className="hidden"
              onChange={handleFileUpload}
              disabled={isUploading}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

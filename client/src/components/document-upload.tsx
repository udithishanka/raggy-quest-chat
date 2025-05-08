import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DocumentUploadProps {
  onUploadSuccess: (fileName: string) => void;
}

export function DocumentUpload({ onUploadSuccess }: DocumentUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    await processFile(files[0]);
    e.target.value = ""; // Reset input
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await processFile(e.dataTransfer.files[0]);
    }
  };

  const processFile = async (file: File) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://127.0.0.1:8000/upload-document", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      toast({
        title: "Document uploaded",
        description: data.message,
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
    }
  };

  return (
    <div
      className={`flex flex-col items-center space-y-4 p-8 border-2 border-dashed rounded-xl transition-all
        ${isDragging
          ? "border-blue-500 bg-blue-50/80 dark:bg-blue-900/20"
          : "border-blue-300 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20 hover:border-blue-400 dark:hover:border-blue-700"}`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragEnter={() => setIsDragging(true)}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <div
        className={`h-16 w-16 rounded-full flex items-center justify-center transition-all duration-300
        ${isDragging ? "bg-blue-200 dark:bg-blue-800 scale-110" : "bg-blue-100 dark:bg-blue-900/30"}`}
      >
        {isUploading ? (
          <svg
            className="animate-spin h-8 w-8 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          <FileText className="h-8 w-8 text-blue-500 dark:text-blue-400" />
        )}
      </div>
      <div className="text-center">
        <h3 className="font-semibold text-lg mb-1">Upload Documents</h3>
        <p className="text-sm text-muted-foreground mb-4">
          {isDragging
            ? "Drop file here to upload"
            : "Drag & drop files here or click to browse"}
        </p>
        <div className="flex flex-col items-center sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0 justify-center">
          <Button
            disabled={isUploading}
            onClick={() => fileInputRef.current?.click()}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md"
          >
            <Upload className="mr-2 h-4 w-4" />
            {isUploading ? "Uploading..." : "Select Document"}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.txt,.docx"
            className="hidden"
            onChange={handleFileUpload}
            disabled={isUploading}
          />
          <div className="text-sm text-muted-foreground">
            Supports: PDF, TXT, DOCX
          </div>
        </div>
      </div>
    </div>
  );
}

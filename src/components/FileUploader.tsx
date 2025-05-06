
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, File, X } from "lucide-react";
import { toast } from "sonner";

interface FileUploaderProps {
  onUpload: () => void;
}

export const FileUploader = ({ onUpload }: FileUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Check if file is PDF or other document type
    const validTypes = ["application/pdf", "text/plain", "application/msword", 
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    
    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a valid document file (PDF, TXT, DOC, DOCX)");
      return;
    }
    
    // Check file size (max 20MB)
    if (file.size > 20 * 1024 * 1024) {
      toast.error("File size exceeds 20MB limit");
      return;
    }
    
    setFile(file);
    onUpload();
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      {!file ? (
        <div
          className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-colors duration-200 ${
            isDragging 
              ? "bg-soft-purple/10 border-soft-purple" 
              : "border-border hover:border-soft-purple/50 hover:bg-card/50"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="p-4 bg-soft-purple/10 rounded-full">
              <Upload className="h-8 w-8 text-soft-purple" />
            </div>
            <div>
              <p className="text-lg font-medium">Drag and drop your file here</p>
              <p className="text-muted-foreground text-sm mt-1">or click to browse</p>
            </div>
            <p className="text-xs text-muted-foreground">
              Supports PDF, TXT, DOC, DOCX (max 20MB)
            </p>
          </div>
          <input
            type="file"
            className="hidden"
            accept=".pdf,.txt,.doc,.docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </div>
      ) : (
        <div className="flex items-center justify-between bg-card p-4 rounded-2xl border border-border">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-soft-purple/10 rounded-lg">
              <File className="h-5 w-5 text-soft-purple" />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate">{file.name}</p>
              <p className="text-xs text-muted-foreground">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={removeFile} className="text-muted-foreground">
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

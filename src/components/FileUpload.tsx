/**
 * Design Philosophy: Soft Minimalism
 * - Clean file upload interface with drag-and-drop support
 * - Soft indigo and mint accent colors
 * - Clear progress indication and file management
 */

import { useState, useRef } from "react";
import { Upload, X, File, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface UploadedFile {
  id: number;
  name: string;
  size: number;
  url: string;
  uploadedAt: string;
  description?: string;
}

interface FileUploadProps {
  onFileUpload?: (file: File) => Promise<void>;
  acceptedTypes?: string;
  maxSize?: number; // in bytes
}

export default function FileUpload({
  onFileUpload,
  acceptedTypes = ".pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx",
  maxSize = 50 * 1024 * 1024, // 50MB default
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.currentTarget.files || []);
    handleFiles(files);
  };

  const handleFiles = async (files: File[]) => {
    setError(null);

    for (const file of files) {
      // Validate file size
      if (file.size > maxSize) {
        setError(`파일 크기가 너무 큽니다: ${file.name} (최대 ${maxSize / 1024 / 1024}MB)`);
        continue;
      }

      // Validate file type
      const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
      if (!acceptedTypes.includes(fileExtension)) {
        setError(`지원하지 않는 파일 형식: ${file.name}`);
        continue;
      }

      // Upload file
      setIsUploading(true);
      try {
        if (onFileUpload) {
          await onFileUpload(file);
        }

        // Add to uploaded files list (mock - in real app, this would come from server)
        const newFile: UploadedFile = {
          id: Date.now(),
          name: file.name,
          size: file.size,
          url: URL.createObjectURL(file),
          uploadedAt: new Date().toLocaleString("ko-KR"),
        };
        setUploadedFiles((prev) => [newFile, ...prev]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "파일 업로드 실패");
      } finally {
        setIsUploading(false);
      }
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeFile = (id: number) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card className="border-2 border-dashed border-border/50 rounded-2xl overflow-hidden">
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "p-8 text-center transition-all duration-250",
            isDragging
              ? "bg-accent/10 border-accent"
              : "bg-muted/30 hover:bg-muted/50"
          )}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={acceptedTypes}
            onChange={handleFileInputChange}
            className="hidden"
            disabled={isUploading}
          />

          <Upload className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />

          <h3 className="text-lg font-semibold text-foreground mb-2" style={{ fontFamily: "var(--font-heading)" }}>
            파일을 여기로 드래그하세요
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            또는 아래 버튼을 클릭하여 파일을 선택하세요
          </p>

          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="bg-accent hover:bg-accent/90"
          >
            {isUploading ? "업로드 중..." : "파일 선택"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            지원 형식: PDF, DOC, DOCX, TXT, XLS, XLSX, PPT, PPTX (최대 50MB)
          </p>
        </div>
      </Card>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm">
          {error}
        </div>
      )}

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <Card className="rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-br from-accent/5 to-transparent pb-4">
            <CardTitle className="text-lg" style={{ fontFamily: "var(--font-heading)" }}>
              업로드된 파일 ({uploadedFiles.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-2">
              {uploadedFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <File className="h-5 w-5 text-accent flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(file.size)} • {file.uploadedAt}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        const a = document.createElement("a");
                        a.href = file.url;
                        a.download = file.name;
                        a.click();
                      }}
                      className="h-8 w-8"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFile(file.id)}
                      className="h-8 w-8 text-destructive hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

/**
 * Design Philosophy: Soft Minimalism
 * - File management interface with upload and download capabilities
 * - Clean, organized file listing
 * - Soft indigo and mint accent colors
 */

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FileUpload from "@/components/FileUpload";
import { Search, Upload } from "lucide-react";

interface FileItem {
  id: number;
  name: string;
  size: number;
  uploadedBy: string;
  uploadedAt: string;
  description?: string;
  url: string;
}

export default function FileManager() {
  const [searchQuery, setSearchQuery] = useState("");
  const [files, setFiles] = useState<FileItem[]>([
    {
      id: 1,
      name: "이벤트 준비 가이드.pdf",
      size: 2048576,
      uploadedBy: "관리자",
      uploadedAt: "2024-01-15",
      description: "이벤트 준비 단계별 가이드",
      url: "#",
    },
    {
      id: 2,
      name: "통계 분석 템플릿.xlsx",
      size: 1024000,
      uploadedBy: "운영팀",
      uploadedAt: "2024-01-14",
      description: "이벤트 통계 분석용 엑셀 템플릿",
      url: "#",
    },
  ]);

  const handleFileUpload = async (file: File) => {
    // 실제 구현에서는 서버에 파일을 업로드하고 응답을 받음
    console.log("파일 업로드:", file.name);
    
    // Mock: 파일을 목록에 추가
    const newFile: FileItem = {
      id: Date.now(),
      name: file.name,
      size: file.size,
      uploadedBy: "현재 사용자",
      uploadedAt: new Date().toLocaleDateString("ko-KR"),
      description: "",
      url: URL.createObjectURL(file),
    };
    setFiles((prev) => [newFile, ...prev]);
  };

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    file.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Upload className="h-8 w-8 text-accent" />
        <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
          파일 관리
        </h1>
      </div>

      {/* File Upload Section */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          새 파일 업로드
        </h2>
        <FileUpload onFileUpload={handleFileUpload} />
      </div>

      {/* File List Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
            업로드된 파일 ({filteredFiles.length})
          </h2>
        </div>

        {/* Search Bar */}
        <div className="mb-4 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="파일 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-muted/50 border-border focus:bg-background transition-colors"
          />
        </div>

        {/* Files Grid */}
        {filteredFiles.length > 0 ? (
          <div className="grid gap-4">
            {filteredFiles.map((file) => (
              <Card key={file.id} className="rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate mb-1">
                        {file.name}
                      </h3>
                      {file.description && (
                        <p className="text-sm text-muted-foreground mb-2">
                          {file.description}
                        </p>
                      )}
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{formatFileSize(file.size)}</span>
                        <span>•</span>
                        <span>{file.uploadedBy}</span>
                        <span>•</span>
                        <span>{file.uploadedAt}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const a = document.createElement("a");
                          a.href = file.url;
                          a.download = file.name;
                          a.click();
                        }}
                      >
                        다운로드
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="rounded-xl">
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">
                {searchQuery ? "검색 결과가 없습니다." : "아직 업로드된 파일이 없습니다."}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

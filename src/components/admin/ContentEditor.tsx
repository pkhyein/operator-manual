/**
 * Design Philosophy: Soft Minimalism
 * - Unified content editor supporting both HTML and plain text
 * - Easy image insertion
 * - Clean toolbar with mode switching
 */

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HtmlEditor from "./HtmlEditor";
import ImageUploader from "./ImageUploader";
import { Code2, FileText } from "lucide-react";

interface ContentEditorProps {
  value?: string;
  onChange?: (content: string) => void;
  onImagesSelected?: (files: any[]) => void;
  placeholder?: string;
}

export default function ContentEditor({
  value = "",
  onChange,
  onImagesSelected,
  placeholder = "콘텐츠를 작성하세요...",
}: ContentEditorProps) {
  const [editorMode, setEditorMode] = useState<"text" | "html">("text");
  const [selectedImages, setSelectedImages] = useState<any[]>([]);

  const handleImageSelect = (files: any[]) => {
    setSelectedImages(files);
    onImagesSelected?.(files);
  };

  return (
    <div className="space-y-4">
      {/* Mode Tabs */}
      <Tabs value={editorMode} onValueChange={(mode) => setEditorMode(mode as "text" | "html")}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="text" className="gap-2">
            <FileText className="h-4 w-4" />
            텍스트 편집
          </TabsTrigger>
          <TabsTrigger value="html" className="gap-2">
            <Code2 className="h-4 w-4" />
            HTML 편집
          </TabsTrigger>
        </TabsList>

        {/* Text Editor Tab */}
        <TabsContent value="text" className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              콘텐츠 작성
            </label>
            <Textarea
              placeholder={placeholder}
              value={value}
              onChange={(e) => onChange?.(e.target.value)}
              rows={8}
              className="bg-background border-border focus:border-accent resize-none font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">
              마크다운 형식 지원: **굵게**, *기울임*, - 목록, 1. 번호 목록
            </p>
          </div>

          {/* Image Uploader for Text Mode */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              이미지 추가
            </label>
            <ImageUploader
              onImagesSelected={handleImageSelect}
              maxFiles={10}
            />
          </div>

          {/* Selected Images Preview */}
          {selectedImages.length > 0 && (
            <Card className="rounded-lg bg-muted/30 border-border">
              <CardContent className="pt-4">
                <h4 className="text-sm font-medium text-foreground mb-3">
                  선택된 이미지 ({selectedImages.length})
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {selectedImages.map((img) => (
                    <div
                      key={img.id}
                      className="aspect-square rounded-lg overflow-hidden bg-background border border-border"
                    >
                      <img
                        src={img.preview}
                        alt={img.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* HTML Editor Tab */}
        <TabsContent value="html" className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              HTML 콘텐츠 작성
            </label>
            <HtmlEditor
              value={value}
              onChange={onChange}
              placeholder={placeholder}
            />
          </div>

          {/* Image Uploader for HTML Mode */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              이미지 추가
            </label>
            <ImageUploader
              onImagesSelected={handleImageSelect}
              maxFiles={10}
            />
          </div>

          {/* Selected Images Preview */}
          {selectedImages.length > 0 && (
            <Card className="rounded-lg bg-muted/30 border-border">
              <CardContent className="pt-4">
                <h4 className="text-sm font-medium text-foreground mb-3">
                  선택된 이미지 ({selectedImages.length})
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {selectedImages.map((img) => (
                    <div
                      key={img.id}
                      className="aspect-square rounded-lg overflow-hidden bg-background border border-border"
                    >
                      <img
                        src={img.preview}
                        alt={img.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Info Box */}
      <Card className="rounded-lg bg-accent/5 border-accent/20">
        <CardContent className="pt-4">
          <p className="text-sm text-foreground/80">
            <strong>팁:</strong> 텍스트 편집 모드에서는 마크다운 형식을 사용하고, HTML 편집 모드에서는 리치 텍스트 에디터를 사용할 수 있습니다. 두 모드 모두에서 이미지를 추가할 수 있습니다.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

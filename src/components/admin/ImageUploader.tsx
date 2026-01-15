/**
 * Design Philosophy: Soft Minimalism
 * - Image upload component for manual items
 * - Clean drag-and-drop interface
 * - Soft indigo and mint accent colors
 */

import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageFile {
  id: string;
  file: File;
  preview: string;
  name: string;
  size: number;
}

interface ImageUploaderProps {
  onImagesSelected?: (files: ImageFile[]) => void;
  maxFiles?: number;
  acceptedFormats?: string[];
}

export default function ImageUploader({
  onImagesSelected,
  maxFiles = 5,
  acceptedFormats = ["image/jpeg", "image/png", "image/webp", "image/gif"],
}: ImageUploaderProps) {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    setError(null);
    const newImages: ImageFile[] = [];

    Array.from(files).forEach((file) => {
      // 파일 형식 검증
      if (!acceptedFormats.includes(file.type)) {
        setError(`${file.name}은 지원하지 않는 형식입니다. (JPEG, PNG, WebP, GIF만 가능)`);
        return;
      }

      // 파일 크기 검증 (10MB 이하)
      if (file.size > 10 * 1024 * 1024) {
        setError(`${file.name}은 10MB 이하여야 합니다.`);
        return;
      }

      // 중복 검증
      if (images.some((img) => img.name === file.name)) {
        setError(`${file.name}은 이미 추가되었습니다.`);
        return;
      }

      // 최대 파일 수 검증
      if (images.length + newImages.length >= maxFiles) {
        setError(`최대 ${maxFiles}개의 이미지만 추가할 수 있습니다.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const preview = e.target?.result as string;
        newImages.push({
          id: `${Date.now()}-${Math.random()}`,
          file,
          preview,
          name: file.name,
          size: file.size,
        });

        if (newImages.length === Array.from(files).length) {
          const updatedImages = [...images, ...newImages];
          setImages(updatedImages);
          onImagesSelected?.(updatedImages);
        }
      };
      reader.readAsDataURL(file);
    });
  };

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
    handleFiles(e.dataTransfer.files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const removeImage = (id: string) => {
    const updatedImages = images.filter((img) => img.id !== id);
    setImages(updatedImages);
    onImagesSelected?.(updatedImages);
  };

  return (
    <div className="space-y-4">
      {/* Drag and Drop Area */}
      <Card
        className={cn(
          "rounded-xl border-2 border-dashed transition-all cursor-pointer",
          isDragging
            ? "border-accent bg-accent/5"
            : "border-border hover:border-accent/50 hover:bg-muted/30"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <CardContent className="p-8">
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="p-3 bg-accent/10 rounded-full">
              <Upload className="h-6 w-6 text-accent" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-foreground">이미지를 드래그하거나 클릭하여 업로드</p>
              <p className="text-sm text-muted-foreground mt-1">
                JPEG, PNG, WebP, GIF (최대 10MB, 최대 {maxFiles}개)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={acceptedFormats.join(",")}
        onChange={handleFileInput}
        className="hidden"
      />

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm">
          {error}
        </div>
      )}

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">
              선택된 이미지 ({images.length}/{maxFiles})
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {images.map((image) => (
              <div key={image.id} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden bg-muted border border-border">
                  <img
                    src={image.preview}
                    alt={image.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeImage(image.id)}
                  className="absolute top-1 right-1 p-1 bg-destructive/80 hover:bg-destructive rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-4 w-4 text-white" />
                </button>

                {/* File Info */}
                <div className="mt-1 text-xs text-muted-foreground truncate">
                  {image.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

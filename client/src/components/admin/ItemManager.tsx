/**
 * Design Philosophy: Soft Minimalism
 * - Item management interface
 * - Clean form and list display
 * - Soft indigo and mint accent colors
 */

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Edit2, Trash2, X, Check, Image as ImageIcon } from "lucide-react";
import ImageUploader from "./ImageUploader";
import HtmlEditor from "./HtmlEditor";

interface Item {
  id: number;
  categoryId: number;
  title: string;
  content: string;
  order: number;
  images?: any[];
}

interface Category {
  id: number;
  title: string;
}

interface ItemManagerProps {
  onRefresh?: () => void;
}

export default function ItemManager({ onRefresh }: ItemManagerProps) {
  const categories: Category[] = [
    { id: 1, title: "이벤트 준비" },
    { id: 2, title: "이벤트 통계" },
    { id: 3, title: "GTT Show" },
    { id: 4, title: "운영진 메뉴" },
  ];

  const [items, setItems] = useState<Item[]>([
    {
      id: 1,
      categoryId: 1,
      title: "이벤트 기획",
      content: "이벤트 기획 단계에서는 목표 설정, 타겟 고객 분석, 예산 수립 등을 진행합니다.",
      order: 0,
      images: [],
    },
    {
      id: 2,
      categoryId: 3,
      title: "티켓 시스템",
      content: "티켓 발권, 환불, 재발행 등 티켓 관련 전반적인 업무를 처리합니다.",
      order: 0,
      images: [],
    },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    categoryId: "",
    title: "",
    content: "",
  });
  const [selectedImages, setSelectedImages] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleAddClick = () => {
    setIsAdding(true);
    setFormData({ categoryId: "", title: "", content: "" });
    setSelectedImages([]);
    setError(null);
  };

  const handleEditClick = (item: Item) => {
    setEditingId(item.id);
    setFormData({
      categoryId: item.categoryId.toString(),
      title: item.title,
      content: item.content,
    });
    setSelectedImages(item.images || []);
    setError(null);
  };

  const handleSave = async () => {
    if (!formData.categoryId) {
      setError("카테고리를 선택해주세요.");
      return;
    }
    if (!formData.title.trim()) {
      setError("항목 제목은 필수입니다.");
      return;
    }
    if (!formData.content.trim()) {
      setError("항목 내용은 필수입니다.");
      return;
    }

    if (isAdding) {
      const newItem: Item = {
        id: Math.max(...items.map((i) => i.id), 0) + 1,
        categoryId: parseInt(formData.categoryId),
        title: formData.title,
        content: formData.content,
        order: items.filter((i) => i.categoryId === parseInt(formData.categoryId)).length,
        images: selectedImages,
      };
      setItems([...items, newItem]);
    } else if (editingId) {
      setItems(
        items.map((i) =>
          i.id === editingId
            ? {
                ...i,
                categoryId: parseInt(formData.categoryId),
                title: formData.title,
                content: formData.content,
                images: selectedImages,
              }
            : i
        )
      );
    }

    setIsAdding(false);
    setEditingId(null);
    setFormData({ categoryId: "", title: "", content: "" });
    setSelectedImages([]);
    setError(null);
    onRefresh?.();
  };

  const handleDelete = (id: number) => {
    if (confirm("이 항목을 삭제하시겠습니까?")) {
      setItems(items.filter((i) => i.id !== id));
      onRefresh?.();
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({ categoryId: "", title: "", content: "" });
    setSelectedImages([]);
    setError(null);
  };

  const getCategoryTitle = (categoryId: number) => {
    return categories.find((c) => c.id === categoryId)?.title || "알 수 없음";
  };

  return (
    <div className="space-y-6">
      {/* Add Form */}
      {(isAdding || editingId) && (
        <Card className="rounded-2xl overflow-hidden border-accent/20 bg-accent/5">
          <CardHeader className="bg-gradient-to-br from-accent/10 to-transparent pb-4">
            <CardTitle className="text-lg" style={{ fontFamily: "var(--font-heading)" }}>
              {isAdding ? "새 항목 추가" : "항목 수정"}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                카테고리 *
              </label>
              <Select
                value={formData.categoryId}
                onValueChange={(value) =>
                  setFormData({ ...formData, categoryId: value })
                }
              >
                <SelectTrigger className="bg-background border-border focus:border-accent">
                  <SelectValue placeholder="카테고리를 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      {category.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                항목 제목 *
              </label>
              <Input
                type="text"
                placeholder="예: 티켓 시스템"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="bg-background border-border focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                항목 내용 (HTML) *
              </label>
              <HtmlEditor
                value={formData.content}
                onChange={(html) => setFormData({ ...formData, content: html })}
                placeholder="항목에 대한 상세한 설명을 작성하세요"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                이미지 추가
              </label>
              <ImageUploader
                onImagesSelected={(files) => {
                  setSelectedImages(files);
                }}
                maxFiles={5}
              />
            </div>

            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm">
                {error}
              </div>
            )}

            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={handleCancel}
                className="gap-2"
              >
                <X className="h-4 w-4" />
                취소
              </Button>
              <Button
                onClick={handleSave}
                className="bg-accent hover:bg-accent/90 gap-2"
              >
                <Check className="h-4 w-4" />
                저장
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Items List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
            항목 목록 ({items.length})
          </h2>
          {!isAdding && !editingId && (
            <Button
              onClick={handleAddClick}
              className="bg-accent hover:bg-accent/90 gap-2"
            >
              <Plus className="h-4 w-4" />
              새 항목
            </Button>
          )}
        </div>

        {items.length > 0 ? (
          <div className="grid gap-3">
            {items.map((item) => (
              <Card key={item.id} className="rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="inline-block px-2 py-1 text-xs font-medium bg-accent/10 text-accent rounded-md">
                          {getCategoryTitle(item.categoryId)}
                        </span>
                        {item.images && item.images.length > 0 && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-md">
                            <ImageIcon className="h-3 w-3" />
                            {item.images.length}개
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold text-foreground truncate mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {item.content}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditClick(item)}
                        className="h-8 w-8 text-accent hover:text-accent hover:bg-accent/10"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(item.id)}
                        className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
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
                아직 항목이 없습니다. 새 항목을 추가해주세요.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

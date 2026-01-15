/**
 * Design Philosophy: Soft Minimalism
 * - Category management interface
 * - Clean form and list display
 * - Soft indigo and mint accent colors
 */

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit2, Trash2, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Category {
  id: number;
  title: string;
  description?: string;
  order: number;
}

interface CategoryManagerProps {
  onRefresh?: () => void;
}

export default function CategoryManager({ onRefresh }: CategoryManagerProps) {
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, title: "이벤트 준비", description: "이벤트 준비 단계별 가이드", order: 0 },
    { id: 2, title: "이벤트 통계", description: "이벤트 통계 분석 방법", order: 1 },
    { id: 3, title: "GTT Show", description: "GTT Show 운영 가이드", order: 2 },
    { id: 4, title: "운영진 메뉴", description: "운영진 메뉴 관리", order: 3 },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [error, setError] = useState<string | null>(null);

  const handleAddClick = () => {
    setIsAdding(true);
    setFormData({ title: "", description: "" });
    setError(null);
  };

  const handleEditClick = (category: Category) => {
    setEditingId(category.id);
    setFormData({ title: category.title, description: category.description || "" });
    setError(null);
  };

  const handleSave = async () => {
    if (!formData.title.trim()) {
      setError("카테고리 이름은 필수입니다.");
      return;
    }

    if (isAdding) {
      // Create new category
      const newCategory: Category = {
        id: Math.max(...categories.map((c) => c.id), 0) + 1,
        title: formData.title,
        description: formData.description || undefined,
        order: categories.length,
      };
      setCategories([...categories, newCategory]);
    } else if (editingId) {
      // Update existing category
      setCategories(
        categories.map((c) =>
          c.id === editingId
            ? { ...c, title: formData.title, description: formData.description || undefined }
            : c
        )
      );
    }

    setIsAdding(false);
    setEditingId(null);
    setFormData({ title: "", description: "" });
    setError(null);
    onRefresh?.();
  };

  const handleDelete = (id: number) => {
    if (confirm("이 카테고리를 삭제하시겠습니까? 하위 항목도 함께 삭제됩니다.")) {
      setCategories(categories.filter((c) => c.id !== id));
      onRefresh?.();
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({ title: "", description: "" });
    setError(null);
  };

  return (
    <div className="space-y-6">
      {/* Add Form */}
      {(isAdding || editingId) && (
        <Card className="rounded-2xl overflow-hidden border-accent/20 bg-accent/5">
          <CardHeader className="bg-gradient-to-br from-accent/10 to-transparent pb-4">
            <CardTitle className="text-lg" style={{ fontFamily: "var(--font-heading)" }}>
              {isAdding ? "새 카테고리 추가" : "카테고리 수정"}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                카테고리 이름 *
              </label>
              <Input
                type="text"
                placeholder="예: 이벤트 준비"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="bg-background border-border focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                설명
              </label>
              <Textarea
                placeholder="카테고리에 대한 간단한 설명을 입력하세요"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="bg-background border-border focus:border-accent resize-none"
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

      {/* Categories List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
            카테고리 목록 ({categories.length})
          </h2>
          {!isAdding && !editingId && (
            <Button
              onClick={handleAddClick}
              className="bg-accent hover:bg-accent/90 gap-2"
            >
              <Plus className="h-4 w-4" />
              새 카테고리
            </Button>
          )}
        </div>

        {categories.length > 0 ? (
          <div className="grid gap-3">
            {categories.map((category) => (
              <Card key={category.id} className="rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate mb-1">
                        {category.title}
                      </h3>
                      {category.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {category.description}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditClick(category)}
                        className="h-8 w-8 text-accent hover:text-accent hover:bg-accent/10"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(category.id)}
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
                아직 카테고리가 없습니다. 새 카테고리를 추가해주세요.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

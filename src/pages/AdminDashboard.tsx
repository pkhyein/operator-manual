/**
 * Design Philosophy: Soft Minimalism
 * - Admin dashboard for managing manual content
 * - Clean, organized interface for CRUD operations
 * - Soft indigo and mint accent colors
 */

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, BookOpen } from "lucide-react";
import CategoryManager from "@/components/admin/CategoryManager";
import ItemManager from "@/components/admin/ItemManager";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("categories");
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Settings className="h-8 w-8 text-accent" />
            <h1 className="text-4xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
              관리자 대시보드
            </h1>
          </div>
          <p className="text-muted-foreground">
            매뉴얼 콘텐츠를 관리하고 카테고리 및 항목을 추가, 수정, 삭제할 수 있습니다.
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-muted/50 p-1 rounded-lg">
            <TabsTrigger
              value="categories"
              className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md transition-all"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              카테고리 관리
            </TabsTrigger>
            <TabsTrigger
              value="items"
              className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md transition-all"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              항목 관리
            </TabsTrigger>
          </TabsList>

          {/* Categories Tab */}
          <TabsContent value="categories" className="space-y-6">
            <CategoryManager key={`categories-${refreshKey}`} onRefresh={handleRefresh} />
          </TabsContent>

          {/* Items Tab */}
          <TabsContent value="items" className="space-y-6">
            <ItemManager key={`items-${refreshKey}`} onRefresh={handleRefresh} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

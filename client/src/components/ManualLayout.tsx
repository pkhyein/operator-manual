/**
 * Design Philosophy: Soft Minimalism
 * - Floating sidebar with subtle shadow and rounded corners
 * - Generous spacing for visual comfort
 * - Soft indigo and mint accent colors
 */

import { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { manualData, type MenuItem } from "@/data/manualData";
import { cn } from "@/lib/utils";

interface ManualLayoutProps {
  children: React.ReactNode;
  currentSection: string;
  onSectionChange: (sectionId: string) => void;
  user?: any;
  isAuthenticated?: boolean;
  logout?: () => void;
}

export default function ManualLayout({
  children,
  currentSection,
  onSectionChange,
}: ManualLayoutProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedMenus, setExpandedMenus] = useState<string[]>(["event-preparation"]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = (menuId: string) => {
    setExpandedMenus((prev) =>
      prev.includes(menuId)
        ? prev.filter((id) => id !== menuId)
        : [...prev, menuId]
    );
  };

  const filteredData = manualData.filter((menu) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      menu.title.toLowerCase().includes(query) ||
      menu.items?.some((item) =>
        item.title.toLowerCase().includes(query) ||
        item.content.toLowerCase().includes(query)
      )
    );
  });

  const SidebarContent = () => (
    <>
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: "var(--font-heading)" }}>
          운영자 매뉴얼
        </h1>
        <p className="text-sm text-muted-foreground">플랫폼 운영 가이드</p>
      </div>

      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-muted/50 border-border focus:bg-background transition-colors"
          />
        </div>
      </div>

      <ScrollArea className="flex-1 px-3">
        <nav className="space-y-1 pb-4">
          {filteredData.map((menu) => (
            <div key={menu.id} className="mb-2">
              <button
                onClick={() => toggleMenu(menu.id)}
                className={cn(
                  "w-full text-left px-3 py-2.5 rounded-lg transition-all duration-250",
                  "hover:bg-sidebar-accent/50 flex items-center justify-between group",
                  expandedMenus.includes(menu.id) && "bg-sidebar-accent text-sidebar-accent-foreground"
                )}
                style={{ fontFamily: "var(--font-label)" }}
              >
                <span className="font-semibold text-sm">{menu.title}</span>
                <svg
                  className={cn(
                    "w-4 h-4 transition-transform duration-250",
                    expandedMenus.includes(menu.id) && "rotate-180"
                  )}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {expandedMenus.includes(menu.id) && menu.items && (
                <div className="mt-1 ml-3 space-y-0.5 animate-in fade-in slide-in-from-top-2 duration-300">
                  {menu.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSectionChange(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-250",
                        "hover:bg-sidebar-accent/30 hover:translate-x-1",
                        currentSection === item.id
                          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                          : "text-sidebar-foreground/80"
                      )}
                    >
                      {item.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </ScrollArea>
    </>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-card border-b border-border px-4 py-3 flex items-center justify-between shadow-sm">
        <h1 className="text-lg font-bold" style={{ fontFamily: "var(--font-heading)" }}>
          운영자 매뉴얼
        </h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50 animate-in fade-in duration-200"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          "lg:hidden fixed top-16 left-0 bottom-0 z-40 w-80 bg-sidebar border-r border-sidebar-border",
          "flex flex-col transition-transform duration-300",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <SidebarContent />
      </aside>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed top-0 left-8 bottom-8 w-80 bg-sidebar border border-sidebar-border rounded-2xl shadow-lg flex-col my-8 overflow-hidden">
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <main className="lg:ml-96 pt-20 lg:pt-8 px-4 lg:px-8 pb-16">
        <div className="max-w-3xl">
          {children}
        </div>
      </main>
    </div>
  );
}

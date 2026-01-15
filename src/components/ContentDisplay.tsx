/**
 * Design Philosophy: Soft Minimalism
 * - Clean typography with generous line height
 * - Subtle card design with soft shadows
 * - Markdown-style content rendering
 */

import { manualData } from "@/data/manualData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import HtmlContent from "./HtmlContent";

interface ContentDisplayProps {
  sectionId: string;
}

export default function ContentDisplay({ sectionId }: ContentDisplayProps) {
  // Find the content for the current section
  let currentContent = null;
  let currentTitle = "";
  let categoryTitle = "";

  for (const menu of manualData) {
    const item = menu.items?.find((i) => i.id === sectionId);
    if (item) {
      currentContent = item.content;
      currentTitle = item.title;
      categoryTitle = menu.title;
      break;
    }
  }

  if (!currentContent) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-muted-foreground text-lg">콘텐츠를 선택해주세요</p>
      </div>
    );
  }

  // Check if content is HTML (contains HTML tags)
  const isHtml = /<[^>]*>/.test(currentContent);

  // Parse markdown-style content (fallback for plain text)
  const renderContent = (content: string) => {
    const lines = content.split("\n");
    const elements: React.ReactElement[] = [];
    let currentList: string[] = [];
    let key = 0;

    const flushList = () => {
      if (currentList.length > 0) {
        elements.push(
          <ul key={`list-${key++}`} className="space-y-2 my-4 ml-6">
            {currentList.map((item, idx) => (
              <li key={idx} className="text-foreground/90 leading-relaxed relative before:content-['•'] before:absolute before:-left-4 before:text-accent">
                {item}
              </li>
            ))}
          </ul>
        );
        currentList = [];
      }
    };

    lines.forEach((line, idx) => {
      const trimmed = line.trim();

      if (!trimmed) {
        flushList();
        return;
      }

      // Bold text (markdown **text**)
      if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
        flushList();
        const text = trimmed.slice(2, -2);
        elements.push(
          <h3 key={`bold-${idx}`} className="text-lg font-semibold text-foreground mt-6 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
            {text}
          </h3>
        );
        return;
      }

      // List items
      if (trimmed.startsWith("-")) {
        currentList.push(trimmed.slice(1).trim());
        return;
      }

      // Numbered list
      if (/^\d+\./.test(trimmed)) {
        flushList();
        const text = trimmed.replace(/^\d+\.\s*/, "");
        currentList.push(text);
        return;
      }

      // Regular paragraph
      flushList();
      if (trimmed) {
        elements.push(
          <p key={`p-${idx}`} className="text-foreground/90 leading-relaxed mb-4">
            {trimmed}
          </p>
        );
      }
    });

    flushList();
    return elements;
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <span>{categoryTitle}</span>
        <span>/</span>
        <span className="text-foreground font-medium">{currentTitle}</span>
      </div>

      {/* Main Content Card */}
      <Card className="shadow-md border-border/50 rounded-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-br from-accent/5 to-transparent pb-6">
          <CardTitle className="text-3xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
            {currentTitle}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-8 pb-10 px-8">
          {isHtml ? (
            <HtmlContent html={currentContent} className="prose prose-slate max-w-none" />
          ) : (
            <div className="prose prose-slate max-w-none">
              {renderContent(currentContent)}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bottom spacing */}
      <div className="h-20" />
    </div>
  );
}

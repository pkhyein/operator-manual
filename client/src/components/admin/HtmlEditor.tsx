/**
 * Design Philosophy: Soft Minimalism
 * - Rich HTML editor for manual content
 * - Clean toolbar with essential formatting options
 * - Soft indigo and mint accent colors
 */

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Code,
  Link as LinkIcon,
  Image as ImageIcon,
  Undo2,
  Redo2,
} from "lucide-react";
import "./HtmlEditor.css";

interface HtmlEditorProps {
  value?: string;
  onChange?: (html: string) => void;
  placeholder?: string;
}

export default function HtmlEditor({
  value = "",
  onChange,
  placeholder = "콘텐츠를 작성하세요...",
}: HtmlEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Link.configure({
        openOnClick: false,
      }),
      Image,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableCell,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  const addLink = () => {
    const url = prompt("URL을 입력하세요:");
    if (url) {
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }
  };

  const addImage = () => {
    const url = prompt("이미지 URL을 입력하세요:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="space-y-2">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-3 bg-muted/50 rounded-lg border border-border">
        {/* Text Formatting */}
        <div className="flex gap-1 border-r border-border pr-2">
          <Button
            size="icon"
            variant={editor.isActive("bold") ? "default" : "ghost"}
            onClick={() => editor.chain().focus().toggleBold().run()}
            className="h-8 w-8"
            title="굵게 (Ctrl+B)"
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant={editor.isActive("italic") ? "default" : "ghost"}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className="h-8 w-8"
            title="기울임 (Ctrl+I)"
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant={editor.isActive("strike") ? "default" : "ghost"}
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className="h-8 w-8"
            title="취소선"
          >
            <Strikethrough className="h-4 w-4" />
          </Button>
        </div>

        {/* Headings */}
        <div className="flex gap-1 border-r border-border pr-2">
          <Button
            size="icon"
            variant={editor.isActive("heading", { level: 1 }) ? "default" : "ghost"}
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className="h-8 w-8 text-xs"
            title="제목 1"
          >
            <Heading1 className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant={editor.isActive("heading", { level: 2 }) ? "default" : "ghost"}
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className="h-8 w-8 text-xs"
            title="제목 2"
          >
            <Heading2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Lists */}
        <div className="flex gap-1 border-r border-border pr-2">
          <Button
            size="icon"
            variant={editor.isActive("bulletList") ? "default" : "ghost"}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className="h-8 w-8"
            title="글머리 기호"
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant={editor.isActive("orderedList") ? "default" : "ghost"}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className="h-8 w-8"
            title="번호 목록"
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
        </div>

        {/* Block Elements */}
        <div className="flex gap-1 border-r border-border pr-2">
          <Button
            size="icon"
            variant={editor.isActive("blockquote") ? "default" : "ghost"}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className="h-8 w-8"
            title="인용"
          >
            <Quote className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant={editor.isActive("codeBlock") ? "default" : "ghost"}
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className="h-8 w-8"
            title="코드 블록"
          >
            <Code className="h-4 w-4" />
          </Button>
        </div>

        {/* Media */}
        <div className="flex gap-1 border-r border-border pr-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={addLink}
            className="h-8 w-8"
            title="링크 추가"
          >
            <LinkIcon className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={addImage}
            className="h-8 w-8"
            title="이미지 추가"
          >
            <ImageIcon className="h-4 w-4" />
          </Button>
        </div>

        {/* History */}
        <div className="flex gap-1">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="h-8 w-8"
            title="실행 취소"
          >
            <Undo2 className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="h-8 w-8"
            title="다시 실행"
          >
            <Redo2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div className="border border-border rounded-lg overflow-hidden bg-background">
        <EditorContent
          editor={editor}
          className="prose prose-sm max-w-none p-4 focus:outline-none"
          style={{
            minHeight: "300px",
          }}
        />
      </div>

      {/* Character Count */}
      <div className="text-xs text-muted-foreground">
        {editor.storage.characterCount?.characters() || 0} 글자
      </div>
    </div>
  );
}

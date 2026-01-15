/**
 * Design Philosophy: Soft Minimalism
 * - Safe HTML content renderer
 * - Sanitized output to prevent XSS attacks
 * - Styled for consistent presentation
 */

import DOMPurify from "dompurify";
import "./HtmlContent.css";

interface HtmlContentProps {
  html: string;
  className?: string;
}

export default function HtmlContent({ html, className = "" }: HtmlContentProps) {
  // Sanitize HTML to prevent XSS attacks
  const sanitizedHtml = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      "p",
      "br",
      "strong",
      "em",
      "u",
      "s",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "ul",
      "ol",
      "li",
      "blockquote",
      "pre",
      "code",
      "a",
      "img",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
      "hr",
    ],
    ALLOWED_ATTR: ["href", "src", "alt", "title", "target", "rel"],
    KEEP_CONTENT: true,
  });

  return (
    <div
      className={`html-content ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}

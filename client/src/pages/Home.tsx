/**
 * Design Philosophy: Soft Minimalism
 * - Soft indigo and light mint colors for calm, modern feel
 * - Floating sidebar with generous spacing
 * - Round corners and subtle shadows for depth
 */

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import ManualLayout from "@/components/ManualLayout";
import ContentDisplay from "@/components/ContentDisplay";

export default function Home() {
  const { user, loading, error, isAuthenticated, logout } = useAuth();
  const [currentSection, setCurrentSection] = useState("event-planning");

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">로딩 중...</div>;
  }

  return (
    <ManualLayout
      currentSection={currentSection}
      onSectionChange={setCurrentSection}
      user={user}
      isAuthenticated={isAuthenticated}
      logout={logout}
    >
      <ContentDisplay sectionId={currentSection} />
    </ManualLayout>
  );
}

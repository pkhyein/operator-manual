/**
 * Design Philosophy: Soft Minimalism
 * - Soft indigo and light mint colors for calm, modern feel
 * - Floating sidebar with generous spacing
 * - Round corners and subtle shadows for depth
 */

import { useState } from "react";
import ManualLayout from "@/components/ManualLayout";
import ContentDisplay from "@/components/ContentDisplay";

export default function Home() {
  const [currentSection, setCurrentSection] = useState("event-planning");

  return (
    <ManualLayout
      currentSection={currentSection}
      onSectionChange={setCurrentSection}
    >
      <ContentDisplay sectionId={currentSection} />
    </ManualLayout>
  );
}

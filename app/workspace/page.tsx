import type { Metadata } from "next";
import { Workspace } from "@/components/workspace/Workspace";

export const metadata: Metadata = {
  title: "Workspace",
  description:
    "Paste a patient record, review the structured profile, and screen recruiting trials criterion by criterion.",
};

export default function WorkspacePage() {
  return <Workspace />;
}

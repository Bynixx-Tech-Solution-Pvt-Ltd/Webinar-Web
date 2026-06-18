/**
 * STUDENT CONTENT ROUTE - /student/content
 */

import { createFileRoute } from "@tanstack/react-router";
import { StudentContentPage } from "@/pages/student/StudentContentPage";

export const Route = createFileRoute("/student/content")({
  component: StudentContentPage,
  head: () => ({
    meta: [
      { title: "Learning Content - Bynixx Pathways" },
      { name: "description", content: "Interactive learning content and code editor" },
    ],
  }),
});

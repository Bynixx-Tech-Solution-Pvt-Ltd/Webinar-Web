/**
 * STUDENT COMMUNITY ROUTE - /student/community
 */

import { createFileRoute } from "@tanstack/react-router";
import { StudentCommunityPage } from "@/pages/student/StudentCommunityPage";

export const Route = createFileRoute("/student/community")({
  component: StudentCommunityPage,
  head: () => ({
    meta: [
      { title: "Community - Bynixx Pathways" },
      { name: "description", content: "Engage with other learners, ask questions, and share projects" },
    ],
  }),
});

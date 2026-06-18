/**
 * STUDENT ROADMAP ROUTE - /student/roadmap
 */

import { createFileRoute } from "@tanstack/react-router";
import { StudentRoadmapPage } from "@/pages/student/StudentRoadmapPage";

export const Route = createFileRoute("/student/roadmap")({
  component: StudentRoadmapPage,
  head: () => ({
    meta: [
      { title: "Learning Roadmap - Bynixx Pathways" },
      { name: "description", content: "Your personalized learning roadmap" },
    ],
  }),
});

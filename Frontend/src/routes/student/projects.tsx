/**
 * STUDENT PROJECTS ROUTE - /student/projects
 */

import { createFileRoute } from "@tanstack/react-router";
import { StudentProjectsPage } from "@/pages/student/StudentProjectsPage";

export const Route = createFileRoute("/student/projects")({
  component: StudentProjectsPage,
  head: () => ({
    meta: [
      { title: "Projects - Bynixx Pathways" },
      { name: "description", content: "Work on capstone and module projects to build your portfolio" },
    ],
  }),
});

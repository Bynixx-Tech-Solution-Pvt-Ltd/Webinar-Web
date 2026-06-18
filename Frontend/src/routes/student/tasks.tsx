/**
 * STUDENT TASKS ROUTE - /student/tasks
 */

import { createFileRoute } from "@tanstack/react-router";
import { StudentTasksPage } from "@/pages/student/StudentTasksPage";

export const Route = createFileRoute("/student/tasks")({
  component: StudentTasksPage,
  head: () => ({
    meta: [
      { title: "Tasks & Submissions - Bynixx Pathways" },
      { name: "description", content: "View and submit your assigned tasks" },
    ],
  }),
});

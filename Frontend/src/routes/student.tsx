/**
 * STUDENT DASHBOARD ROUTE - /student
 * Placeholder student dashboard
 */

import { createFileRoute } from "@tanstack/react-router";
import { StudentDashboardPage } from "@/pages/student/StudentDashboardPage";

export const Route = createFileRoute("/student")({
  component: StudentDashboardPage,
  head: () => ({
    meta: [
      { title: "Student Dashboard - Bynixx Pathways" },
      { name: "description", content: "Your student dashboard" },
    ],
  }),
});

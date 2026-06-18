/**
 * STUDENT SESSIONS ROUTE - /student/sessions
 */

import { createFileRoute } from "@tanstack/react-router";
import { StudentSessionsPage } from "@/pages/student/StudentSessionsPage";

export const Route = createFileRoute("/student/sessions")({
  component: StudentSessionsPage,
  head: () => ({
    meta: [
      { title: "Live Sessions - Bynixx Pathways" },
      { name: "description", content: "Join live sessions with your mentors" },
    ],
  }),
});

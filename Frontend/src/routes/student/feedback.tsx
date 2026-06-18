/**
 * STUDENT FEEDBACK ROUTE - /student/feedback
 */

import { createFileRoute } from "@tanstack/react-router";
import { StudentFeedbackPage } from "@/pages/student/StudentFeedbackPage";

export const Route = createFileRoute("/student/feedback")({
  component: StudentFeedbackPage,
  head: () => ({
    meta: [
      { title: "Mentor Support - Bynixx Pathways" },
      { name: "description", content: "Get feedback, ask questions, and connect with mentors" },
    ],
  }),
});

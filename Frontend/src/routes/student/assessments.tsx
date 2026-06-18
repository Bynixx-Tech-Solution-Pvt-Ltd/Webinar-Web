/**
 * STUDENT ASSESSMENTS ROUTE - /student/assessments
 */

import { createFileRoute } from "@tanstack/react-router";
import { StudentAssessmentsPage } from "@/pages/student/StudentAssessmentsPage";

export const Route = createFileRoute("/student/assessments")({
  component: StudentAssessmentsPage,
  head: () => ({
    meta: [
      { title: "Assessments - Bynixx Pathways" },
      { name: "description", content: "Take assessments and track your scores" },
    ],
  }),
});

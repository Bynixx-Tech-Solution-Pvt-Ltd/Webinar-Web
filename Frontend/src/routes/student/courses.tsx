/**
 * STUDENT COURSES ROUTE - /student/courses
 */

import { createFileRoute } from "@tanstack/react-router";
import { StudentCoursesPage } from "@/pages/student/StudentCoursesPage";

export const Route = createFileRoute("/student/courses")({
  component: StudentCoursesPage,
  head: () => ({
    meta: [
      { title: "My Courses - Bynixx Pathways" },
      { name: "description", content: "Your enrolled and recommended courses" },
    ],
  }),
});

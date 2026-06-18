/**
 * STUDENT SETTINGS ROUTE - /student/settings
 */

import { createFileRoute } from "@tanstack/react-router";
import { StudentProfilePage } from "@/pages/student/StudentProfilePage";

export const Route = createFileRoute("/student/settings")({
  component: StudentProfilePage,
  head: () => ({
    meta: [
      { title: "Profile Settings - Bynixx Pathways" },
      { name: "description", content: "Manage your profile, learning preferences, and account settings" },
    ],
  }),
});

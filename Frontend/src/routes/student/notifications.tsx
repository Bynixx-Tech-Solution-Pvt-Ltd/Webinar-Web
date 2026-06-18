/**
 * STUDENT NOTIFICATIONS ROUTE - /student/notifications
 */

import { createFileRoute } from "@tanstack/react-router";
import { StudentNotificationsPage } from "@/pages/student/StudentNotificationsPage";

export const Route = createFileRoute("/student/notifications")({
  component: StudentNotificationsPage,
  head: () => ({
    meta: [
      { title: "Notifications - Bynixx Pathways" },
      { name: "description", content: "Stay updated with recent activities and announcements" },
    ],
  }),
});

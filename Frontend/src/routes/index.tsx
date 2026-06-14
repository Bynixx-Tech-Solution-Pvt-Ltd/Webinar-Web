/**
 * HOME PAGE ROUTE (index.tsx)
 * This is the "/"  - the landing page/home page
 * The filename "index.tsx" is special - DO NOT rename it
 * It renders the HomePage component
 */

import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/pages/HomePage";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "Bynixx — Structured Learning, Mentor-Guided Growth" },
      {
        name: "description",
        content:
          "Bynixx is a roadmap-based learning platform with mentor-validated tasks, live sessions, and verified certificates.",
      },
    ],
  }),
});

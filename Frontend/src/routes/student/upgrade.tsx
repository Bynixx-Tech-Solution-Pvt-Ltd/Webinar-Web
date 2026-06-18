/**
 * STUDENT UPGRADE ROUTE - /student/upgrade
 */

import { createFileRoute } from "@tanstack/react-router";
import { StudentUpgradePage } from "@/pages/student/StudentUpgradePage";

export const Route = createFileRoute("/student/upgrade")({
  component: StudentUpgradePage,
  head: () => ({
    meta: [
      { title: "Upgrade Plan - Bynixx Pathways" },
      { name: "description", content: "Upgrade your account to unlock premium features and live sessions" },
    ],
  }),
});

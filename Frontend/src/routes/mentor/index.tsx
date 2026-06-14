/**
 * MENTOR DASHBOARD HOME ROUTE (index.tsx)
 * This is the "/mentor/" route - the mentor home/dashboard page
 * It's wrapped inside the MentorLayout
 * The filename "index.tsx" is special - DO NOT rename it
 */

import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage as MentorDashboard } from "@/pages/mentor/DashboardPage";

export const Route = createFileRoute("/mentor/")({ component: MentorDashboard });

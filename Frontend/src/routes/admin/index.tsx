/**
 * ADMIN DASHBOARD HOME ROUTE (index.tsx)
 * This is the "/admin/" route - the admin home/dashboard page
 * It's wrapped inside the AdminLayout
 * The filename "index.tsx" is special - DO NOT rename it
 */

import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage as AdminDashboard } from "@/pages/admin/DashboardPage";

export const Route = createFileRoute("/admin/")({ component: AdminDashboard });

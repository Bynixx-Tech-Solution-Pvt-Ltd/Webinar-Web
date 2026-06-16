/**
 * ADMIN DASHBOARD HOME ROUTE (index.tsx)
 * This is the "/admin/" route - the admin home/dashboard page
 * It's wrapped inside the AdminLayout
 * The filename "index.tsx" is special - DO NOT rename it
 */

import { createFileRoute, redirect } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";
import { DashboardPage as AdminDashboard } from "@/pages/admin/DashboardPage";

export const Route = createFileRoute("/admin/")({
  component: AdminRoot,
});

function AdminRoot() {
  const { user } = useAuth();
  if (!user || user.role !== "admin") {
    // redirect unauthenticated or non-admin users to admin login
    throw redirect({ to: "/admin/login" });
  }
  return <AdminDashboard />;
}

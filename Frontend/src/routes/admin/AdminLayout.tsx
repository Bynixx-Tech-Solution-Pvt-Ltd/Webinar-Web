/**
 * Admin Portal Layout
 * Wraps all admin dashboard pages with navigation and sidebar
 */
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { LayoutDashboard, BookOpen, Users, Video, UserCog, BarChart3, Settings } from "lucide-react";
import { DashboardShell, type NavItem } from "@/components/dashboard-shell";

const nav: NavItem[] = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/courses", label: "Courses", icon: BookOpen },
  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/mentors", label: "Mentors", icon: UserCog },
  { to: "/admin/sessions", label: "Live Sessions", icon: Video },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export const Route = createFileRoute("/admin/AdminLayout")({
  component: () => (
    <DashboardShell brand="Bynixx" brandSubtitle="Admin Console" nav={nav}>
      <Outlet />
    </DashboardShell>
  ),
  head: () => ({ meta: [{ title: "Admin · Bynixx" }] }),
});

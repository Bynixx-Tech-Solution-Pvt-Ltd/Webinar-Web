/**
 * Mentor Portal Layout
 * Wraps all mentor dashboard pages with navigation and sidebar
 */
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { LayoutDashboard, Video, ClipboardCheck, MessageSquare, FileText, Users } from "lucide-react";
import { DashboardShell, type NavItem } from "@/components/dashboard-shell";

const nav: NavItem[] = [
  { to: "/mentor", label: "Dashboard", icon: LayoutDashboard },
  { to: "/mentor/classes", label: "Live Classes", icon: Video },
  { to: "/mentor/reviews", label: "Task Reviews", icon: ClipboardCheck },
  { to: "/mentor/queries", label: "Chat Queries", icon: MessageSquare },
  { to: "/mentor/tests", label: "Tests", icon: FileText },
  { to: "/mentor/students", label: "Students", icon: Users },
];

export const Route = createFileRoute("/mentor/MentorLayout")({
  component: () => (
    <DashboardShell brand="Bynixx" brandSubtitle="Mentor Portal" nav={nav}>
      <Outlet />
    </DashboardShell>
  ),
  head: () => ({ meta: [{ title: "Mentor · Bynixx" }] }),
});

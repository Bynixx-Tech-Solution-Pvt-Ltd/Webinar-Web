import { createFileRoute } from "@tanstack/react-router";
import { AdminDashboard } from "@/pages/admin/AdminDashboard";

export const Route = createFileRoute("/admin/certificates")({
  component: AdminDashboard,
  head: () => ({ meta: [{ title: "Certificates · Bynixx" }] }),
});

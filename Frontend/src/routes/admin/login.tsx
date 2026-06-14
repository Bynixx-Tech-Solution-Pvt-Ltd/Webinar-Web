/**
 * ADMIN LOGIN ROUTE - /admin/login
 * Admin panel login page
 */

import { createFileRoute } from "@tanstack/react-router";
import { AdminLoginPage } from "@/pages/auth/AdminLoginPage";

export const Route = createFileRoute("/admin/login")({
  component: AdminLoginPage,
  head: () => ({
    meta: [
      { title: "Admin Login - Bynixx Admin Panel" },
      { name: "description", content: "Sign in to Bynixx Admin Console" },
    ],
  }),
});

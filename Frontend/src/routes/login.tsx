/**
 * LOGIN ROUTE - /login
 * Student & Mentor login page
 */

import { createFileRoute } from "@tanstack/react-router";
import { LoginPage } from "@/pages/auth/LoginPage";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({
    meta: [
      { title: "Login - Bynixx Pathways" },
      { name: "description", content: "Sign in to your Bynixx Pathways account" },
    ],
  }),
});

import { createFileRoute } from "@tanstack/react-router";
import { SessionsPage } from "@/pages/admin/SessionsPage";

export const Route = createFileRoute("/admin/sessions")({ component: SessionsPage });

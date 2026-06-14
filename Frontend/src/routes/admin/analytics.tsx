import { createFileRoute } from "@tanstack/react-router";
import { AnalyticsPage } from "@/pages/admin/AnalyticsPage";

export const Route = createFileRoute("/admin/analytics")({ component: AnalyticsPage });

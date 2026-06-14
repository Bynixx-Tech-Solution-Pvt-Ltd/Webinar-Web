import { createFileRoute } from "@tanstack/react-router";
import { QueriesPage } from "@/pages/mentor/QueriesPage";

export const Route = createFileRoute("/mentor/queries")({ component: QueriesPage });

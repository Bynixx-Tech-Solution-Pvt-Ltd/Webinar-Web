import { createFileRoute } from "@tanstack/react-router";
import { TestsPage } from "@/pages/mentor/TestsPage";

export const Route = createFileRoute("/mentor/tests")({ component: TestsPage });

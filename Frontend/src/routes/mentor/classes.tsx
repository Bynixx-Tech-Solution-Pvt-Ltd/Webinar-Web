import { createFileRoute } from "@tanstack/react-router";
import { ClassesPage } from "@/pages/mentor/ClassesPage";

export const Route = createFileRoute("/mentor/classes")({ component: ClassesPage });

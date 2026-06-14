import { createFileRoute } from "@tanstack/react-router";
import { StudentsPage } from "@/pages/mentor/StudentsPage";

export const Route = createFileRoute("/mentor/students")({ component: StudentsPage });

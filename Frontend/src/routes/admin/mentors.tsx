import { createFileRoute } from "@tanstack/react-router";
import { MentorsPage } from "@/pages/admin/MentorsPage";

export const Route = createFileRoute("/admin/mentors")({ component: MentorsPage });

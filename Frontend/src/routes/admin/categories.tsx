import { createFileRoute } from "@tanstack/react-router";
import { CoursesPage } from "@/pages/admin/CoursesPage";

export const Route = createFileRoute("/admin/categories")({
  component: CoursesPage,
  head: () => ({ meta: [{ title: "Categories · Bynixx" }] }),
});

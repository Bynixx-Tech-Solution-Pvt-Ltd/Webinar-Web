import { createFileRoute, Outlet } from "@tanstack/react-router";
import { StudentLayout } from "@/pages/student/StudentLayout";

export const Route = createFileRoute("/student")({
  component: () => (
    <StudentLayout>
      <Outlet />
    </StudentLayout>
  ),
});

import { PageHeader } from "@/components/dashboard-shell";
import { Button } from "@/components/ui/button";
import { FileCode } from "lucide-react";

const submissions = [
  { student: "Aarav Sharma", task: "Build a Todo App with Hooks", submitted: "2h ago", status: "Pending" },
  { student: "Priya Nair", task: "Pandas DataFrame Exercises", submitted: "5h ago", status: "Pending" },
  { student: "Rohit Verma", task: "Dockerize Express API", submitted: "1d ago", status: "Pending" },
  { student: "Sneha Iyer", task: "Wireframe Audit", submitted: "1d ago", status: "Revision" },
];

export function ReviewsPage() {
  return (
    <>
      <PageHeader title="Task Reviews" subtitle="Validate student submissions" />
      <div className="grid gap-3">
        {submissions.map((s) => (
          <div key={s.student + s.task} className="rounded-xl border border-border bg-card p-5 flex items-center gap-4">
            <div className="h-10 w-10 rounded-lg bg-accent text-accent-foreground flex items-center justify-center">
              <FileCode className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-foreground">{s.task}</div>
              <div className="text-sm text-muted-foreground">by {s.student} · {s.submitted}</div>
            </div>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
              s.status === "Pending" ? "bg-accent text-accent-foreground" : "bg-secondary text-secondary-foreground"
            }`}>{s.status}</span>
            <Button size="sm" variant="outline">Reject</Button>
            <Button size="sm">Approve</Button>
          </div>
        ))}
      </div>
    </>
  );
}

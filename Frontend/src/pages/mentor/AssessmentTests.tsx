import { PageHeader } from "@/components/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Plus, FileText } from "lucide-react";

const tests = [
  { title: "React Hooks Quiz", questions: 20, attempts: 132, avg: "78%", status: "Active" },
  { title: "JavaScript Fundamentals", questions: 30, attempts: 240, avg: "82%", status: "Active" },
  { title: "State Management MCQ", questions: 15, attempts: 0, avg: "—", status: "Draft" },
];

export function TestsPage() {
  return (
    <>
      <PageHeader
        title="Tests & Reviews"
        subtitle="Create assessments and review attempts"
        action={<Button><Plus className="h-4 w-4" /> New Test</Button>}
      />
      <div className="grid gap-3">
        {tests.map((t) => (
          <div key={t.title} className="rounded-xl border border-border bg-card p-5 flex items-center gap-4">
            <div className="h-10 w-10 rounded-lg bg-accent text-accent-foreground flex items-center justify-center">
              <FileText className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-foreground">{t.title}</div>
              <div className="text-sm text-muted-foreground">{t.questions} questions · {t.attempts} attempts · Avg {t.avg}</div>
            </div>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
              t.status === "Active" ? "bg-accent text-accent-foreground" : "bg-secondary text-secondary-foreground"
            }`}>{t.status}</span>
            <Button variant="outline" size="sm">View Attempts</Button>
          </div>
        ))}
      </div>
    </>
  );
}

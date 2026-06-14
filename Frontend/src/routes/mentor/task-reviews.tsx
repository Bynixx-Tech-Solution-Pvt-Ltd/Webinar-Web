import { createFileRoute } from "@tanstack/react-router";
import { Shell, Card, PageHeader, Chip, Avatar, Btn } from "@/components/mentor/Shell";
import { ClipboardCheck, Clock, CheckCircle2, XCircle, MessageSquare, Download, FileText } from "lucide-react";

export const Route = createFileRoute("/mentor/task-reviews")({
  head: () => ({
    meta: [
      { title: "Task Reviews — Bynixx Mentor Portal" },
      { name: "description", content: "Review student task submissions, approve or request resubmission with feedback." },
    ],
  }),
  component: TaskReviewsPage,
});

const tasks = [
  { id: "T-1042", student: "Karthik S", course: "AI Engineering", task: "Build a sentiment classifier", submitted: "2h ago", priority: "High", tone: "red" as const, status: "Pending" },
  { id: "T-1041", student: "Priya N", course: "Cybersecurity", task: "Nmap reconnaissance report", submitted: "5h ago", priority: "Medium", tone: "amber" as const, status: "Pending" },
  { id: "T-1040", student: "Arun Kumar", course: "Full Stack Web Dev", task: "Auth flow with JWT", submitted: "6h ago", priority: "High", tone: "red" as const, status: "Pending" },
  { id: "T-1039", student: "Sneha R", course: "Prompt Engineering", task: "Chain-of-thought prompt set", submitted: "1d ago", priority: "Low", tone: "blue" as const, status: "Pending" },
  { id: "T-1038", student: "Vivek M", course: "Data Science", task: "Exploratory data analysis", submitted: "1d ago", priority: "Medium", tone: "amber" as const, status: "Pending" },
];

const summary = [
  { icon: Clock, label: "Pending Reviews", value: "32", tint: "chip-amber" },
  { icon: CheckCircle2, label: "Approved Today", value: "18", tint: "chip-green" },
  { icon: XCircle, label: "Resubmissions", value: "6", tint: "chip-red" },
  { icon: ClipboardCheck, label: "Avg. Review Time", value: "8 hrs", tint: "chip-violet" },
];

function TaskReviewsPage() {
  return (
    <Shell>
      <PageHeader title="Task Reviews" subtitle="Review, approve and provide feedback on student submissions." />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summary.map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-2xl p-5">
            <div className={`grid h-11 w-11 place-items-center rounded-xl bg-${s.tint}/15 text-${s.tint} mb-3`}>
              <s.icon size={20} />
            </div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
            <div className="text-2xl font-bold mt-1">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2" title="Submission Queue" action={
          <div className="flex gap-2">
            {["All", "Pending", "Approved", "Rejected"].map((t, i) => (
              <button key={t} className={`text-xs px-2.5 py-1 rounded-md ${i === 1 ? "bg-brand text-brand-foreground" : "border border-border"}`}>{t}</button>
            ))}
          </div>
        }>
          <div className="divide-y divide-border">
            {tasks.map((t) => (
              <div key={t.id} className="py-4 flex flex-wrap items-center gap-4">
                <Avatar name={t.student} />
                <div className="flex-1 min-w-[200px]">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="font-mono">{t.id}</span>
                    <span>•</span>
                    <span>{t.course}</span>
                  </div>
                  <div className="text-sm font-semibold mt-0.5">{t.task}</div>
                  <div className="text-xs text-muted-foreground">{t.student} · submitted {t.submitted}</div>
                </div>
                <Chip tone={t.tone}>{t.priority}</Chip>
                <div className="flex gap-2">
                  <Btn variant="outline">View</Btn>
                  <Btn>Review</Btn>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Active Review">
          <div className="flex items-center gap-3 mb-4">
            <Avatar name="Karthik S" />
            <div>
              <div className="text-sm font-semibold">Karthik S</div>
              <div className="text-xs text-muted-foreground">AI Engineering · T-1042</div>
            </div>
          </div>
          <h4 className="font-semibold text-sm">Build a sentiment classifier</h4>
          <p className="text-xs text-muted-foreground mt-1">Train a text classifier on the IMDB dataset and report accuracy / F1.</p>
          <div className="mt-4 space-y-2">
            {[
              { name: "classifier.ipynb", size: "1.2 MB" },
              { name: "report.pdf", size: "342 KB" },
              { name: "model.pkl", size: "4.8 MB" },
            ].map((f) => (
              <div key={f.name} className="flex items-center gap-3 p-2.5 rounded-lg border border-border text-sm">
                <FileText size={16} className="text-muted-foreground" />
                <div className="flex-1 min-w-0 truncate">{f.name}</div>
                <span className="text-xs text-muted-foreground">{f.size}</span>
                <button className="grid h-7 w-7 place-items-center rounded-md hover:bg-muted"><Download size={14} /></button>
              </div>
            ))}
          </div>
          <textarea
            className="w-full mt-4 p-3 rounded-lg border border-border bg-muted/40 outline-none text-sm resize-none"
            rows={4}
            placeholder="Write feedback for the student…"
          />
          <div className="flex items-center gap-2 mt-3">
            <Btn className="flex-1"><CheckCircle2 size={14} className="inline mr-1" /> Approve</Btn>
            <Btn variant="outline" className="flex-1"><XCircle size={14} className="inline mr-1" /> Request Resubmit</Btn>
          </div>
          <button className="w-full mt-2 text-xs text-brand font-semibold flex items-center justify-center gap-1">
            <MessageSquare size={12} /> Message student
          </button>
        </Card>
      </div>
    </Shell>
  );
}

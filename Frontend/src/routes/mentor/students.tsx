import { createFileRoute } from "@tanstack/react-router";
import { Shell, Card, PageHeader, Chip, Avatar, Btn } from "@/components/mentor/Shell";
import { Search, Filter, Plus, Eye, MessageSquare, MoreVertical, Users, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/mentor/students")({
  head: () => ({
    meta: [
      { title: "Students — Bynixx Mentor Portal" },
      { name: "description", content: "View and manage your assigned students, progress and engagement." },
    ],
  }),
  component: StudentsPage,
});

const rows = [
  { name: "Karthik S", email: "karthik.s@bynixx.com", course: "AI Engineering", progress: 75, tasks: "18/24", last: "2h ago", status: "Active", tone: "green" as const },
  { name: "Priya N", email: "priya.n@bynixx.com", course: "Cybersecurity", progress: 62, tasks: "15/24", last: "5h ago", status: "Active", tone: "green" as const },
  { name: "Arun Kumar", email: "arun.k@bynixx.com", course: "Full Stack Web Dev", progress: 90, tasks: "22/24", last: "1h ago", status: "Review Pending", tone: "amber" as const },
  { name: "Sneha R", email: "sneha.r@bynixx.com", course: "Prompt Engineering", progress: 45, tasks: "11/24", last: "3d ago", status: "At Risk", tone: "red" as const },
  { name: "Vivek M", email: "vivek.m@bynixx.com", course: "Data Science", progress: 80, tasks: "19/24", last: "1h ago", status: "Active", tone: "green" as const },
  { name: "Anita Rao", email: "anita.r@bynixx.com", course: "AI Engineering", progress: 55, tasks: "13/24", last: "6h ago", status: "Active", tone: "green" as const },
  { name: "Rohan Mehta", email: "rohan.m@bynixx.com", course: "Cybersecurity", progress: 38, tasks: "9/24", last: "5d ago", status: "Inactive", tone: "amber" as const },
  { name: "Divya P", email: "divya.p@bynixx.com", course: "Data Science", progress: 95, tasks: "23/24", last: "30m ago", status: "Active", tone: "green" as const },
];

const summary = [
  { icon: Users, label: "Total Students", value: "120", tint: "chip-violet" },
  { icon: CheckCircle2, label: "Active Learners", value: "92", tint: "chip-green" },
  { icon: AlertTriangle, label: "At Risk", value: "12", tint: "chip-red" },
  { icon: TrendingUp, label: "Avg. Progress", value: "68%", tint: "chip-blue" },
];

function StudentsPage() {
  return (
    <Shell>
      <PageHeader
        title="Students"
        subtitle="Manage and monitor your assigned learners."
        action={<Btn><Plus size={14} className="inline mr-1" /> Add Student</Btn>}
      />
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

      <Card>
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <input className="w-full pl-9 pr-3 py-2 rounded-lg bg-muted/60 outline-none text-sm" placeholder="Search students by name or email" />
          </div>
          <select className="text-sm border border-border rounded-lg px-3 py-2 bg-card">
            <option>All Courses</option><option>AI Engineering</option><option>Cybersecurity</option><option>Data Science</option>
          </select>
          <select className="text-sm border border-border rounded-lg px-3 py-2 bg-card">
            <option>All Status</option><option>Active</option><option>At Risk</option><option>Inactive</option>
          </select>
          <button className="grid h-9 w-9 place-items-center rounded-lg border border-border hover:bg-muted"><Filter size={16} /></button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-muted-foreground border-b border-border">
                <th className="text-left font-medium py-2">Student</th>
                <th className="text-left font-medium py-2">Course</th>
                <th className="text-left font-medium py-2">Progress</th>
                <th className="text-left font-medium py-2">Tasks</th>
                <th className="text-left font-medium py-2">Last Active</th>
                <th className="text-left font-medium py-2">Status</th>
                <th className="text-left font-medium py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.email} className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={r.name} />
                      <div>
                        <div className="font-medium">{r.name}</div>
                        <div className="text-xs text-muted-foreground">{r.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 text-muted-foreground">{r.course}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2 min-w-[120px]">
                      <span className="text-xs font-semibold w-9">{r.progress}%</span>
                      <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                        <div className="h-full rounded-full bg-brand" style={{ width: `${r.progress}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="py-3 text-muted-foreground">{r.tasks}</td>
                  <td className="py-3 text-muted-foreground">{r.last}</td>
                  <td className="py-3"><Chip tone={r.tone}>{r.status}</Chip></td>
                  <td className="py-3">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <button className="grid h-7 w-7 place-items-center rounded-md hover:bg-muted"><Eye size={14} /></button>
                      <button className="grid h-7 w-7 place-items-center rounded-md hover:bg-muted"><MessageSquare size={14} /></button>
                      <button className="grid h-7 w-7 place-items-center rounded-md hover:bg-muted"><MoreVertical size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
          <span>Showing 1–8 of 120 students</span>
          <div className="flex items-center gap-1">
            <button className="px-2 py-1 rounded border border-border">Previous</button>
            <button className="px-2 py-1 rounded bg-brand text-brand-foreground">1</button>
            <button className="px-2 py-1 rounded border border-border">2</button>
            <button className="px-2 py-1 rounded border border-border">3</button>
            <button className="px-2 py-1 rounded border border-border">Next</button>
          </div>
        </div>
      </Card>
    </Shell>
  );
}

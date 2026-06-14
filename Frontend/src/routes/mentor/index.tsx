/**
 * MENTOR DASHBOARD HOME ROUTE (index.tsx)
 * This is the "/mentor/" route - the mentor home/dashboard page.
 */

import { createFileRoute } from "@tanstack/react-router";
import {
  Users, ClipboardCheck, Video, FileText, FolderKanban,
  Eye, MessageSquare, MoreVertical, Star, TrendingUp,
  AlertTriangle, Clock, CalendarCheck, ArrowRight,
  FileEdit, CalendarPlus, FilePlus2, Send, BarChart, BadgeCheck,
} from "lucide-react";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell,
} from "recharts";
import { Shell, Card, PageHeader, Chip, Avatar } from "@/components/mentor/Shell";

export const Route = createFileRoute("/mentor/")({
  head: () => ({
    meta: [
      { title: "Bynixx Mentor Portal — Dashboard" },
      { name: "description", content: "Mentor dashboard for the Bynixx learning platform: students, task reviews, live sessions and analytics." },
    ],
  }),
  component: MentorDashboard,
});

const stats = [
  { icon: Users, label: "Assigned Students", value: "120", delta: "↗ 12 this month", tint: "chip-violet" },
  { icon: ClipboardCheck, label: "Pending Reviews", value: "32", delta: "↘ 5 from yesterday", tint: "chip-green", down: true },
  { icon: Video, label: "Live Sessions Today", value: "3", delta: "View today's schedule", tint: "chip-blue", link: true },
  { icon: TrendingUp, label: "Course Completion Rate", value: "78%", delta: "↗ 8% this month", tint: "chip-orange" },
  { icon: Star, label: "Average Rating", value: "4.8/5", delta: "From 85 reviews", tint: "chip-pink" },
];

const students = [
  { name: "Karthik S", course: "AI Engineering", progress: 75, status: "Active", tone: "green" as const },
  { name: "Priya N", course: "Cybersecurity", progress: 62, status: "Active", tone: "green" as const },
  { name: "Arun Kumar", course: "Full Stack Web Dev", progress: 90, status: "Review Pending", tone: "amber" as const },
  { name: "Sneha R", course: "Prompt Engineering", progress: 45, status: "At Risk", tone: "red" as const },
  { name: "Vivek M", course: "Data Science", progress: 80, status: "Active", tone: "green" as const },
];

const queueData = [
  { name: "AI Engineering", value: 12, color: "var(--chip-violet)" },
  { name: "Cybersecurity", value: 9, color: "var(--chip-green)" },
  { name: "Prompt Engineering", value: 11, color: "var(--chip-orange)" },
  { name: "Full Stack Web Dev", value: 0.001, color: "var(--chip-red)" },
  { name: "Data Science", value: 0.001, color: "var(--chip-blue)" },
];

const liveSessions = [
  { time: "10:00", suffix: "AM", title: "AI Engineering — Basics", students: 85, status: "Live Now", action: "Start / Join", live: true },
  { time: "02:00", suffix: "PM", title: "Git & GitLab Workflow", students: 72, status: "Upcoming", action: "View Details" },
  { time: "05:00", suffix: "PM", title: "Prompt Engineering 101", students: 60, status: "Upcoming", action: "View Details" },
];

const analyticsData = Array.from({ length: 20 }, (_, i) => ({
  day: `May ${i + 1}`,
  reviewed: 30 + Math.round(35 * Math.sin(i / 2.2) + 20 + (i % 4) * 3),
  approvals: 20 + Math.round(25 * Math.cos(i / 2.5) + 15 + (i % 5) * 2),
}));

const deadlines = [
  { icon: FileEdit, title: "Review: AI Engineering Assignment", meta: "5 Submissions", due: "Due in 6 hours", tint: "chip-violet" },
  { icon: FolderKanban, title: "Project Evaluation", meta: "AI Chatbot Project", due: "Due in 1 day", tint: "chip-blue" },
  { icon: ClipboardCheck, title: "Quiz Review", meta: "Cybersecurity Basics Quiz", due: "Due in 2 days", tint: "chip-green" },
  { icon: Video, title: "Live Session", meta: "AI Model Training Basics", due: "Due in 3 days", tint: "chip-orange" },
];

const insights = [
  { icon: AlertTriangle, text: "12 students at risk of falling behind", cta: "View Students", tint: "chip-red" },
  { icon: TrendingUp, text: "25 students need improvement in assignments", cta: "View Students", tint: "chip-violet" },
  { icon: Clock, text: "8 students have been inactive for 7+ days", cta: "View Students", tint: "chip-blue" },
  { icon: CalendarCheck, text: "Schedule 1-on-1 session with struggling students", cta: "Schedule Now", tint: "chip-green" },
];

const notifications = [
  { text: "New assignment submitted by Karthik S", time: "10 min ago" },
  { text: "Sneha R requested a resubmission", time: "45 min ago" },
  { text: "Live session completed: Git & GitLab", time: "2 hrs ago" },
  { text: "New review request for AI Engineering", time: "3 hrs ago" },
];

const quickActions = [
  { icon: FileText, label: "Review Submissions" },
  { icon: CalendarPlus, label: "Schedule Session" },
  { icon: FilePlus2, label: "Create Assessment" },
  { icon: Send, label: "Send Announcement" },
  { icon: BarChart, label: "View Reports" },
  { icon: BadgeCheck, label: "Approve Certificates" },
];

function IconBtn({ children }: { children: React.ReactNode }) {
  return <button className="grid h-7 w-7 place-items-center rounded-md hover:bg-muted text-muted-foreground">{children}</button>;
}

function Mini({ label, value, delta, up }: { label: string; value: string; delta: string; up?: boolean }) {
  return (
    <div>
      <div className="text-[10px] text-muted-foreground">{label}</div>
      <div className="text-sm font-bold mt-1">{value}</div>
      <div className={`text-[10px] mt-1 ${up ? "text-chip-green" : "text-chip-red"}`}>{delta}</div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="h-2 w-2 rounded-full" style={{ background: color }} />
      <span>{label}</span>
    </div>
  );
}

function MentorDashboard() {
  return (
    <Shell>
      <PageHeader title="Good Morning, Dr. Priya! 👋" subtitle="Here's what's happening with your students today." />

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-2xl p-5">
            <div className={`grid h-11 w-11 place-items-center rounded-xl bg-${s.tint}/15 text-${s.tint} mb-3`}>
              <s.icon size={20} />
            </div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
            <div className="text-2xl font-bold mt-1">{s.value}</div>
            <div className={`text-xs mt-2 ${s.link ? "text-brand" : s.down ? "text-chip-red" : "text-chip-green"}`}>{s.delta}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card title="Student Progress Overview" action="View All Students">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-muted-foreground border-b border-border">
                  <th className="text-left font-medium py-2">Student</th>
                  <th className="text-left font-medium py-2">Course</th>
                  <th className="text-left font-medium py-2">Progress</th>
                  <th className="text-left font-medium py-2">Status</th>
                  <th className="text-left font-medium py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s.name} className="border-b border-border last:border-0">
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <Avatar name={s.name} />
                        <span className="font-medium">{s.name}</span>
                      </div>
                    </td>
                    <td className="py-3 text-muted-foreground">{s.course}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2 min-w-[110px]">
                        <span className="text-xs font-semibold w-9">{s.progress}%</span>
                        <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                          <div className="h-full rounded-full bg-brand" style={{ width: `${s.progress}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="py-3"><Chip tone={s.tone}>{s.status}</Chip></td>
                    <td className="py-3">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <IconBtn><Eye size={14} /></IconBtn>
                        <IconBtn><MessageSquare size={14} /></IconBtn>
                        <IconBtn><MoreVertical size={14} /></IconBtn>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="Task Review Queue" action="View All">
          <div className="flex items-center justify-center my-2">
            <div className="relative">
              <ResponsiveContainer width={180} height={180}>
                <PieChart>
                  <Pie data={queueData} dataKey="value" innerRadius={55} outerRadius={80} paddingAngle={2} stroke="none">
                    {queueData.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 grid place-items-center text-center">
                <div>
                  <div className="text-2xl font-bold">32</div>
                  <div className="text-xs text-muted-foreground">Pending</div>
                </div>
              </div>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            {queueData.map((q) => (
              <li key={q.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: q.color }} />
                  <span>{q.name}</span>
                </div>
                <span className="font-semibold">{q.value < 1 ? 0 : q.value}</span>
              </li>
            ))}
          </ul>
          <button className="mt-4 w-full flex items-center justify-center gap-2 rounded-xl bg-brand text-brand-foreground py-3 text-sm font-semibold hover:opacity-90">
            Review Now <ArrowRight size={14} />
          </button>
        </Card>

        <Card title="Today's Live Sessions" action="View Calendar">
          <div className="space-y-3">
            {liveSessions.map((s) => (
              <div key={s.title} className="flex items-center gap-3 p-3 rounded-xl border border-border">
                <div className="text-center w-14 shrink-0">
                  <div className="text-lg font-bold leading-none">{s.time}</div>
                  <div className="text-[10px] text-muted-foreground">{s.suffix}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold truncate">{s.title}</div>
                  <div className="text-xs text-muted-foreground">{s.students} Students</div>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                    s.live ? "bg-chip-red/15 text-chip-red" : "bg-chip-amber/15 text-chip-amber"
                  }`}>{s.status}</span>
                  <button className={`text-[11px] font-semibold px-2.5 py-1 rounded-md ${
                    s.live ? "bg-brand text-brand-foreground" : "border border-border hover:bg-muted"
                  }`}>{s.action}</button>
                </div>
              </div>
            ))}
          </div>
          <a className="block mt-4 text-xs text-brand font-semibold">View All Sessions →</a>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card title="Mentor Analytics" action={
          <select className="text-xs border border-border rounded-md px-2 py-1 bg-card">
            <option>This Month</option><option>Last Month</option>
          </select>
        }>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            <Mini label="Tasks Reviewed" value="125" delta="↗ 18%" up />
            <Mini label="Avg. Response Time" value="8 hrs" delta="↘ 10%" />
            <Mini label="Approval Rate" value="87%" delta="↗ 6%" up />
            <Mini label="Students Rating" value="4.8/5" delta="↗ 0.2" up />
          </div>
          <div className="flex items-center gap-4 text-xs mb-1">
            <Legend color="var(--chip-violet)" label="Tasks Reviewed" />
            <Legend color="var(--chip-green)" label="Approvals" />
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={analyticsData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} interval={3} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12, border: "1px solid var(--border)" }} />
              <Line type="monotone" dataKey="reviewed" stroke="var(--chip-violet)" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="approvals" stroke="var(--chip-green)" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Upcoming Deadlines" action="View All">
          <div className="space-y-3">
            {deadlines.map((d) => (
              <div key={d.title} className="flex items-start gap-3 p-3 rounded-xl hover:bg-muted/40">
                <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-${d.tint}/15 text-${d.tint}`}>
                  <d.icon size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold truncate">{d.title}</div>
                  <div className="text-xs text-muted-foreground">{d.meta}</div>
                </div>
                <div className="text-xs text-chip-red font-medium shrink-0">{d.due}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="AI Mentor Insights" action="View Insights">
          <div className="space-y-3">
            {insights.map((i) => (
              <div key={i.text} className="flex items-start gap-3 p-3 rounded-xl border border-border">
                <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-${i.tint}/15 text-${i.tint}`}>
                  <i.icon size={16} />
                </div>
                <div className="flex-1 text-sm">{i.text}</div>
                <button className="text-xs text-brand font-semibold whitespace-nowrap">{i.cta}</button>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card title="Recent Notifications" action="View All">
        <div className="divide-y divide-border">
          {notifications.map((n) => (
            <div key={n.text} className="py-3 flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-brand" />
              <div className="flex-1 text-sm">{n.text}</div>
              <div className="text-xs text-muted-foreground">{n.time}</div>
            </div>
          ))}
        </div>
      </Card>

      <div>
        <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickActions.map((q) => (
            <button key={q.label} className="bg-card border border-border rounded-2xl p-5 flex flex-col items-center gap-2 hover:border-brand hover:shadow-sm transition">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand/10 text-brand">
                <q.icon size={18} />
              </div>
              <div className="text-xs font-medium text-center">{q.label}</div>
            </button>
          ))}
        </div>
      </div>
    </Shell>
  );
}

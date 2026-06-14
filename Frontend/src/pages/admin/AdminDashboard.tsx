import { Users, BookOpen, Video, Award, TrendingUp } from "lucide-react";
import { PageHeader, StatCard } from "@/components/dashboard-shell";

export function AdminDashboard() {
  return (
    <>
      <PageHeader title="Admin Dashboard" subtitle="Overview of the Bynixx platform" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Students" value="12,480" hint="+8.2% this month" icon={Users} />
        <StatCard label="Active Courses" value="48" hint="6 published this week" icon={BookOpen} />
        <StatCard label="Live Sessions" value="124" hint="32 scheduled" icon={Video} />
        <StatCard label="Certificates Issued" value="3,210" hint="Lifetime" icon={Award} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold text-foreground mb-4">Recent Enrollments</h3>
          <ul className="space-y-3 text-sm">
            {[
              { name: "Aarav Sharma", course: "Full-Stack Web Dev", time: "2m ago" },
              { name: "Priya Nair", course: "Data Science Pro", time: "12m ago" },
              { name: "Rohit Verma", course: "DevOps Mastery", time: "1h ago" },
              { name: "Sneha Iyer", course: "UI/UX Roadmap", time: "3h ago" },
            ].map((e) => (
              <li key={e.name} className="flex items-center justify-between border-b border-border last:border-0 pb-2 last:pb-0">
                <div>
                  <div className="font-medium text-foreground">{e.name}</div>
                  <div className="text-muted-foreground text-xs">{e.course}</div>
                </div>
                <span className="text-xs text-muted-foreground">{e.time}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" /> Platform Health
          </h3>
          <div className="space-y-4">
            {[
              { label: "Completion Rate", value: 95 },
              { label: "Mentor Response < 24h", value: 88 },
              { label: "Active Daily Users", value: 72 },
            ].map((m) => (
              <div key={m.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">{m.label}</span>
                  <span className="font-medium">{m.value}%</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${m.value}%`, background: "var(--gradient-primary)" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

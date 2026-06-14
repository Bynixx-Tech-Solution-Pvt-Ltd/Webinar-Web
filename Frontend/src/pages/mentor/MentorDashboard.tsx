import { Link } from "@tanstack/react-router";
import { PageHeader, StatCard } from "@/components/dashboard-shell";
import { Users, ClipboardCheck, Video, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MentorDashboard() {
  return (
    <>
      <PageHeader title="Welcome back, Anil 👋" subtitle="Here's your day at a glance" />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="Assigned Students" value="312" hint="Across 3 courses" icon={Users} />
        <StatCard label="Pending Reviews" value="18" hint="Avg. 4h response" icon={ClipboardCheck} />
        <StatCard label="Upcoming Classes" value="4" hint="This week" icon={Video} />
        <StatCard label="Open Queries" value="7" hint="2 unread" icon={MessageSquare} />
      </div>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold text-foreground mb-4">Today's Schedule</h3>
          <ul className="space-y-3">
            {[
              { time: "11:00", title: "Review: React Hooks task batch" },
              { time: "14:00", title: "1:1 Mentoring — Priya Nair" },
              { time: "18:00", title: "Live class: React Hooks Deep Dive" },
            ].map((e) => (
              <li key={e.time} className="flex items-center gap-4 border-b border-border last:border-0 pb-3 last:pb-0">
                <span className="text-sm font-mono text-primary font-semibold w-12">{e.time}</span>
                <span className="text-sm text-foreground flex-1">{e.title}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl p-6 text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
          <h3 className="font-semibold mb-2">Next Live Class</h3>
          <p className="text-2xl font-bold mb-1">React Hooks Deep Dive</p>
          <p className="text-sm opacity-90 mb-4">Today · 6:00 PM · 142 registered</p>
          <Button asChild variant="secondary"><Link to="/mentor/classes">Start Class</Link></Button>
        </div>
      </div>
    </>
  );
}

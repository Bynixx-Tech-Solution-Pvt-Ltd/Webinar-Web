import { Plus, Video, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/dashboard-shell";

const sessions = [
  { title: "React Hooks Deep Dive", mentor: "Anil Kumar", when: "Today · 6:00 PM", status: "Live", attendees: 142 },
  { title: "Pandas for Data Analysis", mentor: "Meera Joshi", when: "Tomorrow · 5:00 PM", status: "Scheduled", attendees: 88 },
  { title: "Docker Essentials", mentor: "Rahul Mehta", when: "May 27 · 7:00 PM", status: "Scheduled", attendees: 64 },
  { title: "Design Systems 101", mentor: "Kavya Reddy", when: "May 24 · 6:30 PM", status: "Completed", attendees: 120 },
];

export function SessionsPage() {
  return (
    <>
      <PageHeader
        title="Live Sessions"
        subtitle="Schedule and manage Zoom-powered classes"
        action={<Button><Plus className="h-4 w-4" /> Schedule Session</Button>}
      />
      <div className="grid gap-4">
        {sessions.map((s) => (
          <div key={s.title} className="rounded-xl border border-border bg-card p-5 flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-accent text-accent-foreground flex items-center justify-center">
              <Video className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-foreground">{s.title}</div>
              <div className="text-sm text-muted-foreground">{s.mentor}</div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" /> {s.when}
            </div>
            <div className="text-sm text-muted-foreground">{s.attendees} attendees</div>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
              s.status === "Live" ? "bg-destructive text-destructive-foreground" :
              s.status === "Scheduled" ? "bg-accent text-accent-foreground" : "bg-secondary text-secondary-foreground"
            }`}>{s.status}</span>
          </div>
        ))}
      </div>
    </>
  );
}

import { PageHeader } from "@/components/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Video, Calendar, Users } from "lucide-react";

const classes = [
  { title: "React Hooks Deep Dive", when: "Today · 6:00 PM", registered: 142, status: "Live" },
  { title: "State Management Patterns", when: "May 27 · 6:00 PM", registered: 98, status: "Upcoming" },
  { title: "Testing React Apps", when: "May 30 · 6:00 PM", registered: 76, status: "Upcoming" },
  { title: "Component Architecture", when: "May 20 · 6:00 PM", registered: 120, status: "Completed" },
];

export function ClassesPage() {
  return (
    <>
      <PageHeader title="Live Classes" subtitle="Host and attend your scheduled sessions" />
      <div className="grid gap-4">
        {classes.map((c) => (
          <div key={c.title} className="rounded-xl border border-border bg-card p-5 flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-accent text-accent-foreground flex items-center justify-center">
              <Video className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-foreground">{c.title}</div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {c.when}</span>
                <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {c.registered}</span>
              </div>
            </div>
            {c.status === "Live" ? (
              <Button>Join Now</Button>
            ) : c.status === "Upcoming" ? (
              <Button variant="outline">Start Class</Button>
            ) : (
              <Button variant="ghost">View Recording</Button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

import { PageHeader } from "@/components/dashboard-shell";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const threads = [
  { id: "1", student: "Aarav Sharma", last: "Why is useEffect running twice in dev?", unread: true, time: "2m" },
  { id: "2", student: "Priya Nair", last: "Can you check this DataFrame merge?", unread: true, time: "20m" },
  { id: "3", student: "Rohit Verma", last: "Docker compose volume issue", unread: false, time: "1h" },
  { id: "4", student: "Sneha Iyer", last: "Thanks for the feedback!", unread: false, time: "3h" },
];

export function QueriesPage() {
  const [active, setActive] = useState(threads[0]);
  return (
    <>
      <PageHeader title="Chat Queries" subtitle="Respond to student questions" />
      <div className="grid lg:grid-cols-3 gap-4 h-[600px]">
        <div className="rounded-xl border border-border bg-card overflow-y-auto">
          {threads.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t)}
              className={`w-full text-left p-4 border-b border-border hover:bg-accent/50 transition-colors ${active.id === t.id ? "bg-accent/50" : ""}`}
            >
              <div className="flex justify-between items-start">
                <span className="font-medium text-foreground">{t.student}</span>
                <span className="text-xs text-muted-foreground">{t.time}</span>
              </div>
              <div className="text-sm text-muted-foreground mt-1 line-clamp-1">{t.last}</div>
              {t.unread && <span className="inline-block mt-1 h-2 w-2 rounded-full bg-primary" />}
            </button>
          ))}
        </div>
        <div className="lg:col-span-2 rounded-xl border border-border bg-card flex flex-col">
          <div className="p-4 border-b border-border font-semibold">{active.student}</div>
          <div className="flex-1 p-4 space-y-3 overflow-y-auto">
            <div className="max-w-md bg-secondary text-secondary-foreground rounded-lg p-3 text-sm">
              {active.last}
            </div>
            <div className="max-w-md bg-primary text-primary-foreground rounded-lg p-3 text-sm ml-auto">
              Let me take a look — share your code snippet here.
            </div>
          </div>
          <div className="p-4 border-t border-border flex gap-2">
            <input className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Type your reply..." />
            <Button>Send</Button>
          </div>
        </div>
      </div>
    </>
  );
}

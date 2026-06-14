import { createFileRoute } from "@tanstack/react-router";
import { Shell, Card, PageHeader, Chip, Btn } from "@/components/mentor/Shell";
import { Bell, MessageSquare, FileText, Video, Award, CheckCheck } from "lucide-react";

export const Route = createFileRoute("/mentor/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — Bynixx Mentor Portal" },
      { name: "description", content: "All your platform notifications in one place." },
    ],
  }),
  component: NotificationsPage,
});

const items = [
  { icon: FileText, tint: "chip-violet", title: "New assignment submitted by Karthik S", desc: "AI Engineering · Build a sentiment classifier", time: "10 min ago", unread: true },
  { icon: MessageSquare, tint: "chip-blue", title: "Sneha R requested a resubmission", desc: "Prompt Engineering · Chain-of-thought set", time: "45 min ago", unread: true },
  { icon: Video, tint: "chip-green", title: "Live session completed: Git & GitLab", desc: "72 students attended · 1h 12m duration", time: "2 hrs ago", unread: true },
  { icon: FileText, tint: "chip-orange", title: "New review request for AI Engineering", desc: "3 new submissions in queue", time: "3 hrs ago", unread: true },
  { icon: Award, tint: "chip-amber", title: "Certificate approval required", desc: "Karthik S · AI Engineering · 98% completion", time: "5 hrs ago" },
  { icon: MessageSquare, tint: "chip-pink", title: "New community post in #cybersecurity", desc: "Priya N · 'Nmap scan returning incomplete results'", time: "Yesterday" },
  { icon: Bell, tint: "chip-violet", title: "Weekly mentor report ready", desc: "May 13 – May 19 performance summary", time: "Yesterday" },
];

function NotificationsPage() {
  return (
    <Shell>
      <PageHeader title="Notifications" subtitle="Stay on top of submissions, sessions and announcements." action={
        <Btn variant="outline"><CheckCheck size={14} className="inline mr-1" /> Mark all read</Btn>
      } />

      <div className="flex flex-wrap gap-2">
        {["All", "Unread", "Submissions", "Sessions", "Community", "Certificates"].map((t, i) => (
          <button key={t} className={`text-sm px-3 py-1.5 rounded-lg ${i === 0 ? "bg-brand text-brand-foreground" : "border border-border hover:bg-muted"}`}>
            {t} {i === 1 && <span className="ml-1 text-[10px] bg-chip-red text-white rounded-md px-1.5">4</span>}
          </button>
        ))}
      </div>

      <Card>
        <ul className="divide-y divide-border">
          {items.map((n) => (
            <li key={n.title} className={`py-4 flex items-start gap-4 ${n.unread ? "" : "opacity-70"}`}>
              <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-${n.tint}/15 text-${n.tint}`}>
                <n.icon size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">{n.title}</span>
                  {n.unread && <span className="h-2 w-2 rounded-full bg-brand" />}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">{n.desc}</div>
              </div>
              <div className="text-xs text-muted-foreground whitespace-nowrap">{n.time}</div>
            </li>
          ))}
        </ul>
      </Card>
    </Shell>
  );
}

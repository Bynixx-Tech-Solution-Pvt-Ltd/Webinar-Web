import { createFileRoute } from "@tanstack/react-router";
import { Shell, Card, PageHeader, Chip, Btn } from "@/components/mentor/Shell";
import { Video, Calendar, Plus, Users, Clock, Link2, PlayCircle } from "lucide-react";

export const Route = createFileRoute("/live-sessions")({
  head: () => ({
    meta: [
      { title: "Live Sessions — Bynixx Mentor Portal" },
      { name: "description", content: "Schedule, host and review your live mentor sessions." },
    ],
  }),
  component: LiveSessionsPage,
});

const today = [
  { time: "10:00 AM", title: "AI Engineering — Basics", course: "AI Engineering", students: 85, status: "Live Now", live: true },
  { time: "02:00 PM", title: "Git & GitLab Workflow", course: "Full Stack", students: 72, status: "Upcoming" },
  { time: "05:00 PM", title: "Prompt Engineering 101", course: "Prompt Eng.", students: 60, status: "Upcoming" },
];
const upcoming = [
  { date: "May 21", time: "11:00 AM", title: "Cybersecurity Threat Modeling", course: "Cybersecurity", students: 64 },
  { date: "May 22", time: "03:00 PM", title: "EDA with Pandas", course: "Data Science", students: 75 },
  { date: "May 24", time: "10:00 AM", title: "AI Model Evaluation", course: "AI Engineering", students: 85 },
  { date: "May 26", time: "06:00 PM", title: "React Server Components Deep Dive", course: "Full Stack", students: 102 },
];
const past = [
  { date: "May 18", title: "Intro to LangChain", attended: 58, total: 60, duration: "1h 12m", rating: 4.9 },
  { date: "May 16", title: "OWASP Top 10 Walkthrough", attended: 51, total: 64, duration: "58m", rating: 4.7 },
  { date: "May 14", title: "Node.js Performance", attended: 87, total: 102, duration: "1h 22m", rating: 4.8 },
];

function LiveSessionsPage() {
  return (
    <Shell>
      <PageHeader
        title="Live Sessions"
        subtitle="Run live classes and one-to-one sessions with your students."
        action={<Btn><Plus size={14} className="inline mr-1" /> Schedule Session</Btn>}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Video, label: "Today", value: "3", tint: "chip-blue" },
          { icon: Calendar, label: "This Week", value: "11", tint: "chip-violet" },
          { icon: Users, label: "Total Attendees", value: "642", tint: "chip-green" },
          { icon: Clock, label: "Hours Streamed", value: "84h", tint: "chip-orange" },
        ].map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-2xl p-5">
            <div className={`grid h-11 w-11 place-items-center rounded-xl bg-${s.tint}/15 text-${s.tint} mb-3`}><s.icon size={20} /></div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
            <div className="text-2xl font-bold mt-1">{s.value}</div>
          </div>
        ))}
      </div>

      <Card title="Today's Schedule">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {today.map((s) => (
            <div key={s.title} className={`relative rounded-2xl p-5 border ${s.live ? "border-chip-red bg-chip-red/5" : "border-border"}`}>
              {s.live && <span className="absolute top-3 right-3 text-[10px] font-bold text-chip-red flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-chip-red animate-pulse" /> LIVE</span>}
              <div className="text-xs text-muted-foreground">{s.time}</div>
              <div className="font-semibold mt-1">{s.title}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.course} · {s.students} students</div>
              <div className="flex gap-2 mt-4">
                <Btn className="flex-1">{s.live ? "Join Now" : "Start"}</Btn>
                <Btn variant="outline">Details</Btn>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card title="Upcoming Sessions" action="View All">
          <div className="divide-y divide-border">
            {upcoming.map((u) => (
              <div key={u.title} className="py-3 flex items-center gap-4">
                <div className="text-center w-14 shrink-0">
                  <div className="text-xs text-muted-foreground">{u.date.split(" ")[0]}</div>
                  <div className="text-lg font-bold leading-none">{u.date.split(" ")[1]}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold truncate">{u.title}</div>
                  <div className="text-xs text-muted-foreground">{u.course} · {u.time} · {u.students} students</div>
                </div>
                <button className="grid h-8 w-8 place-items-center rounded-lg hover:bg-muted text-muted-foreground"><Link2 size={14} /></button>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Past Sessions" action="Recordings">
          <div className="divide-y divide-border">
            {past.map((p) => (
              <div key={p.title} className="py-3 flex items-center gap-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-chip-violet/15 text-chip-violet"><PlayCircle size={18} /></div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold truncate">{p.title}</div>
                  <div className="text-xs text-muted-foreground">{p.date} · {p.duration} · {p.attended}/{p.total} attended</div>
                </div>
                <Chip tone="amber">★ {p.rating}</Chip>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Shell>
  );
}

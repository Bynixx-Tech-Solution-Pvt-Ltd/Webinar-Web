import { createFileRoute } from "@tanstack/react-router";
import { Shell, Card, PageHeader } from "@/components/mentor/Shell";
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Star, Clock, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/mentor/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — Bynixx Mentor Portal" },
      { name: "description", content: "Detailed analytics on your mentoring performance and student outcomes." },
    ],
  }),
  component: AnalyticsPage,
});

const trend = Array.from({ length: 12 }, (_, i) => ({
  m: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i],
  reviewed: 60 + Math.round(40 * Math.sin(i / 1.6) + 30),
  approvals: 40 + Math.round(30 * Math.cos(i / 1.8) + 25),
}));
const courseDist = [
  { name: "AI Engineering", value: 85, color: "var(--chip-violet)" },
  { name: "Cybersecurity", value: 64, color: "var(--chip-green)" },
  { name: "Full Stack", value: 102, color: "var(--chip-blue)" },
  { name: "Prompt Eng.", value: 60, color: "var(--chip-orange)" },
  { name: "Data Science", value: 75, color: "var(--chip-pink)" },
];
const ratings = [
  { name: "5★", value: 62 }, { name: "4★", value: 24 }, { name: "3★", value: 8 }, { name: "2★", value: 4 }, { name: "1★", value: 2 },
];

function AnalyticsPage() {
  return (
    <Shell>
      <PageHeader title="Analytics" subtitle="Performance insights across all your courses and students." action={
        <select className="text-sm border border-border rounded-lg px-3 py-2 bg-card">
          <option>Last 12 months</option><option>This Quarter</option><option>This Month</option>
        </select>
      } />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: CheckCircle2, label: "Tasks Reviewed", value: "1,248", delta: "↗ 18%", tint: "chip-violet" },
          { icon: Clock, label: "Avg. Response Time", value: "8 hrs", delta: "↘ 10%", tint: "chip-blue" },
          { icon: TrendingUp, label: "Approval Rate", value: "87%", delta: "↗ 6%", tint: "chip-green" },
          { icon: Star, label: "Mentor Rating", value: "4.8/5", delta: "↗ 0.2", tint: "chip-amber" },
        ].map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-2xl p-5">
            <div className={`grid h-11 w-11 place-items-center rounded-xl bg-${s.tint}/15 text-${s.tint} mb-3`}><s.icon size={20} /></div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
            <div className="text-2xl font-bold mt-1">{s.value}</div>
            <div className="text-xs mt-2 text-chip-green">{s.delta}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2" title="Reviews vs Approvals">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={trend} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="m" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12, border: "1px solid var(--border)" }} />
              <Line type="monotone" dataKey="reviewed" stroke="var(--chip-violet)" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="approvals" stroke="var(--chip-green)" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Students by Course">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={courseDist} dataKey="value" innerRadius={50} outerRadius={85} paddingAngle={2} stroke="none">
                {courseDist.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <ul className="space-y-2 text-sm mt-2">
            {courseDist.map((c) => (
              <li key={c.name} className="flex items-center justify-between">
                <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full" style={{ background: c.color }} />{c.name}</span>
                <span className="font-semibold">{c.value}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card title="Rating Distribution">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={ratings} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12, border: "1px solid var(--border)" }} />
              <Bar dataKey="value" fill="var(--chip-violet)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card title="Top Performing Courses">
          <ul className="space-y-3">
            {[
              { name: "Prompt Engineering 101", val: 92 },
              { name: "AI Engineering", val: 88 },
              { name: "Full Stack Web Dev", val: 84 },
              { name: "Data Science", val: 79 },
              { name: "Cybersecurity Basics", val: 71 },
            ].map((c) => (
              <li key={c.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{c.name}</span><span className="font-semibold">{c.val}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-brand rounded-full" style={{ width: `${c.val}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </Shell>
  );
}

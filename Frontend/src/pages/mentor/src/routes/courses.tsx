import { createFileRoute } from "@tanstack/react-router";
import { Shell, Card, PageHeader, Btn, Chip } from "@/components/mentor/Shell";
import { Plus, Users, Clock, Star, MoreVertical, PlayCircle } from "lucide-react";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "Courses — Bynixx Mentor Portal" },
      { name: "description", content: "Courses you mentor on Bynixx — modules, learners and ratings." },
    ],
  }),
  component: CoursesPage,
});

const courses = [
  { title: "AI Engineering", desc: "Foundations of ML, neural networks and applied AI engineering.", learners: 85, modules: 24, hours: 36, rating: 4.8, level: "Advanced", tone: "violet" as const, progress: 72 },
  { title: "Cybersecurity Basics", desc: "Network security, ethical hacking and defensive practices.", learners: 64, modules: 18, hours: 28, rating: 4.6, level: "Intermediate", tone: "green" as const, progress: 58 },
  { title: "Full Stack Web Dev", desc: "React, Node, databases and deployment end-to-end.", learners: 102, modules: 30, hours: 48, rating: 4.7, level: "Intermediate", tone: "blue" as const, progress: 65 },
  { title: "Prompt Engineering 101", desc: "Designing prompts for production LLM applications.", learners: 60, modules: 12, hours: 16, rating: 4.9, level: "Beginner", tone: "orange" as const, progress: 80 },
  { title: "Data Science", desc: "Statistics, pandas, visualization and predictive models.", learners: 75, modules: 22, hours: 32, rating: 4.5, level: "Intermediate", tone: "pink" as const, progress: 60 },
  { title: "Git & GitLab Workflow", desc: "Branching, CI/CD and collaborative workflows.", learners: 50, modules: 8, hours: 10, rating: 4.7, level: "Beginner", tone: "amber" as const, progress: 88 },
];

function CoursesPage() {
  return (
    <Shell>
      <PageHeader
        title="Courses"
        subtitle="Courses assigned to you as a mentor."
        action={<Btn><Plus size={14} className="inline mr-1" /> New Course</Btn>}
      />

      <div className="flex flex-wrap gap-2">
        {["All Courses", "Active", "Draft", "Archived"].map((t, i) => (
          <button key={t} className={`text-sm px-3.5 py-1.5 rounded-lg ${i === 0 ? "bg-brand text-brand-foreground" : "border border-border hover:bg-muted"}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {courses.map((c) => (
          <div key={c.title} className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-md transition">
            <div className={`h-32 bg-gradient-to-br from-chip-${c.tone}/30 to-chip-${c.tone}/10 relative`}>
              <div className={`absolute top-3 left-3`}><Chip tone={c.tone}>{c.level}</Chip></div>
              <div className="absolute top-3 right-3">
                <button className="h-8 w-8 grid place-items-center rounded-md bg-white/70 hover:bg-white"><MoreVertical size={14} /></button>
              </div>
              <div className={`absolute -bottom-4 left-5 h-12 w-12 rounded-xl bg-chip-${c.tone} text-white grid place-items-center font-bold shadow-lg`}>
                {c.title.split(" ").map((w) => w[0]).slice(0, 2).join("")}
              </div>
            </div>
            <div className="p-5 pt-7">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-base">{c.title}</h3>
                <div className="flex items-center gap-1 text-xs text-chip-amber font-semibold"><Star size={12} fill="currentColor" /> {c.rating}</div>
              </div>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{c.desc}</p>
              <div className="grid grid-cols-3 gap-2 mt-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1"><Users size={12} /> {c.learners}</div>
                <div className="flex items-center gap-1"><PlayCircle size={12} /> {c.modules} mod</div>
                <div className="flex items-center gap-1"><Clock size={12} /> {c.hours}h</div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Avg. completion</span>
                  <span className="font-semibold">{c.progress}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full bg-brand" style={{ width: `${c.progress}%` }} />
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Btn className="flex-1">Manage</Btn>
                <Btn variant="outline" className="flex-1">Preview</Btn>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Shell>
  );
}

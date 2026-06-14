import { createFileRoute } from "@tanstack/react-router";
import { Shell, Card, PageHeader, Avatar, Chip, Btn } from "@/components/mentor/Shell";
import { FolderKanban, Github, ExternalLink, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/mentor/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Bynixx Mentor Portal" },
      { name: "description", content: "Review capstone projects and evaluate student work." },
    ],
  }),
  component: ProjectsPage,
});

const projects = [
  { title: "AI Chatbot for Healthcare", student: "Karthik S", course: "AI Engineering", stage: "Evaluation", tone: "amber" as const, progress: 92, due: "Due May 24" },
  { title: "Vulnerability Scanner CLI", student: "Priya N", course: "Cybersecurity", stage: "In Progress", tone: "blue" as const, progress: 65, due: "Due May 29" },
  { title: "E-commerce Platform", student: "Arun Kumar", course: "Full Stack", stage: "Submitted", tone: "green" as const, progress: 100, due: "Submitted May 18" },
  { title: "Prompt Library Generator", student: "Sneha R", course: "Prompt Engineering", stage: "In Progress", tone: "blue" as const, progress: 40, due: "Due Jun 03" },
  { title: "Customer Churn Predictor", student: "Vivek M", course: "Data Science", stage: "Evaluation", tone: "amber" as const, progress: 88, due: "Due May 25" },
  { title: "Real-time Threat Dashboard", student: "Rohan Mehta", course: "Cybersecurity", stage: "Approved", tone: "violet" as const, progress: 100, due: "Approved May 12" },
];

function ProjectsPage() {
  return (
    <Shell>
      <PageHeader title="Projects" subtitle="Capstone and portfolio projects from your students." />

      <div className="flex flex-wrap gap-2">
        {["All Projects", "In Progress", "Submitted", "Evaluation", "Approved"].map((t, i) => (
          <button key={t} className={`text-sm px-3 py-1.5 rounded-lg ${i === 0 ? "bg-brand text-brand-foreground" : "border border-border hover:bg-muted"}`}>{t}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((p) => (
          <Card key={p.title}>
            <div className="flex items-start gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand/10 text-brand">
                <FolderKanban size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate">{p.title}</h3>
                <div className="text-xs text-muted-foreground">{p.course}</div>
              </div>
              <Chip tone={p.tone}>{p.stage}</Chip>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <Avatar name={p.student} />
              <div className="text-sm">{p.student}</div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-semibold">{p.progress}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full bg-brand" style={{ width: `${p.progress}%` }} />
              </div>
              <div className="text-xs text-muted-foreground mt-2">{p.due}</div>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <button className="grid h-8 w-8 place-items-center rounded-lg border border-border hover:bg-muted text-muted-foreground"><Github size={14} /></button>
              <button className="grid h-8 w-8 place-items-center rounded-lg border border-border hover:bg-muted text-muted-foreground"><ExternalLink size={14} /></button>
              <button className="grid h-8 w-8 place-items-center rounded-lg border border-border hover:bg-muted text-muted-foreground"><MessageSquare size={14} /></button>
              <Btn className="ml-auto">Review</Btn>
            </div>
          </Card>
        ))}
      </div>
    </Shell>
  );
}

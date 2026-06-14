import { createFileRoute } from "@tanstack/react-router";
import { Shell, Card, PageHeader, Chip, Btn } from "@/components/mentor/Shell";
import { Plus, FileText, Clock, Users, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/mentor/assessments")({
  head: () => ({
    meta: [
      { title: "Assessments — Bynixx Mentor Portal" },
      { name: "description", content: "Create, schedule and grade course assessments." },
    ],
  }),
  component: AssessmentsPage,
});

const assessments = [
  { title: "AI Engineering — Midterm Quiz", course: "AI Engineering", type: "Quiz", questions: 20, duration: "45 min", attempts: 78, status: "Active", tone: "green" as const },
  { title: "Cybersecurity Final Exam", course: "Cybersecurity", type: "Exam", questions: 50, duration: "90 min", attempts: 0, status: "Draft", tone: "amber" as const },
  { title: "Full Stack — Capstone Submission", course: "Full Stack Web Dev", type: "Project", questions: 1, duration: "—", attempts: 42, status: "Active", tone: "green" as const },
  { title: "Prompt Engineering Skill Check", course: "Prompt Engineering", type: "Quiz", questions: 15, duration: "30 min", attempts: 55, status: "Closed", tone: "red" as const },
  { title: "Data Science Assignment 3", course: "Data Science", type: "Assignment", questions: 5, duration: "—", attempts: 63, status: "Active", tone: "green" as const },
];

function AssessmentsPage() {
  return (
    <Shell>
      <PageHeader
        title="Assessments"
        subtitle="Build quizzes, exams and assignments for your courses."
        action={<Btn><Plus size={14} className="inline mr-1" /> Create Assessment</Btn>}
      />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: FileText, label: "Total Assessments", value: "24", tint: "chip-violet" },
          { icon: CheckCircle2, label: "Active", value: "12", tint: "chip-green" },
          { icon: Users, label: "Total Attempts", value: "486", tint: "chip-blue" },
          { icon: Clock, label: "Avg. Score", value: "76%", tint: "chip-orange" },
        ].map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-2xl p-5">
            <div className={`grid h-11 w-11 place-items-center rounded-xl bg-${s.tint}/15 text-${s.tint} mb-3`}><s.icon size={20} /></div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
            <div className="text-2xl font-bold mt-1">{s.value}</div>
          </div>
        ))}
      </div>

      <Card>
        <div className="flex flex-wrap gap-2 mb-4">
          {["All Types", "Quiz", "Assignment", "Project", "Exam"].map((t, i) => (
            <button key={t} className={`text-sm px-3 py-1.5 rounded-lg ${i === 0 ? "bg-brand text-brand-foreground" : "border border-border hover:bg-muted"}`}>{t}</button>
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-muted-foreground border-b border-border">
                <th className="text-left font-medium py-2">Assessment</th>
                <th className="text-left font-medium py-2">Course</th>
                <th className="text-left font-medium py-2">Type</th>
                <th className="text-left font-medium py-2">Questions</th>
                <th className="text-left font-medium py-2">Duration</th>
                <th className="text-left font-medium py-2">Attempts</th>
                <th className="text-left font-medium py-2">Status</th>
                <th className="text-left font-medium py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {assessments.map((a) => (
                <tr key={a.title} className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="py-3 font-medium">{a.title}</td>
                  <td className="py-3 text-muted-foreground">{a.course}</td>
                  <td className="py-3"><Chip tone="violet">{a.type}</Chip></td>
                  <td className="py-3 text-muted-foreground">{a.questions}</td>
                  <td className="py-3 text-muted-foreground">{a.duration}</td>
                  <td className="py-3 text-muted-foreground">{a.attempts}</td>
                  <td className="py-3"><Chip tone={a.tone}>{a.status}</Chip></td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <Btn variant="outline">Edit</Btn>
                      <Btn>Grade</Btn>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </Shell>
  );
}

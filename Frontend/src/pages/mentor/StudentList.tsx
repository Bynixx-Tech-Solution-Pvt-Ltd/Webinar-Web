import { PageHeader } from "@/components/dashboard-shell";

const students = [
  { name: "Aarav Sharma", course: "Full-Stack Web Dev", progress: 72 },
  { name: "Priya Nair", course: "Data Science Pro", progress: 58 },
  { name: "Rohit Verma", course: "DevOps Mastery", progress: 41 },
  { name: "Sneha Iyer", course: "UI/UX Roadmap", progress: 88 },
  { name: "Karan Patel", course: "Full-Stack Web Dev", progress: 24 },
];

export function StudentsPage() {
  return (
    <>
      <PageHeader title="My Students" subtitle="Track progress for assigned students" />
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-secondary/50 text-muted-foreground">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Student</th>
              <th className="text-left px-4 py-3 font-medium">Course</th>
              <th className="text-left px-4 py-3 font-medium w-1/3">Progress</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.name} className="border-t border-border">
                <td className="px-4 py-3 font-medium text-foreground">{s.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{s.course}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${s.progress}%`, background: "var(--gradient-primary)" }} />
                    </div>
                    <span className="text-xs font-medium w-10">{s.progress}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

import { Plus, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/dashboard-shell";

const courses = [
  { title: "Full-Stack Web Development", mentor: "Anil Kumar", students: 1240, status: "Published", duration: "12 weeks" },
  { title: "Data Science Pro", mentor: "Meera Joshi", students: 860, status: "Published", duration: "16 weeks" },
  { title: "DevOps Mastery", mentor: "Rahul Mehta", students: 420, status: "Draft", duration: "10 weeks" },
  { title: "UI/UX Roadmap", mentor: "Kavya Reddy", students: 510, status: "Published", duration: "8 weeks" },
  { title: "Mobile App Dev with React Native", mentor: "Suresh P", students: 280, status: "Draft", duration: "12 weeks" },
];

export function CoursesPage() {
  return (
    <>
      <PageHeader
        title="Courses"
        subtitle="Create and manage learning paths"
        action={<Button><Plus className="h-4 w-4" /> New Course</Button>}
      />
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-secondary/50 text-muted-foreground">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Course</th>
              <th className="text-left px-4 py-3 font-medium">Mentor</th>
              <th className="text-left px-4 py-3 font-medium">Students</th>
              <th className="text-left px-4 py-3 font-medium">Duration</th>
              <th className="text-left px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {courses.map((c) => (
              <tr key={c.title} className="border-t border-border">
                <td className="px-4 py-3 flex items-center gap-2 font-medium text-foreground">
                  <BookOpen className="h-4 w-4 text-primary" /> {c.title}
                </td>
                <td className="px-4 py-3 text-muted-foreground">{c.mentor}</td>
                <td className="px-4 py-3">{c.students.toLocaleString()}</td>
                <td className="px-4 py-3 text-muted-foreground">{c.duration}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${c.status === "Published" ? "bg-accent text-accent-foreground" : "bg-secondary text-secondary-foreground"}`}>
                    {c.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Button variant="ghost" size="sm">Edit</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

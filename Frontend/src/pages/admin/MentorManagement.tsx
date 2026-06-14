import { PageHeader } from "@/components/dashboard-shell";
import { Star } from "lucide-react";

const mentors = [
  { name: "Anil Kumar", expertise: "Full-Stack JS", students: 312, rating: 4.9 },
  { name: "Meera Joshi", expertise: "Data Science", students: 240, rating: 4.8 },
  { name: "Rahul Mehta", expertise: "DevOps & Cloud", students: 180, rating: 4.7 },
  { name: "Kavya Reddy", expertise: "UI/UX Design", students: 156, rating: 4.9 },
];

export function MentorsPage() {
  return (
    <>
      <PageHeader title="Mentors" subtitle="Manage mentor assignments and performance" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mentors.map((m) => (
          <div key={m.name} className="rounded-xl border border-border bg-card p-5 flex items-center gap-4">
            <div className="h-14 w-14 rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg"
              style={{ background: "var(--gradient-primary)" }}>
              {m.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div className="flex-1">
              <div className="font-semibold text-foreground">{m.name}</div>
              <div className="text-sm text-muted-foreground">{m.expertise}</div>
              <div className="text-xs text-muted-foreground mt-1">{m.students} students</div>
            </div>
            <div className="flex items-center gap-1 text-sm font-medium">
              <Star className="h-4 w-4 fill-primary text-primary" /> {m.rating}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

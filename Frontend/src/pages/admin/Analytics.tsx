import { PageHeader, StatCard } from "@/components/dashboard-shell";
import { TrendingUp, Users, BookOpen, Award } from "lucide-react";

export function AnalyticsPage() {
  return (
    <>
      <PageHeader title="Analytics" subtitle="Platform-wide insights" />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="MAU" value="9,820" hint="+12% MoM" icon={Users} />
        <StatCard label="Course Completions" value="1,432" hint="This month" icon={BookOpen} />
        <StatCard label="Avg. Rating" value="4.8" hint="From 6,210 reviews" icon={Award} />
        <StatCard label="Revenue" value="₹38.2L" hint="+18% MoM" icon={TrendingUp} />
      </div>
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="font-semibold text-foreground mb-4">Enrollments — last 7 days</h3>
        <div className="flex items-end gap-3 h-48">
          {[60, 80, 45, 95, 70, 110, 130].map((v, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full rounded-t-md" style={{ height: `${v}%`, background: "var(--gradient-primary)" }} />
              <span className="text-xs text-muted-foreground">{["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][i]}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

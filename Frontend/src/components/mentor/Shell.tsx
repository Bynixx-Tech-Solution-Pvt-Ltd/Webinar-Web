import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Users, BookOpen, ClipboardCheck, Video, FileText,
  FolderKanban, Award, BarChart3, MessagesSquare, Bell, Settings,
  Search, Menu, Calendar, ChevronDown, ArrowRight,
} from "lucide-react";
import type { ReactNode } from "react";

type NavItem = { icon: typeof LayoutDashboard; label: string; to: string; badge?: number };

export const nav: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", to: "/mentor" },
  { icon: Users, label: "Students", to: "/mentor/students" },
  { icon: BookOpen, label: "Courses", to: "/mentor/courses" },
  { icon: ClipboardCheck, label: "Task Reviews", to: "/mentor/task-reviews", badge: 32 },
  { icon: Video, label: "Live Sessions", to: "/mentor/live-sessions" },
  { icon: FileText, label: "Assessments", to: "/mentor/assessments" },
  { icon: FolderKanban, label: "Projects", to: "/mentor/projects" },
  { icon: Award, label: "Certificates", to: "/mentor/certificates" },
  { icon: BarChart3, label: "Analytics", to: "/mentor/analytics" },
  { icon: MessagesSquare, label: "Community", to: "/mentor/community" },
  { icon: Bell, label: "Notifications", to: "/mentor/notifications", badge: 8 },
  { icon: Settings, label: "Profile Settings", to: "/mentor/profile-settings" },
];

export function Shell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="flex min-h-screen bg-background">
      <aside className="dark hidden lg:flex w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground sticky top-0 h-screen border-r border-sidebar-border/30">
        <div className="px-6 py-5 flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-sidebar-active text-white font-black">B</div>
          <div>
            <div className="text-white font-bold leading-tight">Bynixx</div>
            <div className="text-xs text-sidebar-muted">Mentor Portal</div>
          </div>
        </div>
        <nav className="px-3 mt-2 flex-1 space-y-1 overflow-y-auto">
          {nav.map((item) => {
            const active = pathname === item.to;
            return (
              <Link
                key={item.label}
                to={item.to}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  active
                    ? "bg-sidebar-active text-white shadow-lg shadow-sidebar-active/30"
                    : "text-sidebar-foreground hover:bg-white/5"
                }`}
              >
                <item.icon size={18} className="shrink-0" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-chip-red/90 text-white">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
        <div className="m-3 rounded-2xl bg-white/5 p-4 border border-white/10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-chip-pink to-chip-violet grid place-items-center text-white text-sm font-bold">PS</div>
            <div className="min-w-0">
              <div className="text-white text-sm font-semibold truncate">Dr. Priya Sharma</div>
              <div className="text-[11px] text-sidebar-muted">Senior Mentor</div>
            </div>
          </div>
          <div className="mt-4 space-y-2 text-xs">
            <ProfileRow label="Mentor Rating" value={<span className="text-chip-amber font-semibold">★ 4.8/5</span>} />
            <ProfileRow label="Students Mentored" value={<span className="text-white font-semibold">120+</span>} />
            <ProfileRow label="Courses Assigned" value={<span className="text-white font-semibold">5</span>} />
          </div>
          <Link to="/mentor/profile-settings" className="mt-4 w-full flex items-center justify-center gap-2 rounded-lg bg-sidebar-active text-white text-xs font-semibold py-2.5 hover:opacity-90">
            View Profile <ArrowRight size={14} />
          </Link>
        </div>
      </aside>

      <main className="flex-1 min-w-0 flex flex-col">
        <header className="bg-card border-b border-border px-4 sm:px-8 py-4 flex items-center gap-4 sticky top-0 z-20">
          <button className="grid h-9 w-9 place-items-center rounded-lg hover:bg-muted">
            <Menu size={18} />
          </button>
          <div className="flex-1 max-w-xl relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <input
              type="text"
              placeholder="Search students, courses, tasks..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-muted/60 border border-transparent focus:border-ring focus:bg-card outline-none text-sm"
            />
          </div>
          <div className="hidden md:flex items-center gap-2 text-sm">
            <Calendar size={16} className="text-muted-foreground" />
            <div className="leading-tight">
              <div className="font-semibold">May 20, 2025</div>
              <div className="text-xs text-muted-foreground">Tuesday</div>
            </div>
          </div>
          <Link to="/mentor/notifications" className="relative grid h-9 w-9 place-items-center rounded-lg hover:bg-muted">
            <Bell size={18} />
            <span className="absolute -top-1 -right-1 text-[10px] font-bold bg-chip-red text-white rounded-full h-4 min-w-4 px-1 grid place-items-center">8</span>
          </Link>
          <div className="flex items-center gap-2 pl-2 border-l border-border">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-chip-pink to-chip-violet grid place-items-center text-white text-xs font-bold">PS</div>
            <div className="hidden sm:block leading-tight">
              <div className="text-sm font-semibold">Dr. Priya Sharma</div>
            </div>
            <ChevronDown size={14} className="text-muted-foreground" />
          </div>
        </header>
        <div className="p-4 sm:p-8 space-y-6">{children}</div>
      </main>
    </div>
  );
}

function ProfileRow({ label, value }: { label: string; value: ReactNode }) {
  return <div className="flex items-center justify-between text-sidebar-muted"><span>{label}</span>{value}</div>;
}

export function Card({ title, action, children, className = "" }: { title?: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={`bg-card border border-border rounded-2xl p-5 ${className}`}>
      {(title || action) && (
        <div className="flex items-center justify-between mb-4">
          {title && <h3 className="font-semibold">{title}</h3>}
          {typeof action === "string"
            ? <a className="text-xs text-brand font-semibold cursor-pointer">{action} →</a>
            : action}
        </div>
      )}
      {children}
    </section>
  );
}

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">{title}</h1>
        {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function Chip({ tone = "violet", children }: { tone?: "violet" | "blue" | "green" | "amber" | "red" | "pink" | "orange"; children: ReactNode }) {
  const map: Record<string, string> = {
    violet: "bg-chip-violet/15 text-chip-violet",
    blue: "bg-chip-blue/15 text-chip-blue",
    green: "bg-chip-green/15 text-chip-green",
    amber: "bg-chip-amber/15 text-chip-amber",
    red: "bg-chip-red/15 text-chip-red",
    pink: "bg-chip-pink/15 text-chip-pink",
    orange: "bg-chip-orange/15 text-chip-orange",
  };
  return <span className={`text-[11px] font-medium px-2 py-1 rounded-md ${map[tone]}`}>{children}</span>;
}

export function Avatar({ name, tone = "violet" }: { name: string; tone?: "violet" | "blue" | "pink" | "green" | "amber" }) {
  const gradients: Record<string, string> = {
    violet: "from-chip-violet to-chip-blue",
    blue: "from-chip-blue to-chip-violet",
    pink: "from-chip-pink to-chip-violet",
    green: "from-chip-green to-chip-blue",
    amber: "from-chip-amber to-chip-orange",
  };
  const initials = name.split(" ").map((n) => n[0]).slice(0, 2).join("");
  return (
    <div className={`h-8 w-8 rounded-full bg-gradient-to-br ${gradients[tone]} grid place-items-center text-white text-[10px] font-bold shrink-0`}>
      {initials}
    </div>
  );
}

export function Btn({ children, variant = "primary", className = "" }: { children: ReactNode; variant?: "primary" | "ghost" | "outline"; className?: string }) {
  const v: Record<string, string> = {
    primary: "bg-brand text-brand-foreground hover:opacity-90",
    ghost: "hover:bg-muted text-foreground",
    outline: "border border-border hover:bg-muted",
  };
  return <button className={`text-sm font-semibold px-3.5 py-2 rounded-lg transition ${v[variant]} ${className}`}>{children}</button>;
}

// Tailwind Safelist for dynamic chip and card classes:
// bg-chip-violet bg-chip-blue bg-chip-green bg-chip-amber bg-chip-red bg-chip-pink bg-chip-orange
// bg-chip-violet/15 bg-chip-blue/15 bg-chip-green/15 bg-chip-amber/15 bg-chip-red/15 bg-chip-pink/15 bg-chip-orange/15
// text-chip-violet text-chip-blue text-chip-green text-chip-amber text-chip-red text-chip-pink text-chip-orange
// from-chip-violet/30 to-chip-violet/10 from-chip-green/30 to-chip-green/10 from-chip-blue/30 to-chip-blue/10 from-chip-orange/30 to-chip-orange/10 from-chip-pink/30 to-chip-pink/10 from-chip-amber/30 to-chip-amber/10

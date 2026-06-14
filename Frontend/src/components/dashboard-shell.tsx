/**
 * DASHBOARD SHELL COMPONENT
 * Reusable layout for admin and mentor dashboards
 * Includes sidebar, navbar, and content area
 */

import { ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { LogOut, Sparkles, ShieldCheck } from "lucide-react";

export interface NavItem {
  to: string;
  label: string;
  icon: React.ReactNode;
}

interface DashboardShellProps {
  brand: string;
  brandSubtitle: string;
  nav: NavItem[];
  children: ReactNode;
}

export function DashboardShell({ brand, brandSubtitle, nav, children }: DashboardShellProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen relative overflow-hidden text-white" style={{ background: "var(--gradient-hero)" }}>
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage:
          "radial-gradient(circle at top, rgba(168, 85, 247, 0.18), transparent 22%), radial-gradient(circle at right, rgba(56, 189, 248, 0.18), transparent 24%), linear-gradient(135deg, rgba(255,255,255,0.04), transparent 30%)",
      }} />
      <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="relative z-10">
        <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/10 shadow-[0_12px_30px_rgba(15,23,42,0.35)]">
                <ShieldCheck className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-white">{brand}</h1>
                <p className="text-xs text-slate-200/80">{brandSubtitle}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-3 rounded-full border border-white/10 bg-white/8 px-3 py-2 shadow-[0_14px_28px_rgba(15,23,42,0.25)]">
                <img src={user?.avatar} alt={user?.name} className="h-9 w-9 rounded-full border border-white/10 object-cover" />
                <div className="hidden lg:block">
                  <p className="text-sm font-semibold text-white">{user?.name}</p>
                  <p className="text-xs text-slate-200/80 capitalize">{user?.role}</p>
                </div>
              </div>

              <Button
                onClick={handleLogout}
                className="border border-white/10 bg-white/10 text-white shadow-[0_12px_30px_rgba(15,23,42,0.35)] hover:bg-white/15"
                size="sm"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </header>

        <div className="mx-auto flex max-w-7xl gap-6 p-6">
          <aside className="hidden lg:block w-72 shrink-0">
            <nav className="sticky top-24 rounded-3xl border border-white/10 bg-slate-950/55 p-4 shadow-[0_24px_60px_rgba(15,23,42,0.35)] backdrop-blur-xl">
              <div className="mb-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/8 p-3 text-sm text-slate-100">
                <Sparkles className="h-4 w-4 text-cyan-200" />
                Admin command center
              </div>
              <div className="space-y-2">
                {nav.map((item) => (
                  <button
                    key={item.to}
                    onClick={() => navigate({ to: item.to })}
                    className="w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-left text-slate-100 transition-all duration-200 hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
                  >
                    <span className="text-cyan-100">{item.icon}</span>
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            </nav>
          </aside>

          <main className="flex-1 space-y-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

/**
 * PAGE HEADER COMPONENT
 * Used within dashboard pages for consistent headers
 */
export function PageHeader({ title, description, subtitle }: { title: string; description?: string; subtitle?: string }) {
  const copy = description ?? subtitle;

  return (
    <section className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.35)] backdrop-blur-xl">
      <p className="text-xs uppercase tracking-[0.35em] text-cyan-100/90">Admin overview</p>
      <h1 className="mt-2 text-3xl font-bold text-white">{title}</h1>
      {copy && <p className="mt-2 max-w-2xl text-sm text-slate-100/80">{copy}</p>}
    </section>
  );
}

/**
 * STAT CARD COMPONENT
 * Display key metrics on dashboard
 */
export function StatCard({
  title,
  label,
  value,
  icon,
  trend,
  hint,
}: {
  title?: string;
  label?: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  hint?: string;
}) {
  const cardTitle = title ?? label ?? "Overview";

  return (
    <article className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.25)] backdrop-blur-xl transition-transform duration-200 hover:-translate-y-1 hover:border-cyan-400/30">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-100/80">{cardTitle}</p>
          <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
          {(trend ?? hint) && <p className="mt-2 text-xs text-cyan-100/90">{trend ?? hint}</p>}
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/10 p-3 text-cyan-100">{icon}</div>
      </div>
    </article>
  );
}

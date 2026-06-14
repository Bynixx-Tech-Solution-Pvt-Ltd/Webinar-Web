/**
 * DASHBOARD SHELL COMPONENT
 * Reusable layout for admin and mentor dashboards
 * Includes sidebar, navbar, and content area
 */

import { ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { LogOut, Menu } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-700 bg-slate-900/95 backdrop-blur">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold">B</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">{brand}</h1>
              <p className="text-xs text-slate-400">{brandSubtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-8 h-8 rounded-full"
              />
              <div className="hidden lg:block">
                <p className="text-sm font-semibold text-white">{user?.name}</p>
                <p className="text-xs text-slate-400 capitalize">{user?.role}</p>
              </div>
            </div>

            <Button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white"
              size="sm"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex gap-6 p-6 max-w-7xl mx-auto">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64">
          <nav className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 sticky top-20">
            <div className="space-y-2">
              {nav.map((item) => (
                <button
                  key={item.to}
                  onClick={() => navigate({ to: item.to })}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors text-left group"
                >
                  <span className="group-hover:text-blue-400 transition-colors">{item.icon}</span>
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}

/**
 * PAGE HEADER COMPONENT
 * Used within dashboard pages for consistent headers
 */
export function PageHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-white mb-1">{title}</h1>
      {description && <p className="text-slate-400">{description}</p>}
    </div>
  );
}

/**
 * STAT CARD COMPONENT
 * Display key metrics on dashboard
 */
export function StatCard({
  title,
  value,
  icon,
  trend,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
}) {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-400 text-sm font-medium mb-2">{title}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
          {trend && <p className="text-xs text-green-400 mt-2">{trend}</p>}
        </div>
        <div className="text-blue-500 opacity-50">{icon}</div>
      </div>
    </div>
  );
}

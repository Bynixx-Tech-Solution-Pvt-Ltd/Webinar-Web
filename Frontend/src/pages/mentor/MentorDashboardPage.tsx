/**
 * MENTOR DASHBOARD PAGE
 * Placeholder for mentor dashboard
 */

import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { LogOut, Home } from "lucide-react";

export function MentorDashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Mentor Dashboard</h1>
            <p className="text-slate-400">Welcome, {user?.name}</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => navigate({ to: "/" })}
              className="border-slate-600 text-slate-200"
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
            <Button onClick={handleLogout} className="bg-red-600 hover:bg-red-700">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Coming Soon</h2>
          <p className="text-slate-300">
            This is a placeholder for the mentor dashboard. Your students, live classes, and task reviews will appear here.
          </p>
        </div>

        {/* User Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <h3 className="text-slate-400 text-sm font-semibold mb-2">User ID</h3>
            <p className="text-white font-mono">{user?.id}</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <h3 className="text-slate-400 text-sm font-semibold mb-2">Email</h3>
            <p className="text-white">{user?.email}</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <h3 className="text-slate-400 text-sm font-semibold mb-2">Role</h3>
            <p className="text-white capitalize">{user?.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

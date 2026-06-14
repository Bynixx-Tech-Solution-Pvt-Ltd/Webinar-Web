/**
 * ADMIN LOGIN PAGE
 * Modern animated admin-specific login
 * Restricted to admin users only
 */

import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/hooks/useAuth";
import { MOCK_LOGIN } from "@/lib/mock-auth";
import { Mail, Lock, Eye, EyeOff, Loader2, Shield } from "lucide-react";

export function AdminLoginPage() {
  const navigate = useNavigate();
  const { login, setLoading, setError, isLoading, error } = useAuth();
  const [email, setEmail] = useState("admin@bynixx.com");
  const [password, setPassword] = useState("admin123");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await MOCK_LOGIN(email, password, "admin");

      if (result.success && result.user.role === "admin") {
        login(result.user, result.token);
        navigate({ to: "/admin" });
      } else {
        setError("Admin access only. Please use admin credentials.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      {/* Background decorative elements - Admin theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-yellow-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Console</h1>
          <p className="text-amber-200/60">Bynixx Administration Panel</p>
        </div>

        {/* Security Badge */}
        <div className="flex justify-center mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-3 py-1.5">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-amber-200">Secure Connection</span>
          </div>
        </div>

        {/* Login Card */}
        <Card className="border border-amber-600/30 bg-slate-800/50 backdrop-blur-xl shadow-2xl animate-scale-in">
          <div className="p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2 animate-slide-in" style={{ animationDelay: "0.2s" }}>
                <label className="text-sm font-medium text-slate-200">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400/60 w-5 h-5" />
                  <Input
                    type="email"
                    placeholder="admin@bynixx.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-slate-700/50 border-amber-600/30 text-white placeholder:text-slate-500 focus:border-amber-500 focus:ring-amber-500/50 transition-all"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2 animate-slide-in" style={{ animationDelay: "0.3s" }}>
                <label className="text-sm font-medium text-slate-200">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400/60 w-5 h-5" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 bg-slate-700/50 border-amber-600/30 text-white placeholder:text-slate-500 focus:border-amber-500 focus:ring-amber-500/50 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-400/60 hover:text-amber-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Error Alert */}
              {error && (
                <Alert className="bg-red-500/10 border-red-500/30 animate-slide-in">
                  <AlertDescription className="text-red-400">{error}</AlertDescription>
                </Alert>
              )}

              {/* Admin Credentials Info */}
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 text-xs text-amber-200">
                <p className="font-semibold mb-2">🔐 Admin Credentials:</p>
                <p>📧 Email: admin@bynixx.com</p>
                <p>🔑 Password: admin123</p>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold py-2.5 rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed animate-slide-in"
                style={{ animationDelay: "0.4s" }}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  "Access Admin Panel"
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-600"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-slate-800 text-slate-400">Not admin?</span>
              </div>
            </div>

            {/* Student/Mentor Link */}
            <Button
              variant="outline"
              className="w-full border-slate-600 text-slate-200 hover:bg-slate-700 transition-all"
              onClick={() => navigate({ to: "/login" })}
            >
              Student / Mentor Login
            </Button>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center text-amber-200/40 text-sm mt-6 animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <p>Restricted Access - Authorized Personnel Only</p>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from { 
            opacity: 0;
            transform: scale(0.95);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
        }
        .animate-slide-in {
          animation: slide-in 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}

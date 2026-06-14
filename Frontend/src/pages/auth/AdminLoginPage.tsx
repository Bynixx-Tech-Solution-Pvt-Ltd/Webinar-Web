/**
 * ADMIN LOGIN PAGE
 * Modern animated admin-specific login
 * Restricted to admin users only
 */

import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/hooks/useAuth";
import { MOCK_LOGIN } from "@/lib/mock-auth";
import { Mail, Lock, Eye, EyeOff, Loader2, Shield, Sparkles, ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-learning.jpg";
import logoImg from "@/assets/logo.png";

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

      if (!result.success) {
        setError("Admin access only. Please use admin credentials.");
        return;
      }

      const user = result.user;

      if (!user || user.role !== "admin") {
        setError("Admin access only. Please use admin credentials.");
        return;
      }

      login(user, result.token);
      navigate({ to: "/admin" });
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(135deg,#07111f_0%,#172554_35%,#312e81_100%)] text-white">
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at top left, rgba(56, 189, 248, 0.18), transparent 20%), radial-gradient(circle at top right, rgba(168, 85, 247, 0.18), transparent 25%), radial-gradient(circle at bottom, rgba(129, 140, 248, 0.18), transparent 25%)" }} />
      <div className="absolute left-10 top-10 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-48 w-48 rounded-full bg-fuchsia-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-7xl items-center gap-10 px-6 py-10 lg:grid-cols-[1.02fr_0.98fr]">
        <section className="space-y-8 text-white">
          <Link to="/" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-slate-100/90 shadow-[0_12px_30px_rgba(15,23,42,0.25)] backdrop-blur-xl">
            <img src={logoImg} alt="Bynixx" className="h-6 w-6 rounded-md object-contain" />
            Bynixx Admin Access
          </Link>

          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs uppercase tracking-[0.35em] text-cyan-100">Secure admin panel</div>
            <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-white md:text-5xl">A simple admin login that feels like the homepage.</h1>
            <p className="max-w-lg text-base text-slate-100/80 md:text-lg">Use the same clean gradient, glassy panels, and educator-focused tone to keep the admin experience fast and welcoming.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: "Quick control", text: "Review learners, mentors, and live classes from one place." },
              { title: "Secure sign-in", text: "Verified admin-only credentials with a polished, simple flow." },
            ].map((item) => (
              <article key={item.title} className="rounded-3xl border border-white/10 bg-white/10 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.25)] backdrop-blur-xl">
                <p className="text-sm font-semibold text-white">{item.title}</p>
                <p className="mt-2 text-sm text-slate-100/80">{item.text}</p>
              </article>
            ))}
          </div>

          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/10 shadow-[0_24px_60px_rgba(15,23,42,0.35)] backdrop-blur-xl">
            <img src={heroImg} alt="Learning platform dashboard" className="h-56 w-full object-cover md:h-72" />
          </div>
        </section>

        <Card className="rounded-3xl border border-white/10 bg-slate-950/65 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.55)] backdrop-blur-xl md:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500 text-white shadow-[0_12px_30px_rgba(56,189,248,0.25)]">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-100/90">Admin login</p>
              <h2 className="text-2xl font-semibold text-white">Access the control center</h2>
            </div>
          </div>

          <div className="mb-5 flex items-center gap-2 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-xs text-emerald-100">
            <Sparkles className="h-4 w-4" />
            Secure session • demo credentials ready
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-100">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-100/80" />
                <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="admin@bynixx.com" className="h-11 rounded-2xl border-white/10 bg-white/8 pl-10 text-white placeholder:text-slate-300 focus:border-cyan-400/60 focus:ring-cyan-400/30" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-100">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-100/80" />
                <Input value={password} onChange={(e) => setPassword(e.target.value)} type={showPassword ? "text" : "password"} placeholder="••••••••" className="h-11 rounded-2xl border-white/10 bg-white/8 pl-10 pr-10 text-white placeholder:text-slate-300 focus:border-cyan-400/60 focus:ring-cyan-400/30" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-200 hover:text-white">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <Alert className="rounded-2xl border-red-400/30 bg-red-500/10 text-red-100">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="rounded-2xl border border-white/10 bg-white/8 p-3 text-xs text-slate-100/90">
              <p className="font-semibold text-white">Demo credentials</p>
              <p>Email: admin@bynixx.com</p>
              <p>Password: admin123</p>
            </div>

            <Button type="submit" disabled={isLoading} className="h-11 w-full rounded-2xl bg-gradient-to-r from-cyan-400 to-violet-500 text-white shadow-[0_16px_35px_rgba(56,189,248,0.25)] hover:from-cyan-300 hover:to-violet-400 disabled:cursor-not-allowed disabled:opacity-70">
              {isLoading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Authenticating...</>) : (<>Enter admin panel <ArrowRight className="ml-2 h-4 w-4" /></>)}
            </Button>
          </form>

          <div className="mt-5 flex items-center justify-between text-xs text-slate-200/90">
            <button type="button" onClick={() => navigate({ to: "/login" })} className="rounded-full border border-white/10 bg-white/8 px-3 py-2 hover:bg-white/10">Student / Mentor login</button>
            <span>Restricted access</span>
          </div>
        </Card>
      </div>
    </div>
  );
}

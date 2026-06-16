// Cleaned imports – removed duplicate Link from lucide-react and extra router import
import React, { useState, useRef } from "react";
import { BookOpenText } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import logoImg from "@/assets/logo.png";
import { Link as RouterLink } from "@tanstack/react-router";



/**
 * Sign‑In Page – uses the same glass‑morphism theme as the sign‑up page.
 * Demo credentials:
 *   username/email: "bynixx"
 *   password: "bynnixxgrow"
 */
export function LoginPage() {
  const navigate = useNavigate();
  const { login, setLoading, setError, isLoading, error } = useAuth();
  const [email, setEmail] = useState("by" + "nixx"); // default demo username
  const [password, setPassword] = useState("bynnixxgrow");
  const [showPassword, setShowPassword] = useState(false);

  const componentRef = useRef<HTMLDivElement | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (email === "bynixx" && password === "bynnixxgrow") {
        const user = {
          id: crypto.randomUUID(),
          name: "Bynixx User",
          email,
          role: "user",
          avatar: `https://api.dicebear.com/6.x/initials/svg?seed=Bynixx`,
        };
        login(user, "frontend-demo-token");
        navigate({ to: "/student" });
      } else {
        setError("Invalid credentials – use username: bynixx, password: bynnixxgrow");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const inputBase = "w-full border rounded-xl px-5 py-3.5 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-200/50";
  const glassStyle = "bg-white/50 backdrop-blur-sm border-white/60 placeholder-gray-500 text-blue-950 focus:bg-white/80 focus:border-blue-400";

  return (
    <div ref={componentRef} className="relative min-h-screen overflow-y-auto bg-gradient-to-br from-blue-50 via-blue-100/50 to-indigo-100 flex items-center justify-center p-4 md:p-20">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto items-center">
        {/* Left Column */}
        <div className="flex flex-col justify-center text-blue-950 pr-6 lg:pr-10">
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight uppercase flex items-center gap-3">
            <span className="p-2.5 bg-blue-600 rounded-lg text-white shadow-lg shadow-blue-600/30">
              <BookOpenText className="w-6 h-6 lg:w-7 lg:h-7" />
            </span>
            Bynix Education
          </h2>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            Welcome Back
          </h1>
          <p className="text-gray-700 text-lg lg:text-xl max-w-md leading-relaxed">
            Sign in to continue your learning journey with live webinars and exclusive content.
          </p>
        </div>
        {/* Right Column */}
        <Card className="w-full max-w-lg bg-white/40 backdrop-blur-xl p-8 rounded-3xl shadow-lg border border-white/20">
          <div className="flex justify-center mb-6">
            <img src={logoImg} alt="Bynixx" className="h-12 w-12" />
          </div>
          <h2 className="text-center text-2xl font-semibold mb-4 text-blue-950">Sign In</h2>
            <p className="text-center text-sm text-blue-900 mb-6">
              Don't have an account? <RouterLink to="/signup" className="text-blue-700 font-bold hover:underline">Sign up</RouterLink>
            </p>
          {error && <div className="text-sm text-red-600 bg-red-100/30 rounded p-2 mb-4">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <Input
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="username"
                className={`${inputBase} ${glassStyle} pl-10`}
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="password"
                className={`${inputBase} ${glassStyle} pl-10 pr-10`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-cyan-400 to-violet-500 text-white hover:from-cyan-300 hover:to-violet-400"
            >
              {isLoading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in...</>) : ("Sign In")}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
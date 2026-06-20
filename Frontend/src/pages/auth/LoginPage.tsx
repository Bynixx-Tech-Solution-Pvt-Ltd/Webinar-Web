import React, { useState, useEffect, useRef } from "react";
import { BookOpenText } from "lucide-react";
import { useNavigate, Link as RouterLink } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { animate, stagger } from 'animejs';

export function LoginPage() {
  const navigate = useNavigate();
  const { login, setLoading, setError, isLoading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Refs for animation targets
  const componentRef = useRef<HTMLDivElement | null>(null);
  const leftPanelRef = useRef<HTMLDivElement | null>(null);
  const formCardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (componentRef.current) {
      animate(componentRef.current, {
        opacity: [0, 1],
        easing: 'easeInOutQuad',
        duration: 1000,
      });
    }

    if (leftPanelRef.current) {
      animate(leftPanelRef.current?.children, {
        translateX: [-50, 0],
        opacity: [0, 1],
        delay: stagger(120),
        easing: 'easeOutQuad',
        duration: 800,
      });
    }

    if (formCardRef.current) {
      animate(formCardRef.current, {
        translateX: [100, 0],
        opacity: [0, 1],
        delay: 400,
        easing: 'easeOutCubic',
        duration: 1100,
      });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || 'Login failed');
        return;
      }
      // Assume backend returns userId and role
      const user = {
        id: data.userId,
        name: data.name || email,
        email,
        role: data.role,
        avatar: `https://api.dicebear.com/6.x/initials/svg?seed=${encodeURIComponent(email)}`,
      };
      login(user, data.token || 'backend-token');
      // Role‑based navigation
      const dest = data.role === 'admin' ? '/admin' : data.role === 'mentor' ? '/mentor' : '/student';
      navigate({ to: dest });
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const inputBaseStyles = "w-full border rounded-xl px-4 py-2.5 text-sm transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-200/50";
  const glassInputStyles = "bg-white/50 backdrop-blur-sm border-white/60 placeholder-gray-500 text-blue-950 focus:bg-white/80 focus:border-blue-400";

  return (
    <div
      ref={componentRef}
      className="relative min-h-screen overflow-y-auto bg-gradient-to-br from-blue-50 via-blue-100/50 to-indigo-100 flex items-center justify-center p-4 md:p-8 lg:p-12"
    >
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-7xl mx-auto items-center">
        {/* Left Column: Branding & Copy */}
        <div ref={leftPanelRef} className="flex flex-col justify-center text-blue-950 pr-4 lg:pr-8">
          <div className="mb-8 lg:mb-10">
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight uppercase flex items-center gap-3">
              <span className="p-2.5 bg-blue-600 rounded-lg text-white shadow-lg shadow-blue-600/30">
                <BookOpenText className="w-6 h-6 lg:w-7 lg:h-7" />
              </span>
              Bynix Education
            </h2>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
            Welcome <span className="text-blue-600">Back</span>
          </h1>
          <p className="text-gray-700 text-base lg:text-lg max-w-md leading-relaxed">
            Sign in to continue your learning journey with live webinars and exclusive content in cybersecurity, full stack development, and much more.
          </p>
          
          {/* Feature List */}
          <div className="mt-8 space-y-5 hidden sm:block">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shadow-sm border border-blue-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
              </div>
              <p className="text-gray-800 font-semibold text-base">Access to 100+ Live IT Webinars</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shadow-sm border border-blue-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
              </div>
              <p className="text-gray-800 font-semibold text-base">Expert-led Masterclasses & Labs</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shadow-sm border border-blue-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
              </div>
              <p className="text-gray-800 font-semibold text-base">Earn Recognized Certifications</p>
            </div>
          </div>
        </div>
        
        {/* Right Column: Form Card */}
        <div className="flex items-center justify-center w-full">
          <div 
            ref={formCardRef}
            className="w-full max-w-lg bg-white/40 backdrop-blur-xl p-6 sm:p-8 lg:p-10 rounded-3xl shadow-[0_30px_60px_rgba(37,99,235,0.15)] border border-white/60"
          >
            <div className="text-center mb-6">
              <h2 className="text-blue-950 text-xl font-bold flex items-center justify-center gap-2 mb-2">
                <span className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-xs text-white shadow-sm">B</span>
                BYNIX ID
              </h2>
              <h3 className="text-2xl lg:text-3xl font-extrabold text-blue-950 mb-2">Sign in</h3>
              <p className="text-gray-700 font-medium text-sm">Welcome back to Bynix Education.</p>
            </div>
            
            {error && <div className="text-sm text-red-600 bg-red-100/30 rounded p-2 mb-4 text-center">{error}</div>}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-gray-800 text-sm font-bold mb-1.5 ml-1">Email</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="username" 
                  className={`${inputBaseStyles} ${glassInputStyles}`}
                  required
                />
              </div>
              
              {/* Password */}
              <div>
                <label className="block text-gray-800 text-sm font-bold mb-1.5 ml-1">Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="password" 
                    className={`${inputBaseStyles} ${glassInputStyles} pr-10`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              
              {/* Submit */}
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl py-3 mt-4 text-sm transition-all duration-300 shadow-lg flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in...</> : "Sign In"}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-gray-700 text-sm font-medium hover:text-blue-800 transition-colors">
                Don't have an account? <RouterLink to="/signup" className="text-blue-700 font-bold hover:underline">Sign up</RouterLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
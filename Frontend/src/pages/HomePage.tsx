import * as React from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  GraduationCap,
  Map,
  CheckCircle2,
  Video,
  Bell,
  Award,
  Lock,
  Users,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  PlayCircle,
  Menu,
  X,
  BarChart3
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import heroImg from "@/assets/hero-learning.jpg";
import logoImg from "@/assets/logo.png";

const features = [
  { icon: Map, title: "Daily Roadmaps", desc: "Sequential learning paths that unlock as you complete tasks." },
  { icon: CheckCircle2, title: "Mentor Validation", desc: "Every submission reviewed by an expert mentor with feedback." },
  { icon: Video, title: "Live Sessions", desc: "Zoom & WebRTC powered live classes with attendance tracking." },
  { icon: Lock, title: "Task-Gated Progress", desc: "Master one module before moving to the next — no shortcuts." },
  { icon: Bell, title: "Smart Notifications", desc: "In-app and email alerts for tasks, feedback, and sessions." },
  { icon: Award, title: "Verified Certificates", desc: "Auto-generated certificates upon course completion." },
];

const roles = [
  { icon: GraduationCap, title: "For Students", points: ["Enroll in structured courses", "Follow daily roadmaps", "Submit tasks for review", "Track progress visually"] },
  { icon: Users, title: "For Mentors", points: ["View assigned students", "Review submissions", "Approve or request changes", "Host live sessions"] },
  { icon: ShieldCheck, title: "For Admins", points: ["Create & manage courses", "Manage users and roles", "Schedule live sessions", "Monitor analytics"] },
];

const steps = [
  { n: "01", title: "Enroll", desc: "Sign up and pick a career-aligned learning path." },
  { n: "02", title: "Learn Daily", desc: "Unlock one module per day with videos, docs and live classes." },
  { n: "03", title: "Submit Tasks", desc: "Upload work or share your GitHub link for mentor review." },
  { n: "04", title: "Get Certified", desc: "Complete the roadmap and earn a verified certificate." },
];

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how" },
  { label: "Roles", href: "#roles" },
  { label: "Mentor", to: "/mentor" },
  { label: "Admin", to: "/admin" },
];

export function HomePage() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 font-bold text-lg transition-transform hover:scale-105">
            <img src={logoImg} alt="Bynixx" className="h-8 w-8 rounded-md object-contain" />
            <span className="hidden sm:inline-block">Bynixx</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            {navLinks.map((link) => {
              const baseClass = "relative py-2 hover:text-primary transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full";
              return link.to ? (
                <Link key={link.label} to={link.to} className={baseClass}>
                  {link.label}
                </Link>
              ) : (
                <a key={link.label} href={link.href} className={baseClass}>
                  {link.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" className="hidden sm:inline-flex">Sign in</Button>
            </Link>
            <Link to="/login">
              <Button 
                style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-elegant)" }} 
                className="text-primary-foreground border-0 hover:opacity-90 hidden xs:inline-flex"
              >
                Get Started
              </Button>
            </Link>

            {/* Mobile Nav Trigger */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="size-6 text-foreground" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] border-l border-border/50 bg-background/95 backdrop-blur-xl">
                <SheetHeader className="text-left border-b pb-4 mb-6">
                  <SheetTitle className="flex items-center gap-2">
                    <div className="size-8 rounded-lg flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>
                      <Sparkles className="size-4 text-primary-foreground" />
                    </div>
                    Bynixx
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => {
                    const mobileClass = "text-lg font-semibold hover:text-primary transition-all duration-300 flex items-center justify-between group p-2 rounded-lg hover:bg-primary/5";
                    return link.to ? (
                      <Link 
                        key={link.label} 
                        to={link.to} 
                        onClick={() => setIsOpen(false)}
                        className={mobileClass}
                      >
                        {link.label}
                        <ArrowRight className="size-4 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                      </Link>
                    ) : (
                      <a 
                        key={link.label} 
                        href={link.href} 
                        onClick={() => setIsOpen(false)}
                        className={mobileClass}
                      >
                        {link.label}
                        <ArrowRight className="size-4 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                      </a>
                    );
                  })}
                  <div className="pt-6 mt-6 border-t border-border/50 flex flex-col gap-4">
                    <Link to="/login" onClick={() => setIsOpen(false)} className="w-full">
                      <Button variant="outline" className="w-full justify-start h-12">Sign in</Button>
                    </Link>
                    <Link to="/login" onClick={() => setIsOpen(false)} className="w-full">
                      <Button className="w-full h-12" style={{ background: "var(--gradient-primary)" }}>Get Started</Button>
                    </Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, white 1px, transparent 1px), radial-gradient(circle at 80% 70%, white 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="container mx-auto px-6 py-18 lg:py-28 grid lg:grid-cols-2 gap-8 items-center relative">
          <div className="text-primary-foreground animate-in fade-in slide-in-from-left duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs mb-6">
              <Sparkles className="size-3" /> Mentor-Driven Learning Platform
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              Learn by doing.<br />
              <span style={{ background: "linear-gradient(90deg, #fff, oklch(0.85 0.12 240))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Grow with mentors.
              </span>
            </h1>
            <p className="mt-6 text-lg text-white/80 max-w-xl">
              Bynixx turns courses into structured daily roadmaps. Submit tasks, get reviewed by real mentors, and unlock your next milestone — one validated step at a time.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 border-0 h-12 px-6 shadow-elegant transition-transform hover:scale-105">
                Start Learning Free <ArrowRight className="ml-2 size-4" />
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-white/30 text-white hover:bg-white/10 h-12 px-6 transition-transform hover:scale-105">
                <PlayCircle className="mr-2 size-4" /> Watch Demo
              </Button>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              {[["10K+", "Learners"], ["500+", "Mentors"], ["95%", "Completion"]].map(([n, l]) => (
                <div key={l} className="group cursor-default">
                  <div className="text-2xl font-bold transition-transform group-hover:scale-110 origin-left">{n}</div>
                  <div className="text-xs text-white/60 uppercase tracking-wider">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative animate-in fade-in slide-in-from-right duration-700">
            <div className="absolute -inset-4 rounded-3xl blur-3xl opacity-50" style={{ background: "var(--gradient-primary)" }} />
            <img src={heroImg} alt="Students learning" width={1536} height={1024} className="relative rounded-2xl shadow-2xl border border-white/10 transform transition-transform hover:scale-[1.02] duration-500" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 container mx-auto px-6 scroll-mt-20">
        <div className="max-w-2xl mb-16">
          <div className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Platform</div>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">Everything you need to learn, build and prove your skills.</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <Card key={f.title} className="p-8 border-border hover:border-primary/40 transition-all duration-300 group hover:-translate-y-2" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="size-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all" style={{ background: "var(--gradient-primary)" }}>
                <f.icon className="size-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-muted-foreground">{f.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-24 scroll-mt-20" style={{ background: "var(--gradient-soft)" }}>
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <div className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Workflow</div>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">A roadmap that locks you in — until you level up.</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={s.n} className="relative group">
                <Card className="p-8 h-full bg-card border-border transition-all group-hover:shadow-elegant group-hover:border-primary/20" style={{ boxShadow: "var(--shadow-card)" }}>
                  <div className="text-5xl font-bold mb-4 transform transition-transform group-hover:translate-x-2" style={{ background: "var(--gradient-primary)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.n}</div>
                  <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
                  <p className="text-muted-foreground text-sm">{s.desc}</p>
                </Card>
                {i < steps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-1/2 -right-5 -translate-y-1/2 size-6 text-primary/40 z-10 animate-pulse" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section id="roles" className="py-24 container mx-auto px-6 scroll-mt-20">
        <div className="max-w-2xl mb-16">
          <div className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Built for everyone</div>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">One platform. Three powerful experiences.</h2>
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          {roles.map((r) => (
            <Card key={r.title} className="p-8 border-border relative overflow-hidden group hover:shadow-elegant transition-all duration-300" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="absolute top-0 right-0 size-32 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" style={{ background: "var(--gradient-primary)" }} />
              <r.icon className="size-10 text-primary mb-5 transform transition-transform group-hover:scale-110 group-hover:-rotate-3" />
              <h3 className="text-2xl font-bold mb-4">{r.title}</h3>
              <ul className="space-y-3">
                {r.points.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-muted-foreground">
                    <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      {/* Live Sessions */}
      <section id="live" className="py-24 relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center text-primary-foreground">
          <div className="animate-in fade-in duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs mb-6">
              <Video className="size-3" /> Live Classes
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">Real mentors. Real-time.</h2>
            <p className="mt-6 text-lg text-white/80">
              Powered by Zoom integration and a native WebRTC fallback. Schedule sessions, track attendance, and stream recordings inside the course module.
            </p>
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              {["HD video & audio", "Auto-recording", "Attendance tracking", "Secure join links"].map((i) => (
                <div key={i} className="flex items-center gap-3 text-white/90 group cursor-default">
                  <CheckCircle2 className="size-5 text-white transition-transform group-hover:scale-125" />{i}
                </div>
              ))}
            </div>
          </div>
          <Card className="p-2 bg-white/10 backdrop-blur-xl border-white/20 transform transition-transform hover:rotate-1 duration-500">
            <div className="aspect-video rounded-lg bg-black/40 flex items-center justify-center relative overflow-hidden group cursor-pointer">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "radial-gradient(circle, oklch(0.68 0.18 250 / 0.4), transparent 70%)" }} />
              <PlayCircle className="size-20 text-white relative transition-transform group-hover:scale-110" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-sm">
                <span className="px-2 py-1 rounded bg-red-500 text-xs font-semibold animate-pulse">● LIVE</span>
                <span>248 watching</span>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 container mx-auto px-6">
        <Card className="p-12 lg:p-20 text-center relative overflow-hidden border-0 transform transition-transform hover:scale-[1.01] duration-500" style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-elegant)" }}>
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, white 2px, transparent 2px)", backgroundSize: "40px 40px" }} />
          <div className="relative text-primary-foreground max-w-2xl mx-auto">
            <BarChart3 className="size-12 mx-auto mb-6 animate-bounce" />
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">Ready to start your roadmap?</h2>
            <p className="mt-4 text-lg text-white/80">Join thousands of learners building real skills with mentor-guided structure.</p>
            <Button size="lg" className="mt-8 bg-white text-primary hover:bg-white/90 border-0 h-12 px-8 shadow-xl transition-all hover:px-10">
              Create Free Account <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2 font-semibold text-foreground">
            <div className="size-6 rounded-md" style={{ background: "var(--gradient-primary)" }} />
            Bynixx
          </div>
          <div>© 2026 Bynixx. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

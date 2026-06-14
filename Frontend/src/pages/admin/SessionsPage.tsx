import React, { useState } from "react";
import { 
  Video, Plus, Search, Calendar, Clock, User, CheckCircle2,
  Tv, MessageSquare, Sparkles, AlertCircle, Trash2
} from "lucide-react";
import { AdminLayoutWrapper } from "./AdminLayoutWrapper";
import { motion } from "framer-motion";

// Mock Live Sessions Data
const initialSessions = [
  { id: 1, topic: "Full-Stack Deployment & CI/CD Pipelines", instructor: "Anil Kumar", date: "June 14, 2026", time: "17:00 - 18:30", status: "Live Now", attendees: 340, previewUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=256" },
  { id: 2, topic: "Data Science Project Lifecycle & Pipelines", instructor: "Meera Joshi", date: "June 15, 2026", time: "11:00 - 12:30", status: "Scheduled", attendees: 180, previewUrl: "" },
  { id: 3, topic: "Figma Typography & Auto-Layout Advanced", instructor: "Karan Johar", date: "June 16, 2026", time: "15:00 - 16:30", status: "Scheduled", attendees: 220, previewUrl: "" },
  { id: 4, topic: "Dockerizing Applications & Multi-Stage Builds", instructor: "Amit Patel", date: "June 18, 2026", time: "18:00 - 19:30", status: "Scheduled", attendees: 150, previewUrl: "" }
];

export function SessionsPage() {
  const [sessions, setSessions] = useState(initialSessions);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [topic, setTopic] = useState("");
  const [instructor, setInstructor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleScheduleWebinar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic || !instructor) return;

    const newSession = {
      id: sessions.length + 1,
      topic,
      instructor,
      date: new Date(date).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' }),
      time,
      status: "Scheduled",
      attendees: 0,
      previewUrl: ""
    };

    setSessions([newSession, ...sessions]);
    setTopic("");
    setInstructor("");
    setDate("");
    setTime("");
    setIsScheduleOpen(false);
  };

  return (
    <AdminLayoutWrapper pageTitle="Live Sessions">
      <div className="space-y-6">
        
        {/* Scheduler Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/80 backdrop-blur-md p-4 border border-slate-200/60 rounded-2xl shadow-sm">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Webinar Coordinator</span>
            <h3 className="text-lg font-extrabold text-slate-800 tracking-tight mt-0.5">Live Sessions & Webinars</h3>
          </div>
          
          <button 
            onClick={() => setIsScheduleOpen(true)}
            className="w-full sm:w-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 active:scale-95 transition-all"
          >
            <Plus size={14} /> Schedule Webinar
          </button>
        </div>

        {/* Schedule Webinar Modal */}
        {isScheduleOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsScheduleOpen(false)} />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white border border-slate-200 rounded-3xl p-6 w-full max-w-md relative z-10 shadow-2xl"
            >
              <h3 className="text-lg font-extrabold text-slate-800 mb-2">Schedule Live Webinar</h3>
              <p className="text-slate-400 text-xs mb-6">Create a live interactive session for registered learners.</p>
              <form onSubmit={handleScheduleWebinar} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Session Topic</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. CI/CD pipelines walkthrough"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Instructor</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Anil Kumar"
                    value={instructor}
                    onChange={(e) => setInstructor(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Date</label>
                    <input 
                      type="date" 
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Time (Slot)</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. 17:00 - 18:30"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
                <div className="flex gap-2 justify-end pt-2">
                  <button 
                    type="button" 
                    onClick={() => setIsScheduleOpen(false)}
                    className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-semibold hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/10 hover:bg-indigo-500"
                  >
                    Schedule Session
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* Live Session Overview */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          
          {/* Timeline & Scheduler List */}
          <div className="xl:col-span-2 space-y-4">
            {sessions.map((session) => (
              <div 
                key={session.id} 
                className={`p-5 bg-white border rounded-3xl transition-all shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${
                  session.status === "Live Now" ? "border-cyan-200 shadow-md shadow-cyan-100/10 bg-gradient-to-r from-white to-cyan-50/10" : "border-slate-200/60 hover:bg-slate-50/20"
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {session.status === "Live Now" ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-red-100 text-red-600 animate-pulse border border-red-200">
                        <Tv size={10} /> LIVE NOW
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500 border border-slate-200">
                        SCHEDULED
                      </span>
                    )}
                    <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                      <Calendar size={12} /> {session.date}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                      <Clock size={12} /> {session.time}
                    </span>
                  </div>

                  <h4 className="font-extrabold text-slate-800 tracking-tight leading-snug">
                    {session.topic}
                  </h4>

                  <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                    <span className="flex items-center gap-1">
                      <User size={12} /> Instructor: {session.instructor}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={12} /> {session.attendees} learners
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto sm:justify-end">
                  {session.status === "Live Now" ? (
                    <button className="w-full sm:w-auto px-4 py-2 bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-bold text-xs rounded-xl shadow-md shadow-cyan-400/10 flex items-center justify-center gap-1.5 transition-all">
                      <Play size={12} /> Join Broadcast
                    </button>
                  ) : (
                    <button className="w-full sm:w-auto px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all">
                      Manage Room
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Live Monitor Stream preview (Glassmorphism card) */}
          <div className="bg-slate-950 text-white rounded-3xl p-6 border border-slate-800 shadow-xl relative overflow-hidden flex flex-col justify-between h-80">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none z-10" />
            <img 
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=350" 
              className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none" 
              alt="Live Broadcast Preview" 
            />

            <div className="relative z-20 flex justify-between items-start">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-black bg-red-600 text-white animate-pulse">
                REC
              </span>
              <span className="text-[10px] font-bold text-slate-400">Stream Feed 01</span>
            </div>

            <div className="relative z-20 space-y-3">
              <div>
                <h4 className="font-extrabold text-sm tracking-tight">Full-Stack Deployment walkthrough</h4>
                <p className="text-slate-400 text-xs mt-0.5">Host: Anil Kumar</p>
              </div>
              <div className="flex justify-between items-center text-xs font-semibold pt-2 border-t border-white/10 text-slate-300">
                <span>340 Live Viewers</span>
                <span className="text-cyan-400">99.8% Uptime</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </AdminLayoutWrapper>
  );
}

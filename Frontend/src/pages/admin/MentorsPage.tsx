import React, { useState } from "react";
import { 
  Users, UserPlus, Search, ShieldCheck, Mail, Star, 
  Video, BookOpen, ExternalLink, Award, Sparkles, MessageSquare 
} from "lucide-react";
import { AdminLayoutWrapper } from "./AdminLayoutWrapper";
import { motion } from "framer-motion";

// Mock Instructors Data
const initialInstructors = [
  { id: 1, name: "Anil Kumar", email: "anil.kumar@bynixx.com", rating: 4.9, courses: 3, webinars: 12, bio: "Former Tech Lead at Stripe. Specialized in React architecture, System Design, and Scalability.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120" },
  { id: 2, name: "Meera Joshi", email: "meera.joshi@bynixx.com", rating: 4.8, courses: 2, webinars: 8, bio: "Data Scientist. Ex-Google Brain team. Passionate about teaching Machine Learning, Python and AI systems.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=120" },
  { id: 3, name: "Karan Johar", email: "karan.johar@bynixx.com", rating: 4.9, courses: 2, webinars: 15, bio: "Product Designer. Loves designing intuitive interfaces and teaching Figma component libraries.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120" },
  { id: 4, name: "Amit Patel", email: "amit.patel@bynixx.com", rating: 4.6, courses: 1, webinars: 6, bio: "DevOps Consultant. Cloud Infrastructure architect with 10+ years managing production Kubernetes systems.", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120" }
];

export function MentorsPage() {
  const [instructors, setInstructors] = useState(initialInstructors);
  const [search, setSearch] = useState("");

  const filteredInstructors = instructors.filter(inst => 
    inst.name.toLowerCase().includes(search.toLowerCase()) || 
    inst.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayoutWrapper pageTitle="Instructors">
      <div className="space-y-6">
        
        {/* Header Search and Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/80 backdrop-blur-md p-4 border border-slate-200/60 rounded-2xl shadow-sm">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text"
              placeholder="Search instructors by name/email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-64 pl-10 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none"
            />
          </div>
          
          <button className="w-full sm:w-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 active:scale-95 transition-all">
            <UserPlus size={14} /> Add Instructor
          </button>
        </div>

        {/* Instructors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredInstructors.map((inst) => (
            <motion.div
              key={inst.id}
              whileHover={{ y: -3 }}
              className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img src={inst.avatar} alt={inst.name} className="w-12 h-12 rounded-2xl border border-slate-100 object-cover shadow-sm" />
                    <div>
                      <h4 className="font-extrabold text-slate-800 tracking-tight text-sm flex items-center gap-1">
                        {inst.name}
                        <ShieldCheck size={14} className="text-cyan-500" />
                      </h4>
                      <p className="text-[10px] text-slate-400 font-semibold">{inst.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-slate-50 border border-slate-100 rounded-xl px-2.5 py-1">
                    <Star size={12} className="fill-amber-400 text-amber-400" />
                    <span className="text-xs font-bold text-slate-700">{inst.rating}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed font-medium line-clamp-3">
                  {inst.bio}
                </p>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-slate-600">
                    <div className="p-1.5 bg-indigo-50 rounded-lg text-indigo-600">
                      <BookOpen size={14} />
                    </div>
                    <div>
                      <p className="text-[9px] text-slate-400 font-bold uppercase leading-none">Courses</p>
                      <p className="text-xs font-bold text-slate-700 mt-1">{inst.courses} published</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-slate-600">
                    <div className="p-1.5 bg-cyan-50 rounded-lg text-cyan-600">
                      <Video size={14} />
                    </div>
                    <div>
                      <p className="text-[9px] text-slate-400 font-bold uppercase leading-none">Webinars</p>
                      <p className="text-xs font-bold text-slate-700 mt-1">{inst.webinars} conducted</p>
                    </div>
                  </div>
                </div>

              </div>

              <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-slate-100">
                <button className="px-3 py-1.5 hover:bg-slate-50 border border-slate-200 text-slate-600 text-xs font-bold rounded-xl flex items-center gap-1">
                  <Mail size={12} /> Contact
                </button>
                <button className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-xl flex items-center gap-1">
                  View Profile <ExternalLink size={12} />
                </button>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </AdminLayoutWrapper>
  );
}

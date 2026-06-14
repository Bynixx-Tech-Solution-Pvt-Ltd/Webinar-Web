import React, { useState } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { 
  Users, UserPlus, Search, Filter, Mail, CheckCircle2, XCircle, 
  MoreVertical, ShieldAlert, Award, Play, ChevronLeft, ChevronRight,
  BookOpen, Plus
} from "lucide-react";
import { AdminLayoutWrapper } from "./AdminLayoutWrapper";
import { motion } from "framer-motion";

// Mock User Directory Data
const initialUsers = [
  { id: 1, name: "Aarav Sharma", email: "aarav.sharma@example.com", role: "Student", status: "Active", joined: "May 12, 2026", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=120" },
  { id: 2, name: "Priya Nair", email: "priya.nair@example.com", role: "Student", status: "Active", joined: "May 18, 2026", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120" },
  { id: 3, name: "Anil Kumar", email: "anil.kumar@example.com", role: "Mentor", status: "Active", joined: "Jan 02, 2026", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120" },
  { id: 4, name: "Meera Joshi", email: "meera.joshi@example.com", role: "Mentor", status: "Inactive", joined: "Feb 14, 2026", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=120" },
  { id: 5, name: "Vikram Singh", email: "vikram.singh@example.com", role: "Admin", status: "Active", joined: "Dec 01, 2025", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120" },
  { id: 6, name: "Sneha Iyer", email: "sneha.iyer@example.com", role: "Student", status: "Active", joined: "June 01, 2026", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=120" },
  { id: 7, name: "Amit Patel", email: "amit.patel@example.com", role: "Mentor", status: "Active", joined: "Mar 10, 2026", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120" }
];

// Mock Enrollments Data
const enrollmentsData = [
  { id: 101, student: "Aarav Sharma", course: "Full-Stack Web Dev Masterclass", progress: 85, status: "Active", date: "June 02, 2026" },
  { id: 102, student: "Priya Nair", course: "Data Science & Machine Learning Pro", progress: 100, status: "Completed", date: "June 04, 2026" },
  { id: 103, student: "Rohit Verma", course: "UI/UX Advanced Product Design Roadmap", progress: 45, status: "Active", date: "June 08, 2026" },
  { id: 104, student: "Sneha Iyer", course: "Full-Stack Web Dev Masterclass", progress: 12, status: "Active", date: "June 14, 2026" },
  { id: 105, student: "Siddharth Sen", course: "UI/UX Advanced Product Design Roadmap", progress: 0, status: "Pending", date: "June 14, 2026" }
];

export function UsersPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const tab = params.get("tab");

  const isEnrollments = location.pathname.includes("/admin/enrollments") || tab === "enrollments";
  const pageTitle = isEnrollments ? "Enrollments" : "User Management";

  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState("Student");

  // Filtering users
  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || 
                          u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "All" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail) return;

    const newUser = {
      id: users.length + 1,
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      status: "Active",
      joined: new Date().toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' }),
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120"
    };

    setUsers([newUser, ...users]);
    setNewUserName("");
    setNewUserEmail("");
    setIsInviteOpen(false);
  };

  const renderUsersList = () => (
    <div className="space-y-6">
      {/* Search and filter controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/80 backdrop-blur-md p-4 border border-slate-200/60 rounded-2xl shadow-sm">
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-64 pl-10 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none"
            />
          </div>
          <select 
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs focus:outline-none text-slate-600 font-semibold"
          >
            <option value="All">All Roles</option>
            <option value="Student">Students</option>
            <option value="Mentor">Mentors</option>
            <option value="Admin">Admins</option>
          </select>
        </div>
        
        <button 
          onClick={() => setIsInviteOpen(true)}
          className="w-full sm:w-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 active:scale-95 transition-all"
        >
          <UserPlus size={14} /> Invite User
        </button>
      </div>

      {/* Invite Modal */}
      {isInviteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsInviteOpen(false)} />
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white border border-slate-200 rounded-3xl p-6 w-full max-w-md relative z-10 shadow-2xl"
          >
            <h3 className="text-lg font-extrabold text-slate-800 mb-2">Invite New Member</h3>
            <p className="text-slate-400 text-xs mb-6">Send an invite link or create a user profile instantly.</p>
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Rahul Gupta"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="e.g. rahul@example.com"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">System Role</label>
                <select 
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none"
                >
                  <option value="Student">Student</option>
                  <option value="Mentor">Mentor (Instructor)</option>
                  <option value="Admin">Administrator</option>
                </select>
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <button 
                  type="button" 
                  onClick={() => setIsInviteOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/10 hover:bg-indigo-500"
                >
                  Create User
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50/80 text-slate-400 font-bold border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">User Details</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Registration Date</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => (
                <tr key={u.id} className="border-t border-slate-100 hover:bg-slate-50/30 transition-colors">
                  <td className="px-6 py-3.5 flex items-center gap-3">
                    <img src={u.avatar} alt={u.name} className="w-9 h-9 rounded-xl border border-slate-100 object-cover shadow-sm" />
                    <div>
                      <p className="font-bold text-slate-700">{u.name}</p>
                      <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{u.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-3.5 font-semibold text-slate-600">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      u.role === "Admin" ? "bg-purple-50 text-purple-600 border border-purple-100" :
                      u.role === "Mentor" ? "bg-cyan-50 text-cyan-600 border border-cyan-100" : "bg-indigo-50 text-indigo-600 border border-indigo-100"
                    }`}>{u.role}</span>
                  </td>
                  <td className="px-6 py-3.5">
                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold ${
                      u.status === "Active" ? "text-emerald-600" : "text-slate-400"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${u.status === "Active" ? "bg-emerald-500" : "bg-slate-300"}`} />
                      {u.status}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 font-medium text-slate-500">{u.joined}</td>
                  <td className="px-6 py-3.5 text-center">
                    <button className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderEnrollmentsList = () => (
    <div className="space-y-6">
      <div className="bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-4">
        <div>
          <h3 className="text-lg font-extrabold text-slate-800 tracking-tight">Active Pathway Enrollments</h3>
          <p className="text-slate-400 text-xs">Track student course progression, completion timelines, and access requests</p>
        </div>

        <div className="overflow-x-auto border border-slate-100 rounded-2xl">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50/80 text-slate-400 font-bold border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Course Name</th>
                <th className="px-6 py-4">Completion Progress</th>
                <th className="px-6 py-4">Enrollment Date</th>
                <th className="px-6 py-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {enrollmentsData.map((e) => (
                <tr key={e.id} className="border-t border-slate-100">
                  <td className="px-6 py-3.5 font-bold text-slate-700">{e.student}</td>
                  <td className="px-6 py-3.5 font-medium text-slate-600">{e.course}</td>
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-400" style={{ width: `${e.progress}%` }} />
                      </div>
                      <span className="font-bold text-slate-600">{e.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-3.5 text-slate-400">{e.date}</td>
                  <td className="px-6 py-3.5 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      e.status === "Completed" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" :
                      e.status === "Active" ? "bg-cyan-50 text-cyan-600 border border-cyan-100" : "bg-amber-50 text-amber-600 border border-amber-100"
                    }`}>{e.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <AdminLayoutWrapper pageTitle={pageTitle}>
      {isEnrollments ? renderEnrollmentsList() : renderUsersList()}
    </AdminLayoutWrapper>
  );
}

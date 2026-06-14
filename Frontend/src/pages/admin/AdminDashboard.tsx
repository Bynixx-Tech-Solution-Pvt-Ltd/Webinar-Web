import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { 
  Users, BookOpen, CreditCard, Play, Award, CheckCircle2, 
  TrendingUp, TrendingDown, ArrowRight, UserPlus, BookPlus, 
  CalendarRange, Send, FileSpreadsheet, Activity, ExternalLink,
  Star, ThumbsUp, RefreshCcw, Search, Filter, ShieldCheck, Mail
} from "lucide-react";
import { motion } from "framer-motion";
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, 
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line 
} from "recharts";
import { AdminLayoutWrapper } from "./AdminLayoutWrapper";

// Mock Data
const userGrowthData = [
  { month: "Jan", users: 4000, active: 2400 },
  { month: "Feb", users: 5500, active: 3100 },
  { month: "Mar", users: 7200, active: 4300 },
  { month: "Apr", users: 8900, active: 5500 },
  { month: "May", users: 10500, active: 7200 },
  { month: "Jun", users: 12480, active: 9820 }
];

const revenueData = [
  { month: "Jan", revenue: 1200000 },
  { month: "Feb", revenue: 1850000 },
  { month: "Mar", revenue: 2400000 },
  { month: "Apr", revenue: 2900000 },
  { month: "May", revenue: 3500000 },
  { month: "Jun", revenue: 3820000 }
];

const userTypeData = [
  { name: "Students", value: 12480, color: "#4F46E5" },
  { name: "Instructors", value: 850, color: "#00D4FF" },
  { name: "Admins", value: 24, color: "#10B981" },
  { name: "Guests", value: 3200, color: "#F59E0B" }
];

const recentActivity = [
  { type: "register", text: "Aarav Sharma registered as a student", time: "2m ago", user: "Aarav Sharma" },
  { type: "purchase", text: "Priya Nair purchased 'Data Science Pro'", time: "12m ago", detail: "₹4,999" },
  { type: "certificate", text: "Certificate issued to Rohit Verma", time: "1h ago", detail: "React Masterclass" },
  { type: "review", text: "Sneha Iyer rated 'UI/UX Roadmap' 5 stars", time: "3h ago", rating: 5 },
  { type: "webinar", text: "Live session 'Cloud Architect 101' scheduled", time: "5h ago", host: "Amit Patel" }
];

const topCourses = [
  { id: 1, name: "Full-Stack Web Dev Masterclass", instructor: "Anil Kumar", students: 1840, revenue: "₹92,00,000", rate: "96%", status: "Active" },
  { id: 2, name: "Data Science & Machine Learning Pro", instructor: "Meera Joshi", students: 1420, revenue: "₹71,00,000", rate: "92%", status: "Active" },
  { id: 3, name: "UI/UX Advanced Product Design Roadmap", instructor: "Karan Johar", students: 980, revenue: "₹49,00,000", rate: "95%", status: "Active" },
  { id: 4, name: "DevOps & Cloud Orchestration Mastery", instructor: "Amit Patel", students: 750, revenue: "₹37,50,000", rate: "88%", status: "Active" },
  { id: 5, name: "Next.js 15 App Router Deep-Dive", instructor: "Vikram Singh", students: 620, revenue: "₹31,00,000", rate: "94%", status: "Draft" }
];

export function AdminDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const tab = params.get("tab");
  
  const isCertificates = location.pathname.includes("/admin/certificates") || tab === "certificates";
  const isReviews = location.pathname.includes("/admin/reviews") || tab === "reviews";
  const pageTitle = isCertificates ? "Certificates" : isReviews ? "Reviews" : "Dashboard";

  const [timeString, setTimeString] = useState("");
  const [courseSearch, setCourseSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("All");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + " - " + now.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Filtered top courses
  const filteredCourses = topCourses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(courseSearch.toLowerCase()) || 
                          course.instructor.toLowerCase().includes(courseSearch.toLowerCase());
    const matchesFilter = courseFilter === "All" || course.status === courseFilter;
    return matchesSearch && matchesFilter;
  });

  const renderDashboardHome = () => (
    <div className="space-y-8">
      {/* Dashboard Hero Welcome */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-900 text-white rounded-3xl p-6 md:p-8 shadow-xl shadow-indigo-950/20 border border-white/10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase">Platform Overview</span>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Welcome Back, Administrator</h2>
            <p className="text-slate-300 text-sm max-w-xl">
              Here is what's happening on your platform today. Check registrations, track live user engagement, and approve webinar schedules.
            </p>
            <p className="text-xs text-slate-400 font-medium pt-1">
              {timeString}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => navigate({ to: "/admin/courses" })}
              className="px-4 py-2 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-cyan-400/20 transition-all active:scale-95 flex items-center gap-1.5"
            >
              <BookPlus size={14} /> Create Course
            </button>
            <button 
              onClick={() => navigate({ to: "/admin/sessions" })}
              className="px-4 py-2 bg-white/10 hover:bg-white/15 text-white border border-white/10 font-bold text-xs rounded-xl transition-all active:scale-95 flex items-center gap-1.5"
            >
              <CalendarRange size={14} /> Live Webinar
            </button>
          </div>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {[
          { label: "Total Users", value: "12,480", trend: "+8.2%", up: true, icon: Users, color: "text-indigo-600 bg-indigo-50 border-indigo-100" },
          { label: "Total Courses", value: "48", trend: "+6.0%", up: true, icon: BookOpen, color: "text-cyan-600 bg-cyan-50 border-cyan-100" },
          { label: "Total Revenue", value: "₹38.2L", trend: "+12.4%", up: true, icon: CreditCard, color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
          { label: "Active Sessions", value: "9,820", trend: "-2.1%", up: false, icon: Play, color: "text-rose-600 bg-rose-50 border-rose-100" },
          { label: "Total Enrollments", value: "24,850", trend: "+14.8%", up: true, icon: CheckCircle2, color: "text-amber-600 bg-amber-50 border-amber-100" },
          { label: "Completion Rate", value: "94.2%", trend: "+1.2%", up: true, icon: TrendingUp, color: "text-purple-600 bg-purple-50 border-purple-100" }
        ].map((card, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -4 }}
            className="bg-white/90 backdrop-blur-md border border-slate-200/60 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="flex justify-between items-start">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{card.label}</span>
              <div className={`p-1.5 rounded-xl border ${card.color}`}>
                <card.icon size={16} />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-bold text-slate-800 tracking-tight">{card.value}</h3>
              <div className="flex items-center gap-1 mt-1">
                {card.up ? (
                  <TrendingUp size={12} className="text-emerald-500" />
                ) : (
                  <TrendingDown size={12} className="text-rose-500" />
                )}
                <span className={`text-[10px] font-bold ${card.up ? "text-emerald-600" : "text-rose-600"}`}>
                  {card.trend}
                </span>
                <span className="text-[9px] text-slate-400 font-medium ml-0.5">vs last month</span>
              </div>
            </div>
            
            {/* Sparkline Visual Placeholder */}
            <div className="h-6 mt-3 opacity-40">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userGrowthData}>
                  <Line type="monotone" dataKey="active" stroke={card.up ? "#00D4FF" : "#F43F5E"} strokeWidth={1.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Charts & Activity Panel */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* User Growth & Revenue Overview */}
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-3xl p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h3 className="text-lg font-extrabold text-slate-800 tracking-tight">Revenue & Growth Trend</h3>
                <p className="text-slate-400 text-xs mt-0.5">Monthly platform overview and active users metrics</p>
              </div>
              <div className="flex gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 font-semibold px-2.5 py-1 bg-slate-50 rounded-lg border border-slate-200/50">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" /> Revenue
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 font-semibold px-2.5 py-1 bg-slate-50 rounded-lg border border-slate-200/50">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" /> Active Users
                </span>
              </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={userGrowthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.01}/>
                    </linearGradient>
                    <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00D4FF" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#00D4FF" stopOpacity={0.01}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)" }} />
                  <Area type="monotone" dataKey="users" stroke="#4F46E5" strokeWidth={2.5} fillOpacity={1} fill="url(#colorUsers)" />
                  <Area type="monotone" dataKey="active" stroke="#00D4FF" strokeWidth={2.5} fillOpacity={1} fill="url(#colorActive)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* User Statistics Donut Chart */}
        <div className="bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-3xl p-6 shadow-sm">
          <h3 className="text-lg font-extrabold text-slate-800 tracking-tight mb-2">User Distribution</h3>
          <p className="text-slate-400 text-xs mb-6">Demographics breakdown of platform registered users</p>
          <div className="h-48 flex justify-center items-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={userTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {userTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute flex flex-col items-center">
              <span className="text-2xl font-black text-slate-800 tracking-tight">16.5K</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Active</span>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {userTypeData.map((type, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: type.color }} />
                  <span className="text-slate-600">{type.name}</span>
                </div>
                <span className="text-slate-800 font-bold">{type.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Top Courses Table & Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Table - Top Courses */}
        <div className="xl:col-span-2 bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-lg font-extrabold text-slate-800 tracking-tight">Top Performing Courses</h3>
              <p className="text-slate-400 text-xs">Based on total students and monthly gross income</p>
            </div>
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input 
                  type="text"
                  placeholder="Filter courses..."
                  value={courseSearch}
                  onChange={(e) => setCourseSearch(e.target.value)}
                  className="w-full sm:w-44 pl-8 pr-3 py-1 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none"
                />
              </div>
              <select 
                value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-2 py-1 text-xs focus:outline-none text-slate-600"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto border border-slate-100 rounded-2xl">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50/80 text-slate-400 font-bold border-b border-slate-100">
                <tr>
                  <th className="px-4 py-3">Course Name</th>
                  <th className="px-4 py-3">Instructor</th>
                  <th className="px-4 py-3 text-right">Students</th>
                  <th className="px-4 py-3 text-right">Revenue</th>
                  <th className="px-4 py-3 text-center">Completion</th>
                  <th className="px-4 py-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.map((c) => (
                  <tr key={c.id} className="border-t border-slate-100 hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-3 font-bold text-slate-700 max-w-xs truncate">{c.name}</td>
                    <td className="px-4 py-3 font-medium text-slate-500">{c.instructor}</td>
                    <td className="px-4 py-3 text-right font-semibold text-slate-600">{c.students.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right font-bold text-indigo-600">{c.revenue}</td>
                    <td className="px-4 py-3 text-center font-bold text-cyan-600">{c.rate}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        c.status === "Active" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-slate-50 text-slate-500 border border-slate-100"
                      }`}>{c.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Column of Quick Actions & Recent Activity */}
        <div className="space-y-6">
          {/* Quick Actions Panel */}
          <div className="bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-3xl p-6 shadow-sm">
            <h3 className="text-lg font-extrabold text-slate-800 tracking-tight mb-4">Quick Operations</h3>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => navigate({ to: "/admin/courses" })}
                className="p-3 bg-indigo-50/50 hover:bg-indigo-50 border border-indigo-100 rounded-2xl flex flex-col items-center gap-2 text-center text-indigo-700 hover:scale-[1.02] transition-all"
              >
                <BookPlus size={20} className="text-indigo-600" />
                <span className="text-[10px] font-extrabold">Create Course</span>
              </button>
              <button 
                onClick={() => navigate({ to: "/admin/users" })}
                className="p-3 bg-cyan-50/50 hover:bg-cyan-50 border border-cyan-100 rounded-2xl flex flex-col items-center gap-2 text-center text-cyan-700 hover:scale-[1.02] transition-all"
              >
                <UserPlus size={20} className="text-cyan-600" />
                <span className="text-[10px] font-extrabold">Add User</span>
              </button>
              <button 
                onClick={() => navigate({ to: "/admin/sessions" })}
                className="p-3 bg-amber-50/50 hover:bg-amber-50 border border-amber-100 rounded-2xl flex flex-col items-center gap-2 text-center text-amber-700 hover:scale-[1.02] transition-all"
              >
                <CalendarRange size={20} className="text-amber-600" />
                <span className="text-[10px] font-extrabold">Webinar</span>
              </button>
              <button 
                onClick={() => navigate({ to: "/admin/analytics", search: { tab: "reports" } })}
                className="p-3 bg-emerald-50/50 hover:bg-emerald-50 border border-emerald-100 rounded-2xl flex flex-col items-center gap-2 text-center text-emerald-700 hover:scale-[1.02] transition-all"
              >
                <FileSpreadsheet size={20} className="text-emerald-600" />
                <span className="text-[10px] font-extrabold">Reports</span>
              </button>
            </div>
          </div>

          {/* Recent Activity Timeline */}
          <div className="bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-3xl p-6 shadow-sm">
            <h3 className="text-lg font-extrabold text-slate-800 tracking-tight mb-4">Activity Timeline</h3>
            <div className="space-y-4">
              {recentActivity.map((activity, idx) => (
                <div key={idx} className="flex gap-3 relative">
                  {idx !== recentActivity.length - 1 && (
                    <span className="absolute top-6 bottom-0 left-3 w-0.5 bg-slate-100" />
                  )}
                  <div className="w-6 h-6 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 shrink-0">
                    <Activity size={12} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-700">{activity.text}</p>
                    <div className="flex gap-2 items-center mt-1">
                      <span className="text-[9px] text-slate-400 font-bold">{activity.time}</span>
                      {activity.detail && (
                        <>
                          <span className="w-1 h-1 rounded-full bg-slate-300" />
                          <span className="text-[9px] font-bold text-indigo-600">{activity.detail}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );

  const renderCertificatesTab = () => (
    <div className="space-y-6">
      <div className="bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-lg font-extrabold text-slate-800 tracking-tight">Issued Certificates</h3>
            <p className="text-slate-400 text-xs">Verify and audit certificates granted to learners upon completing paths</p>
          </div>
          <button className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5">
            <Award size={14} /> Design Template
          </button>
        </div>

        <div className="overflow-x-auto border border-slate-100 rounded-2xl">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50/80 text-slate-400 font-bold border-b border-slate-100">
              <tr>
                <th className="px-4 py-3">Certificate ID</th>
                <th className="px-4 py-3">Student</th>
                <th className="px-4 py-3">Course / Pathway</th>
                <th className="px-4 py-3">Issued Date</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: "CERT-9821-XP", name: "Aarav Sharma", course: "Full-Stack Web Dev Masterclass", date: "June 12, 2026" },
                { id: "CERT-3294-LN", name: "Priya Nair", course: "Data Science & Machine Learning Pro", date: "June 10, 2026" },
                { id: "CERT-7482-AD", name: "Rohit Verma", course: "UI/UX Advanced Product Design Roadmap", date: "June 08, 2026" }
              ].map((cert) => (
                <tr key={cert.id} className="border-t border-slate-100">
                  <td className="px-4 py-3 font-mono font-bold text-slate-500">{cert.id}</td>
                  <td className="px-4 py-3 font-bold text-slate-700">{cert.name}</td>
                  <td className="px-4 py-3 font-medium text-slate-600">{cert.course}</td>
                  <td className="px-4 py-3 text-slate-400">{cert.date}</td>
                  <td className="px-4 py-3 text-center">
                    <button className="p-1 hover:bg-slate-100 rounded-lg text-indigo-600" title="Verify Online">
                      <ExternalLink size={14} />
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

  const renderReviewsTab = () => (
    <div className="space-y-6">
      <div className="bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-6">
        <div>
          <h3 className="text-lg font-extrabold text-slate-800 tracking-tight">Course & Mentor Reviews</h3>
          <p className="text-slate-400 text-xs">Moderate testimonials, respond to feedback, and view average course ratings</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-slate-50 border border-slate-200/50 rounded-2xl flex flex-col items-center justify-center">
            <span className="text-4xl font-black text-slate-800">4.8</span>
            <div className="flex gap-1 my-1.5">
              {[1,2,3,4,5].map(star => <Star key={star} size={16} className="fill-amber-400 text-amber-400" />)}
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Average Platform Rating</span>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-200/50 rounded-2xl flex flex-col justify-center space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span>5 Stars</span>
              <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="w-[85%] h-full bg-amber-400" />
              </div>
              <span className="font-bold">85%</span>
            </div>
            <div className="flex items-center justify-between">
              <span>4 Stars</span>
              <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="w-[12%] h-full bg-amber-400" />
              </div>
              <span className="font-bold">12%</span>
            </div>
            <div className="flex items-center justify-between">
              <span>3 Stars</span>
              <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="w-[3%] h-full bg-amber-400" />
              </div>
              <span className="font-bold">3%</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {[
            { student: "Sneha Iyer", course: "UI/UX Advanced Product Design Roadmap", comment: "An absolutely stellar course. The section on Figma component architecture saved me hours of planning at my current job. Highly recommend!", rating: 5, time: "3h ago" },
            { student: "Amit Trivedi", course: "Full-Stack Web Dev Masterclass", comment: "Good course structure, but I feel the deployment module could include more details about Kubernetes hosting.", rating: 4, time: "1d ago" }
          ].map((rev, idx) => (
            <div key={idx} className="p-4 border border-slate-100 rounded-2xl space-y-2 hover:bg-slate-50/30 transition-all">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-xs font-bold text-slate-800">{rev.student}</span>
                  <span className="text-[10px] text-slate-400 font-medium ml-2">on {rev.course}</span>
                </div>
                <span className="text-[10px] text-slate-400 font-bold">{rev.time}</span>
              </div>
              <div className="flex gap-0.5">
                {Array.from({ length: rev.rating }).map((_, i) => (
                  <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
              <div className="flex gap-2 pt-1">
                <button className="px-2.5 py-1 bg-slate-50 border border-slate-200/50 hover:bg-slate-100 text-[10px] font-bold text-slate-600 rounded-lg transition-all flex items-center gap-1">
                  <ThumbsUp size={10} /> Approve Review
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <AdminLayoutWrapper pageTitle={pageTitle}>
      {isCertificates && renderCertificatesTab()}
      {isReviews && renderReviewsTab()}
      {!isCertificates && !isReviews && renderDashboardHome()}
    </AdminLayoutWrapper>
  );
}

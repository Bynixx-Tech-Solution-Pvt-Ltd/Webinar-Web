import React, { useState } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { 
  BookOpen, Plus, Search, Filter, FolderHeart, BookCheck, 
  Trash2, Edit2, Play, Users, Eye, BarChart, Settings,
  AlertCircle
} from "lucide-react";
import { AdminLayoutWrapper } from "./AdminLayoutWrapper";
import { motion } from "framer-motion";

// Mock Course Catalog Data
const initialCourses = [
  { id: 1, name: "Full-Stack Web Dev Masterclass", category: "Programming", instructor: "Anil Kumar", students: 1840, completion: "96%", status: "Active", level: "Beginner", duration: "48 hours", price: "₹4,999" },
  { id: 2, name: "Data Science & Machine Learning Pro", category: "Data Science", instructor: "Meera Joshi", students: 1420, completion: "92%", status: "Active", level: "Intermediate", duration: "60 hours", price: "₹6,999" },
  { id: 3, name: "UI/UX Advanced Product Design Roadmap", category: "Design", instructor: "Karan Johar", students: 980, completion: "95%", status: "Active", level: "Advanced", duration: "32 hours", price: "₹3,999" },
  { id: 4, name: "DevOps & Cloud Orchestration Mastery", category: "DevOps", instructor: "Amit Patel", students: 750, completion: "88%", status: "Active", level: "Advanced", duration: "40 hours", price: "₹5,499" },
  { id: 5, name: "Next.js 15 App Router Deep-Dive", category: "Programming", instructor: "Vikram Singh", students: 620, completion: "94%", status: "Draft", level: "Intermediate", duration: "16 hours", price: "₹2,499" }
];

// Mock Categories Data
const initialCategories = [
  { id: 1, name: "Programming", coursesCount: 14, color: "bg-indigo-50 text-indigo-700 border-indigo-100" },
  { id: 2, name: "Data Science", coursesCount: 8, color: "bg-cyan-50 text-cyan-700 border-cyan-100" },
  { id: 3, name: "Design", coursesCount: 6, color: "bg-purple-50 text-purple-700 border-purple-100" },
  { id: 4, name: "DevOps", coursesCount: 5, color: "bg-emerald-50 text-emerald-700 border-emerald-100" },
  { id: 5, name: "Marketing", coursesCount: 3, color: "bg-amber-50 text-amber-700 border-amber-100" }
];

export function CoursesPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const tab = params.get("tab");

  const isCategories = location.pathname.includes("/admin/categories") || tab === "categories";
  const pageTitle = isCategories ? "Categories" : "Courses";

  const [courses, setCourses] = useState(initialCourses);
  const [categories, setCategories] = useState(initialCategories);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  
  // Create Course Form State
  const [courseName, setCourseName] = useState("");
  const [courseCategory, setCourseCategory] = useState("Programming");
  const [courseInstructor, setCourseInstructor] = useState("");
  const [courseLevel, setCourseLevel] = useState("Beginner");
  const [coursePrice, setCoursePrice] = useState("");

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseName || !courseInstructor) return;

    const newCourse = {
      id: courses.length + 1,
      name: courseName,
      category: courseCategory,
      instructor: courseInstructor,
      students: 0,
      completion: "0%",
      status: "Draft",
      level: courseLevel,
      duration: "20 hours",
      price: `₹${parseFloat(coursePrice).toLocaleString('en-IN')}`
    };

    setCourses([newCourse, ...courses]);
    setCourseName("");
    setCourseInstructor("");
    setCoursePrice("");
    setIsCreateOpen(false);
  };

  const filteredCourses = courses.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || 
                          c.instructor.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "All" || c.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const renderCoursesList = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/80 backdrop-blur-md p-4 border border-slate-200/60 rounded-2xl shadow-sm">
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text"
              placeholder="Search courses or mentors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-64 pl-10 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none"
            />
          </div>
          <select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs focus:outline-none text-slate-600 font-semibold"
          >
            <option value="All">All Categories</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>
        
        <button 
          onClick={() => setIsCreateOpen(true)}
          className="w-full sm:w-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 active:scale-95 transition-all"
        >
          <Plus size={14} /> Create Course
        </button>
      </div>

      {/* Course Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((c) => (
          <motion.div
            key={c.id}
            whileHover={{ y: -4 }}
            className="bg-white border border-slate-200/60 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
                  {c.category}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  c.status === "Active" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-slate-50 text-slate-400 border border-slate-100"
                }`}>
                  {c.status}
                </span>
              </div>
              
              <div>
                <h4 className="font-extrabold text-slate-800 tracking-tight leading-snug line-clamp-2 hover:text-indigo-600 cursor-pointer">
                  {c.name}
                </h4>
                <p className="text-slate-400 text-[11px] font-medium mt-1">Instructor: {c.instructor}</p>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center">
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Students</p>
                  <p className="text-sm font-bold text-slate-700 mt-0.5">{c.students.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Level</p>
                  <p className="text-sm font-bold text-slate-700 mt-0.5">{c.level}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Price</p>
                  <p className="text-sm font-extrabold text-indigo-600 mt-0.5">{c.price}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 mt-6 pt-4 border-t border-slate-100">
              <span className="text-[11px] font-bold text-slate-400">Duration: {c.duration}</span>
              <div className="flex gap-1">
                <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600">
                  <Edit2 size={14} />
                </button>
                <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-red-500">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Create Course Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsCreateOpen(false)} />
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white border border-slate-200 rounded-3xl p-6 w-full max-w-md relative z-10 shadow-2xl"
          >
            <h3 className="text-lg font-extrabold text-slate-800 mb-2">Create New Course</h3>
            <p className="text-slate-400 text-xs mb-6">Create a draft version of your course curriculum.</p>
            <form onSubmit={handleCreateCourse} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Course Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Next.js 15 Masterclass"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Category</label>
                <select 
                  value={courseCategory}
                  onChange={(e) => setCourseCategory(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none"
                >
                  <option value="Programming">Programming</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Design">Design</option>
                  <option value="DevOps">DevOps</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Instructor</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Meera Joshi"
                  value={courseInstructor}
                  onChange={(e) => setCourseInstructor(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Level</label>
                  <select 
                    value={courseLevel}
                    onChange={(e) => setCourseLevel(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Price (INR)</label>
                  <input 
                    type="number" 
                    required
                    placeholder="e.g. 4999"
                    value={coursePrice}
                    onChange={(e) => setCoursePrice(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <button 
                  type="button" 
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/10 hover:bg-indigo-500"
                >
                  Create Draft
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );

  const renderCategoriesList = () => (
    <div className="space-y-6">
      <div className="bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-4">
        <div>
          <h3 className="text-lg font-extrabold text-slate-800 tracking-tight">Pathway Categories</h3>
          <p className="text-slate-400 text-xs">Organize curriculum and webinars under top-level subject areas</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div key={cat.id} className="p-5 bg-white border border-slate-200/60 rounded-3xl flex justify-between items-center shadow-sm">
              <div className="space-y-1">
                <h4 className="font-bold text-slate-800 text-sm">{cat.name}</h4>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">{cat.coursesCount} active paths</p>
              </div>
              <span className={`px-3 py-1 rounded-xl text-xs font-semibold border ${cat.color}`}>
                Active
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <AdminLayoutWrapper pageTitle={pageTitle}>
      {isCategories ? renderCategoriesList() : renderCoursesList()}
    </AdminLayoutWrapper>
  );
}

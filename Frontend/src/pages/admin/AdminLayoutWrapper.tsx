import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "@tanstack/react-router";
import { 
  LayoutDashboard, Users, BookOpen, FolderHeart, UserSquare2, 
  UserCheck, Video, Award, MessageSquare, CreditCard, 
  BarChart3, Settings, Menu, X, Search, Bell, Calendar, 
  Sun, Moon, ChevronRight, Plus, LogOut, ChevronLeft
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";

interface AdminLayoutWrapperProps {
  children: React.ReactNode;
  pageTitle: string;
}

export function AdminLayoutWrapper({ children, pageTitle }: AdminLayoutWrapperProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };

  // Sidebar items grouped by section
  const menuGroups = [
    {
      title: "Core",
      items: [
        { label: "Dashboard", icon: LayoutDashboard, to: "/admin" },
        { label: "Users", icon: Users, to: "/admin/users" },
        { label: "Courses", icon: BookOpen, to: "/admin/courses" },
        { label: "Categories", icon: FolderHeart, to: "/admin/categories" },
      ]
    },
    {
      title: "People & Sessions",
      items: [
        { label: "Instructors", icon: UserSquare2, to: "/admin/mentors" },
        { label: "Enrollments", icon: UserCheck, to: "/admin/enrollments" },
        { label: "Live Sessions", icon: Video, to: "/admin/sessions" },
      ]
    },
    {
      title: "Quality & Finance",
      items: [
        { label: "Certificates", icon: Award, to: "/admin/certificates" },
        { label: "Reviews", icon: MessageSquare, to: "/admin/reviews" },
        { label: "Payments", icon: CreditCard, to: "/admin/payments" },
      ]
    },
    {
      title: "Management",
      items: [
        { label: "Reports", icon: BarChart3, to: "/admin/reports" },
        { label: "Settings", icon: Settings, to: "/admin/settings" },
      ]
    }
  ];

  // Helper to check if an item is active
  const isActive = (item: { to: string }) => {
    return location.pathname === item.to || (location.pathname === "/admin/" && item.to === "/admin");
  };

  const handleNavigation = (item: { to: string }) => {
    navigate({ to: item.to });
    setIsMobileMenuOpen(false);
  };

  return (
    <div className={`min-h-screen bg-slate-50 text-slate-800 font-sans antialiased selection:bg-cyan-200`}>
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35 pointer-events-none" />

      {/* Main Container */}
      <div className="flex relative z-10 min-h-screen">
        
        {/* SIDEBAR - DESKTOP */}
        <aside 
          className={`hidden lg:flex flex-col border-r border-slate-200/80 bg-white/70 backdrop-blur-xl transition-all duration-300 ${
            isSidebarCollapsed ? "w-20" : "w-64"
          }`}
        >
          {/* Logo Section */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white font-bold text-lg shrink-0">
                B
              </div>
              {!isSidebarCollapsed && (
                <motion.span 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="font-bold text-lg tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-900 bg-clip-text text-transparent"
                >
                  Bynixx <span className="text-cyan-500 text-xs font-semibold uppercase tracking-wider">Console</span>
                </motion.span>
              )}
            </div>
            
            <button 
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="p-1.5 rounded-lg border border-slate-100 hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-colors"
            >
              {isSidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
          </div>

          {/* Navigation Menu */}
          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-none">
            {menuGroups.map((group, groupIdx) => (
              <div key={groupIdx} className="space-y-1">
                {!isSidebarCollapsed && (
                  <p className="px-3 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                    {group.title}
                  </p>
                )}
                {group.items.map((item, itemIdx) => {
                  const active = isActive(item);
                  return (
                    <button
                      key={itemIdx}
                      onClick={() => handleNavigation(item)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 group relative ${
                        active 
                          ? "bg-gradient-to-r from-cyan-50 to-indigo-50/30 text-indigo-700 font-semibold shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_4px_12px_-4px_rgba(0,212,255,0.15)] border-l-4 border-cyan-400" 
                          : "text-slate-500 hover:text-slate-800 hover:bg-slate-100/50"
                      }`}
                    >
                      <item.icon 
                        size={18} 
                        className={`transition-colors shrink-0 ${
                          active ? "text-cyan-500" : "text-slate-400 group-hover:text-slate-600"
                        }`} 
                      />
                      {!isSidebarCollapsed && (
                        <span className="text-sm truncate">{item.label}</span>
                      )}
                      {active && !isSidebarCollapsed && (
                        <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Bottom Profile/Logout */}
          <div className="p-4 border-t border-slate-100 bg-slate-50/50">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
            >
              <LogOut size={18} className="shrink-0" />
              {!isSidebarCollapsed && <span className="text-sm font-medium">Log out</span>}
            </button>
          </div>
        </aside>

        {/* SIDEBAR - MOBILE DRAWER */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
              />
              {/* Menu content */}
              <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 bottom-0 left-0 z-50 w-72 bg-white flex flex-col shadow-2xl lg:hidden"
              >
                <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white font-bold text-lg">
                      B
                    </div>
                    <span className="font-bold text-lg tracking-tight text-slate-900">Bynixx Console</span>
                  </div>
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1.5 rounded-lg border border-slate-100 hover:bg-slate-50 text-slate-400"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
                  {menuGroups.map((group, groupIdx) => (
                    <div key={groupIdx} className="space-y-1">
                      <p className="px-3 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                        {group.title}
                      </p>
                      {group.items.map((item, itemIdx) => {
                        const active = isActive(item);
                        return (
                          <button
                            key={itemIdx}
                            onClick={() => handleNavigation(item)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 group relative ${
                              active 
                                ? "bg-gradient-to-r from-cyan-50 to-indigo-50/30 text-indigo-700 font-semibold border-l-4 border-cyan-400 shadow-sm" 
                                : "text-slate-500 hover:text-slate-800 hover:bg-slate-100/50"
                            }`}
                          >
                            <item.icon size={18} className={active ? "text-cyan-500" : "text-slate-400"} />
                            <span className="text-sm">{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t border-slate-100 bg-slate-50/50">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={18} />
                    <span className="text-sm font-medium">Log out</span>
                  </button>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* CONTENT AREA */}
        <div className="flex-1 flex flex-col min-w-0">
          
          {/* TOP NAVIGATION BAR */}
          <header className="h-16 border-b border-slate-200/80 bg-white/70 backdrop-blur-xl sticky top-0 z-30 flex items-center justify-between px-6">
            
            {/* Left elements: mobile menu toggle & breadcrumbs */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 -ml-2 rounded-lg text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-colors"
              >
                <Menu size={20} />
              </button>

              {/* Breadcrumbs */}
              <nav className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-400">
                <span className="hover:text-slate-600 cursor-pointer" onClick={() => navigate({ to: "/admin" })}>Admin</span>
                <ChevronRight size={12} />
                <span className="text-slate-800 font-semibold">{pageTitle}</span>
              </nav>
            </div>

            {/* Middle elements: Global search */}
            <div className="hidden md:flex items-center w-80 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text"
                placeholder="Search resources, users, sessions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/80 transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
              />
            </div>

            {/* Right elements: quick create, calendar, notifications, profile */}
            <div className="flex items-center gap-3">
              
              {/* Quick Create Button */}
              <button 
                onClick={() => navigate({ to: "/admin/courses" })}
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-600/10 hover:shadow-lg hover:shadow-indigo-600/20 active:scale-95 transition-all"
              >
                <Plus size={14} />
                Quick Create
              </button>

              {/* Calendar ShortCut */}
              <button 
                onClick={() => navigate({ to: "/admin/sessions" })}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl border border-slate-100 transition-all relative"
                title="Calendar / Live Sessions"
              >
                <Calendar size={18} />
              </button>

              {/* Notification Center */}
              <div className="relative">
                <button 
                  onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl border border-slate-100 transition-all relative"
                >
                  <Bell size={18} />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400" />
                </button>

                {/* Notifications Dropdown */}
                <AnimatePresence>
                  {isNotificationOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setIsNotificationOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/50 z-50 p-4"
                      >
                        <h4 className="font-bold text-sm text-slate-800 mb-3 flex justify-between items-center">
                          <span>Notifications</span>
                          <span className="text-xs font-normal text-indigo-600 hover:underline cursor-pointer">Mark all read</span>
                        </h4>
                        <div className="space-y-3 max-h-60 overflow-y-auto">
                          {[
                            { title: "New Enrollment", desc: "Siddharth joined UI/UX Design course", time: "2m ago" },
                            { title: "Review Submitted", desc: "5-star rating on Next.js 15 course", time: "1h ago" },
                            { title: "Webinar Scheduled", desc: "Live session starts in 1 hour", time: "3h ago" }
                          ].map((notif, idx) => (
                            <div key={idx} className="p-2.5 hover:bg-slate-50 rounded-xl border border-transparent hover:border-slate-100 transition-all cursor-pointer">
                              <p className="text-xs font-bold text-slate-800">{notif.title}</p>
                              <p className="text-[11px] text-slate-500 mt-0.5">{notif.desc}</p>
                              <span className="text-[9px] font-medium text-cyan-500 mt-1 block">{notif.time}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Dark Mode Mock Toggle */}
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl border border-slate-100 transition-all"
              >
                {isDarkMode ? <Sun size={18} className="text-amber-500" /> : <Moon size={18} />}
              </button>

              <div className="h-6 w-px bg-slate-200 mx-1" />

              {/* Profile dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center gap-2.5 p-1 pr-3 border border-slate-100 hover:bg-slate-50 rounded-xl transition-all cursor-pointer"
                >
                  <img 
                    src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256"} 
                    alt={user?.name || "Admin User"} 
                    className="h-8 w-8 rounded-lg border border-slate-100 object-cover shadow-sm"
                  />
                  <div className="hidden sm:block text-left shrink-0">
                    <p className="text-xs font-bold text-slate-800 leading-none">{user?.name || "Admin Portal"}</p>
                    <p className="text-[10px] font-medium text-slate-400 capitalize mt-0.5">{user?.role || "Administrator"}</p>
                  </div>
                </button>

                <AnimatePresence>
                  {isProfileDropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setIsProfileDropdownOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/50 z-50 p-2"
                      >
                        <div className="px-3 py-2 border-b border-slate-100 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                          My Account
                        </div>
                        <button 
                          onClick={() => { navigate({ to: "/admin/settings" }); setIsProfileDropdownOpen(false); }}
                          className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded-lg transition-all"
                        >
                          Profile Settings
                        </button>
                        <button 
                          onClick={handleLogout}
                          className="w-full text-left px-3 py-2 text-xs text-red-600 hover:bg-red-50 rounded-lg transition-all flex items-center gap-1.5"
                        >
                          <LogOut size={12} />
                          Log Out
                        </button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

            </div>

          </header>

          {/* MAIN PAGE SHELL CONTENT */}
          <main className="flex-1 p-6 overflow-y-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          </main>

        </div>
      </div>
    </div>
  );
}

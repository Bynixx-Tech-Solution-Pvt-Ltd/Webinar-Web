'use client';

import { useState, useEffect, ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate, useLocation } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import {
  BarChart3,
  BookOpen,
  Calendar,
  CheckCircle2,
  Flame,
  Home,
  Lock,
  LogOut,
  MessageSquare,
  Plus,
  Settings,
  Star,
  Zap,
  Award,
  Bell,
  Search,
  Menu,
} from 'lucide-react';
import { motion } from 'framer-motion';

// ============================================================
// NAVIGATION ITEMS
// ============================================================

export const navItems = [
  { icon: Home, label: 'Dashboard', path: '/student' },
  { icon: BookOpen, label: 'My Courses', path: '/student/courses' },
  { icon: Calendar, label: 'Roadmap', path: '/student/roadmap' },
  { icon: Zap, label: 'Learning Content', path: '/student/content' },
  { icon: BarChart3, label: 'Live Sessions', path: '/student/sessions' },
  { icon: CheckCircle2, label: 'Tasks & Submissions', path: '/student/tasks' },
  { icon: Star, label: 'Assessments', path: '/student/assessments' },
  { icon: MessageSquare, label: 'Mentor Feedback', path: '/student/feedback' },
  { icon: Award, label: 'Projects', path: '/student/projects' },
  { icon: Award, label: 'Certificates', path: '/student/certificates' },
  { icon: Home, label: 'Community', path: '/student/community' },
  { icon: Bell, label: 'Notifications', path: '/student/notifications' },
  { icon: Settings, label: 'Profile Settings', path: '/student/settings' },
];

// ============================================================
// SIDEBAR COMPONENT
// ============================================================

function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      {isOpen && isMobile && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-30"
        />
      )}
      <motion.aside
        initial={false}
        animate={{ x: isMobile && !isOpen ? -300 : 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed lg:static left-0 top-0 h-screen w-64 bg-linear-to-b from-[#5B4AAB] to-[#3D2E7F] text-white shadow-lg z-40 flex-col ${
          isMobile && !isOpen ? 'hidden' : 'flex'
        } lg:flex`}
      >
        {/* Fixed Logo Section */}
        <div className="p-6 border-b border-white/10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center font-bold text-[#5B4AAB]">
              B
            </div>
            <div>
              <h1 className="text-xl font-bold">Bynixx</h1>
              <p className="text-xs text-white/70">Learning Platform</p>
            </div>
          </motion.div>
        </div>

        {/* Scrollable Content Section */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Navigation */}
            <nav className="space-y-2">
              {navItems.map((item, index) => {
                // Check if item path is the active path
                const isSelected = item.path === '/student'
                  ? location.pathname === '/student' || location.pathname === '/student/'
                  : location.pathname.startsWith(item.path);

                return (
                  <motion.button
                    key={index}
                    whileHover={{ x: 4 }}
                    onClick={() => {
                      navigate({ to: item.path });
                      onClose();
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </motion.button>
                );
              })}
            </nav>

            {/* Upgrade Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-linear-to-br from-white/10 to-white/5 border border-white/20 rounded-lg p-4"
            >
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-5 h-5 text-yellow-300" />
                <h3 className="text-sm font-bold">Upgrade to Pro</h3>
              </div>
              <p className="text-xs text-white/70 mb-4">
                Unlock premium content, AI assistant and more.
              </p>
              <Button className="w-full bg-white text-[#5B4AAB] hover:bg-gray-100 font-semibold text-sm">
                Upgrade Now
              </Button>
            </motion.div>

            {/* Logout Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              onClick={() => {
                logout();
                navigate({ to: '/' });
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors text-left"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm font-medium">Logout</span>
            </motion.button>
          </div>
        </div>
      </motion.aside>
    </>
  );
}

// ============================================================
// HEADER COMPONENT
// ============================================================

function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const { user } = useAuth();
  
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-20 py-4 px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back,</h1>
            <p className="text-sm text-gray-600">{user?.name || 'Karthik'} 👋</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center bg-gray-100 rounded-lg px-3 py-2 gap-2">
            <Search className="w-5 h-5 text-gray-600" />
            <input
              type="text"
              placeholder="Search for courses, topics, tasks..."
              className="bg-transparent outline-none text-sm text-gray-700 placeholder-gray-500 w-64"
            />
            <span className="text-xs text-gray-500">Ctrl + K</span>
          </div>

          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Calendar className="w-6 h-6 text-gray-700" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-6 h-6 text-gray-700" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#5B4AAB] to-[#3D2E7F] flex items-center justify-center text-white font-bold">
            {(user?.name || 'Karthik')[0]}
          </div>
        </div>
      </div>
    </header>
  );
}

// ============================================================
// STUDENT LAYOUT MAIN
// ============================================================

export function StudentLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

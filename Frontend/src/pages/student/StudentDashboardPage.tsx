'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from '@tanstack/react-router';
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
  ChevronRight,
  Award,
  Bell,
  Search,
  Menu,
  X,
} from 'lucide-react';
import { motion } from 'framer-motion';

// ============================================================
// TYPES & INTERFACES
// ============================================================

interface RoadmapDay {
  day: number;
  title: string;
  status: 'completed' | 'in-progress' | 'locked';
}

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface Course {
  id: string;
  name: string;
  progress: number;
  image: string;
}

interface UpcomingSession {
  id: string;
  type: 'live' | 'mentor';
  title: string;
  date: string;
  time: string;
  mentor?: string;
}

interface TodoItem {
  id: string;
  title: string;
  dueDate: string;
  daysLeft: number;
  completed: boolean;
}

// ============================================================
// MOCK DATA
// ============================================================

const mockRoadmap: RoadmapDay[] = [
  { day: 1, title: 'Intro', status: 'completed' },
  { day: 2, title: 'Basics', status: 'completed' },
  { day: 3, title: 'Advanced', status: 'completed' },
  { day: 4, title: 'Feature Eng', status: 'in-progress' },
  { day: 5, title: 'Day 5', status: 'locked' },
  { day: 6, title: 'Day 6', status: 'locked' },
  { day: 7, title: 'Day 7', status: 'locked' },
  { day: 8, title: 'Day 8', status: 'locked' },
];

const mockTasks: Task[] = [
  { id: '1', title: 'Watch Video: Feature Engineering', completed: true },
  { id: '2', title: 'Practice: Feature Scaling', completed: true },
  { id: '3', title: 'Quiz: Feature Engineering Basics', completed: true },
  { id: '4', title: 'Project: Build ML Pipeline', completed: false },
];

const mockCourses: Course[] = [
  {
    id: '1',
    name: 'AI & Machine Learning Engineer Program',
    progress: 67,
    image: 'https://images.unsplash.com/photo-1677442d019cecf3d4a96ad567d5e1a4eef3f58c?w=400&q=80',
  },
  {
    id: '2',
    name: 'Cybersecurity Professional Track',
    progress: 45,
    image: 'https://images.unsplash.com/photo-1614694267537-b85ca80080f5?w=400&q=80',
  },
];

const mockSessions: UpcomingSession[] = [
  {
    id: '1',
    type: 'live',
    title: 'Machine Learning Basics',
    date: 'MAY 24',
    time: '10:00 AM - 11:30 AM',
    mentor: 'Dr. Priya Sharma',
  },
  {
    id: '2',
    type: 'mentor',
    title: 'Project Discussion',
    date: 'MAY 26',
    time: '04:00 PM - 05:00 PM',
    mentor: 'Arun Kumar',
  },
];

const mockTodos: TodoItem[] = [
  { id: '1', title: 'Submit Day 4 Project', dueDate: '2 days', daysLeft: 2, completed: false },
  { id: '2', title: 'Complete Quiz: Day 4', dueDate: '2 days', daysLeft: 2, completed: false },
  { id: '3', title: 'Read: Ensemble Learning', dueDate: '4 days', daysLeft: 4, completed: false },
  { id: '4', title: 'Attend Live Session', dueDate: '5 days', daysLeft: 5, completed: false },
];

const skills = [
  { name: 'Python', progress: 80 },
  { name: 'Machine Learning', progress: 65 },
  { name: 'Deep Learning', progress: 40 },
  { name: 'SQL', progress: 70 },
  { name: 'Data Analysis', progress: 60 },
];

// ============================================================
// NAVIGATION ITEMS
// ============================================================

const navItems = [
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
        className="hidden lg:flex fixed lg:static left-0 top-0 h-screen w-64 bg-linear-to-b from-[#5B4AAB] to-[#3D2E7F] text-white shadow-lg z-40 flex-col"
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
              {navItems.map((item, index) => (
                <motion.button
                  key={index}
                  whileHover={{ x: 4 }}
                  onClick={() => {
                    navigate({ to: item.path });
                    onClose();
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    index === 0
                      ? 'bg-white/20 text-white'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </motion.button>
              ))}
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
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
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
            <p className="text-sm text-gray-600">Karthik 👋</p>
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

          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-6 h-6 text-gray-700" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#5B4AAB] to-[#3D2E7F] flex items-center justify-center text-white font-bold">
            K
          </div>
        </div>
      </div>
    </header>
  );
}

// ============================================================
// MAIN PAGE COMPONENT
// ============================================================

export function StudentDashboardPage() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!user && !token) {
      navigate({ to: '/login' });
    }
  }, [user, token, navigate]);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-8 max-w-7xl mx-auto">
            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            >
              <StatCard
                icon={<Star className="w-6 h-6" />}
                label="Overall Progress"
                value="67%"
                subtext="Keep going!"
                bgColor="bg-gradient-to-br from-purple-100 to-purple-50"
                iconColor="text-purple-600"
              />
              <StatCard
                icon={<CheckCircle2 className="w-6 h-6" />}
                label="Tasks Completed"
                value="23 / 35"
                subtext="This Month"
                bgColor="bg-gradient-to-br from-green-100 to-green-50"
                iconColor="text-green-600"
              />
              <StatCard
                icon={<Zap className="w-6 h-6" />}
                label="Skills Acquired"
                value="14"
                subtext="View all"
                bgColor="bg-gradient-to-br from-blue-100 to-blue-50"
                iconColor="text-blue-600"
              />
              <StatCard
                icon={<Award className="w-6 h-6" />}
                label="Certificates Earned"
                value="3"
                subtext="View certificates"
                bgColor="bg-gradient-to-br from-amber-100 to-amber-50"
                iconColor="text-amber-600"
              />
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Learning Roadmap */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-xl p-8 shadow-sm border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">My Learning Roadmap</h2>
                    <a href="#" className="text-purple-600 hover:text-purple-700 text-sm font-semibold">
                      View Full Roadmap
                    </a>
                  </div>

                  {/* Timeline */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-4">
                    {mockRoadmap.map((day, index) => (
                      <div key={day.day} className="flex items-center gap-2">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                          className={`flex flex-col items-center ${
                            day.status === 'completed'
                              ? 'text-green-600'
                              : day.status === 'in-progress'
                                ? 'text-amber-600'
                                : 'text-gray-400'
                          }`}
                        >
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                              day.status === 'completed'
                                ? 'bg-green-100'
                                : day.status === 'in-progress'
                                  ? 'bg-amber-100'
                                  : 'bg-gray-100'
                            }`}
                          >
                            {day.status === 'completed' && (
                              <CheckCircle2 className="w-6 h-6" />
                            )}
                            {day.status === 'in-progress' && (
                              <span className="text-sm font-bold">●</span>
                            )}
                            {day.status === 'locked' && <Lock className="w-5 h-5" />}
                          </div>
                          <p className="text-xs font-semibold mt-2">Day {day.day}</p>
                          <p className="text-xs text-gray-500 text-center max-w-15">
                            {day.status === 'completed'
                              ? 'Completed'
                              : day.status === 'in-progress'
                                ? 'In Review'
                                : 'Locked'}
                          </p>
                        </motion.div>

                        {index < mockRoadmap.length - 1 && (
                          <div
                            className={`w-8 h-1 ${
                              day.status === 'completed'
                                ? 'bg-green-300'
                                : day.status === 'in-progress'
                                  ? 'bg-amber-300'
                                  : 'bg-gray-200'
                            }`}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </motion.section>

                {/* Day Details */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                  {/* Day 4 Details */}
                  <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Day 4: Feature Engineering</h3>
                    <p className="text-gray-600 text-sm mb-6">
                      Learn core feature engineering techniques and build your first ML pipeline.
                    </p>

                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-700">Progress</span>
                        <span className="text-sm font-bold text-purple-600">70%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div className="w-[70%] h-full bg-linear-to-r from-purple-500 to-purple-600" />
                      </div>
                    </div>

                    <Button className="w-full bg-linear-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-lg hover:shadow-lg transition-all">
                      Continue Learning
                    </Button>
                  </div>

                  {/* Day 4 Tasks */}
                  <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Day 4 Tasks</h3>
                    <div className="space-y-3">
                      {mockTasks.map((task) => (
                        <label
                          key={task.id}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={task.completed}
                            className="w-5 h-5 rounded-md accent-green-600"
                            readOnly
                          />
                          <span
                            className={`text-sm font-medium ${
                              task.completed
                                ? 'text-gray-400 line-through'
                                : 'text-gray-700'
                            }`}
                          >
                            {task.title}
                          </span>
                          {task.completed && (
                            <CheckCircle2 className="w-4 h-4 text-green-600 ml-auto" />
                          )}
                        </label>
                      ))}
                    </div>
                  </div>
                </motion.section>

                {/* Courses */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white rounded-xl p-8 shadow-sm border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">My Enrolled Courses</h2>
                    <a href="#" className="text-purple-600 hover:text-purple-700 text-sm font-semibold">
                      View All Courses
                    </a>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {mockCourses.map((course) => (
                      <motion.div
                        key={course.id}
                        whileHover={{ y: -4 }}
                        className="rounded-lg overflow-hidden border border-gray-200 bg-white hover:shadow-lg transition-all"
                      >
                        <img
                          src={course.image}
                          alt={course.name}
                          className="w-full h-32 object-cover"
                        />
                        <div className="p-4">
                          <h4 className="font-bold text-gray-900 text-sm mb-3 line-clamp-2">
                            {course.name}
                          </h4>
                          <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-semibold text-gray-600">
                                {course.progress}% Complete
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                              <div
                                className="h-full bg-linear-to-r from-purple-500 to-purple-600"
                                style={{ width: `${course.progress}%` }}
                              />
                            </div>
                          </div>
                          <Button className="w-full bg-purple-600 text-white text-sm font-semibold rounded-lg hover:bg-purple-700 transition-colors py-2">
                            Continue Learning
                          </Button>
                        </div>
                      </motion.div>
                    ))}

                    {/* Explore More */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      className="rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-8 hover:border-purple-300 hover:bg-purple-50 transition-colors cursor-pointer"
                    >
                      <Plus className="w-8 h-8 text-gray-400 mb-2" />
                      <p className="font-semibold text-gray-900">Explore More</p>
                      <p className="text-xs text-gray-600 text-center mt-1">
                        Find new skills to learn and grow
                      </p>
                    </motion.button>
                  </div>
                </motion.section>

                {/* Skills Progress */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white rounded-xl p-8 shadow-sm border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Skills Progress</h2>
                    <a href="#" className="text-purple-600 hover:text-purple-700 text-sm font-semibold">
                      View All Skills
                    </a>
                  </div>

                  <div className="space-y-4">
                    {skills.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold text-gray-700">{skill.name}</span>
                          <span className="text-sm font-bold text-purple-600">{skill.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.progress}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="h-full bg-linear-to-r from-purple-500 to-purple-600 rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.section>
              </div>

              {/* Right Sidebar */}
              <div className="space-y-8">
                {/* Upcoming Sessions */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-xl p-8 shadow-sm border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Upcoming Live Sessions</h2>
                    <a href="#" className="text-purple-600 hover:text-purple-700 text-xs font-semibold">
                      View Calendar
                    </a>
                  </div>

                  <div className="space-y-4">
                    {mockSessions.map((session) => (
                      <motion.div
                        key={session.id}
                        whileHover={{ x: 4 }}
                        className="p-4 rounded-lg bg-linear-to-br from-purple-50 to-purple-100 border border-purple-200"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <span className="text-xs font-bold text-purple-600 uppercase">
                            {session.type === 'live' ? '🔴 Live Class' : '👨‍🏫 Mentor Session'}
                          </span>
                        </div>
                        <h4 className="font-bold text-gray-900 text-sm mb-2">{session.title}</h4>
                        <p className="text-xs text-gray-600 mb-1">{session.date}</p>
                        <p className="text-xs text-gray-600 mb-3">{session.time}</p>
                        {session.mentor && (
                          <p className="text-xs text-gray-600 mb-3">👨‍💼 {session.mentor}</p>
                        )}
                        <Button className="w-full bg-purple-600 text-white text-xs font-semibold rounded-lg hover:bg-purple-700 transition-colors py-2">
                          Join
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>

                {/* To Do List */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white rounded-xl p-8 shadow-sm border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">To Do List</h2>
                    <a href="#" className="text-purple-600 hover:text-purple-700 text-xs font-semibold">
                      View All
                    </a>
                  </div>

                  <div className="space-y-3">
                    {mockTodos.map((todo) => (
                      <label
                        key={todo.id}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={todo.completed}
                          className="w-4 h-4 rounded mt-1 accent-purple-600"
                          readOnly
                        />
                        <div className="flex-1">
                          <p
                            className={`text-sm font-medium ${
                              todo.completed ? 'text-gray-400 line-through' : 'text-gray-700'
                            }`}
                          >
                            {todo.title}
                          </p>
                          <p
                            className={`text-xs mt-1 ${
                              todo.daysLeft <= 2
                                ? 'text-red-600 font-semibold'
                                : todo.daysLeft <= 4
                                  ? 'text-amber-600'
                                  : 'text-gray-500'
                            }`}
                          >
                            Due in {todo.daysLeft} days
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                </motion.section>

                {/* Recent Mentor Feedback */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white rounded-xl p-8 shadow-sm border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Recent Mentor Feedback</h2>
                    <a href="#" className="text-purple-600 hover:text-purple-700 text-xs font-semibold">
                      View All
                    </a>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                      <p className="text-xs font-bold text-green-700 mb-2">✓ Day 3: Data Preprocessing</p>
                      <p className="text-xs text-gray-700 leading-relaxed mb-2">
                        Good work! Your data cleaning approach is correct. Keep going. 👍
                      </p>
                      <p className="text-xs text-gray-500">Dr. Priya Sharma · 2 days ago</p>
                    </div>
                    <a href="#" className="text-purple-600 hover:text-purple-700 text-sm font-semibold">
                      View Feedback →
                    </a>
                  </div>
                </motion.section>

                {/* Learning Streak */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-white rounded-xl p-8 shadow-sm border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <Flame className="w-6 h-6 text-orange-500" />
                      Learning Streak
                    </h2>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-orange-500">12 Days</p>
                      <p className="text-xs text-gray-500">Keep it up!</p>
                    </div>
                  </div>

                  {/* Calendar */}
                  <div className="grid grid-cols-7 gap-2 text-center">
                    <span className="text-xs font-bold text-gray-600 mb-3">M</span>
                    <span className="text-xs font-bold text-gray-600 mb-3">T</span>
                    <span className="text-xs font-bold text-gray-600 mb-3">W</span>
                    <span className="text-xs font-bold text-gray-600 mb-3">T</span>
                    <span className="text-xs font-bold text-gray-600 mb-3">F</span>
                    <span className="text-xs font-bold text-gray-600 mb-3">S</span>
                    <span className="text-xs font-bold text-gray-600 mb-3">S</span>

                    {[...Array(28)].map((_, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.1 }}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold cursor-pointer transition-all ${
                          i < 12
                            ? 'bg-linear-to-br from-orange-400 to-orange-500 text-white shadow-md'
                            : i < 20
                              ? 'bg-gray-200 text-gray-400'
                              : 'bg-gray-100 text-gray-300'
                        }`}
                      >
                        {i + 1}
                      </motion.div>
                    ))}
                  </div>

                  {/* Streak Info */}
                  <div className="mt-6 grid grid-cols-3 gap-4">
                    <div className="bg-linear-to-br from-orange-50 to-orange-100 rounded-lg p-4 text-center">
                      <p className="text-2xl font-bold text-orange-600">12</p>
                      <p className="text-xs text-gray-600 mt-1">Current Streak</p>
                    </div>
                    <div className="bg-linear-to-br from-purple-50 to-purple-100 rounded-lg p-4 text-center">
                      <p className="text-2xl font-bold text-purple-600">28</p>
                      <p className="text-xs text-gray-600 mt-1">Best Streak</p>
                    </div>
                    <div className="bg-linear-to-br from-green-50 to-green-100 rounded-lg p-4 text-center">
                      <p className="text-2xl font-bold text-green-600">65</p>
                      <p className="text-xs text-gray-600 mt-1">Total Days</p>
                    </div>
                  </div>

                  {/* View Streak Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-6 bg-linear-to-r from-orange-500 to-orange-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all"
                  >
                    View Full Streak History
                  </motion.button>
                </motion.section>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// ============================================================
// STAT CARD COMPONENT
// ============================================================

function StatCard({
  icon,
  label,
  value,
  subtext,
  bgColor,
  iconColor,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtext: string;
  bgColor: string;
  iconColor: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className={`${bgColor} rounded-xl p-6 border border-transparent hover:shadow-lg transition-all cursor-pointer`}
    >
      <div className={`${iconColor} mb-4`}>{icon}</div>
      <p className="text-sm text-gray-600 mb-1">{label}</p>
      <h3 className="text-3xl font-bold text-gray-900 mb-2">{value}</h3>
      <a href="#" className="text-xs text-gray-600 hover:text-gray-900 font-semibold">
        {subtext} →
      </a>
    </motion.div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import {
  MapPin,
  Mail,
  Phone,
  Calendar,
  Flame,
  Globe,
  PenLine,
  BookOpen,
  CheckCircle2,
  Award,
  Users,
  Clock,
  BarChart3,
  ArrowRight,
  ExternalLink,
  Star,
  MessageSquare,
  FileText,
  Camera,
} from 'lucide-react';
import { motion } from 'framer-motion';

// ============================================================
// TYPES
// ============================================================

interface RecentCourse {
  title: string;
  status: string;
  progress: number;
  color: string;
  completedOn?: string;
}

interface Achievement {
  title: string;
  desc: string;
  date: string;
  icon: string;
  color: string;
}

interface ActivityItem {
  icon: typeof CheckCircle2;
  color: string;
  text: string;
  date: string;
}

// ============================================================
// MOCK DATA
// ============================================================

const STATS = [
  { icon: BookOpen, label: 'Courses Enrolled', value: '6', change: '+2 in last 30 days', color: 'text-blue-600', bg: 'bg-blue-50' },
  { icon: CheckCircle2, label: 'Courses Completed', value: '4', change: '+1 in last 30 days', color: 'text-green-600', bg: 'bg-green-50' },
  { icon: Clock, label: 'Hours Learned', value: '128 hrs', change: '+18 in last 30 days', color: 'text-amber-600', bg: 'bg-amber-50' },
  { icon: BarChart3, label: 'Assessments Taken', value: '24', change: '+6 in last 30 days', color: 'text-purple-600', bg: 'bg-purple-50' },
];

const COURSES: RecentCourse[] = [
  { title: 'React.js Advanced', status: 'Continue Learning', progress: 75, color: 'bg-gradient-to-r from-blue-500 to-blue-600' },
  { title: 'Node.js & Express', status: 'In Progress', progress: 60, color: 'bg-gradient-to-r from-green-500 to-green-600' },
  { title: 'MongoDB Essentials', status: 'Completed', progress: 100, color: 'bg-gradient-to-r from-emerald-500 to-emerald-600', completedOn: 'May 20, 2025' },
  { title: 'Tailwind CSS Mastery', status: 'Completed', progress: 100, color: 'bg-gradient-to-r from-cyan-500 to-cyan-600', completedOn: 'May 10, 2025' },
];

const ACHIEVEMENTS: Achievement[] = [
  { title: 'Consistent Learner', desc: 'Learn for 20 days in a row', date: 'Earned on May 24, 2025', icon: '🏆', color: 'bg-gradient-to-br from-amber-100 to-amber-200' },
  { title: 'Quick Starter', desc: 'Complete 5 courses', date: 'Earned on May 18, 2025', icon: '⚡', color: 'bg-gradient-to-br from-blue-100 to-blue-200' },
  { title: 'Top Performer', desc: 'Score in top 10% in assessment', date: 'Earned on May 12, 2025', icon: '🌟', color: 'bg-gradient-to-br from-purple-100 to-purple-200' },
  { title: 'Community Helper', desc: 'Help 10 members in community', date: 'Earned on May 05, 2025', icon: '🤝', color: 'bg-gradient-to-br from-green-100 to-green-200' },
];

const ACTIVITIES: ActivityItem[] = [
  { icon: CheckCircle2, color: 'bg-green-500', text: 'Completed "MongoDB Essentials"', date: 'May 20, 2025' },
  { icon: BarChart3, color: 'bg-purple-500', text: 'Submitted assessment "React Quiz"', date: 'May 18, 2025' },
  { icon: Calendar, color: 'bg-blue-500', text: 'Attended live session "State Management in React"', date: 'May 16, 2025' },
  { icon: Award, color: 'bg-amber-500', text: 'Earned badge "Top Performer"', date: 'May 12, 2025' },
  { icon: MessageSquare, color: 'bg-cyan-500', text: 'Posted a question in community', date: 'May 10, 2025' },
];

const SKILLS = ['JavaScript', 'React.js', 'Node.js', 'MongoDB', 'Express.js', 'Tailwind CSS', 'Git', 'Problem Solving'];

// ============================================================
// COMPONENT
// ============================================================

export function StudentProfilePage() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'achievements' | 'activity' | 'settings'>('overview');

  useEffect(() => {
    if (!user && !token) {
      navigate({ to: '/login' });
    }
  }, [user, token, navigate]);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Profile</h1>
          <p className="text-sm text-gray-500">Manage your profile information and preferences.</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 font-medium">Course Progress</span>
          <div className="w-32 bg-gray-200 rounded-full h-2 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#5B4AAB] to-[#7C66E4] rounded-full" style={{ width: '72%' }} />
          </div>
          <span className="text-sm font-bold text-[#5B4AAB]">72%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm relative"
          >
            <Button variant="outline" size="sm" className="absolute top-6 right-6 text-xs font-semibold border-gray-200 flex items-center gap-1.5">
              <PenLine className="w-3.5 h-3.5" /> Edit Profile
            </Button>

            <div className="flex items-start gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-white text-4xl font-bold overflow-hidden">
                  K
                </div>
                <button className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-[#5B4AAB] flex items-center justify-center text-white shadow-lg hover:bg-[#4a3b96] transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-2xl font-extrabold text-gray-900">Karthik S</h2>
                  <CheckCircle2 className="w-5 h-5 text-blue-500" />
                </div>

                <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    Chennai, Tamil Nadu, India
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    Member Since: <span className="font-semibold text-gray-900">Jan 12, 2025</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-4 h-4 text-gray-400" />
                    karthik.s@example.com
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FileText className="w-4 h-4 text-gray-400" />
                    Student ID: <span className="font-semibold text-gray-900">BYX-2025-000123</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4 text-gray-400" />
                    +91 98765 43210
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Star className="w-4 h-4 text-gray-400" />
                    Current Level: <span className="font-semibold text-gray-900">Advanced Learner</span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mt-3">
                  Passionate full stack developer and lifelong learner. I love building real-world projects and solving problems through code.
                </p>

                {/* Social Links */}
                <div className="flex items-center gap-3 mt-4">
                  {['GitHub', 'LinkedIn', 'Twitter', 'Website'].map(social => (
                    <button key={social} className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors">
                      <Globe className="w-4 h-4" />
                    </button>
                  ))}
                </div>

                {/* Streak */}
                <div className="flex items-center gap-2 mt-3">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span className="text-sm font-semibold text-gray-700">Learning Streak:</span>
                  <span className="text-sm font-bold text-orange-500">🔥 23 Days</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex gap-6">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'courses', label: 'Courses' },
                { id: 'achievements', label: 'Achievements' },
                { id: 'activity', label: 'Activity' },
                { id: 'settings', label: 'Settings' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-3 text-sm font-semibold relative transition-colors ${
                    activeTab === tab.id ? 'text-[#5B4AAB]' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div layoutId="profileTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5B4AAB]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Learning Overview Stats */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Learning Overview</h2>
              <a href="#" className="text-xs font-bold text-[#5B4AAB] hover:text-[#3D2E7F]">View All</a>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {STATS.map(stat => (
                <div key={stat.label} className={`${stat.bg} rounded-xl p-4 border border-transparent hover:shadow-md transition-all`}>
                  <div className={`${stat.color} mb-2`}><stat.icon className="w-5 h-5" /></div>
                  <p className="text-xs text-gray-500 font-semibold">{stat.label}</p>
                  <p className="text-2xl font-extrabold text-gray-900 my-1">{stat.value}</p>
                  <p className="text-[10px] text-green-600 font-semibold">{stat.change}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Courses */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Recent Courses</h2>
              <a href="#" className="text-xs font-bold text-[#5B4AAB] hover:text-[#3D2E7F]">View All</a>
            </div>
            <div className="space-y-4">
              {COURSES.map(course => (
                <div key={course.title} className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg ${course.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                    {course.title[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-gray-900">{course.title}</h4>
                    <p className="text-xs text-gray-500">{course.completedOn ? `Completed on ${course.completedOn}` : course.status}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="w-24 bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div className={`h-full ${course.color} rounded-full`} style={{ width: `${course.progress}%` }} />
                    </div>
                    <span className="text-xs font-bold text-gray-900 w-8">{course.progress}%</span>
                  </div>
                  <Button variant="outline" size="sm" className="text-xs font-semibold border-gray-200 shrink-0">
                    {course.progress === 100 ? 'Review' : 'Continue'}
                  </Button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* About Me */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
          >
            <h2 className="text-lg font-bold text-gray-900 mb-3">About Me</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              I'm Karthik, a passionate full stack developer who enjoys building scalable web applications and learning new technologies. I love JavaScript ecosystem, open source, and sharing knowledge with the community.
            </p>
            <div className="flex flex-wrap gap-2">
              {SKILLS.map(skill => (
                <span key={skill} className="px-3 py-1.5 text-xs font-semibold bg-gray-50 text-gray-700 rounded-lg border border-gray-200">{skill}</span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Achievements</h3>
              <a href="#" className="text-xs font-bold text-[#5B4AAB] hover:text-[#3D2E7F]">View All</a>
            </div>
            <div className="space-y-4">
              {ACHIEVEMENTS.map(ach => (
                <div key={ach.title} className="flex items-start gap-3">
                  <div className={`w-12 h-12 rounded-xl ${ach.color} flex items-center justify-center text-lg shrink-0`}>
                    {ach.icon}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{ach.title}</p>
                    <p className="text-xs text-gray-500">{ach.desc}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{ach.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Profile Stats */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">Profile Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '6', label: 'Courses Enrolled' },
                { value: '4', label: 'Projects Completed' },
                { value: '24', label: 'Assessments Taken' },
                { value: '5', label: 'Certificates Earned' },
              ].map(stat => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-extrabold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500 font-semibold">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
              <a href="#" className="text-xs font-bold text-[#5B4AAB] hover:text-[#3D2E7F]">View All</a>
            </div>
            <div className="space-y-4">
              {ACTIVITIES.map((activity, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full ${activity.color} mt-1.5 shrink-0`} />
                  <div>
                    <p className="text-sm text-gray-700">{activity.text}</p>
                    <p className="text-xs text-gray-400">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-3 text-xs font-semibold border-gray-200 flex items-center gap-1 justify-center">
              View All Activity <ArrowRight className="w-3 h-3" />
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import {
  Bell,
  BookOpen,
  Calendar,
  Award,
  MessageSquare,
  Users,
  CheckCircle2,
  Star,
  Mail,
  Smartphone,
  ChevronRight,
  Headphones,
  Settings,
  ArrowRight,
  Target,
} from 'lucide-react';
import { motion } from 'framer-motion';

// ============================================================
// TYPES
// ============================================================

interface Notification {
  id: string;
  icon: typeof Bell;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
  time: string;
  unread: boolean;
  actionLabel?: string;
  actionLink?: string;
}

// ============================================================
// MOCK DATA
// ============================================================

const TODAY_NOTIFICATIONS: Notification[] = [
  { id: '1', icon: BookOpen, iconBg: 'bg-blue-50', iconColor: 'text-blue-600', title: 'New course content available', description: 'A new lesson "React Hooks Deep Dive" has been added in Advanced React.js.', time: '10:30 AM', unread: true },
  { id: '2', icon: Calendar, iconBg: 'bg-purple-50', iconColor: 'text-purple-600', title: 'Live session reminder', description: 'Your session "State Management in React" is starting in 30 minutes.', time: '09:45 AM', unread: true, actionLabel: 'Join Session →' },
  { id: '3', icon: Award, iconBg: 'bg-green-50', iconColor: 'text-green-600', title: 'Congratulations! 🎉', description: 'You scored 92% in the assessment "JavaScript Fundamentals Quiz".', time: '09:10 AM', unread: true },
  { id: '4', icon: BookOpen, iconBg: 'bg-amber-50', iconColor: 'text-amber-600', title: 'New assignment posted', description: '"API Integration Task" has been posted in Full Stack Web Development.', time: '08:30 AM', unread: true, actionLabel: 'View Assignment →' },
];

const YESTERDAY_NOTIFICATIONS: Notification[] = [
  { id: '5', icon: Users, iconBg: 'bg-cyan-50', iconColor: 'text-cyan-600', title: 'Ananya R mentioned you in a post', description: '@Karthik S check out this solution to optimize the code.', time: 'Yesterday, 07:15 PM', unread: false, actionLabel: 'View Mention →' },
  { id: '6', icon: Award, iconBg: 'bg-yellow-50', iconColor: 'text-yellow-600', title: 'Badge earned', description: 'You earned the "Consistent Learner" badge. Keep learning!', time: 'Yesterday, 05:40 PM', unread: false, actionLabel: 'View Badge →' },
  { id: '7', icon: MessageSquare, iconBg: 'bg-indigo-50', iconColor: 'text-indigo-600', title: 'Mentor replied to your question', description: 'Priya Sharma replied to your question on "Handling useEffect dependencies".', time: 'Yesterday, 04:20 PM', unread: false, actionLabel: 'View Reply →' },
];

const OLDER_NOTIFICATIONS: Notification[] = [
  { id: '8', icon: Award, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', title: 'Certificate issued', description: 'Your certificate for "JavaScript Essentials" is ready to download.', time: 'May 24, 2025', unread: false, actionLabel: 'View Certificate →' },
  { id: '9', icon: Target, iconBg: 'bg-violet-50', iconColor: 'text-violet-600', title: 'Milestone achieved', description: 'You have completed 50% of the Full Stack Developer Roadmap.', time: 'May 24, 2025', unread: false, actionLabel: 'View Roadmap →' },
];

const NOTIFICATION_PREFERENCES = [
  { icon: Mail, title: 'Email Notifications', desc: 'Receive updates on your email', color: 'text-blue-600', bg: 'bg-blue-50' },
  { icon: Bell, title: 'Push Notifications', desc: 'Get instant push notifications', color: 'text-purple-600', bg: 'bg-purple-50' },
  { icon: BookOpen, title: 'Course Updates', desc: 'New content, assignments, etc.', color: 'text-green-600', bg: 'bg-green-50' },
  { icon: Calendar, title: 'Live Sessions', desc: 'Reminders and session updates', color: 'text-amber-600', bg: 'bg-amber-50' },
  { icon: Users, title: 'Mentions & Replies', desc: 'When someone mentions or replies', color: 'text-cyan-600', bg: 'bg-cyan-50' },
  { icon: Settings, title: 'System Updates', desc: 'Important system announcements', color: 'text-red-600', bg: 'bg-red-50' },
];

// ============================================================
// COMPONENT
// ============================================================

export function StudentNotificationsPage() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');

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

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'unread', label: 'Unread (6)' },
    { id: 'important', label: 'Important' },
    { id: 'mentions', label: 'Mentions' },
    { id: 'system', label: 'System' },
  ];

  const renderNotification = (notif: Notification) => (
    <motion.div
      key={notif.id}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className={`flex items-start gap-4 p-4 rounded-lg transition-colors hover:bg-gray-50 cursor-pointer ${
        notif.unread ? 'bg-purple-50/30' : ''
      }`}
    >
      <div className={`w-10 h-10 rounded-lg ${notif.iconBg} flex items-center justify-center ${notif.iconColor} shrink-0`}>
        <notif.icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-bold text-gray-900">{notif.title}</h4>
        <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">{notif.description}</p>
        {notif.actionLabel && (
          <a href="#" className="text-xs font-bold text-[#5B4AAB] hover:text-[#3D2E7F] mt-1.5 inline-block">{notif.actionLabel}</a>
        )}
      </div>
      <div className="text-right shrink-0">
        <span className="text-xs text-gray-400">{notif.time}</span>
        {notif.unread && <div className="w-2.5 h-2.5 bg-[#5B4AAB] rounded-full mt-2 ml-auto" />}
      </div>
    </motion.div>
  );

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900">Notifications</h1>
        <p className="text-sm text-gray-500 mt-1">Stay updated with important updates and activities.</p>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          {filters.map(f => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeFilter === f.id
                  ? 'bg-[#5B4AAB] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-1.5 text-sm font-semibold text-[#5B4AAB] hover:text-[#3D2E7F]">
          <CheckCircle2 className="w-4 h-4" />
          Mark all as read
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
          >
            <div className="px-5 py-3 border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-900">Today</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {TODAY_NOTIFICATIONS.map(renderNotification)}
            </div>
          </motion.div>

          {/* Yesterday */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
          >
            <div className="px-5 py-3 border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-900">Yesterday</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {YESTERDAY_NOTIFICATIONS.map(renderNotification)}
            </div>
          </motion.div>

          {/* Older */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
          >
            <div className="px-5 py-3 border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-900">May 24, 2025</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {OLDER_NOTIFICATIONS.map(renderNotification)}
            </div>
          </motion.div>

          {/* Archive Link */}
          <p className="text-center text-sm text-gray-500">
            Can't find your notification? Check <a href="#" className="text-[#5B4AAB] font-bold hover:text-[#3D2E7F] underline">Archived Notifications</a>
          </p>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Notification Summary */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">Notification Summary</h3>
            <div className="space-y-3">
              {[
                { icon: Bell, label: 'Total Notifications', value: '128', color: 'text-[#5B4AAB]', bg: 'bg-purple-50' },
                { icon: Mail, label: 'Unread', value: '6', color: 'text-green-600', bg: 'bg-green-50' },
                { icon: Star, label: 'Important', value: '4', color: 'text-amber-600', bg: 'bg-amber-50' },
                { icon: Users, label: 'Mentions', value: '3', color: 'text-cyan-600', bg: 'bg-cyan-50' },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg ${item.bg} flex items-center justify-center ${item.color}`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm text-gray-700 flex-1">{item.label}</span>
                  <span className="text-sm font-bold text-gray-900">{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Notification Preferences */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">Notification Preferences</h3>
            <div className="space-y-3">
              {NOTIFICATION_PREFERENCES.map(pref => (
                <button key={pref.title} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left group">
                  <div className={`w-10 h-10 rounded-lg ${pref.bg} flex items-center justify-center ${pref.color} group-hover:scale-105 transition-transform`}>
                    <pref.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900">{pref.title}</p>
                    <p className="text-xs text-gray-500">{pref.desc}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
                </button>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-3 text-sm font-semibold border-gray-200">
              Manage Preferences
            </Button>
          </motion.div>

          {/* Need Help */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm"
          >
            <h3 className="text-sm font-bold text-gray-900 mb-1">Need Help?</h3>
            <p className="text-xs text-gray-500 mb-3">If you're missing important notifications, check your preferences or contact support.</p>
            <Button variant="outline" className="w-full text-sm font-semibold border-gray-200 flex items-center gap-2 justify-center">
              <Headphones className="w-4 h-4" />
              Contact Support
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

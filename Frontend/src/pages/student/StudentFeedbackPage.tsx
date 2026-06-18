'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import {
  Search,
  HelpCircle,
  MessageSquare,
  Video,
  BookOpen,
  ArrowRight,
  ChevronRight,
  Calendar,
  Clock,
  User,
  CheckCircle2,
  Circle,
} from 'lucide-react';
import { motion } from 'framer-motion';

// ============================================================
// TYPES
// ============================================================

interface QuestionItem {
  id: string;
  title: string;
  category: string;
  categoryColor: string;
  status: 'answered' | 'in-progress';
  date: string;
  askedDate: string;
}

interface Mentor {
  name: string;
  role: string;
  skills: string;
  avatar: string;
}

interface UpcomingSession {
  mentor: string;
  type: string;
  topic: string;
  date: string;
  avatar: string;
}

// ============================================================
// MOCK DATA
// ============================================================

const QUESTIONS: QuestionItem[] = [
  { id: '1', title: 'How to implement authentication in Next.js with JWT?', category: 'Web Development', categoryColor: 'bg-blue-100 text-blue-700', status: 'answered', date: 'May 24, 2025', askedDate: 'Asked on May 24, 2025 • By You' },
  { id: '2', title: 'Issue in submitting code on Judge0 - Getting "Compilation Error"', category: 'Assessments', categoryColor: 'bg-purple-100 text-purple-700', status: 'answered', date: 'May 22, 2025', askedDate: 'Asked on May 22, 2025 • By You' },
  { id: '3', title: 'Best approach to structure a full stack project', category: 'Project Guidance', categoryColor: 'bg-green-100 text-green-700', status: 'answered', date: 'May 20, 2025', askedDate: 'Asked on May 20, 2025 • By You' },
  { id: '4', title: 'How to deploy MERN application on Vercel?', category: 'Deployment', categoryColor: 'bg-amber-100 text-amber-700', status: 'in-progress', date: 'May 18, 2025', askedDate: 'Asked on May 18, 2025 • By You' },
  { id: '5', title: 'Understanding useEffect dependency array', category: 'React.js', categoryColor: 'bg-cyan-100 text-cyan-700', status: 'answered', date: 'May 17, 2025', askedDate: 'Asked on May 17, 2025 • By You' },
];

const MENTORS: Mentor[] = [
  { name: 'Priya Sharma', role: 'Senior Full Stack Developer', skills: 'React, Node.js, MongoDB', avatar: 'P' },
  { name: 'Rohit Patel', role: 'Backend Developer', skills: 'Node.js, Express, PostgreSQL', avatar: 'R' },
  { name: 'Ananya Reddy', role: 'Frontend Developer', skills: 'React, Next.js, Tailwind CSS', avatar: 'A' },
];

const UPCOMING_SESSIONS: UpcomingSession[] = [
  { mentor: 'Rohit Patel', type: '1:1 Video Call', topic: 'Topic: Project Review & Optimization', date: 'May 26, 2025 • 07:00 PM IST', avatar: 'R' },
  { mentor: 'Priya Sharma', type: '1:1 Video Call', topic: 'Topic: State Management in React', date: 'May 28, 2025 • 08:00 PM IST', avatar: 'P' },
];

const HELP_TOPICS = ['Next.js', 'React.js', 'Node.js', 'MongoDB', 'Authentication', 'API Integration', 'Deployment', 'Project Guidance'];

// ============================================================
// COMPONENT
// ============================================================

export function StudentFeedbackPage() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'questions' | 'sessions' | 'bookings'>('questions');

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
          <h1 className="text-3xl font-extrabold text-gray-900">Mentor Support</h1>
          <p className="text-sm text-gray-500">Get guidance. Solve doubts. Grow faster.</p>
        </div>
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for help, topics or mentors..."
            className="w-full bg-white border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5B4AAB]/20 shadow-sm"
          />
        </div>
      </div>

      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-100 via-purple-50 to-blue-50 rounded-xl p-8 border border-purple-200 relative overflow-hidden"
      >
        <div className="max-w-lg">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">We're here to help you!</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Connect with our expert mentors and get personalized guidance for your learning journey.
          </p>
        </div>
        <div className="absolute right-8 top-1/2 -translate-y-1/2 w-32 h-32 bg-purple-200/30 rounded-full blur-3xl" />
      </motion.div>

      {/* Support Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: HelpCircle, title: 'Ask a Question', desc: 'Post your doubt and get help from mentors.', action: 'Ask Now →', color: 'text-purple-600', bg: 'bg-purple-50' },
          { icon: MessageSquare, title: 'Live Chat', desc: 'Chat with mentors in real-time.', action: 'Start Chat →', color: 'text-green-600', bg: 'bg-green-50' },
          { icon: Video, title: 'Schedule 1:1 Call', desc: 'Book a one-on-one session with a mentor.', action: 'Book Now →', color: 'text-blue-600', bg: 'bg-blue-50' },
          { icon: BookOpen, title: 'Browse FAQs', desc: 'Find answers to common questions.', action: 'View FAQs →', color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map(option => (
          <motion.div
            key={option.title}
            whileHover={{ y: -4 }}
            className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm text-center hover:shadow-md transition-all cursor-pointer"
          >
            <div className={`w-14 h-14 rounded-xl ${option.bg} flex items-center justify-center mx-auto mb-3 ${option.color}`}>
              <option.icon className="w-7 h-7" />
            </div>
            <h3 className="text-sm font-bold text-gray-900 mb-1">{option.title}</h3>
            <p className="text-xs text-gray-500 mb-3">{option.desc}</p>
            <span className={`text-xs font-bold ${option.color} cursor-pointer`}>{option.action}</span>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex gap-6">
              {[
                { id: 'questions', label: 'My Questions' },
                { id: 'sessions', label: 'My Sessions' },
                { id: 'bookings', label: 'My Bookings' },
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
                    <motion.div layoutId="feedbackTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5B4AAB]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Questions List */}
          <div className="space-y-3">
            {QUESTIONS.map((q, index) => (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-[#5B4AAB] shrink-0">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#5B4AAB] transition-colors">{q.title}</h3>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${q.categoryColor}`}>{q.category}</span>
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                        q.status === 'answered' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {q.status === 'answered' ? 'Answered' : 'In Progress'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{q.askedDate}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-gray-500">{q.date}</p>
                    <ChevronRight className="w-4 h-4 text-gray-300 mt-2 ml-auto" />
                  </div>
                </div>
                {q.status === 'in-progress' && (
                  <p className="text-xs text-amber-600 mt-2 pl-13">Mentor is typing...</p>
                )}
              </motion.div>
            ))}
          </div>

          <a href="#" className="text-sm font-bold text-[#5B4AAB] hover:text-[#3D2E7F] flex items-center gap-1 justify-center">
            View All Questions <ArrowRight className="w-4 h-4" />
          </a>

          {/* Popular Help Topics */}
          <div className="pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-gray-900">Popular Help Topics</h3>
              <a href="#" className="text-xs font-bold text-[#5B4AAB] hover:text-[#3D2E7F] flex items-center gap-1">
                View All FAQs <ArrowRight className="w-3 h-3" />
              </a>
            </div>
            <div className="flex flex-wrap gap-2">
              {HELP_TOPICS.map(topic => (
                <span key={topic} className="px-3 py-1.5 text-xs font-semibold bg-white text-gray-700 rounded-lg border border-gray-200 hover:border-[#5B4AAB] hover:text-[#5B4AAB] cursor-pointer transition-colors">{topic}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Your Mentors */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Your Mentors</h3>
              <a href="#" className="text-xs font-bold text-[#5B4AAB] hover:text-[#3D2E7F]">View All</a>
            </div>
            <div className="space-y-4">
              {MENTORS.map(mentor => (
                <div key={mentor.name} className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#5B4AAB] to-[#3D2E7F] flex items-center justify-center text-white font-bold shrink-0">{mentor.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900">{mentor.name}</p>
                    <p className="text-xs text-gray-500">{mentor.role}</p>
                    <p className="text-[10px] text-gray-400">{mentor.skills}</p>
                  </div>
                  <Button variant="outline" size="sm" className="text-xs font-semibold border-gray-200 flex items-center gap-1 shrink-0">
                    <MessageSquare className="w-3 h-3" /> Message
                  </Button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Upcoming 1:1 Sessions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-gray-900">Upcoming 1:1 Sessions</h3>
              <a href="#" className="text-xs font-bold text-[#5B4AAB] hover:text-[#3D2E7F]">View All</a>
            </div>
            <div className="space-y-4">
              {UPCOMING_SESSIONS.map(session => (
                <div key={session.mentor + session.date} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5B4AAB] to-[#3D2E7F] flex items-center justify-center text-white font-bold text-sm shrink-0">{session.avatar}</div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{session.mentor}</p>
                      <p className="text-xs text-gray-500">{session.type}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">{session.topic}</p>
                  <p className="text-[10px] text-gray-400 mb-3">{session.date}</p>
                  <Button className="bg-[#5B4AAB] text-white text-xs font-semibold hover:bg-[#4a3b96] w-full">Join</Button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Help Resources */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm"
          >
            <h3 className="text-sm font-bold text-gray-900 mb-3">Help Resources</h3>
            <div className="space-y-2">
              {['How to ask a good question?', 'Community Guidelines', 'Mentor Support Policy', 'FAQ - Mentor Support'].map(item => (
                <button key={item} className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors text-left">
                  <span className="text-sm text-gray-700">{item}</span>
                  <ChevronRight className="w-4 h-4 text-gray-300" />
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

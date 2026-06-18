'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import {
  CheckCircle2,
  Circle,
  Lock,
  ChevronDown,
  ChevronUp,
  Play,
  FileText,
  BookOpen,
  Video,
  BarChart3,
  Calendar,
  MessageSquare,
  User,
  ArrowRight,
  MapPin,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================================
// TYPES
// ============================================================

interface LessonItem {
  day: number;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'locked';
  progress?: number;
}

interface Stage {
  id: number;
  title: string;
  daysRange: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  lessons: LessonItem[];
}

interface Resource {
  icon: typeof FileText;
  title: string;
  count: string;
}

// ============================================================
// MOCK DATA
// ============================================================

const STAGES: Stage[] = [
  {
    id: 1,
    title: 'Foundations',
    daysRange: 'Days 1 - 10',
    status: 'in-progress',
    lessons: [
      { day: 1, title: 'Basic Computer Science', description: 'Learn the basics of computers, operating systems, internet, and how the web works.', status: 'completed' },
      { day: 2, title: 'Developer Tools Setup', description: 'Set up VS Code, Extensions, Git, GitLab account, and other essential tools.', status: 'completed' },
      { day: 3, title: 'HTML & CSS Basics', description: 'Learn HTML structure, CSS styling, selectors, box model, and responsive design.', status: 'completed' },
      { day: 4, title: 'JavaScript Fundamentals', description: 'Variables, data types, functions, DOM manipulation, events, and more.', status: 'in-progress', progress: 60 },
      { day: 5, title: 'Git & GitLab Basics', description: 'Learn version control, Git commands, repositories, and GitLab workflow.', status: 'locked' },
      { day: 6, title: 'Advanced CSS & Layouts', description: 'Flexbox, Grid, animations, transitions, and modern CSS techniques.', status: 'locked' },
      { day: 7, title: 'JavaScript ES6+', description: 'Arrow functions, destructuring, spread/rest, promises, and async/await.', status: 'locked' },
      { day: 8, title: 'DOM & Browser APIs', description: 'Advanced DOM manipulation, local storage, fetch API, and event handling.', status: 'locked' },
      { day: 9, title: 'Responsive Web Design', description: 'Media queries, mobile-first design, viewport units, and CSS frameworks.', status: 'locked' },
      { day: 10, title: 'Foundations Assessment', description: 'Complete the foundations assessment to move to the next stage.', status: 'locked' },
    ],
  },
  {
    id: 2,
    title: 'Frontend Development',
    daysRange: 'Days 11 - 25',
    status: 'upcoming',
    lessons: [],
  },
  {
    id: 3,
    title: 'Backend Development',
    daysRange: 'Days 26 - 40',
    status: 'upcoming',
    lessons: [],
  },
  {
    id: 4,
    title: 'Database & APIs',
    daysRange: 'Days 41 - 50',
    status: 'upcoming',
    lessons: [],
  },
  {
    id: 5,
    title: 'Projects & Deployment',
    daysRange: 'Days 51 - 60',
    status: 'upcoming',
    lessons: [],
  },
];

const RESOURCES: Resource[] = [
  { icon: FileText, title: 'Study Notes', count: '12 Files' },
  { icon: BookOpen, title: 'Cheat Sheets', count: '8 Files' },
  { icon: BarChart3, title: 'Practice Problems', count: '25 Problems' },
  { icon: Video, title: 'Recommended Videos', count: '18 Videos' },
];

// ============================================================
// COMPONENT
// ============================================================

export function StudentRoadmapPage() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [expandedStage, setExpandedStage] = useState<number>(1);

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
      <div>
        <nav className="flex items-center gap-1.5 text-xs text-gray-500 font-medium mb-1">
          <span className="cursor-pointer hover:text-[#5B4AAB] transition-colors" onClick={() => navigate({ to: '/student/courses' })}>My Courses</span>
          <span className="text-gray-400">&gt;</span>
          <span className="cursor-pointer hover:text-[#5B4AAB] transition-colors">Full Stack Web Development</span>
          <span className="text-gray-400">&gt;</span>
          <span className="text-gray-800 font-semibold">Roadmap</span>
        </nav>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Full Stack Web Development Roadmap</h1>
            <p className="text-sm text-gray-500 mt-1">Your personalized roadmap to become a Full Stack Developer</p>
          </div>
          <Button className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold text-sm flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Jump to Day
            <ChevronDown className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Stage Stepper */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
      >
        <div className="flex items-center justify-between overflow-x-auto gap-2">
          {STAGES.map((stage, index) => (
            <div key={stage.id} className="flex items-center gap-2 flex-1 min-w-0">
              <button
                onClick={() => setExpandedStage(stage.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                  stage.id === expandedStage
                    ? 'bg-[#5B4AAB] text-white shadow-md'
                    : stage.status === 'completed'
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : stage.status === 'in-progress'
                        ? 'bg-purple-50 text-[#5B4AAB] border border-purple-200'
                        : 'bg-gray-50 text-gray-500 border border-gray-200'
                }`}
              >
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  stage.id === expandedStage
                    ? 'bg-white/20 text-white'
                    : stage.status === 'completed'
                      ? 'bg-green-200 text-green-700'
                      : stage.status === 'in-progress'
                        ? 'bg-purple-200 text-[#5B4AAB]'
                        : 'bg-gray-200 text-gray-500'
                }`}>
                  {stage.id}
                </span>
                <div className="text-left">
                  <p className="text-sm font-bold">{stage.title}</p>
                  <p className={`text-[10px] ${stage.id === expandedStage ? 'text-white/70' : 'text-gray-400'}`}>{stage.daysRange}</p>
                </div>
              </button>
              {index < STAGES.length - 1 && (
                <div className={`h-0.5 flex-1 min-w-4 ${
                  stage.status === 'completed' ? 'bg-green-300' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Lesson List */}
        <div className="lg:col-span-2 space-y-4">
          {STAGES.map((stage) => (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
            >
              {/* Stage Header */}
              <button
                onClick={() => setExpandedStage(expandedStage === stage.id ? -1 : stage.id)}
                className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    stage.status === 'completed'
                      ? 'bg-green-100 text-green-700'
                      : stage.status === 'in-progress'
                        ? 'bg-[#5B4AAB] text-white'
                        : 'bg-gray-100 text-gray-400'
                  }`}>
                    {stage.id}
                  </span>
                  <div className="text-left">
                    <h3 className="text-lg font-bold text-gray-900">{stage.title} ({stage.daysRange})</h3>
                  </div>
                  {stage.status === 'in-progress' && (
                    <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-green-100 text-green-700 rounded-full">In Progress</span>
                  )}
                </div>
                {expandedStage === stage.id ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
              </button>

              {/* Lesson Items */}
              <AnimatePresence>
                {expandedStage === stage.id && stage.lessons.length > 0 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-gray-100 px-5 pb-5">
                      {stage.lessons.map((lesson, index) => (
                        <motion.div
                          key={lesson.day}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={`flex items-start gap-4 p-4 rounded-lg mt-2 transition-all ${
                            lesson.status === 'in-progress'
                              ? 'bg-[#5B4AAB]/5 border border-[#5B4AAB]/20'
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          {/* Status Icon */}
                          <div className="pt-0.5">
                            {lesson.status === 'completed' && <CheckCircle2 className="w-6 h-6 text-green-500" />}
                            {lesson.status === 'in-progress' && <Circle className="w-6 h-6 text-[#5B4AAB]" fill="#5B4AAB" />}
                            {lesson.status === 'locked' && <Lock className="w-5 h-5 text-gray-300 ml-0.5" />}
                          </div>

                          {/* Day Badge */}
                          <div className={`w-12 h-14 rounded-lg flex flex-col items-center justify-center shrink-0 ${
                            lesson.status === 'completed'
                              ? 'bg-green-50 text-green-700'
                              : lesson.status === 'in-progress'
                                ? 'bg-[#5B4AAB]/10 text-[#5B4AAB]'
                                : 'bg-gray-50 text-gray-400'
                          }`}>
                            <span className="text-[10px] font-semibold uppercase">Day</span>
                            <span className="text-lg font-bold">{lesson.day}</span>
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <h4 className={`font-bold ${lesson.status === 'locked' ? 'text-gray-400' : 'text-gray-900'}`}>{lesson.title}</h4>
                            <p className={`text-sm mt-0.5 ${lesson.status === 'locked' ? 'text-gray-300' : 'text-gray-500'}`}>{lesson.description}</p>

                            {/* Progress Bar for in-progress */}
                            {lesson.status === 'in-progress' && lesson.progress !== undefined && (
                              <div className="mt-3 flex items-center gap-3">
                                <span className="text-xs font-semibold text-gray-500">Progress</span>
                                <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${lesson.progress}%` }}
                                    transition={{ duration: 1 }}
                                    className="h-full bg-gradient-to-r from-[#5B4AAB] to-[#7C66E4] rounded-full"
                                  />
                                </div>
                                <span className="text-xs font-bold text-[#5B4AAB]">{lesson.progress}%</span>
                              </div>
                            )}
                          </div>

                          {/* Action */}
                          <div className="shrink-0">
                            {lesson.status === 'completed' && (
                              <span className="flex items-center gap-2">
                                <span className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1.5 rounded-md">Completed</span>
                                <Button variant="outline" size="sm" className="text-xs font-semibold border-gray-200">Review</Button>
                              </span>
                            )}
                            {lesson.status === 'in-progress' && (
                              <Button className="bg-[#5B4AAB] text-white text-xs font-semibold hover:bg-[#4a3b96]">Continue Learning</Button>
                            )}
                            {lesson.status === 'locked' && (
                              <Lock className="w-5 h-5 text-gray-300" />
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Overall Progress */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">Overall Progress</h3>
            <div className="flex items-center gap-6">
              {/* Donut Chart */}
              <div className="relative w-28 h-28 shrink-0">
                <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#f3f4f6" strokeWidth="8" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#5B4AAB" strokeWidth="8"
                    strokeDasharray={`${65 * 2.51} ${100 * 2.51}`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-extrabold text-gray-900">65%</span>
                  <span className="text-[10px] text-gray-500 font-semibold">Completed</span>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  <span className="text-gray-600">Completed</span>
                  <span className="font-bold text-gray-900 ml-auto">26 Days</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#5B4AAB]" />
                  <span className="text-gray-600">In Progress</span>
                  <span className="font-bold text-gray-900 ml-auto">10 Days</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-gray-300" />
                  <span className="text-gray-600">Upcoming</span>
                  <span className="font-bold text-gray-900 ml-auto">24 Days</span>
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4 text-sm font-semibold text-gray-700 border-gray-200 flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              View Progress Analytics
            </Button>
          </motion.div>

          {/* Upcoming Live Session */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Upcoming Live Session</h3>
              <a href="#" className="text-xs font-bold text-[#5B4AAB] hover:text-[#3D2E7F]">View Calendar</a>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="bg-[#5B4AAB] text-white rounded-lg px-3 py-2 text-center shrink-0">
                  <p className="text-[10px] font-bold uppercase">MAY</p>
                  <p className="text-xl font-extrabold">24</p>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900">JavaScript Basics Live</h4>
                  <p className="text-xs text-gray-500 mt-1">10:00 AM - 11:30 AM</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#5B4AAB] to-[#3D2E7F] flex items-center justify-center text-white text-[10px] font-bold">P</div>
                    <span className="text-xs text-gray-600 font-medium">Priya Sharma</span>
                  </div>
                </div>
                <Button className="bg-[#5B4AAB] text-white text-xs font-semibold hover:bg-[#4a3b96] shrink-0">Join Session</Button>
              </div>
            </div>
          </motion.div>

          {/* Resources for This Stage */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">Resources for This Stage</h3>
            <div className="space-y-3">
              {RESOURCES.map((resource) => (
                <button key={resource.title} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left group">
                  <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-[#5B4AAB] group-hover:bg-purple-100 transition-colors">
                    <resource.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-900">{resource.title}</p>
                    <p className="text-xs text-gray-500">{resource.count}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
                </button>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-3 text-sm font-semibold text-gray-700 border-gray-200">
              View All Resources
            </Button>
          </motion.div>

          {/* Your Mentor */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">Your Mentor</h3>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#5B4AAB] to-[#3D2E7F] flex items-center justify-center text-white text-xl font-bold shrink-0">
                P
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900">Priya Sharma</h4>
                <p className="text-xs text-gray-500">Senior Full Stack Developer</p>
              </div>
              <Button variant="outline" className="text-xs font-semibold border-gray-200 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5" />
                Message
              </Button>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 font-medium">Mentor Availability</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Mon - Sat (10:00 AM - 7:00 PM)</span>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-green-100 text-green-700 rounded-full">Online</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

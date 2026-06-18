'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import {
  Video,
  Mic,
  MicOff,
  Monitor,
  Hand,
  MoreHorizontal,
  Send,
  Smile,
  Paperclip,
  Users,
  MessageSquare,
  HelpCircle,
  Clock,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Minus,
  Plus,
  Maximize2,
} from 'lucide-react';
import { motion } from 'framer-motion';

// ============================================================
// TYPES
// ============================================================

interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  time: string;
  isMentor?: boolean;
  isPinned?: boolean;
  avatar?: string;
}

interface SessionResource {
  title: string;
  type: string;
  size: string;
}

// ============================================================
// MOCK DATA
// ============================================================

const CHAT_MESSAGES: ChatMessage[] = [
  { id: '1', sender: 'Karthik S', message: 'Good morning everyone! 👋', time: '10:05 AM', avatar: 'K' },
  { id: '2', sender: 'Sneha R', message: 'Can you share some examples of good prompts?', time: '10:06 AM', avatar: 'S' },
  { id: '3', sender: 'Arjun M', message: 'Yes, please explain the context part in detail.', time: '10:07 AM', avatar: 'A' },
  { id: '4', sender: 'Mentor - Priya Sharma', message: "Sure! I'll cover that with live examples.", time: '10:08 AM', isMentor: true, avatar: 'P' },
  { id: '5', sender: 'Vivek P', message: 'This is really helpful! Thank you 😊', time: '10:09 AM', avatar: 'V' },
];

const SESSION_RESOURCES: SessionResource[] = [
  { title: 'Prompt Engineering Cheat Sheet', type: 'PDF', size: '1.2 MB' },
  { title: 'Prompt Examples Collection', type: 'PDF', size: '2.4 MB' },
  { title: 'Best Practices Guide', type: 'PDF', size: '1.8 MB' },
];

const TOPICS_COVERED = [
  'What is Prompt Engineering?',
  'Why it is important?',
  'Key principles of effective prompts',
  'Real-world examples',
  'Live examples & practice',
];

// ============================================================
// COMPONENT
// ============================================================

export function StudentSessionsPage() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [activeRightTab, setActiveRightTab] = useState<'chat' | 'participants' | 'qa'>('chat');
  const [activeBottomTab, setActiveBottomTab] = useState<'details' | 'resources' | 'announcements' | 'polls'>('details');
  const [chatMessage, setChatMessage] = useState('');
  const [question, setQuestion] = useState('');

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
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <nav className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
            <span className="cursor-pointer hover:text-[#5B4AAB]">Live Sessions</span>
            <span className="text-gray-400">&gt;</span>
            <span className="text-gray-800 font-semibold">AI Fundamentals - Session 5</span>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 font-medium">Course Progress</span>
          <div className="w-32 bg-gray-200 rounded-full h-2 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#5B4AAB] to-[#7C66E4] rounded-full" style={{ width: '60%' }} />
          </div>
          <span className="text-sm font-bold text-[#5B4AAB]">60%</span>
        </div>
      </div>

      {/* Session Title */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 bg-red-500 text-white text-[10px] font-bold uppercase rounded-md flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              LIVE
            </span>
            <h1 className="text-2xl font-extrabold text-gray-900">AI Fundamentals - Session 5</h1>
          </div>
          <p className="text-sm text-gray-500 mt-1">Topic: Prompt Engineering Basics</p>
          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
            <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> Priya Sharma</span>
            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Started 10:02 AM</span>
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Duration 01:15:24</span>
          </div>
        </div>
        <Button className="bg-red-500 text-white text-sm font-semibold hover:bg-red-600 flex items-center gap-2">
          <Plus className="w-4 h-4 rotate-45" />
          End Session
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - Left 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Video / Presentation Area */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900 rounded-xl overflow-hidden relative"
          >
            {/* Presentation Content */}
            <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center relative">
              {/* Slide Content */}
              <div className="text-center text-white max-w-2xl px-8">
                <h2 className="text-4xl font-extrabold mb-8">Prompt Engineering Basics</h2>
                <div className="text-left space-y-4">
                  <p className="text-lg font-bold text-[#7C66E4]">Key Principles</p>
                  {['Be Clear and Specific', 'Provide Context', 'Specify the Format', 'Use Examples', 'Iterate and Improve'].map((principle, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                      <span className="text-sm">{principle}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mentor Video (Bottom Left) */}
              <div className="absolute bottom-4 left-4 w-48 h-36 bg-gray-800 rounded-lg border-2 border-gray-700 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-[#5B4AAB] to-[#3D2E7F] flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-16 h-16 rounded-full bg-white/20 mx-auto flex items-center justify-center text-xl font-bold mb-1">P</div>
                    <p className="text-xs">Priya Sharma 📶</p>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-gray-900/80 backdrop-blur-sm rounded-full px-4 py-2">
                <button className="w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center text-white transition-colors">
                  <Video className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center text-white transition-colors">
                  <Mic className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center text-white transition-colors">
                  <Monitor className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center text-white transition-colors">
                  <Hand className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center text-white transition-colors">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
                <Button className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-full px-5">Leave</Button>
              </div>

              {/* Slide Controls */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-gray-900/80 backdrop-blur-sm rounded-full px-3 py-1.5">
                <button className="text-white/70 hover:text-white"><ChevronLeft className="w-4 h-4" /></button>
                <span className="text-white text-xs font-semibold">5 / 18</span>
                <button className="text-white/70 hover:text-white"><ChevronRight className="w-4 h-4" /></button>
                <div className="w-px h-4 bg-gray-600 mx-1" />
                <button className="text-white/70 hover:text-white"><Minus className="w-4 h-4" /></button>
                <span className="text-white text-xs">100%</span>
                <button className="text-white/70 hover:text-white"><Plus className="w-4 h-4" /></button>
                <button className="text-white/70 hover:text-white"><Maximize2 className="w-4 h-4" /></button>
              </div>
            </div>
          </motion.div>

          {/* Stats Bar */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { icon: Users, value: '85', label: 'Participants' },
              { icon: MessageSquare, value: '12', label: 'Questions' },
              { icon: HelpCircle, value: '3', label: 'Polls' },
              { icon: Clock, value: '01:15:24', label: 'Live Duration' },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -2 }}
                className="bg-white rounded-xl border border-gray-200 p-4 text-center shadow-sm"
              >
                <div className="flex items-center justify-center gap-2 mb-1">
                  <stat.icon className="w-5 h-5 text-[#5B4AAB]" />
                  <span className="text-2xl font-extrabold text-gray-900">{stat.value}</span>
                </div>
                <p className="text-xs text-gray-500 font-semibold">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Session Details Tabs */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="flex gap-6 border-b border-gray-200 px-6">
              {[
                { id: 'details', label: 'Session Details' },
                { id: 'resources', label: 'Resources' },
                { id: 'announcements', label: 'Announcements' },
                { id: 'polls', label: 'Polls' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveBottomTab(tab.id as any)}
                  className={`py-4 text-sm font-semibold relative transition-colors ${
                    activeBottomTab === tab.id ? 'text-[#5B4AAB]' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                  {activeBottomTab === tab.id && (
                    <motion.div layoutId="sessionTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5B4AAB]" />
                  )}
                </button>
              ))}
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* About This Session */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">About This Session</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    In this session, we will learn the fundamentals of Prompt Engineering, key techniques, and best practices to communicate effectively with AI models.
                  </p>
                  <div className="space-y-3">
                    {[
                      { label: 'Date', value: 'May 20, 2025' },
                      { label: 'Time', value: '10:00 AM - 11:30 AM' },
                      { label: 'Mentor', value: 'Priya Sharma' },
                    ].map(item => (
                      <div key={item.label} className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-semibold text-gray-700">{item.label}</span>
                        <span className="text-sm text-gray-600 ml-auto">{item.value}</span>
                      </div>
                    ))}
                    <div className="flex items-center gap-3">
                      <Video className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-semibold text-gray-700">Recording</span>
                      <span className="text-xs font-bold text-amber-600 ml-auto">Will be available</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-3">Recording will be available within 24 hours after the session ends.</p>
                </div>

                {/* What We'll Cover */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">What We'll Cover</h3>
                  <div className="space-y-3">
                    {TOPICS_COVERED.map((topic, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#5B4AAB]" />
                        <span className="text-sm text-gray-700">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Info Banner */}
            <div className="border-t border-gray-200 px-6 py-3 bg-blue-50 rounded-b-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-blue-500" />
              <span className="text-xs text-gray-600">This live session is being recorded. You will be notified once the recording is available.</span>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Chat */}
        <div className="space-y-6">
          {/* Chat Panel */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col"
            style={{ maxHeight: '500px' }}
          >
            {/* Chat Tabs */}
            <div className="flex border-b border-gray-200 px-4">
              {[
                { id: 'chat', label: 'Chat' },
                { id: 'participants', label: 'Participants (85)' },
                { id: 'qa', label: 'Q&A' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveRightTab(tab.id as any)}
                  className={`py-3 px-3 text-sm font-semibold transition-colors ${
                    activeRightTab === tab.id ? 'text-[#5B4AAB] border-b-2 border-[#5B4AAB]' : 'text-gray-500'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Pinned Message */}
            <div className="px-4 py-3 bg-amber-50 border-b border-amber-100">
              <p className="text-[10px] font-bold text-amber-700 uppercase mb-1">📌 Pinned by Mentor</p>
              <p className="text-xs text-gray-700">Please keep your mic muted and use the chat for questions. We'll have a Q&A session at the end.</p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {CHAT_MESSAGES.map((msg) => (
                <div key={msg.id} className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    msg.isMentor
                      ? 'bg-gradient-to-br from-[#5B4AAB] to-[#3D2E7F] text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {msg.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold ${msg.isMentor ? 'text-[#5B4AAB]' : 'text-gray-900'}`}>{msg.sender}</span>
                      <span className="text-[10px] text-gray-400">{msg.time}</span>
                    </div>
                    <p className={`text-sm mt-0.5 ${msg.isMentor ? 'text-[#5B4AAB]' : 'text-gray-600'}`}>{msg.message}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="border-t border-gray-200 p-3">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5B4AAB]/20"
                />
                <div className="flex items-center gap-1">
                  <button className="p-1.5 rounded-md hover:bg-gray-100"><Smile className="w-4 h-4 text-gray-400" /></button>
                  <button className="p-1.5 rounded-md hover:bg-gray-100"><Paperclip className="w-4 h-4 text-gray-400" /></button>
                  <button className="p-1.5 rounded-md hover:bg-gray-100"><MessageSquare className="w-4 h-4 text-gray-400" /></button>
                </div>
                <Button className="bg-[#5B4AAB] text-white text-xs font-semibold hover:bg-[#4a3b96] px-4">Send</Button>
              </div>
            </div>
          </motion.div>

          {/* Ask a Question */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm"
          >
            <h3 className="text-sm font-bold text-gray-900 mb-3">Ask a Question</h3>
            <textarea
              placeholder="Add your question here..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none h-16 focus:outline-none focus:ring-2 focus:ring-[#5B4AAB]/20"
            />
            <div className="flex items-center justify-between mt-2">
              <label className="flex items-center gap-2 text-xs text-gray-500">
                <input type="checkbox" className="accent-[#5B4AAB]" />
                Ask anonymously
              </label>
              <Button className="bg-[#5B4AAB] text-white text-xs font-semibold hover:bg-[#4a3b96]">Submit</Button>
            </div>
          </motion.div>

          {/* Session Resources */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm"
          >
            <h3 className="text-sm font-bold text-gray-900 mb-3">Session Resources</h3>
            <div className="space-y-3">
              {SESSION_RESOURCES.map((resource) => (
                <div key={resource.title} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-red-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{resource.title}</p>
                    <p className="text-xs text-gray-500">{resource.type} • {resource.size}</p>
                  </div>
                  <button className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Report Issue */}
          <Button variant="outline" className="w-full text-sm font-semibold border-gray-200 text-gray-700">
            Report an Issue
          </Button>
        </div>
      </div>
    </div>
  );
}

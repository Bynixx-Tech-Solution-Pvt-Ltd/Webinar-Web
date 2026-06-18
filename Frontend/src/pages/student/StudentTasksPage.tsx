'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Play,
  Save,
  Send,
  FileText,
  Code,
  Clock,
  CheckCircle2,
  XCircle,
  Star,
  Calendar,
  MessageSquare,
  ExternalLink,
  ChevronDown,
  Eye,
  RotateCcw,
  Maximize2,
  Sun,
} from 'lucide-react';
import { motion } from 'framer-motion';

// ============================================================
// TYPES
// ============================================================

interface TestCaseItem {
  id: number;
  name: string;
  passed: boolean;
}

interface SubmissionItem {
  attempt: number;
  status: string;
  date: string;
}

interface ResourceItem {
  title: string;
}

// ============================================================
// MOCK DATA
// ============================================================

const REQUIREMENTS = [
  'Use HTML for structure',
  'Use CSS for styling and responsiveness',
  'Use JavaScript to toggle mobile menu',
  'The navbar should be fixed at the top',
];

const TEST_CASES: TestCaseItem[] = [
  { id: 1, name: 'Navbar should be visible on all pages', passed: true },
  { id: 2, name: 'All menu items should be clickable', passed: true },
  { id: 3, name: 'Mobile menu should toggle on click', passed: true },
  { id: 4, name: 'Navbar should be responsive', passed: true },
  { id: 5, name: 'Code follows best practices', passed: true },
];

const RESOURCES: ResourceItem[] = [
  { title: 'Navbar Example' },
  { title: 'Responsive Navbar Tutorial' },
  { title: 'Flexbox Guide' },
  { title: 'JavaScript DOM Methods' },
];

const CODE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Responsive Navbar</title>
</head>
<body>
    <nav class="navbar">
        <div class="logo">Bynixx</div>
        <ul class="nav-links">
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Contact</a></li>
        </ul>
        <div class="menu-toggle" id="menu-toggle">
            <i class="fa fa-bars"></i>
        </div>
    </nav>
</body>`;

// ============================================================
// COMPONENT
// ============================================================

export function StudentTasksPage() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'details' | 'submission' | 'discussion'>('details');
  const [activeFile, setActiveFile] = useState('index.html');

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
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
        <span className="cursor-pointer hover:text-[#5B4AAB]">Full Stack Web Development</span>
        <span className="text-gray-400">&gt;</span>
        <span className="cursor-pointer hover:text-[#5B4AAB]">Frontend Development (Days 11 - 25)</span>
        <span className="text-gray-400">&gt;</span>
        <span className="text-gray-800 font-semibold">Task 3</span>
      </nav>

      {/* Back Link */}
      <button onClick={() => navigate({ to: '/student' })} className="text-[#5B4AAB] hover:text-[#3D2E7F] text-sm font-semibold flex items-center gap-1">
        <ArrowLeft className="w-4 h-4" />
        Back to Tasks
      </button>

      {/* Title */}
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-extrabold text-gray-900">Task 3: Build a Responsive Navigation Bar</h1>
          <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-700 rounded-full">Assigned</span>
        </div>
        <p className="text-sm text-gray-500 mt-1">Create a responsive navigation bar with a brand logo, menu items, and a mobile hamburger menu using HTML, CSS, and JavaScript.</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex gap-6">
          {[
            { id: 'details', label: 'Task Details' },
            { id: 'submission', label: 'My Submission' },
            { id: 'discussion', label: 'Discussion (12)' },
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
                <motion.div layoutId="taskTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5B4AAB]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Problem Statement */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
          >
            <h2 className="text-lg font-bold text-gray-900 mb-3">Problem Statement</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">Build a responsive navigation bar that includes:</p>
            <ul className="space-y-2 text-sm text-gray-600 mb-4">
              <li className="flex items-start gap-2">
                <span className="text-gray-400 mt-0.5">•</span>
                <span>Brand logo on the left</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400 mt-0.5">•</span>
                <span>Menu items (Home, About, Services, Contact) on the right</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400 mt-0.5">•</span>
                <span>Hamburger menu icon on mobile view</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400 mt-0.5">•</span>
                <span>Smooth responsive behavior</span>
              </li>
            </ul>

            <h3 className="text-sm font-bold text-gray-900 mb-3">Requirements</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              {REQUIREMENTS.map((req, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
            <button className="mt-4 text-sm font-semibold text-[#5B4AAB] hover:text-[#3D2E7F] flex items-center gap-1">
              Show More <ChevronDown className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Code Editor */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-gray-200 px-4">
              <h3 className="text-lg font-bold text-gray-900 py-4">Your Submission</h3>
            </div>

            {/* File Tabs */}
            <div className="flex items-center justify-between border-b border-gray-200 px-4">
              <div className="flex gap-1">
                {['index.html', 'style.css', 'script.js'].map(file => (
                  <button
                    key={file}
                    onClick={() => setActiveFile(file)}
                    className={`px-4 py-2.5 text-sm font-semibold flex items-center gap-2 transition-colors ${
                      activeFile === file
                        ? 'bg-white text-[#5B4AAB] border-b-2 border-[#5B4AAB]'
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    <span className={`w-3 h-3 rounded-full ${
                      file.endsWith('.html') ? 'bg-orange-500' : file.endsWith('.css') ? 'bg-blue-500' : 'bg-yellow-500'
                    }`} />
                    {file}
                  </button>
                ))}
                <button className="px-3 py-2.5 text-gray-400 hover:text-gray-600">+</button>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700">
                  <Sun className="w-3.5 h-3.5" />
                  Light
                  <ChevronDown className="w-3 h-3" />
                </button>
                <button className="text-gray-400 hover:text-gray-600"><Maximize2 className="w-4 h-4" /></button>
              </div>
            </div>

            {/* Code Content */}
            <div className="bg-gray-900 text-gray-300 font-mono text-sm p-4 min-h-[300px] overflow-x-auto">
              <div className="flex">
                <div className="w-8 text-right pr-3 text-gray-600 select-none">
                  {CODE_HTML.split('\n').map((_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>
                <pre className="flex-1">{CODE_HTML}</pre>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3">
              <Button className="bg-[#5B4AAB] text-white text-sm font-semibold hover:bg-[#4a3b96] flex items-center gap-2">
                <Play className="w-4 h-4" />
                Run Code
              </Button>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="text-sm font-semibold border-gray-200 flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Save Draft
                </Button>
                <Button className="bg-[#5B4AAB] text-white text-sm font-semibold hover:bg-[#4a3b96] flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Submit Task
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Task Information */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">Task Information</h3>
            <div className="space-y-4">
              {[
                { icon: Star, label: 'Points', value: '100' },
                { icon: Calendar, label: 'Due Date', value: 'May 25, 2025 11:59 PM' },
                { icon: RotateCcw, label: 'Attempts Allowed', value: '3' },
                { icon: CheckCircle2, label: 'Your Attempts', value: '1 / 3' },
                { icon: Code, label: 'Submission Type', value: 'Code' },
                { icon: Eye, label: 'Evaluation', value: 'Auto + Manual' },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <item.icon className="w-4 h-4 text-gray-400" />
                    {item.label}
                  </div>
                  <span className="text-sm font-bold text-gray-900">{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Submission History */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">Submission History</h3>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
              <div>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-green-100 text-green-700 rounded-full">Submitted</span>
                <p className="text-sm font-semibold text-gray-900 mt-1">Attempt 1</p>
                <p className="text-xs text-gray-500">May 20, 2025 03:45 PM</p>
              </div>
              <Button variant="outline" size="sm" className="text-xs font-semibold border-gray-200">View Details</Button>
            </div>
          </motion.div>

          {/* Test Cases */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Test Cases</h3>
              <span className="text-sm font-bold text-green-600">5 / 5 Passed</span>
            </div>
            <div className="space-y-3">
              {TEST_CASES.map(tc => (
                <div key={tc.id} className="flex items-start gap-2">
                  <CheckCircle2 className={`w-4 h-4 mt-0.5 ${tc.passed ? 'text-green-500' : 'text-red-500'}`} />
                  <span className="text-sm text-gray-700">{tc.name}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">Resources</h3>
            <div className="space-y-3">
              {RESOURCES.map(resource => (
                <div key={resource.title} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#5B4AAB]" />
                    <span className="text-sm text-gray-700">{resource.title}</span>
                  </div>
                  <span className="text-xs font-bold text-[#5B4AAB] cursor-pointer hover:text-[#3D2E7F]">View</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Need Help */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
          >
            <h3 className="text-sm font-bold text-gray-900 mb-1">Need Help?</h3>
            <p className="text-xs text-gray-500 mb-3">Stuck on this task? Ask your mentor.</p>
            <Button variant="outline" className="w-full text-sm font-semibold border-gray-200 flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Ask Now
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

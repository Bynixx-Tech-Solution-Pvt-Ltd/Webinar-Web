'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  ArrowRight,
  Play,
  Code,
  FileText,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  BookOpen,
  Lightbulb,
  Monitor,
  Moon,
  RotateCcw,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import { motion } from 'framer-motion';

// ============================================================
// TYPES
// ============================================================

interface TestCase {
  id: number;
  name: string;
  input: string;
  output: string;
  passed: boolean;
}

// ============================================================
// MOCK DATA
// ============================================================

const CODE_CONTENT = `<!DOCTYPE html>
<html>
<head>
    <title>My First Page</title>
</head>
<body>
    <h1>Hello, Bynixx!</h1>
    <p>Welcome to web development.</p>
</body>
</html>`;

const MOCK_TEST_CASES: TestCase[] = [
  { id: 1, name: 'Test Case 1', input: 'N/A', output: 'Heading with your name\nA paragraph about yourself', passed: true },
];

// ============================================================
// COMPONENT
// ============================================================

export function StudentContentPage() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'lesson' | 'notes' | 'resources' | 'discussions'>('lesson');
  const [editorTab, setEditorTab] = useState<'editor' | 'output'>('editor');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [code, setCode] = useState(CODE_CONTENT);

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

  const tabs = [
    { id: 'lesson', label: 'Lesson' },
    { id: 'notes', label: 'Notes' },
    { id: 'resources', label: 'Resources' },
    { id: 'discussions', label: 'Discussions' },
  ] as const;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate({ to: '/student/roadmap' })} className="text-[#5B4AAB] hover:text-[#3D2E7F] text-sm font-semibold flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            Back to Roadmap
          </button>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 font-medium">Course Progress</span>
          <div className="w-32 bg-gray-200 rounded-full h-2 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#5B4AAB] to-[#7C66E4] rounded-full" style={{ width: '45%' }} />
          </div>
          <span className="text-sm font-bold text-[#5B4AAB]">45%</span>
        </div>
      </div>

      {/* Page Title */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-extrabold text-gray-900">HTML & CSS Basics</h1>
          <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-green-100 text-green-700 rounded-full">In Progress</span>
        </div>
        <p className="text-sm text-gray-500">Learn the building blocks of web pages using HTML and CSS.</p>
      </div>

      {/* Tabs + Navigation */}
      <div className="flex items-center justify-between border-b border-gray-200">
        <div className="flex gap-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 text-sm font-semibold relative transition-colors ${
                activeTab === tab.id ? 'text-[#5B4AAB]' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div layoutId="contentTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5B4AAB]" />
              )}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 pb-3">
          <Button variant="outline" size="sm" className="text-xs font-semibold border-gray-200 flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            Previous
          </Button>
          <Button variant="outline" size="sm" className="text-xs font-semibold border-gray-200 flex items-center gap-1">
            Next
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Lesson Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Lesson Text */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">Introduction to HTML</h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                HTML stands for Hyper Text Markup Language. It is used to structure the content on the web.
              </p>

              <h4 className="text-sm font-bold text-gray-900 mb-3">Example:</h4>
              <div className="bg-gray-900 rounded-lg p-4 text-sm font-mono text-gray-300 leading-relaxed overflow-x-auto">
                <pre>{`<!DOCTYPE html>
<html>
<head>
    <title>My First Page</title>
</head>
<body>
    <h1>Hello, Bynixx!</h1>
    <p>Welcome to web development.</p>
</body>
</html>`}</pre>
              </div>

              {/* Did You Know */}
              <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  <span className="text-sm font-bold text-amber-700">Did You Know?</span>
                </div>
                <p className="text-xs text-gray-600">HTML is the backbone of every website. It describes the structure of a web page.</p>
              </div>

              {/* Video */}
              <div className="mt-6">
                <h4 className="text-sm font-bold text-gray-900 mb-3">Watch Video Explanation</h4>
                <div className="bg-gray-900 rounded-lg h-40 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-600 to-red-600 opacity-80" />
                  <div className="relative z-10 text-center text-white">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-2 backdrop-blur-sm">
                      <Play className="w-6 h-6 text-white fill-white" />
                    </div>
                    <p className="text-xl font-bold">HTML</p>
                  </div>
                </div>
              </div>

              {/* Helpful */}
              <div className="mt-6 flex items-center gap-4">
                <span className="text-xs text-gray-500">Was this lesson helpful?</span>
                <button className="p-1.5 rounded-md hover:bg-gray-100 transition-colors"><ThumbsUp className="w-4 h-4 text-gray-400" /></button>
                <button className="p-1.5 rounded-md hover:bg-gray-100 transition-colors"><ThumbsDown className="w-4 h-4 text-gray-400" /></button>
              </div>
            </motion.div>

            {/* Code Editor */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col"
            >
              {/* Editor Tabs */}
              <div className="flex items-center justify-between border-b border-gray-200 px-4">
                <div className="flex gap-4">
                  <button
                    onClick={() => setEditorTab('editor')}
                    className={`py-3 text-sm font-semibold relative transition-colors ${editorTab === 'editor' ? 'text-[#5B4AAB]' : 'text-gray-500'}`}
                  >
                    Code Editor
                    {editorTab === 'editor' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5B4AAB]" />}
                  </button>
                  <button
                    onClick={() => setEditorTab('output')}
                    className={`py-3 text-sm font-semibold relative transition-colors ${editorTab === 'output' ? 'text-[#5B4AAB]' : 'text-gray-500'}`}
                  >
                    Output
                    {editorTab === 'output' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5B4AAB]" />}
                  </button>
                </div>
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-700"
                >
                  <Moon className="w-3.5 h-3.5" />
                  {theme === 'dark' ? 'Dark' : 'Light'}
                </button>
              </div>

              {/* Editor Content */}
              <div className={`flex-1 min-h-[300px] p-4 font-mono text-sm leading-relaxed ${theme === 'dark' ? 'bg-gray-900 text-gray-300' : 'bg-white text-gray-800'}`}>
                {editorTab === 'editor' ? (
                  <div className="flex">
                    <div className={`w-8 text-right pr-3 select-none ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`}>
                      {code.split('\n').map((_, i) => (
                        <div key={i}>{i + 1}</div>
                      ))}
                    </div>
                    <pre className="flex-1 overflow-x-auto">{code}</pre>
                  </div>
                ) : (
                  <div className="p-4">
                    <h1 className="text-2xl font-bold text-gray-900">Hello, Bynixx!</h1>
                    <p className="text-gray-600 mt-2">Welcome to web development.</p>
                  </div>
                )}
              </div>

              {/* Editor Actions */}
              <div className="border-t border-gray-200 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button className="bg-[#5B4AAB] text-white text-xs font-semibold hover:bg-[#4a3b96] flex items-center gap-1.5">
                    <Play className="w-3.5 h-3.5" />
                    Run Code
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs font-semibold border-gray-200 flex items-center gap-1.5">
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reset
                  </Button>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5 text-xs text-green-600 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Code saved
                  </span>
                  <label className="flex items-center gap-1.5 text-xs text-gray-500">
                    Auto-run
                    <input type="checkbox" className="accent-[#5B4AAB]" />
                  </label>
                </div>
              </div>

              {/* Output Section */}
              <div className="border-t border-gray-200">
                <div className="px-4 py-2 text-xs font-semibold text-gray-500">Output</div>
                <div className="px-4 pb-4">
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h1 className="text-xl font-bold">Hello, Bynixx!</h1>
                    <p className="text-gray-600 mt-1 text-sm">Welcome to web development.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <Button variant="outline" className="text-sm font-semibold border-gray-200 flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Previous Lesson
            </Button>
            <span className="text-sm text-gray-500 font-medium">Lesson 4 of 12</span>
            <Button className="bg-[#5B4AAB] text-white text-sm font-semibold hover:bg-[#4a3b96] flex items-center gap-2">
              Next Lesson
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Problem */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-gray-900">Problem</h3>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-green-100 text-green-700 rounded-full">Easy</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Create a simple HTML page that displays your name in a heading and a short paragraph about yourself.
            </p>

            <div className="mt-4">
              <h4 className="text-sm font-bold text-gray-900 mb-2">Input</h4>
              <p className="text-xs text-gray-500">N/A – This is a client side output problem.</p>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-bold text-gray-900 mb-2">Expected Output</h4>
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                <p className="text-xs text-gray-600">Heading with your name</p>
                <p className="text-xs text-gray-600">A paragraph about yourself</p>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-bold text-gray-900 mb-2">Example</h4>
              <p className="text-xs text-gray-500 mb-2">Sample Output</p>
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                <p className="text-sm font-bold text-gray-900">Karthik S</p>
                <p className="text-xs text-gray-600">I am learning full stack web development.</p>
              </div>
            </div>
          </motion.div>

          {/* Compiler */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-4">
              <Code className="w-5 h-5 text-[#5B4AAB]" />
              <h3 className="text-sm font-bold text-gray-900">Piston (Judge0) Compiler</h3>
            </div>
            <p className="text-xs text-gray-500 mb-3">Powered by open source Judge0</p>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-1">Language</label>
                <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700">
                  <option>HTML</option>
                  <option>CSS</option>
                  <option>JavaScript</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-1">Version</label>
                <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700">
                  <option>HTML (HTML5)</option>
                </select>
              </div>
            </div>

            {/* Success Result */}
            <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-sm font-bold text-green-700">Success</span>
                <CheckCircle2 className="w-5 h-5 text-green-500 ml-auto" />
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>Time: 0.05s</span>
                <span>Memory: 3.21 MB</span>
              </div>
            </div>
          </motion.div>

          {/* Test Cases */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
          >
            <div className="flex gap-4 border-b border-gray-200 mb-4">
              <button className="pb-3 text-sm font-semibold text-[#5B4AAB] border-b-2 border-[#5B4AAB]">Test Cases</button>
              <button className="pb-3 text-sm font-semibold text-gray-500">Custom Test</button>
              <button className="pb-3 text-sm font-semibold text-gray-500">Submissions</button>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span className="font-semibold text-gray-900">All test cases passed</span>
              <span>🎉</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

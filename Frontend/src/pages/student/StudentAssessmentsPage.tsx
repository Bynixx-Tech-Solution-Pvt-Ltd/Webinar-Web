'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import {
  Clock,
  Star,
  Calendar,
  Play,
  RotateCcw,
  CheckCircle2,
  Code,
  ChevronDown,
  FileText,
  ExternalLink,
  Eye,
  Send,
  History,
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
  runtime: string;
  passed: boolean;
}

// ============================================================
// MOCK DATA
// ============================================================

const EXAMPLES = [
  { input: '[1, 2, 2, 3, 4, 4, 5]', output: '[1, 2, 3, 4, 5]' },
  { input: '[7, 7, 7, 7]', output: '[7]' },
  { input: '[1, 2, 3, 4]', output: '[1, 2, 3, 4]' },
];

const TEST_CASES: TestCase[] = [
  { id: 1, name: 'Test Case 1', input: '[1, 2, 2, 3, 4, 4, 5]', output: '[1, 2, 3, 4, 5]', runtime: '2ms', passed: true },
  { id: 2, name: 'Test Case 2', input: '[7, 7, 7, 7]', output: '[7]', runtime: '1ms', passed: true },
  { id: 3, name: 'Test Case 3', input: '[1, 2, 3, 4]', output: '[1, 2, 3, 4]', runtime: '1ms', passed: true },
  { id: 4, name: 'Test Case 4', input: '[1]', output: '[1]', runtime: '0ms', passed: true },
  { id: 5, name: 'Test Case 5', input: '[]', output: '[]', runtime: '0ms', passed: true },
];

const CODE_JS = `/**
 * @param {number[]} nums
 * @return {number[]}
 */
function uniqueArray(nums) {
    // Write your code here
}

// Example usage:
console.log(uniqueArray([1, 2, 2, 3, 4, 4, 5])); // [1, 2, 3, 4, 5]`;

const RESOURCES = [
  { title: 'JavaScript Array Docs', url: '#' },
  { title: 'Set Object in JS', url: '#' },
  { title: 'MDN - Array.prototype.filter()', url: '#' },
];

// ============================================================
// COMPONENT
// ============================================================

export function StudentAssessmentsPage() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'problem' | 'submission' | 'leaderboard'>('problem');
  const [activeTestTab, setActiveTestTab] = useState<'cases' | 'custom' | 'submissions'>('cases');
  const [code, setCode] = useState(CODE_JS);

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
        <span className="cursor-pointer hover:text-[#5B4AAB]">JavaScript Fundamentals</span>
        <span className="text-gray-400">&gt;</span>
        <span className="text-gray-800 font-semibold">Assessment 2</span>
      </nav>

      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Assessment 2: JavaScript Fundamentals</h1>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              Difficulty: <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-700 rounded-full">Medium</span>
            </span>
            <span className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5" /> Points: 100</span>
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Time Limit: 60 mins</span>
            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Due: May 28, 2025 11:59 PM</span>
          </div>
        </div>
        <Button variant="outline" className="text-sm font-semibold border-gray-200 flex items-center gap-2">
          <History className="w-4 h-4" />
          Submission History
        </Button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex gap-6">
          {[
            { id: 'problem', label: 'Problem' },
            { id: 'submission', label: 'My Submission' },
            { id: 'leaderboard', label: 'Leaderboard' },
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
                <motion.div layoutId="assessTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5B4AAB]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Problem Statement */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
            >
              <h2 className="text-lg font-bold text-gray-900 mb-3">Problem Statement</h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Write a JavaScript function that takes an array of numbers and returns a new array containing only the unique numbers in the same order.
              </p>

              {EXAMPLES.map((ex, i) => (
                <div key={i} className="mb-4">
                  <h4 className="text-sm font-bold text-gray-900 mb-2">Example {i + 1}:</h4>
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-100 space-y-1">
                    <p className="text-xs text-gray-600"><strong>Input:</strong> {ex.input}</p>
                    <p className="text-xs text-gray-600"><strong>Output:</strong> {ex.output}</p>
                  </div>
                </div>
              ))}

              <h4 className="text-sm font-bold text-gray-900 mb-2">Constraints:</h4>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• 1 &lt;= array.length &lt;= 10^5</li>
                <li>• -10^9 &lt;= array[i] &lt;= 10^9</li>
              </ul>

              <h4 className="text-sm font-bold text-gray-900 mt-4 mb-2">Resources</h4>
              <div className="space-y-2">
                {RESOURCES.map(r => (
                  <a key={r.title} href={r.url} className="flex items-center gap-2 text-sm text-[#5B4AAB] hover:text-[#3D2E7F] font-semibold">
                    <FileText className="w-3.5 h-3.5" />
                    {r.title}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Code Editor */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col"
            >
              {/* Editor Header */}
              <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
                <div className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-[#5B4AAB]" />
                  <span className="text-sm font-bold text-gray-900">Code Editor</span>
                </div>
                <div className="flex items-center gap-3">
                  <select className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-700">
                    <option>JavaScript (Node.js 18.15.0)</option>
                  </select>
                  <ChevronDown className="w-3 h-3 text-gray-400 -ml-2" />
                  <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 bg-gray-50 px-2 py-1 rounded-lg border border-gray-200">
                    <span>🌙</span>
                    Dark
                  </button>
                </div>
              </div>

              {/* Code */}
              <div className="flex-1 bg-gray-900 text-gray-300 font-mono text-sm p-4 min-h-[280px] overflow-x-auto">
                <div className="flex">
                  <div className="w-8 text-right pr-3 text-gray-600 select-none">
                    {code.split('\n').map((_, i) => (
                      <div key={i}>{i + 1}</div>
                    ))}
                  </div>
                  <pre className="flex-1">{code}</pre>
                </div>
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
                <label className="flex items-center gap-1.5 text-xs text-gray-500">
                  Auto Run
                  <input type="checkbox" className="accent-[#5B4AAB]" />
                </label>
              </div>

              {/* Output */}
              <div className="border-t border-gray-200">
                <div className="px-4 py-2 flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-500">Output</span>
                  <button className="text-xs text-gray-400 hover:text-gray-600">Clear</button>
                </div>
                <div className="px-4 pb-4">
                  <div className="bg-gray-900 rounded-lg p-3 font-mono text-sm text-green-400">
                    [1, 2, 3, 4, 5]
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Submission Result */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Result */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Submission Result</h3>
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
                <div>
                  <p className="text-sm font-bold text-green-700">Passed All Test Cases 🎉</p>
                  <p className="text-xs text-gray-500">Excellent! Your solution is correct.</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xs text-gray-500 font-semibold">Runtime</p>
                  <p className="text-sm font-bold text-gray-900">2 ms</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold">Memory</p>
                  <p className="text-sm font-bold text-gray-900">16.3 MB</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold">Submitted At</p>
                  <p className="text-sm font-bold text-gray-900">May 20, 2025 04:32 PM</p>
                </div>
              </div>
            </div>

            {/* Test Case Summary */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Test Case Summary</h3>
              <div className="flex items-center justify-center">
                <div className="relative w-24 h-24">
                  <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#f3f4f6" strokeWidth="10" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#22c55e" strokeWidth="10"
                      strokeDasharray={`${100 * 2.51} ${100 * 2.51}`} strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-extrabold text-gray-900">5</span>
                    <span className="text-[10px] text-gray-500 font-semibold">Total</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  <span className="text-gray-600">Passed</span>
                  <span className="font-bold text-gray-900 ml-auto">5</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <span className="text-gray-600">Failed</span>
                  <span className="font-bold text-gray-900 ml-auto">0</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2.5 h-2.5 rounded-full bg-gray-300" />
                  <span className="text-gray-600">Skipped</span>
                  <span className="font-bold text-gray-900 ml-auto">0</span>
                </div>
              </div>
            </div>

            {/* Your Submission */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Your Submission</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full text-sm font-semibold border-gray-200 flex items-center gap-2 justify-center">
                  <Code className="w-4 h-4" />
                  View Code
                </Button>
                <Button className="w-full bg-[#5B4AAB] text-white text-sm font-semibold hover:bg-[#4a3b96] flex items-center gap-2 justify-center">
                  <RotateCcw className="w-4 h-4" />
                  Submit Again
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Info Banner */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 flex items-center gap-2">
            <span className="text-blue-500">ℹ</span>
            <span className="text-xs text-gray-600">You can submit your solution multiple times before the deadline. Only the last submission will be considered.</span>
          </div>
        </div>

        {/* Right Sidebar - Test Cases */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Test Cases</h3>
              <span className="text-sm font-bold text-green-600">5 / 5 Passed</span>
            </div>

            <div className="space-y-3">
              {TEST_CASES.map(tc => (
                <div key={tc.id} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-bold text-gray-900">{tc.name}</span>
                  </div>
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>Input: {tc.input}</p>
                    <p>Output: {tc.output}</p>
                    <p className="text-right text-gray-400">Runtime: {tc.runtime}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full mt-4 text-sm font-semibold border-gray-200">
              View All Test Cases
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

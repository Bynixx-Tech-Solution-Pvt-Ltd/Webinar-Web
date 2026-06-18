'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import {
  Star,
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  Circle,
  ArrowRight,
  FileText,
  Code,
  MessageSquare,
  Download,
  Image,
  ExternalLink,
  Eye,
  AlertTriangle,
} from 'lucide-react';
import { motion } from 'framer-motion';

// ============================================================
// TYPES
// ============================================================

interface Deliverable {
  id: number;
  name: string;
  description: string;
  points: number;
  status: 'submitted' | 'in-progress' | 'pending';
  action: string;
}

interface Activity {
  type: 'submit' | 'review' | 'feedback';
  text: string;
  date: string;
}

interface Resource {
  title: string;
  type: string;
  size: string;
}

// ============================================================
// MOCK DATA
// ============================================================

const KEY_FEATURES = [
  'User Authentication (Register, Login, Logout)',
  'Product Listing with Categories',
  'Product Search and Filters',
  'Add to Cart / Remove from Cart',
  'Checkout and Order Placement',
  'Order History',
  'Admin Dashboard (Manage Products, Orders, Users)',
  'Responsive Design',
];

const DELIVERABLES: Deliverable[] = [
  { id: 1, name: 'Project Setup', description: 'Initialize the project with required dependencies and configurations.', points: 20, status: 'submitted', action: 'View' },
  { id: 2, name: 'User Authentication', description: 'Implement user registration, login and logout functionality.', points: 30, status: 'submitted', action: 'View' },
  { id: 3, name: 'Product Module', description: 'Create product listing page with categories and details.', points: 30, status: 'in-progress', action: 'Continue' },
  { id: 4, name: 'Cart Module', description: 'Implement add to cart, remove from cart and update quantity.', points: 30, status: 'in-progress', action: 'Continue' },
  { id: 5, name: 'Checkout & Orders', description: 'Implement checkout process and order placement.', points: 40, status: 'pending', action: 'Start' },
  { id: 6, name: 'Admin Dashboard', description: 'Admin can manage products, orders and users.', points: 30, status: 'pending', action: 'Start' },
  { id: 7, name: 'Deployment', description: 'Deploy the application and submit the live link.', points: 20, status: 'pending', action: 'Start' },
];

const CHECKLIST = [
  { name: 'Project Setup', status: 'completed' },
  { name: 'Authentication', status: 'completed' },
  { name: 'Product Module', status: 'partial', progress: '5/6 Tasks Done' },
  { name: 'Cart Module', status: 'partial', progress: '2/5 Tasks Done' },
  { name: 'Checkout & Orders', status: 'not-started' },
  { name: 'Admin Dashboard', status: 'not-started' },
  { name: 'Deployment', status: 'not-started' },
];

const ACTIVITIES: Activity[] = [
  { type: 'submit', text: 'You submitted Project Setup', date: 'May 20, 2025 04:30 PM' },
  { type: 'review', text: 'Mentor reviewed Project Setup', date: 'May 21, 2025 11:20 AM' },
  { type: 'submit', text: 'You submitted Authentication', date: 'May 22, 2025 09:15 PM' },
  { type: 'review', text: 'Mentor reviewed Authentication', date: 'May 23, 2025 10:05 AM' },
];

const RESOURCES: Resource[] = [
  { title: 'Project Requirements.pdf', type: 'PDF', size: '1.2 MB' },
  { title: 'Database Schema.png', type: 'PNG', size: '320 KB' },
  { title: 'API Documentation.pdf', type: 'PDF', size: '890 KB' },
  { title: 'Sample UI Design.fig', type: 'FIG', size: '2.4 MB' },
];

// ============================================================
// COMPONENT
// ============================================================

export function StudentProjectsPage() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'requirements' | 'deliverables' | 'progress' | 'submissions' | 'discussion'>('overview');

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
        <span className="cursor-pointer hover:text-[#5B4AAB]">Projects</span>
        <span className="text-gray-400">&gt;</span>
        <span className="text-gray-800 font-semibold">Project 2</span>
      </nav>

      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold text-gray-900">Project 2: E-Commerce Web Application</h1>
            <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-green-100 text-green-700 rounded-full">In Progress</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">Build a full-featured e-commerce web application with product listing, cart, user authentication, and order management.</p>
          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
            <span className="flex items-center gap-1.5">Difficulty: <span className="px-2 py-0.5 text-[10px] font-bold bg-red-100 text-red-700 rounded-full">Hard</span></span>
            <span className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5" /> Max Points: 200</span>
            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Due Date: Jun 10, 2025 11:59 PM</span>
            <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> Team: Individual Project</span>
          </div>
        </div>
        <Button variant="outline" className="text-sm font-semibold border-gray-200 flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Project Guidelines
        </Button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex gap-6 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'requirements', label: 'Requirements' },
            { id: 'deliverables', label: 'Deliverables' },
            { id: 'progress', label: 'My Progress' },
            { id: 'submissions', label: 'Submissions' },
            { id: 'discussion', label: 'Discussion (8)' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 text-sm font-semibold relative transition-colors whitespace-nowrap ${
                activeTab === tab.id ? 'text-[#5B4AAB]' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div layoutId="projectTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5B4AAB]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Project Overview */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
          >
            <h2 className="text-lg font-bold text-gray-900 mb-3">Project Overview</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              You will build a complete e-commerce application where users can browse products, add to cart, place orders and track their orders. The application should be responsive and follow best practices.
            </p>

            <div className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <h3 className="text-sm font-bold text-gray-900 mb-3">Key Features</h3>
              <div className="grid grid-cols-2 gap-3">
                {KEY_FEATURES.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#5B4AAB]" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Deliverables Table */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
          >
            <h2 className="text-lg font-bold text-gray-900 mb-1">Deliverables</h2>
            <p className="text-xs text-gray-500 mb-4">Complete all the deliverables and submit your project.</p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 text-xs font-bold text-gray-500 uppercase">Deliverable</th>
                    <th className="text-left py-3 text-xs font-bold text-gray-500 uppercase">Description</th>
                    <th className="text-center py-3 text-xs font-bold text-gray-500 uppercase">Points</th>
                    <th className="text-center py-3 text-xs font-bold text-gray-500 uppercase">Status</th>
                    <th className="text-center py-3 text-xs font-bold text-gray-500 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {DELIVERABLES.map((d) => (
                    <tr key={d.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-3 font-semibold text-gray-900">{d.id}. {d.name}</td>
                      <td className="py-3 text-gray-600 text-xs max-w-xs">{d.description}</td>
                      <td className="py-3 text-center font-bold text-gray-900">{d.points}</td>
                      <td className="py-3 text-center">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold rounded-full ${
                          d.status === 'submitted'
                            ? 'bg-green-100 text-green-700'
                            : d.status === 'in-progress'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-gray-100 text-gray-500'
                        }`}>
                          {d.status === 'submitted' && <CheckCircle2 className="w-3 h-3" />}
                          {d.status === 'in-progress' && <Circle className="w-3 h-3" />}
                          {d.status === 'pending' && <Circle className="w-3 h-3" />}
                          {d.status === 'submitted' ? 'Submitted' : d.status === 'in-progress' ? 'In Progress' : 'Pending'}
                        </span>
                      </td>
                      <td className="py-3 text-center">
                        <span className={`text-xs font-bold cursor-pointer ${
                          d.status === 'submitted' ? 'text-[#5B4AAB]' : d.status === 'in-progress' ? 'text-amber-600' : 'text-[#5B4AAB]'
                        } hover:underline`}>
                          {d.action}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-gray-200">
                    <td className="py-3 font-bold text-gray-900" colSpan={2}></td>
                    <td className="py-3 text-center font-bold text-gray-900" colSpan={1}>Total Points: 200</td>
                    <td colSpan={2}></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </motion.div>

          {/* Task Checklist */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
          >
            <h2 className="text-lg font-bold text-gray-900 mb-1">Task Checklist</h2>
            <p className="text-xs text-gray-500 mb-4">Track your progress with this checklist.</p>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {CHECKLIST.map((item) => (
                <div key={item.name} className={`flex-shrink-0 flex flex-col items-center gap-2 px-4 py-3 rounded-lg border ${
                  item.status === 'completed'
                    ? 'bg-green-50 border-green-200'
                    : item.status === 'partial'
                      ? 'bg-purple-50 border-purple-200'
                      : 'bg-gray-50 border-gray-200'
                }`}>
                  {item.status === 'completed' && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                  {item.status === 'partial' && <div className="w-5 h-5 rounded border-2 border-purple-400 bg-purple-200" />}
                  {item.status === 'not-started' && <div className="w-5 h-5 rounded border-2 border-gray-300 bg-white" />}
                  <span className="text-xs font-semibold text-gray-700 whitespace-nowrap">{item.name}</span>
                  {item.status === 'completed' && <span className="text-[10px] text-green-600 font-semibold">Completed</span>}
                  {item.status === 'partial' && <span className="text-[10px] text-purple-600 font-semibold">{item.progress}</span>}
                  {item.status === 'not-started' && <span className="text-[10px] text-gray-400 font-semibold">Not Started</span>}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Important Note */}
          <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
            <div>
              <span className="text-sm font-bold text-red-700">Important Note</span>
              <p className="text-xs text-gray-600 mt-0.5">Make sure to complete all deliverables before the due date. Late submissions may not be considered.</p>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Submission Status */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">Submission Status</h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="relative w-24 h-24 shrink-0">
                <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#f3f4f6" strokeWidth="10" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#5B4AAB" strokeWidth="10"
                    strokeDasharray={`${65 * 2.51} ${100 * 2.51}`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-extrabold text-gray-900">65%</span>
                  <span className="text-[10px] text-gray-500 font-semibold">Completed</span>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  <span className="text-gray-600">Completed</span>
                  <span className="font-bold text-gray-900 ml-auto">13 / 20</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#5B4AAB]" />
                  <span className="text-gray-600">In Progress</span>
                  <span className="font-bold text-gray-900 ml-auto">3 / 20</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-gray-300" />
                  <span className="text-gray-600">Pending</span>
                  <span className="font-bold text-gray-900 ml-auto">4 / 20</span>
                </div>
              </div>
            </div>
            <Button className="w-full bg-[#5B4AAB] text-white text-sm font-semibold hover:bg-[#4a3b96] flex items-center gap-2 justify-center">
              <Code className="w-4 h-4" />
              Continue Working
            </Button>
          </motion.div>

          {/* Mentor */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">Mentor</h3>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#5B4AAB] to-[#3D2E7F] flex items-center justify-center text-white text-lg font-bold">P</div>
              <div className="flex-1">
                <p className="font-bold text-gray-900">Priya Sharma</p>
                <p className="text-xs text-gray-500">Senior Full Stack Developer</p>
              </div>
              <Button variant="outline" size="sm" className="text-xs font-semibold border-gray-200 flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5" />
                Message
              </Button>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <h4 className="text-sm font-bold text-gray-900 mb-2">Mentor Feedback</h4>
              <p className="text-xs text-gray-600 leading-relaxed">Keep up the good work! Focus on completing the cart module and ensure your code is well structured.</p>
              <a href="#" className="text-xs font-bold text-[#5B4AAB] hover:text-[#3D2E7F] mt-2 inline-flex items-center gap-1">
                View All Feedback <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">Resources</h3>
            <div className="space-y-3">
              {RESOURCES.map(r => (
                <div key={r.title} className="flex items-center gap-3 group">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    r.type === 'PDF' ? 'bg-red-50 text-red-500' : r.type === 'PNG' ? 'bg-green-50 text-green-500' : 'bg-purple-50 text-purple-500'
                  }`}>
                    {r.type === 'PDF' ? <FileText className="w-5 h-5" /> : r.type === 'PNG' ? <Image className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{r.title}</p>
                    <p className="text-xs text-gray-500">{r.type} • {r.size}</p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600"><Download className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
            <a href="#" className="text-xs font-bold text-[#5B4AAB] hover:text-[#3D2E7F] mt-3 inline-flex items-center gap-1">
              View All Resources <ArrowRight className="w-3 h-3" />
            </a>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {ACTIVITIES.map((activity, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-1.5 ${
                    activity.type === 'submit' ? 'bg-[#5B4AAB]' : activity.type === 'review' ? 'bg-green-500' : 'bg-amber-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">{activity.text}</p>
                    <p className="text-xs text-gray-400">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
            <a href="#" className="text-xs font-bold text-[#5B4AAB] hover:text-[#3D2E7F] mt-3 inline-flex items-center gap-1">
              View All Activity <ArrowRight className="w-3 h-3" />
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

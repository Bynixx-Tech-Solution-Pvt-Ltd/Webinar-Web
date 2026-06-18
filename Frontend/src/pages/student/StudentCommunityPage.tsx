'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import {
  Search,
  ThumbsUp,
  MessageSquare,
  Eye,
  Bookmark,
  MoreVertical,
  PenLine,
  HelpCircle,
  BarChart3,
  Share2,
  Hash,
  TrendingUp,
  Users,
  Calendar,
  ArrowRight,
  FileText,
  Bell,
  ExternalLink,
  Flame,
} from 'lucide-react';
import { motion } from 'framer-motion';

// ============================================================
// TYPES
// ============================================================

interface Post {
  id: string;
  author: string;
  badge?: string;
  category: string;
  timeAgo: string;
  title: string;
  content: string;
  likes: number;
  comments: number;
  views: number;
  tags: string[];
  avatar: string;
  hasImage?: boolean;
  imageTitle?: string;
  imageDesc?: string;
  stats?: { label: string; value: string }[];
}

interface TrendingTopic {
  name: string;
  posts: number;
}

interface Contributor {
  rank: number;
  name: string;
  points: string;
  badge?: boolean;
  avatar: string;
}

interface UpcomingEvent {
  title: string;
  subtitle: string;
  date: string;
  action: string;
}

// ============================================================
// MOCK DATA
// ============================================================

const CATEGORIES = ['All Categories', 'General Discussion', 'Web Development', 'DSA & Problem Solving', 'Career & Placements', 'Project Showcase', 'Help & Support'];

const POSTS: Post[] = [
  {
    id: '1', author: 'Ananya R', badge: 'Top Contributor', category: 'Web Development', timeAgo: '2 hours ago',
    title: 'How do you handle state management in a large React application?',
    content: "I'm working on a big project and the state is becoming hard to manage. What are the best practices or libraries you use? Redux, Zustand or Context API?",
    likes: 24, comments: 18, views: 356, tags: ['React.js', 'State Management'], avatar: 'A',
  },
  {
    id: '2', author: 'Vivek P', category: 'DSA & Problem Solving', timeAgo: '5 hours ago',
    title: 'Striver A2Z Sheet - Day 23 Progress ✅',
    content: 'Completed 5 medium problems on Binary Search today. Some problems were tricky but learned a lot!',
    likes: 32, comments: 12, views: 210, tags: [], avatar: 'V',
    stats: [
      { label: 'Problems Solved', value: '5 / 5' },
      { label: 'Time Taken', value: '2h 15m' },
      { label: 'Streak', value: '🔥 23 Days' },
    ],
  },
  {
    id: '3', author: 'Meera Iyer', badge: 'Top Contributor', category: 'Project Showcase', timeAgo: '1 day ago',
    title: 'Built a Full Stack Netflix Clone 🎬',
    content: 'Excited to share my Netflix clone built using Next.js, Tailwind CSS and MongoDB. Authentication, payments and video streaming implemented.',
    likes: 86, comments: 23, views: 642, tags: ['Project Showcase'], avatar: 'M',
    hasImage: true, imageTitle: 'Netflix Clone', imageDesc: 'Full Stack • Next.js • MongoDB • Tailwind CSS',
  },
];

const TRENDING: TrendingTopic[] = [
  { name: 'ReactJS', posts: 152 },
  { name: 'NextJS', posts: 98 },
  { name: 'DSA', posts: 87 },
  { name: 'JavaScript', posts: 76 },
  { name: 'System Design', posts: 64 },
];

const POPULAR_TAGS = ['React.js', 'Next.js', 'JavaScript', 'Node.js', 'Python', 'DSA', 'Tailwind CSS', 'MongoDB', 'CSS', 'TypeScript', 'HTML', 'Git'];

const CONTRIBUTORS: Contributor[] = [
  { rank: 1, name: 'Ananya R', points: '1,256 Points', badge: true, avatar: 'A' },
  { rank: 2, name: 'Vivek P', points: '1,124 Points', badge: true, avatar: 'V' },
  { rank: 3, name: 'Meera Iyer', points: '982 Points', badge: true, avatar: 'M' },
  { rank: 4, name: 'Arjun M', points: '872 Points', avatar: 'A' },
  { rank: 5, name: 'Neha T', points: '764 Points', avatar: 'N' },
];

const EVENTS: UpcomingEvent[] = [
  { title: 'Live Coding Session', subtitle: 'Build a Real Time Chat App', date: 'May 25, 2025 • 07:00 PM', action: 'Join' },
  { title: 'Resume Building Workshop', subtitle: 'Stand out in Placements', date: 'May 28, 2025 • 06:00 PM', action: 'Join' },
  { title: 'Mentor AMA Session', subtitle: 'Ask anything about Career', date: 'May 30, 2025 • 08:00 PM', action: 'Remind Me' },
];

// ============================================================
// COMPONENT
// ============================================================

export function StudentCommunityPage() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');

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
        <div className="flex items-center gap-3">
          <Users className="w-7 h-7 text-[#5B4AAB]" />
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Community</h1>
            <p className="text-sm text-gray-500">Learn together. Grow together.</p>
          </div>
        </div>
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search posts, members, topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5B4AAB]/20 shadow-sm"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${
              activeCategory === cat
                ? 'bg-[#5B4AAB] text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-6">
          {/* Post Composer */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5B4AAB] to-[#3D2E7F] flex items-center justify-center text-white font-bold">K</div>
              <input
                type="text"
                placeholder="What's on your mind, Karthik?"
                className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#5B4AAB]/20"
              />
            </div>
            <div className="flex gap-2">
              {[
                { icon: PenLine, label: 'Text', color: 'text-[#5B4AAB]' },
                { icon: HelpCircle, label: 'Question', color: 'text-gray-600' },
                { icon: BarChart3, label: 'Poll', color: 'text-gray-600' },
                { icon: Share2, label: 'Share Project', color: 'text-gray-600' },
              ].map(action => (
                <button
                  key={action.label}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-semibold hover:bg-gray-50 transition-colors ${action.color}`}
                >
                  <action.icon className="w-4 h-4" />
                  {action.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Posts Feed */}
          {POSTS.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm"
            >
              {/* Author */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-600 font-bold">{post.avatar}</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-gray-900">{post.author}</span>
                      {post.badge && <span className="px-2 py-0.5 text-[10px] font-bold bg-green-100 text-green-700 rounded-full">{post.badge}</span>}
                    </div>
                    <p className="text-xs text-gray-500">Posted in {post.category} • {post.timeAgo}</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600"><MoreVertical className="w-4 h-4" /></button>
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-gray-900 mb-2">{post.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">{post.content}</p>

              {/* Stats for progress posts */}
              {post.stats && (
                <div className="grid grid-cols-3 gap-3 mb-3">
                  {post.stats.map(stat => (
                    <div key={stat.label} className="bg-gray-50 rounded-lg p-3 text-center border border-gray-100">
                      <p className="text-xs text-gray-500 font-semibold">{stat.label}</p>
                      <p className="text-sm font-bold text-gray-900">{stat.value}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Project Image */}
              {post.hasImage && (
                <div className="bg-gray-900 rounded-lg p-4 mb-3 flex items-center gap-4">
                  <div className="w-24 h-16 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{post.imageTitle}</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{post.imageTitle}</p>
                    <p className="text-xs text-gray-400">{post.imageDesc}</p>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#5B4AAB] transition-colors font-semibold">
                    <ThumbsUp className="w-4 h-4" /> {post.likes}
                  </button>
                  <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#5B4AAB] transition-colors font-semibold">
                    <MessageSquare className="w-4 h-4" /> {post.comments}
                  </button>
                  <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#5B4AAB] transition-colors font-semibold">
                    <Eye className="w-4 h-4" /> {post.views}
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  {post.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 text-[10px] font-bold bg-gray-100 text-gray-600 rounded-md border border-gray-200">{tag}</span>
                  ))}
                  <button className="text-gray-400 hover:text-gray-600"><Bookmark className="w-4 h-4" /></button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Events */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Upcoming Events</h3>
              <a href="#" className="text-xs font-bold text-[#5B4AAB] hover:text-[#3D2E7F]">View Calendar</a>
            </div>
            <div className="space-y-4">
              {EVENTS.map(event => (
                <div key={event.title} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#5B4AAB]/10 flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5 text-[#5B4AAB]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900">{event.title}</p>
                    <p className="text-xs text-gray-500">{event.subtitle}</p>
                    <p className="text-[10px] text-gray-400 mt-1">{event.date}</p>
                  </div>
                  <Button variant="outline" size="sm" className="text-xs font-semibold border-gray-200 shrink-0">{event.action}</Button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Trending Topics */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-500" /> Trending Topics
              </h3>
              <a href="#" className="text-xs font-bold text-[#5B4AAB] hover:text-[#3D2E7F]">View All</a>
            </div>
            <div className="space-y-3">
              {TRENDING.map(topic => (
                <div key={topic.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Hash className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-semibold text-gray-900">{topic.name}</span>
                  </div>
                  <span className="text-xs text-gray-500">{topic.posts} posts</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Popular Tags */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-gray-900">Popular Tags</h3>
              <a href="#" className="text-xs font-bold text-[#5B4AAB] hover:text-[#3D2E7F]">View All</a>
            </div>
            <div className="flex flex-wrap gap-2">
              {POPULAR_TAGS.map(tag => (
                <span key={tag} className="px-3 py-1.5 text-xs font-semibold bg-gray-50 text-gray-700 rounded-lg border border-gray-200 hover:border-[#5B4AAB] hover:text-[#5B4AAB] cursor-pointer transition-colors">{tag}</span>
              ))}
            </div>
          </motion.div>

          {/* Community Stats */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm"
          >
            <h3 className="text-sm font-bold text-gray-900 mb-3">Community Stats</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Users, value: '1,248+', label: 'Members' },
                { icon: TrendingUp, value: '356', label: 'Online' },
                { icon: FileText, value: '2,843', label: 'Posts' },
                { icon: MessageSquare, value: '12,650', label: 'Comments' },
              ].map(stat => (
                <div key={stat.label} className="flex items-center gap-2">
                  <stat.icon className="w-5 h-5 text-[#5B4AAB]" />
                  <div>
                    <p className="text-sm font-bold text-gray-900">{stat.value}</p>
                    <p className="text-[10px] text-gray-500">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Top Contributors */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-gray-900">Top Contributors</h3>
              <a href="#" className="text-xs font-bold text-[#5B4AAB] hover:text-[#3D2E7F]">View All</a>
            </div>
            <div className="space-y-3">
              {CONTRIBUTORS.map(c => (
                <div key={c.rank} className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    c.rank <= 3 ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-500'
                  }`}>{c.rank}</span>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-600 text-xs font-bold">{c.avatar}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-gray-900">{c.name}</span>
                      {c.badge && <span className="px-1.5 py-0.5 text-[8px] font-bold bg-green-100 text-green-700 rounded-full">Top Contributor</span>}
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 font-semibold">{c.points}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Need Help */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm text-center"
          >
            <h3 className="text-sm font-bold text-gray-900 mb-1">Need Help?</h3>
            <p className="text-xs text-gray-500 mb-3">Our mentors are here for you.</p>
            <Button variant="outline" className="w-full text-sm font-semibold border-gray-200">Ask a Question</Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

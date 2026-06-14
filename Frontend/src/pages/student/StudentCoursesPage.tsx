'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import {
  BookOpen,
  Clock,
  CheckCircle2,
  PieChart,
  Search,
  SlidersHorizontal,
  MoreVertical,
  ArrowRight,
  Bookmark,
  Award,
  BookMarked,
  User,
  ExternalLink,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { StudentLayout } from './StudentLayout';

// ============================================================
// DATA TYPES
// ============================================================

interface CourseMentor {
  name: string;
  avatar: string;
}

interface CourseItem {
  id: string;
  title: string;
  description: string;
  level: string;
  modulesCount: number;
  lessonsCount: number;
  progress: number;
  image: string;
  status: 'in-progress' | 'completed' | 'wishlist';
  mentor: CourseMentor;
  lastAccessed?: string;
  completedOn?: string;
}

interface RecommendedCourse {
  id: string;
  title: string;
  level: string;
  image: string;
  isBookmarked: boolean;
}

// ============================================================
// MOCK DATA
// ============================================================

const MOCK_COURSES: CourseItem[] = [
  {
    id: '1',
    title: 'AI & Machine Learning Engineer Program',
    description: 'Master AI, ML and Deep Learning from basics to advanced level with real-world projects.',
    level: 'Beginner to Advanced',
    modulesCount: 12,
    lessonsCount: 120,
    progress: 67,
    image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=400&q=80',
    status: 'in-progress',
    mentor: {
      name: 'Dr. Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=80',
    },
    lastAccessed: 'Today, 10:30 AM',
  },
  {
    id: '2',
    title: 'Cybersecurity Professional Track',
    description: 'Learn ethical hacking, network security, and threat detection with hands-on labs.',
    level: 'Intermediate',
    modulesCount: 10,
    lessonsCount: 95,
    progress: 45,
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&q=80',
    status: 'in-progress',
    mentor: {
      name: 'Arun Kumar',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80',
    },
    lastAccessed: 'Yesterday, 08:15 PM',
  },
  {
    id: '3',
    title: 'IoT Development with Python',
    description: 'Build smart IoT applications using Python, sensors, and cloud platforms.',
    level: 'Beginner',
    modulesCount: 8,
    lessonsCount: 60,
    progress: 100,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80',
    status: 'completed',
    mentor: {
      name: 'Ravi Teja',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&q=80',
    },
    completedOn: '10 May 2025',
  },
  {
    id: '4',
    title: 'Data Science with Python',
    description: 'Analyze data, build predictive models, and communicate insights using Python and SQL.',
    level: 'Beginner to Advanced',
    modulesCount: 15,
    lessonsCount: 150,
    progress: 0,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80',
    status: 'wishlist',
    mentor: {
      name: 'Dr. Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=80',
    },
  },
  {
    id: '5',
    title: 'Full Stack Web Development',
    description: 'Learn modern web engineering from frontend to backend database design.',
    level: 'Beginner',
    modulesCount: 16,
    lessonsCount: 180,
    progress: 0,
    image: 'https://images.unsplash.com/photo-1581291518655-9523c932dedf?w=400&q=80',
    status: 'wishlist',
    mentor: {
      name: 'Arun Kumar',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80',
    },
  },
];

const RECOMMENDED_COURSES: RecommendedCourse[] = [
  {
    id: 'rec_1',
    title: 'Data Science with Python',
    level: 'Beginner to Advanced',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80',
    isBookmarked: true,
  },
  {
    id: 'rec_2',
    title: 'Full Stack Web Development',
    level: 'Beginner',
    image: 'https://images.unsplash.com/photo-1581291518655-9523c932dedf?w=400&q=80',
    isBookmarked: false,
  },
  {
    id: 'rec_3',
    title: 'Cloud Computing Essentials',
    level: 'Beginner',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80',
    isBookmarked: false,
  },
  {
    id: 'rec_4',
    title: 'Data Structures & Algorithms',
    level: 'Beginner to Advanced',
    image: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=400&q=80',
    isBookmarked: true,
  },
];

// ============================================================
// STUDENT COURSES PAGE COMPONENT
// ============================================================

export function StudentCoursesPage() {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'enrolled' | 'in-progress' | 'completed' | 'wishlist'>('enrolled');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCourses, setFilteredCourses] = useState<CourseItem[]>(MOCK_COURSES);

  // Authentication Guard
  useEffect(() => {
    if (!user && !token) {
      navigate({ to: '/login' });
    }
  }, [user, token, navigate]);

  // Tab Filtering & Search Filtering
  useEffect(() => {
    let result = MOCK_COURSES;

    // Filter by Tab
    if (activeTab === 'enrolled') {
      // Enrolled shows everything except wishlist
      result = result.filter(c => c.status !== 'wishlist');
    } else {
      result = result.filter(c => c.status === activeTab);
    }

    // Filter by Search Query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        c => c.title.toLowerCase().includes(query) || c.description.toLowerCase().includes(query)
      );
    }

    setFilteredCourses(result);
  }, [activeTab, searchQuery]);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">Redirecting...</p>
      </div>
    );
  }

  // Count metrics for tabs and statistics
  const enrolledCount = MOCK_COURSES.filter(c => c.status !== 'wishlist').length;
  const inProgressCount = MOCK_COURSES.filter(c => c.status === 'in-progress').length;
  const completedCount = MOCK_COURSES.filter(c => c.status === 'completed').length;
  const wishlistCount = MOCK_COURSES.filter(c => c.status === 'wishlist').length;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
        
        {/* ==========================================
            BREADCRUMBS & PAGE HEADER
           ========================================== */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <nav className="flex items-center gap-1.5 text-xs text-gray-500 font-medium mb-1">
              <span className="cursor-pointer hover:text-[#5B4AAB] transition-colors" onClick={() => navigate({ to: '/student' })}>
                Dashboard
              </span>
              <span className="text-gray-400">/</span>
              <span className="text-gray-800 font-semibold">My Courses</span>
            </nav>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">My Courses</h1>
          </div>

          {/* Search and Filter Inputs */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-64 md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search my courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-[#5B4AAB]/20 focus:border-[#5B4AAB] transition-all shadow-xs"
              />
            </div>
            <button className="flex items-center gap-2 bg-white border border-gray-200 hover:border-gray-300 rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 hover:text-gray-900 transition-all shadow-xs">
              <SlidersHorizontal className="w-4.5 h-4.5" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* ==========================================
            TABS NAVIGATION (Violet Highlighted)
           ========================================== */}
        <div className="border-b border-gray-200">
          <div className="flex gap-8 -mb-[1px]">
            {[
              { id: 'enrolled', label: `Enrolled (${enrolledCount})` },
              { id: 'in-progress', label: `In Progress (${inProgressCount})` },
              { id: 'completed', label: `Completed (${completedCount})` },
              { id: 'wishlist', label: `Wishlist (${wishlistCount})` }
            ].map(tab => {
              const isTabActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-4 text-sm font-semibold relative transition-colors cursor-pointer ${
                    isTabActive ? 'text-[#5B4AAB]' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                  {isTabActive && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5B4AAB]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ==========================================
            METRICS / STATS OVERVIEW CARDS
           ========================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-xs flex items-center gap-4 hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-3xl font-extrabold text-gray-900">{enrolledCount}</p>
              <p className="text-xs font-semibold text-gray-500 mt-0.5">Enrolled Courses</p>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-xs flex items-center gap-4 hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-3xl font-extrabold text-gray-900">{inProgressCount}</p>
              <p className="text-xs font-semibold text-gray-500 mt-0.5">In Progress</p>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-xs flex items-center gap-4 hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-3xl font-extrabold text-gray-900">{completedCount}</p>
              <p className="text-xs font-semibold text-gray-500 mt-0.5">Completed</p>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-xs flex items-center gap-4 hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center text-[#5B4AAB]">
              <PieChart className="w-6 h-6" />
            </div>
            <div>
              <p className="text-3xl font-extrabold text-gray-900">67%</p>
              <p className="text-xs font-semibold text-gray-500 mt-0.5">Overall Progress</p>
            </div>
          </div>
        </div>

        {/* ==========================================
            COURSES LISTING
           ========================================== */}
        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <motion.div
                  key={course.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 p-6 flex flex-col lg:flex-row gap-6 relative"
                >
                  {/* Three-dots menu */}
                  <button className="absolute right-4 top-4 p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>

                  {/* Course Image Wrapper */}
                  <div className="w-full lg:w-60 h-40 rounded-lg overflow-hidden relative shrink-0 shadow-xs border border-gray-100 bg-gray-50">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Status Badge */}
                    <span className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md text-white ${
                      course.status === 'completed'
                        ? 'bg-green-600'
                        : course.status === 'in-progress'
                          ? 'bg-[#5B4AAB]'
                          : 'bg-amber-600'
                    }`}>
                      {course.status === 'in-progress' ? 'In Progress' : course.status}
                    </span>
                  </div>

                  {/* Middle: Text and Meta Info */}
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 hover:text-[#5B4AAB] transition-colors leading-tight cursor-pointer">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1.5 leading-relaxed max-w-2xl">
                        {course.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-4">
                      {/* Meta Tags */}
                      <div className="flex items-center gap-1 text-xs text-gray-500 font-semibold bg-gray-50 border border-gray-100 rounded-md px-2.5 py-1">
                        <BookMarked className="w-3.5 h-3.5" />
                        <span>{course.level}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500 font-semibold bg-gray-50 border border-gray-100 rounded-md px-2.5 py-1">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>{course.modulesCount} Modules</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500 font-semibold bg-gray-50 border border-gray-100 rounded-md px-2.5 py-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{course.lessonsCount}+ Lessons</span>
                      </div>

                      {/* Mentor Badge */}
                      <div className="flex items-center gap-2">
                        <img
                          src={course.mentor.avatar}
                          alt={course.mentor.name}
                          className="w-6 h-6 rounded-full border border-white shadow-xs object-cover"
                        />
                        <span className="text-xs text-gray-700 font-bold">
                          {course.mentor.name}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Progress and Action Buttons */}
                  <div className="w-full lg:w-72 border-t lg:border-t-0 lg:border-l border-gray-100 pt-6 lg:pt-0 lg:pl-6 flex flex-col justify-between shrink-0">
                    {/* Progress details */}
                    <div>
                      <div className="flex items-center justify-between text-sm font-bold text-gray-700 mb-2">
                        <span>Progress</span>
                        <span className="text-[#5B4AAB]">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-150 rounded-full h-2 overflow-hidden shadow-inner">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${course.progress}%` }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          className={`h-full rounded-full ${
                            course.status === 'completed' 
                              ? 'bg-green-500' 
                              : 'bg-gradient-to-r from-[#5B4AAB] to-[#7C66E4]'
                          }`}
                        />
                      </div>

                      <p className="text-xs font-semibold text-gray-500 mt-3 flex items-center gap-1.5">
                        {course.status === 'completed' ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                            <span>Completed On {course.completedOn}</span>
                          </>
                        ) : course.status === 'in-progress' ? (
                          <>
                            <Clock className="w-3.5 h-3.5 text-gray-400" />
                            <span>Last Accessed {course.lastAccessed}</span>
                          </>
                        ) : (
                          <>
                            <Bookmark className="w-3.5 h-3.5 text-gray-400" />
                            <span>Added to Wishlist</span>
                          </>
                        )}
                      </p>
                    </div>

                    {/* Action buttons */}
                    <div className="mt-6 space-y-2.5">
                      {course.status === 'completed' ? (
                        <>
                          <Button className="w-full border-2 border-[#5B4AAB] bg-white text-[#5B4AAB] hover:bg-[#5B4AAB] hover:text-white font-bold text-sm h-11 transition-all rounded-lg">
                            Review Course
                          </Button>
                          <button className="w-full flex items-center justify-center gap-1.5 text-[#5B4AAB] hover:text-[#3D2E7F] hover:underline text-xs font-bold py-1.5 transition-colors">
                            <Award className="w-4 h-4" />
                            <span>View Certificate</span>
                          </button>
                        </>
                      ) : (
                        <>
                          <Button className="w-full bg-[#5B4AAB] hover:bg-[#43358f] text-white font-bold text-sm h-11 shadow-md hover:shadow-lg transition-all rounded-lg flex items-center justify-center gap-2">
                            <span>Continue Learning</span>
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                          <button className="w-full text-center text-[#5B4AAB] hover:text-[#3D2E7F] hover:underline text-xs font-bold py-1.5 transition-colors">
                            View Course Details
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white border border-gray-200 border-dashed rounded-xl p-16 text-center text-gray-500 flex flex-col items-center justify-center gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 shadow-inner">
                  <BookOpen className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900">No courses found</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Try searching with another keyword or switching status tabs.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ==========================================
            RECOMMENDED COURSES SECTION
           ========================================== */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Recommended for You</h2>
            <button className="flex items-center gap-1 text-sm font-bold text-[#5B4AAB] hover:text-[#3D2E7F] hover:underline transition-all">
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {RECOMMENDED_COURSES.map((recCourse) => (
              <motion.div
                key={recCourse.id}
                whileHover={{ y: -4 }}
                className="bg-white border border-gray-250 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col h-full group"
              >
                <div className="h-44 relative bg-gray-50">
                  <img
                    src={recCourse.image}
                    alt={recCourse.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  <button className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-sm backdrop-blur ${
                    recCourse.isBookmarked 
                      ? 'bg-[#5B4AAB] text-white' 
                      : 'bg-white/95 text-gray-400 hover:text-gray-600'
                  }`}>
                    <Bookmark className="w-4.5 h-4.5 fill-current" />
                  </button>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#5B4AAB] uppercase tracking-wider">
                      {recCourse.level}
                    </span>
                    <h4 className="font-bold text-gray-900 text-sm mt-1.5 line-clamp-2 leading-tight group-hover:text-[#5B4AAB] transition-colors">
                      {recCourse.title}
                    </h4>
                  </div>
                  
                  <button className="w-full border border-gray-200 hover:border-[#5B4AAB] hover:bg-[#5B4AAB]/5 text-gray-700 hover:text-[#5B4AAB] text-xs font-bold py-2 rounded-lg transition-all mt-4 flex items-center justify-center gap-1.5">
                    <span>Explore Course</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import {
  Award,
  Download,
  Eye,
  Share2,
  ExternalLink,
  CheckCircle2,
  Shield,
  MoreVertical,
  ArrowLeft,
  Linkedin,
  Twitter,
  Link,
  Globe,
  Building,
  GraduationCap,
  Handshake,
  ToggleLeft,
} from 'lucide-react';
import { motion } from 'framer-motion';

// ============================================================
// TYPES
// ============================================================

interface Certificate {
  id: string;
  title: string;
  completedOn: string;
  credentialId: string;
  status: 'verified' | 'in-progress';
  progress?: number;
  icon: string;
  iconBg: string;
}

// ============================================================
// MOCK DATA
// ============================================================

const CERTIFICATES: Certificate[] = [
  { id: '1', title: 'AI-Powered Software Development Bootcamp', completedOn: '15 Aug 2026', credentialId: 'BYX-AI-2026-000125', status: 'verified', icon: 'AI', iconBg: 'bg-gradient-to-br from-blue-600 to-purple-600' },
  { id: '2', title: 'Full Stack Web Development', completedOn: '22 May 2026', credentialId: 'BYX-FSWD-2026-000089', status: 'verified', icon: '✓', iconBg: 'bg-gradient-to-br from-green-500 to-emerald-600' },
  { id: '3', title: 'JavaScript Essentials', completedOn: '10 Apr 2026', credentialId: 'BYX-JS-2026-000045', status: 'verified', icon: '</>', iconBg: 'bg-gradient-to-br from-amber-500 to-orange-600' },
  { id: '4', title: 'DevOps Fundamentals', completedOn: '12 Mar 2026', credentialId: 'BYX-DEVOPS-2026-000033', status: 'verified', icon: '⚙', iconBg: 'bg-gradient-to-br from-cyan-500 to-blue-600' },
  { id: '5', title: 'Mobile App Development', completedOn: '', credentialId: '', status: 'in-progress', progress: 60, icon: '📱', iconBg: 'bg-gradient-to-br from-purple-500 to-indigo-600' },
];

// ============================================================
// COMPONENT
// ============================================================

export function StudentCertificatesPage() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedCert, setSelectedCert] = useState(CERTIFICATES[0]);
  const [verifyId, setVerifyId] = useState('');

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
    { id: 'all', label: `All (${CERTIFICATES.length})` },
    { id: 'completed', label: `Completed (${CERTIFICATES.filter(c => c.status === 'verified').length})` },
    { id: 'in-progress', label: `In Progress (${CERTIFICATES.filter(c => c.status === 'in-progress').length})` },
    { id: 'expired', label: 'Expired (0)' },
    { id: 'verified', label: `Verified (${CERTIFICATES.filter(c => c.status === 'verified').length})` },
  ];

  const filteredCerts = activeFilter === 'all'
    ? CERTIFICATES
    : activeFilter === 'completed' || activeFilter === 'verified'
      ? CERTIFICATES.filter(c => c.status === 'verified')
      : CERTIFICATES.filter(c => c.status === activeFilter);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <ArrowLeft className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" onClick={() => navigate({ to: '/student' })} />
        <span className="text-gray-800 font-semibold">Certificates</span>
      </div>

      <div>
        <h1 className="text-3xl font-extrabold text-gray-900">My Certificates</h1>
        <p className="text-sm text-gray-500 mt-1">View, download and share your earned certificates</p>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        {filters.map(f => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              activeFilter === f.id
                ? 'bg-[#5B4AAB] text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Certificate List */}
        <div className="space-y-4">
          {filteredCerts.map(cert => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -2 }}
              onClick={() => setSelectedCert(cert)}
              className={`bg-white rounded-xl border p-5 shadow-sm cursor-pointer transition-all ${
                selectedCert?.id === cert.id ? 'border-[#5B4AAB] ring-2 ring-[#5B4AAB]/20' : 'border-gray-200 hover:shadow-md'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-xl ${cert.iconBg} flex items-center justify-center text-white text-lg font-bold shrink-0`}>
                  {cert.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900 truncate">{cert.title}</h3>
                    {cert.status === 'verified' && (
                      <span className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold bg-green-100 text-green-700 rounded-full shrink-0">
                        <CheckCircle2 className="w-3 h-3" /> Verified
                      </span>
                    )}
                  </div>

                  {cert.status === 'verified' ? (
                    <>
                      <p className="text-xs text-gray-500">Completed on: {cert.completedOn}</p>
                      <p className="text-xs text-gray-500">Credential ID: {cert.credentialId}</p>
                      <div className="flex items-center gap-2 mt-3">
                        <Button variant="outline" size="sm" className="text-xs font-semibold border-gray-200 flex items-center gap-1">
                          <Eye className="w-3 h-3" /> View
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs font-semibold border-gray-200 flex items-center gap-1">
                          <Download className="w-3 h-3" /> Download PDF
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs font-semibold border-gray-200 flex items-center gap-1">
                          <Linkedin className="w-3 h-3" /> Share LinkedIn
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="mt-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-500">In Progress</span>
                        <span className="text-xs font-bold text-[#5B4AAB]">{cert.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#5B4AAB] to-[#7C66E4] rounded-full" style={{ width: `${cert.progress}%` }} />
                      </div>
                    </div>
                  )}
                </div>
                <button className="text-gray-400 hover:text-gray-600 shrink-0"><MoreVertical className="w-4 h-4" /></button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right: Certificate Preview */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">Certificate Preview</h3>
              <Button variant="outline" size="sm" className="text-xs font-semibold border-gray-200 flex items-center gap-1">
                <Download className="w-3 h-3" /> Download PDF
              </Button>
            </div>

            {/* Certificate Card */}
            <div className="p-6">
              <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl p-8 text-center text-white relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400" />
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400" />

                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-[#5B4AAB] font-bold text-sm">B</div>
                  <span className="text-xl font-bold">Bynixx</span>
                </div>
                <p className="text-xs text-gray-400 mb-4">Learn | Build | Grow</p>

                <h2 className="text-2xl font-bold text-amber-400 tracking-wider mb-4">CERTIFICATE OF COMPLETION</h2>
                <p className="text-xs text-gray-400 mb-1">Issued on</p>
                <p className="text-sm font-semibold mb-4">{selectedCert?.completedOn || '15 August 2026'}</p>

                <p className="text-xs text-gray-400 mb-1">This is to certify that</p>
                <p className="text-3xl font-bold italic mb-4" style={{ fontFamily: 'Georgia, serif' }}>Karthik S</p>

                <p className="text-xs text-gray-400 mb-1">has successfully completed</p>
                <p className="text-lg font-bold mb-4">{selectedCert?.title || 'AI-Powered Software Development Bootcamp'}</p>

                <p className="text-xs text-gray-400 leading-relaxed mb-6">
                  with practical assessments,<br />mentor evaluations, live sessions,<br />and capstone project completion.
                </p>

                <div className="flex items-center justify-between px-4 mt-6">
                  <div className="text-center">
                    <p className="text-sm italic" style={{ fontFamily: 'Georgia, serif' }}>Soham</p>
                    <p className="text-[10px] text-gray-400 mt-1">Priya Sharma</p>
                    <p className="text-[10px] text-gray-500">Course Mentor</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-[#5B4AAB] font-bold mx-auto mb-1">B</div>
                    <p className="text-[10px] text-gray-400">Certificate ID</p>
                    <p className="text-xs font-bold">{selectedCert?.credentialId || 'BYX-AI-2026-000125'}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm italic" style={{ fontFamily: 'Georgia, serif' }}>Raihan</p>
                    <p className="text-[10px] text-gray-400 mt-1">Rohit Kumar</p>
                    <p className="text-[10px] text-gray-500">Founder & CEO, Bynixx</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Verify Certificate */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <h3 className="text-sm font-bold text-gray-900 mb-2">Verify Certificate</h3>
              <p className="text-xs text-gray-500 mb-3">Enter Certificate ID to verify authenticity</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. BYX-AI-2026-000125"
                  value={verifyId}
                  onChange={(e) => setVerifyId(e.target.value)}
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#5B4AAB]/20"
                />
                <Button className="bg-[#5B4AAB] text-white text-xs font-semibold hover:bg-[#4a3b96]">Verify Now</Button>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-sm font-bold text-green-700">VALID CERTIFICATE</span>
              </div>
              <div className="space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between"><span className="text-gray-500">Certificate ID</span><span className="font-semibold">BYX-AI-2026-000125</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Student Name</span><span className="font-semibold">Karthik S</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Issued Date</span><span className="font-semibold">15 August 2026</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Status</span><span className="font-bold text-green-600">Valid</span></div>
              </div>
            </div>
          </motion.div>

          {/* Approval & Recognition + Share */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <h3 className="text-sm font-bold text-gray-900 mb-3">Approval & Recognition</h3>
              <div className="space-y-3">
                {[
                  { icon: Building, label: 'MSME Registered', sub: 'Ministry of Micro, Small & Medium Enterprises, India' },
                  { icon: Shield, label: 'ISO 9001:2015 Certified', sub: 'Quality Management System' },
                  { icon: Globe, label: 'Industry Partner Network', sub: 'In association with leading tech companies' },
                  { icon: GraduationCap, label: 'Academic Collaboration', sub: 'Partnered with universities & colleges' },
                ].map(item => (
                  <div key={item.label} className="flex items-start gap-2">
                    <item.icon className="w-4 h-4 text-[#5B4AAB] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-gray-900">{item.label}</p>
                      <p className="text-[10px] text-gray-500">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <h3 className="text-sm font-bold text-gray-900 mb-1">Share Your Achievement</h3>
              <p className="text-xs text-gray-500 mb-3">Showcase your certificate on professional platforms and resumes.</p>
              <div className="space-y-2">
                <Button variant="outline" className="w-full text-xs font-semibold border-gray-200 flex items-center gap-2 justify-start">
                  <Linkedin className="w-4 h-4 text-blue-600" /> Share on LinkedIn
                </Button>
                <Button variant="outline" className="w-full text-xs font-semibold border-gray-200 flex items-center gap-2 justify-start">
                  <Twitter className="w-4 h-4 text-sky-500" /> Share on Twitter
                </Button>
                <Button variant="outline" className="w-full text-xs font-semibold border-gray-200 flex items-center gap-2 justify-start">
                  <Link className="w-4 h-4 text-gray-500" /> Copy Verification Link
                </Button>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-gray-900">Certificate Privacy</p>
                  <p className="text-[10px] text-gray-500">Make my certificate public</p>
                </div>
                <div className="w-10 h-6 bg-[#5B4AAB] rounded-full relative cursor-pointer">
                  <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-sm" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

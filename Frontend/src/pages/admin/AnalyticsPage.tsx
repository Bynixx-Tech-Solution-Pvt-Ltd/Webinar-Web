import React, { useState } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { 
  BarChart3, FileSpreadsheet, CreditCard, TrendingUp, TrendingDown,
  Download, Filter, Calendar, Search, RefreshCw, CheckCircle2,
  AlertCircle, ChevronRight, Share2, Sparkles, Activity
} from "lucide-react";
import { AdminLayoutWrapper } from "./AdminLayoutWrapper";
import { motion } from "framer-motion";
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, 
  LineChart, Line, AreaChart, Area, CartesianGrid 
} from "recharts";

// Mock Data
const revenueSplitData = [
  { month: "Jan", direct: 800000, referral: 400000 },
  { month: "Feb", direct: 1100000, referral: 750000 },
  { month: "Mar", direct: 1400000, referral: 1000000 },
  { month: "Apr", direct: 1700000, referral: 1200000 },
  { month: "May", direct: 2100000, referral: 1400000 },
  { month: "Jun", direct: 2300000, referral: 1520000 }
];

const transactionLogs = [
  { id: "TXN-98210", student: "Aarav Sharma", amount: "₹4,999", date: "June 14, 2026", method: "UPI", status: "Succeeded" },
  { id: "TXN-87421", student: "Priya Nair", amount: "₹6,999", date: "June 14, 2026", method: "Card", status: "Succeeded" },
  { id: "TXN-76510", student: "Rohit Verma", amount: "₹3,999", date: "June 13, 2026", method: "Netbanking", status: "Succeeded" },
  { id: "TXN-54321", student: "Sneha Iyer", amount: "₹4,999", date: "June 12, 2026", method: "UPI", status: "Succeeded" },
  { id: "TXN-32941", student: "Vijay Krish", amount: "₹6,999", date: "June 11, 2026", method: "UPI", status: "Refunded" }
];

const generatedReports = [
  { name: "Monthly Platform Statement - May 2026", size: "2.4 MB", date: "June 01, 2026", type: "PDF" },
  { name: "User Registration & Funnel Analytics - Q2", size: "4.8 MB", date: "June 10, 2026", type: "CSV" },
  { name: "Mentor Attendance & Session Logs", size: "1.2 MB", date: "June 12, 2026", type: "CSV" },
  { name: "Tax Audit & Payout Invoices", size: "8.5 MB", date: "June 14, 2026", type: "PDF" }
];

export function AnalyticsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const tab = params.get("tab");

  const isPayments = location.pathname.includes("/admin/payments") || tab === "payments";
  const isReports = location.pathname.includes("/admin/reports") || tab === "reports";
  const pageTitle = isPayments ? "Payments" : isReports ? "Reports" : "Analytics";

  const [timeRange, setTimeRange] = useState("Last 30 Days");

  const renderAnalyticsOverview = () => (
    <div className="space-y-8">
      {/* Filters bar */}
      <div className="flex justify-between items-center bg-white/80 backdrop-blur-md p-4 border border-slate-200/60 rounded-2xl shadow-sm">
        <h3 className="text-sm font-extrabold text-slate-700 uppercase tracking-wider">Metrics Dashboard</h3>
        <select 
          value={timeRange} 
          onChange={(e) => setTimeRange(e.target.value)}
          className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs focus:outline-none text-slate-600 font-semibold"
        >
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>Last 6 Months</option>
          <option>Year to Date</option>
        </select>
      </div>

      {/* Main Revenue Splitting Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-3xl p-6 shadow-sm">
          <h4 className="font-extrabold text-slate-800 text-sm tracking-tight mb-1">Direct vs Referral Sales</h4>
          <p className="text-slate-400 text-xs mb-6">Compare revenue generated from marketing campaigns and direct sales</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueSplitData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="direct" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                <Bar dataKey="referral" fill="#00D4FF" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-3xl p-6 shadow-sm">
          <h4 className="font-extrabold text-slate-800 text-sm tracking-tight mb-1">Live Platform Uptime</h4>
          <p className="text-slate-400 text-xs mb-6">Real-time load balancing and API request volumes</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueSplitData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="uptimeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00D4FF" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#00D4FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="direct" stroke="#00D4FF" strokeWidth={2} fillOpacity={1} fill="url(#uptimeGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPaymentsTab = () => (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Gross Revenue</span>
          <h3 className="text-2xl font-black text-slate-800 mt-4">₹38,20,000</h3>
          <span className="text-[10px] text-emerald-600 font-bold mt-1">+14.2% from last month</span>
        </div>
        <div className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Pending Payouts</span>
          <h3 className="text-2xl font-black text-slate-800 mt-4">₹4,25,000</h3>
          <span className="text-[10px] text-slate-400 font-bold mt-1">Next payout: June 20, 2026</span>
        </div>
        <div className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Refund Rate</span>
          <h3 className="text-2xl font-black text-slate-800 mt-4">1.2%</h3>
          <span className="text-[10px] text-slate-400 font-bold mt-1">Platform average: 1.5%</span>
        </div>
      </div>

      {/* Transaction Logs */}
      <div className="bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-4">
        <h4 className="font-extrabold text-slate-800 text-sm tracking-tight">Recent Transactions</h4>
        <div className="overflow-x-auto border border-slate-100 rounded-2xl">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50/80 text-slate-400 font-bold border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Transaction ID</th>
                <th className="px-6 py-4">Learner</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Method</th>
                <th className="px-6 py-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactionLogs.map((log) => (
                <tr key={log.id} className="border-t border-slate-100">
                  <td className="px-6 py-3.5 font-mono font-bold text-slate-500">{log.id}</td>
                  <td className="px-6 py-3.5 font-bold text-slate-700">{log.student}</td>
                  <td className="px-6 py-3.5 font-extrabold text-slate-800">{log.amount}</td>
                  <td className="px-6 py-3.5 text-slate-400">{log.date}</td>
                  <td className="px-6 py-3.5 text-slate-500">{log.method}</td>
                  <td className="px-6 py-3.5 text-center">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      log.status === "Succeeded" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-rose-50 text-rose-600 border border-rose-100"
                    }`}>{log.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderReportsTab = () => (
    <div className="space-y-6">
      <div className="bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h4 className="font-extrabold text-slate-800 text-sm tracking-tight">Generated Financial & System Reports</h4>
            <p className="text-slate-400 text-xs">Export data directly as PDF statements or raw CSV records for auditing</p>
          </div>
          
          <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5 transition-all">
            <FileSpreadsheet size={14} /> Request New Report
          </button>
        </div>

        <div className="space-y-3">
          {generatedReports.map((report, idx) => (
            <div key={idx} className="p-4 bg-white border border-slate-200/50 rounded-2xl flex justify-between items-center hover:bg-slate-50/20 transition-all shadow-sm">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl border font-black text-[10px] ${
                  report.type === "PDF" ? "bg-rose-50 border-rose-100 text-rose-600" : "bg-emerald-50 border-emerald-100 text-emerald-600"
                }`}>
                  {report.type}
                </div>
                <div>
                  <h5 className="font-bold text-slate-700 text-xs">{report.name}</h5>
                  <p className="text-slate-400 text-[10px] font-semibold mt-0.5">Size: {report.size} • Created on {report.date}</p>
                </div>
              </div>
              
              <button className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-600 transition-all">
                <Download size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <AdminLayoutWrapper pageTitle={pageTitle}>
      {isPayments && renderPaymentsTab()}
      {isReports && renderReportsTab()}
      {!isPayments && !isReports && renderAnalyticsOverview()}
    </AdminLayoutWrapper>
  );
}

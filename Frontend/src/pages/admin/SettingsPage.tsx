import React, { useState } from "react";
import { 
  Settings, ShieldCheck, Palette, HelpCircle, Save, RefreshCw,
  Mail, Key, User, Globe, Laptop, Lock
} from "lucide-react";
import { AdminLayoutWrapper } from "./AdminLayoutWrapper";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";

export function SettingsPage() {
  const { user } = useAuth();
  
  const [portalName, setPortalName] = useState("Bynixx Pathways");
  const [cyanAccent, setCyanAccent] = useState("#00D4FF");
  const [indigoAccent, setIndigoAccent] = useState("#4F46E5");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [apiKey, setApiKey] = useState("pk_live_51Nv2...8H2y");
  
  const [statusMessage, setStatusMessage] = useState("");

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage("Settings saved successfully!");
    setTimeout(() => setStatusMessage(""), 3000);
  };

  return (
    <AdminLayoutWrapper pageTitle="Settings">
      <div className="max-w-3xl space-y-6">
        
        <div className="bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-3xl p-6 shadow-sm">
          <h3 className="text-lg font-extrabold text-slate-800 tracking-tight mb-2">System Configuration</h3>
          <p className="text-slate-400 text-xs mb-6">Manage global admin parameters, white-label branding assets, and security API keys</p>

          <form onSubmit={handleSaveSettings} className="space-y-6">
            
            {/* General Portal settings */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-1.5">
                <Globe size={14} /> General Branding
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Platform Brand Title</label>
                  <input 
                    type="text" 
                    value={portalName}
                    onChange={(e) => setPortalName(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-500 font-semibold text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Support Email Contact</label>
                  <input 
                    type="email" 
                    defaultValue="support@bynixx.com"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-500 font-semibold text-slate-700"
                  />
                </div>
              </div>
            </div>

            {/* Custom Color Palette */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-1.5">
                <Palette size={14} /> Theme Colors
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <input 
                    type="color" 
                    value={cyanAccent} 
                    onChange={(e) => setCyanAccent(e.target.value)}
                    className="w-8 h-8 rounded-lg cursor-pointer border border-slate-200"
                  />
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase">Primary Accent (Cyan)</label>
                    <span className="text-xs font-mono font-bold text-slate-600">{cyanAccent}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <input 
                    type="color" 
                    value={indigoAccent} 
                    onChange={(e) => setIndigoAccent(e.target.value)}
                    className="w-8 h-8 rounded-lg cursor-pointer border border-slate-200"
                  />
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase">Secondary Accent (Indigo)</label>
                    <span className="text-xs font-mono font-bold text-slate-600">{indigoAccent}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* API Integrations */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-1.5">
                <Key size={14} /> Integrations & API Access
              </h4>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Webinar Service Private Token</label>
                <div className="flex gap-2">
                  <input 
                    type="password" 
                    readOnly
                    value={apiKey}
                    className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none font-mono text-slate-500"
                  />
                  <button 
                    type="button"
                    onClick={() => {
                      setApiKey("pk_live_" + Math.random().toString(36).substring(2, 15));
                    }}
                    className="px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-100 transition-all"
                  >
                    <RefreshCw size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* System Security */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-1.5">
                <Lock size={14} /> Security Settings
              </h4>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-slate-700">Two-Factor Authentication</p>
                  <p className="text-[10px] text-slate-400 font-semibold">Enforce mobile verification for administrator panel logins</p>
                </div>
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-xl text-[10px] font-bold">
                  Enforced
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <span className="text-xs font-bold text-emerald-600">{statusMessage}</span>
              <button 
                type="submit"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-all"
              >
                <Save size={14} /> Save Configuration
              </button>
            </div>

          </form>
        </div>

      </div>
    </AdminLayoutWrapper>
  );
}

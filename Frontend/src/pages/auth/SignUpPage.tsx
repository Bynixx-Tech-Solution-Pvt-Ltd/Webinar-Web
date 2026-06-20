import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useAuth } from '@/hooks/useAuth';
import { Calendar, ChevronDown, BookOpenText } from 'lucide-react';
import { animate, stagger } from 'animejs';

export function SignUpPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    dob: '',
    current_profile: '',
    college_name: '',
    company_name: '',
    graduation_year: '',
    experience_years: ''
  });

  // Refs for animation targets
  const componentRef = useRef<HTMLDivElement | null>(null);
  const leftPanelRef = useRef<HTMLDivElement | null>(null);
  const formCardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // 1. Overall page fade-in
    if (componentRef.current) {
      animate(componentRef.current, {
        opacity: [0, 1],
        easing: 'easeInOutQuad',
        duration: 1000,
      });
    }

    // 2. Animate the left panel elements with a staggered effect from the left
    if (leftPanelRef.current) {
      animate(leftPanelRef.current?.children, {
        translateX: [-50, 0],
        opacity: [0, 1],
        delay: stagger(120),
        easing: 'easeOutQuad',
        duration: 800,
      });
    }

    // 3. Animate the form card with a slide-in effect from the right
    if (formCardRef.current) {
      animate(formCardRef.current, {
        translateX: [100, 0],
        opacity: [0, 1],
        delay: 400,
        easing: 'easeOutCubic',
        duration: 1100,
      });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (!formData.name || !formData.email || !formData.password) {
      alert('Please fill all required fields');
      return;
    }
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.current_profile === 'mentor' ? 'mentor' : 'student',
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        // Backend sends error message in data.error
        alert(data.error || 'Signup failed');
        return;
      }
      // Signup successful – redirect to login page
      navigate({ to: '/login' });
    } catch (err) {
      console.error(err);
      alert('An unexpected error occurred');
    }
  };

  // Modern Glassmorphism Input Styles
  const inputBaseStyles = "w-full border rounded-xl px-4 py-2.5 text-sm transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-200/50";
  const glassInputStyles = "bg-white/50 backdrop-blur-sm border-white/60 placeholder-gray-500 text-blue-950 focus:bg-white/80 focus:border-blue-400";

  return (
    <div
      ref={componentRef}
      className="relative min-h-screen overflow-y-auto bg-gradient-to-br from-blue-50 via-blue-100/50 to-indigo-100 flex items-center justify-center p-4 md:p-8 lg:p-12"
    >
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-7xl mx-auto items-center">
        {/* Left Column: Branding & Copy */}
        <div ref={leftPanelRef} className="flex flex-col justify-center text-blue-950 pr-4 lg:pr-8">
          <div className="mb-8 lg:mb-10">
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight uppercase flex items-center gap-3">
              <span className="p-2.5 bg-blue-600 rounded-lg text-white shadow-lg shadow-blue-600/30">
                <BookOpenText className="w-6 h-6 lg:w-7 lg:h-7" />
              </span>
              Bynix Education
            </h2>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
            Register and<br />watch for <span className="text-blue-600">Free</span>
          </h1>
          <p className="text-gray-700 text-base lg:text-lg max-w-md leading-relaxed">
            Join live webinars worldwide, revisit legendary IT training moments, and enjoy exclusive content in cybersecurity, full stack development, and much more.
          </p>
        </div>
        {/* Right Column: Form Card */}
        <div className="flex items-center justify-center w-full">
          <div 
            ref={formCardRef}
            className="w-full max-w-lg bg-white/40 backdrop-blur-xl p-6 sm:p-8 lg:p-10 rounded-3xl shadow-[0_30px_60px_rgba(37,99,235,0.15)] border border-white/60"
          >
            <div className="text-center mb-6">
              <h2 className="text-blue-950 text-xl font-bold flex items-center justify-center gap-2 mb-2">
                <span className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-xs text-white shadow-sm">B</span>
                BYNIX ID
              </h2>
              <h3 className="text-2xl lg:text-3xl font-extrabold text-blue-950 mb-2">Sign up</h3>
              <p className="text-gray-700 font-medium text-sm">Join for free to access live IT webinars.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-gray-800 text-sm font-bold mb-1.5 ml-1">Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  placeholder="e.g., Jane Cooper" 
                  className={`${inputBaseStyles} ${glassInputStyles}`}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* Email */}
              <div>
                <label className="block text-gray-800 text-sm font-bold mb-1.5 ml-1">Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  placeholder="you@company.com" 
                  className={`${inputBaseStyles} ${glassInputStyles}`}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* Password */}
              <div>
                <label className="block text-gray-800 text-sm font-bold mb-1.5 ml-1">Password</label>
                <input 
                  type="password" 
                  name="password"
                  value={formData.password}
                  placeholder="Create a password" 
                  className={`${inputBaseStyles} ${glassInputStyles}`}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* Profile Type */}
              <div className="relative">
                <label className="block text-gray-800 text-sm font-bold mb-1.5 ml-1">Current Profile</label>
                <select 
                  name="current_profile"
                  value={formData.current_profile}
                  className={`${inputBaseStyles} ${glassInputStyles} appearance-none pr-12 cursor-pointer`}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select your profile</option>
                  <option value="student">Student</option>
                  <option value="assistant_professor">Assistant Professor</option>
                  <option value="associate_professor">Associate Professor</option>
                  <option value="professor">Professor</option>
                  <option value="other">Other</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 pointer-events-none" />
              </div>
              {/* Conditional fields based on profile */}
              {['student', 'assistant_professor', 'associate_professor', 'professor'].includes(formData.current_profile) && (
                <>
                  <div>
                    <label className="block text-gray-800 text-sm font-bold mb-1.5 ml-1">College / Institution</label>
                    <input 
                      type="text" 
                      name="college_name"
                      value={formData.college_name}
                      placeholder="Enter your college name" 
                      className={`${inputBaseStyles} ${glassInputStyles}`}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-800 text-sm font-bold mb-1.5 ml-1">Year of Graduation</label>
                    <input 
                      type="number" 
                      name="graduation_year"
                      value={formData.graduation_year}
                      placeholder="e.g., 2026" 
                      min={1900}
                      max={2100}
                      className={`${inputBaseStyles} ${glassInputStyles}`}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </>
              )}
              {formData.current_profile === 'other' && (
                <>
                  <div>
                    <label className="block text-gray-800 text-sm font-bold mb-1.5 ml-1">Company / Organization</label>
                    <input 
                      type="text" 
                      name="company_name"
                      value={formData.company_name}
                      placeholder="Enter your company name" 
                      className={`${inputBaseStyles} ${glassInputStyles}`}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-800 text-sm font-bold mb-1.5 ml-1">Years of Experience</label>
                    <input 
                      type="number" 
                      name="experience_years"
                      value={formData.experience_years}
                      placeholder="e.g., 3" 
                      min={0}
                      max={60}
                      className={`${inputBaseStyles} ${glassInputStyles}`}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </>
              )}
              {/* Date of Birth */}
              <div className="relative">
                <label className="block text-gray-800 text-sm font-bold mb-1.5 ml-1">Date of Birth</label>
                <div className="relative">
                  <input 
                    type="text" 
                    name="dob"
                    value={formData.dob}
                    placeholder="e.g., DD/MM/YYYY" 
                    className={`${inputBaseStyles} ${glassInputStyles} appearance-none pr-12`}
                    onChange={handleChange}
                  />
                  <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 pointer-events-none" />
                </div>
              </div>

              {/* Submit */}
              <button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl py-3 mt-4 text-sm transition-all duration-300 shadow-lg"
              >
                Create Bynix ID
              </button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-gray-700 text-sm font-medium hover:text-blue-800 transition-colors">
                Already have an account? <a href="/login" className="text-blue-700 font-bold hover:underline">Sign in</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

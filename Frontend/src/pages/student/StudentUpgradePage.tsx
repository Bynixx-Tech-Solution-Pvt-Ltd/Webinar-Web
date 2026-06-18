'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import {
  Check,
  X,
  Star,
  Zap,
  Crown,
  Building,
  Rocket,
  ArrowRight,
  ChevronDown,
  Users,
  BookOpen,
  Video,
  MessageSquare,
  Award,
  Clock,
  Shield,
} from 'lucide-react';
import { motion } from 'framer-motion';

// ============================================================
// TYPES
// ============================================================

interface PlanTier {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  period: string;
  tagline: string;
  icon: typeof Star;
  color: string;
  bg: string;
  popular?: boolean;
  features: { text: string; included: boolean }[];
  cta: string;
  ctaStyle: string;
}

interface IndividualCourse {
  title: string;
  price: string;
  originalPrice: string;
  duration: string;
  image: string;
}

// ============================================================
// MOCK DATA
// ============================================================

const PLANS: PlanTier[] = [
  {
    id: 'free', name: 'Free Explorer', price: '₹0', period: '/month', tagline: 'Start your learning journey',
    icon: Star, color: 'text-gray-600', bg: 'bg-gray-50',
    features: [
      { text: 'Access to 3 free courses', included: true },
      { text: 'Basic assessments only', included: true },
      { text: 'Community access (view only)', included: true },
      { text: 'Email support', included: true },
      { text: 'Live sessions', included: false },
      { text: 'Mentor support', included: false },
      { text: 'Projects & certificates', included: false },
      { text: 'Career guidance', included: false },
    ],
    cta: 'Current Plan', ctaStyle: 'bg-gray-200 text-gray-600 cursor-not-allowed',
  },
  {
    id: 'starter', name: 'Starter Plan', price: '₹499', originalPrice: '₹999', period: '/month', tagline: 'Perfect for beginners',
    icon: Zap, color: 'text-blue-600', bg: 'bg-blue-50',
    features: [
      { text: 'Access to 10 courses', included: true },
      { text: 'All assessments', included: true },
      { text: 'Community access (post & comment)', included: true },
      { text: 'Email + chat support', included: true },
      { text: '2 live sessions per month', included: true },
      { text: 'Basic mentor support', included: true },
      { text: 'Projects & certificates', included: false },
      { text: 'Career guidance', included: false },
    ],
    cta: 'Upgrade Now', ctaStyle: 'bg-blue-600 text-white hover:bg-blue-700',
  },
  {
    id: 'pro', name: 'Pro Learner', price: '₹999', originalPrice: '₹1,999', period: '/month', tagline: 'Most Popular',
    icon: Crown, color: 'text-[#5B4AAB]', bg: 'bg-purple-50', popular: true,
    features: [
      { text: 'Access to ALL courses', included: true },
      { text: 'All assessments + leaderboard', included: true },
      { text: 'Full community access', included: true },
      { text: 'Priority support', included: true },
      { text: 'Unlimited live sessions', included: true },
      { text: '1:1 Mentor sessions (2/month)', included: true },
      { text: 'Real-world projects', included: true },
      { text: 'Career guidance', included: false },
    ],
    cta: 'Upgrade Now', ctaStyle: 'bg-[#5B4AAB] text-white hover:bg-[#4a3b96]',
  },
  {
    id: 'career', name: 'Career Accelerator', price: '₹1,999', originalPrice: '₹3,999', period: '/month', tagline: 'Best Value',
    icon: Rocket, color: 'text-orange-600', bg: 'bg-orange-50',
    features: [
      { text: 'Everything in Pro Learner', included: true },
      { text: 'Unlimited mentor sessions', included: true },
      { text: 'Resume & portfolio review', included: true },
      { text: 'Mock interviews', included: true },
      { text: 'Job referrals', included: true },
      { text: 'Placement assistance', included: true },
      { text: 'Industry certificates', included: true },
      { text: 'Dedicated career coach', included: true },
    ],
    cta: 'Upgrade Now', ctaStyle: 'bg-orange-600 text-white hover:bg-orange-700',
  },
  {
    id: 'corporate', name: 'Corporate', price: 'Custom', period: '', tagline: 'For teams & organizations',
    icon: Building, color: 'text-gray-600', bg: 'bg-gray-50',
    features: [
      { text: 'Everything in Career Accelerator', included: true },
      { text: 'Team management dashboard', included: true },
      { text: 'Custom learning paths', included: true },
      { text: 'Dedicated account manager', included: true },
      { text: 'API access', included: true },
      { text: 'Custom branding', included: true },
      { text: 'Analytics & reporting', included: true },
      { text: 'SLA agreement', included: true },
    ],
    cta: 'Contact Sales', ctaStyle: 'bg-gray-900 text-white hover:bg-gray-800',
  },
];

const INDIVIDUAL_COURSES: IndividualCourse[] = [
  { title: 'Full Stack Web Development', price: '₹2,999', originalPrice: '₹5,999', duration: '60 days', image: '🌐' },
  { title: 'AI & Machine Learning', price: '₹3,499', originalPrice: '₹6,999', duration: '90 days', image: '🤖' },
  { title: 'DevOps & Cloud Computing', price: '₹2,499', originalPrice: '₹4,999', duration: '45 days', image: '☁️' },
  { title: 'Mobile App Development', price: '₹2,999', originalPrice: '₹5,999', duration: '60 days', image: '📱' },
];

// ============================================================
// COMPONENT
// ============================================================

export function StudentUpgradePage() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

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
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-gray-900">Choose Your Plan</h1>
        <p className="text-sm text-gray-500 mt-2 max-w-lg mx-auto">
          Select the perfect plan for your learning journey. Upgrade anytime and unlock premium features.
        </p>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={() => setBillingPeriod('monthly')}
            className={`text-sm font-semibold transition-colors ${billingPeriod === 'monthly' ? 'text-gray-900' : 'text-gray-400'}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
            className={`w-12 h-7 rounded-full relative transition-colors ${billingPeriod === 'yearly' ? 'bg-[#5B4AAB]' : 'bg-gray-300'}`}
          >
            <div className={`w-5 h-5 rounded-full bg-white shadow-sm absolute top-1 transition-all ${billingPeriod === 'yearly' ? 'right-1' : 'left-1'}`} />
          </button>
          <button
            onClick={() => setBillingPeriod('yearly')}
            className={`text-sm font-semibold transition-colors ${billingPeriod === 'yearly' ? 'text-gray-900' : 'text-gray-400'}`}
          >
            Yearly
          </button>
          <span className="px-2.5 py-1 text-[10px] font-bold bg-green-100 text-green-700 rounded-full">Save 20%</span>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {PLANS.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white rounded-xl border shadow-sm flex flex-col relative ${
              plan.popular ? 'border-[#5B4AAB] ring-2 ring-[#5B4AAB]/20' : 'border-gray-200'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-[#5B4AAB] text-white text-[10px] font-bold rounded-full">
                MOST POPULAR
              </div>
            )}

            <div className="p-5 flex-1">
              {/* Plan Header */}
              <div className={`w-12 h-12 rounded-xl ${plan.bg} flex items-center justify-center ${plan.color} mb-3`}>
                <plan.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
              <p className="text-xs text-gray-500 mb-3">{plan.tagline}</p>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-extrabold text-gray-900">{plan.price}</span>
                {plan.period && <span className="text-sm text-gray-500">{plan.period}</span>}
                {plan.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">{plan.originalPrice}</span>
                )}
              </div>

              {/* Features */}
              <div className="space-y-2.5">
                {plan.features.map((feature) => (
                  <div key={feature.text} className="flex items-start gap-2">
                    {feature.included ? (
                      <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    ) : (
                      <X className="w-4 h-4 text-gray-300 mt-0.5 shrink-0" />
                    )}
                    <span className={`text-xs ${feature.included ? 'text-gray-700' : 'text-gray-400'}`}>
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="p-5 pt-0">
              <button className={`w-full py-2.5 rounded-lg text-sm font-bold transition-colors ${plan.ctaStyle}`}>
                {plan.cta}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Special Launch Offer */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 rounded-xl p-8 text-white text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] opacity-10" />
        <div className="relative z-10">
          <span className="px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full backdrop-blur-sm mb-4 inline-block">🎉 SPECIAL LAUNCH OFFER</span>
          <h2 className="text-2xl font-extrabold mb-2">Get 50% OFF on Pro Learner Plan</h2>
          <p className="text-sm text-purple-200 mb-6 max-w-lg mx-auto">
            Use code <span className="font-bold text-white bg-white/20 px-2 py-0.5 rounded">BYNIXX50</span> at checkout. Limited time offer!
          </p>
          <div className="flex items-center justify-center gap-6 mb-6">
            {[
              { value: '02', label: 'Days' },
              { value: '18', label: 'Hours' },
              { value: '45', label: 'Minutes' },
              { value: '32', label: 'Seconds' },
            ].map(timer => (
              <div key={timer.label} className="text-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl font-extrabold text-white mb-1">
                  {timer.value}
                </div>
                <p className="text-[10px] text-purple-200 font-semibold uppercase">{timer.label}</p>
              </div>
            ))}
          </div>
          <Button className="bg-white text-[#5B4AAB] text-sm font-bold hover:bg-gray-100 px-8 py-2.5">
            Claim Offer Now <ArrowRight className="w-4 h-4 ml-2 inline" />
          </Button>
        </div>
      </motion.div>

      {/* Individual Course Pricing */}
      <div>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-extrabold text-gray-900">Individual Course Pricing</h2>
          <p className="text-sm text-gray-500 mt-1">Prefer buying courses individually? Check out these options.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {INDIVIDUAL_COURSES.map((course, index) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <div className="text-4xl mb-3">{course.image}</div>
              <h3 className="text-sm font-bold text-gray-900 mb-1">{course.title}</h3>
              <p className="text-xs text-gray-500 mb-3">{course.duration} • Self-paced</p>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-xl font-extrabold text-gray-900">{course.price}</span>
                <span className="text-sm text-gray-400 line-through">{course.originalPrice}</span>
              </div>
              <Button variant="outline" className="w-full text-xs font-semibold border-gray-200">Enroll Now</Button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Trust Signals */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Shield, title: '100% Secure Payments', desc: 'All payments are encrypted and secure' },
          { icon: Clock, title: '7-Day Refund Policy', desc: 'Not satisfied? Get a full refund' },
          { icon: Users, title: '50,000+ Students', desc: 'Join our growing community' },
          { icon: Award, title: 'Industry Recognized', desc: 'MSME & ISO certified' },
        ].map(signal => (
          <div key={signal.title} className="text-center">
            <signal.icon className="w-6 h-6 text-[#5B4AAB] mx-auto mb-2" />
            <p className="text-sm font-bold text-gray-900">{signal.title}</p>
            <p className="text-xs text-gray-500">{signal.desc}</p>
          </div>
        ))}
      </div>

      {/* FAQ CTA */}
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 text-center">
        <h3 className="text-lg font-bold text-gray-900 mb-1">Have Questions?</h3>
        <p className="text-sm text-gray-500 mb-4">Check our FAQ or contact our support team for assistance.</p>
        <div className="flex items-center justify-center gap-4">
          <Button variant="outline" className="text-sm font-semibold border-gray-200">View FAQ</Button>
          <Button className="bg-[#5B4AAB] text-white text-sm font-semibold hover:bg-[#4a3b96]">Contact Support</Button>
        </div>
      </div>
    </div>
  );
}

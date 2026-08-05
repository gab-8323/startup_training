import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ViewState } from '../types';
import { COURSES_DATA } from '../data/coursesData';
import { ROADMAPS_DATA } from '../data/roadmapsData';
import { CODING_PROBLEMS_DATA } from '../data/codingProblemsData';
import { MOCK_TESTS_DATA } from '../data/mockTestsData';
import { BLOGS_DATA } from '../data/blogsData';
import { WORKSHOPS_DATA } from '../data/workshopsData';
import { COMPANY_PREP_DATA } from '../data/companyPrepData';
import { ScrollReveal, ScrollStaggerContainer, ScrollStaggerItem } from '../components/ScrollReveal';

const AnimatedStatNumber: React.FC<{ value: string }> = ({ value }) => {
  const [displayValue, setDisplayValue] = useState('0');

  React.useEffect(() => {
    const match = value.match(/[\d.,]+/);
    if (!match) {
      setDisplayValue(value);
      return;
    }
    const targetNum = parseFloat(match[0].replace(/,/g, ''));
    const suffix = value.replace(/[\d.,]+/, '');
    const isDecimal = match[0].includes('.');

    let start = 0;
    const steps = 25;
    const increment = targetNum / steps;
    const stepTime = 40;

    const timer = setInterval(() => {
      start += increment;
      if (start >= targetNum) {
        setDisplayValue(targetNum.toLocaleString() + suffix);
        clearInterval(timer);
      } else {
        const currentStr = isDecimal ? start.toFixed(1) : Math.floor(start).toLocaleString();
        setDisplayValue(currentStr + suffix);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return <>{displayValue}</>;
};
import { 
  Sparkles, 
  ArrowRight, 
  Users, 
  Code2, 
  FileCheck, 
  Calendar, 
  Trophy, 
  CheckCircle2, 
  Building2, 
  ChevronDown, 
  Search,
  Zap,
  Star,
  BookOpen,
  Compass,
  FileText,
  Play,
  Flame
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (view: ViewState, targetId?: string) => void;
  onShowToast: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
  darkMode: boolean;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onShowToast, darkMode }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const stats = [
    { label: 'Students Trained', value: '25,000+', icon: <Users className="w-5 h-5 text-blue-500" /> },
    { label: 'Coding Questions', value: '1,200+', icon: <Code2 className="w-5 h-5 text-emerald-500" /> },
    { label: 'Mock Tests Series', value: '150+', icon: <FileCheck className="w-5 h-5 text-purple-500" /> },
    { label: 'Workshops Conducted', value: '80+', icon: <Calendar className="w-5 h-5 text-amber-500" /> },
    { label: 'Placement Success', value: '94%', icon: <Trophy className="w-5 h-5 text-rose-500" /> },
  ];

  const whyChooseUs = [
    {
      title: 'Industry-Relevant Curriculum',
      desc: 'Designed strictly around current hiring patterns of TCS, Infosys, Accenture, Cognizant, and product MNCs.',
      icon: <Building2 className="w-6 h-6 text-blue-500" />
    },
    {
      title: 'Hands-on Coding Playground',
      desc: 'Practice 1000+ topic-wise & company-tagged coding problems with instant test case feedback.',
      icon: <Code2 className="w-6 h-6 text-emerald-500" />
    },
    {
      title: 'Aptitude & Speed Math Shortcuts',
      desc: 'Master time-saving tricks for Quantitative Aptitude, Logical Reasoning, and Syllogisms.',
      icon: <Zap className="w-6 h-6 text-amber-500" />
    },
    {
      title: 'Real Timed Mock Exams',
      desc: 'Simulate company drive environments with countdown timers, question palettes, and scorecard metrics.',
      icon: <FileCheck className="w-6 h-6 text-purple-500" />
    }
  ];

  const testimonials = [
    {
      name: 'Rohan Deshmukh',
      college: 'B.Tech CS, VNR VJIET',
      placedAt: 'TCS Digital (7.5 LPA)',
      text: 'The TCS NQT company prep section and mock test series on Campus2Career Academy gave me the exact question patterns that appeared in the actual exam!',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Pooja Kulkarni',
      college: 'MCA, Osmania University',
      placedAt: 'Infosys DSE (6.25 LPA)',
      text: 'The DSA & SQL handwritten notes saved my final technical interview. Step-by-step explanations for SQL joins made it so easy.',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Karthik Raja',
      college: 'BCA, Loyola College',
      placedAt: 'Accenture ASE (4.5 LPA)',
      text: 'Practicing aptitude formulas and taking timed mock tests daily boosted my confidence. This is a must-have platform for any engineering student.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    }
  ];

  const faqs = [
    {
      q: 'Is Campus2Career Academy completely free for college students?',
      a: 'Yes! All learning roadmaps, coding practice problems, aptitude cheat sheets, and technical blogs are 100% accessible to engineering and degree students.'
    },
    {
      q: 'Do I need prior coding experience to get started?',
      a: 'Not at all. We provide Beginner-level courses in Python, C, and Web Development that start from absolute zero.'
    },
    {
      q: 'Are the mock tests modeled after real company exams?',
      a: 'Yes! Our mock tests replicate the duration, question types, and scoring logic of TCS NQT, Infosys DSE, Accenture, and Cognizant.'
    },
    {
      q: 'Can I download placement notes and resume templates?',
      a: 'Yes, visit our Free Resources section to download ATS-friendly resume templates, SQL notes, and DSA formula sheets in PDF format.'
    }
  ];

  return (
    <div className="space-y-20 pb-16 animate-fadeIn">
      
      {/* 1. Hero Section with Vivid Background Image & Animations */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-24 lg:pb-32 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-2xl">
        {/* Background Image Layer */}
        <div className="absolute inset-0 -z-20 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=2000&q=80" 
            alt="Campus to Career Tech Learning Environment" 
            referrerPolicy="no-referrer"
            className={`w-full h-full object-cover object-center transform scale-105 filter transition-all duration-300 ${
              darkMode ? 'brightness-[0.7] contrast-[1.1]' : 'brightness-[0.9] contrast-[1.05]'
            }`}
          />
        </div>

        {/* Gradient Overlay tuned for contrast in both light and dark modes */}
        <div 
          className={`absolute inset-0 -z-10 transition-colors duration-300 ${
            darkMode 
              ? 'bg-gradient-to-r from-slate-950/90 via-slate-950/75 to-slate-950/50' 
              : 'bg-gradient-to-r from-white/95 via-white/85 to-blue-50/70 backdrop-blur-[1px]'
          }`} 
        />

        {/* Animated Glow Orbs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.35, 0.6, 0.35]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-gradient-to-tr from-blue-600/35 via-indigo-600/25 to-purple-600/15 blur-[110px] rounded-full pointer-events-none -z-10" 
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Copy Column */}
            <ScrollReveal direction="up" delay={0.1} className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold border shadow-sm ${
                darkMode
                  ? 'bg-slate-900/80 border-slate-700/80 text-blue-300'
                  : 'bg-blue-50/90 border-blue-200 text-blue-700'
              }`}>
                <Sparkles className="w-4 h-4 text-amber-500 dark:text-amber-400 animate-pulse" />
                <span>India&apos;s Dedicated Placement & Career Prep Academy</span>
              </div>

              <h1 className={`text-4xl sm:text-5xl xl:text-6xl font-extrabold font-display tracking-tight leading-[1.15] ${
                darkMode ? 'text-white drop-shadow-md' : 'text-slate-900'
              }`}>
                Bridge the Gap Between <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 dark:from-blue-400 dark:via-indigo-300 dark:to-sky-300">College & Industry</span>
              </h1>

              <p className={`text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 ${
                darkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Master core programming, solve 1,000+ company-tagged coding questions, practice aptitude shortcuts, and crack technical interview rounds at TCS, Infosys, Accenture, Amazon & Google.
              </p>

              {/* Call to Actions */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => onNavigate('roadmaps')}
                  className="px-6 py-3.5 rounded-2xl font-semibold text-sm text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 shadow-xl shadow-blue-500/25 flex items-center gap-2 transition-all"
                >
                  <Compass className="w-4 h-4" />
                  <span>Explore Roadmaps</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => onNavigate('coding')}
                  className={`px-6 py-3.5 rounded-2xl font-semibold text-sm border transition-all flex items-center gap-2 ${
                    darkMode
                      ? 'bg-slate-900/90 border-slate-800 text-slate-200 hover:bg-slate-800'
                      : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-100 shadow-md hover:border-slate-400'
                  }`}
                >
                  <Code2 className="w-4 h-4 text-emerald-500" />
                  <span>Start Coding Practice</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => onNavigate('mock-tests')}
                  className={`px-5 py-3.5 rounded-2xl font-semibold text-sm border transition-all flex items-center gap-2 ${
                    darkMode
                      ? 'bg-slate-900/70 border-slate-800 text-purple-400 hover:bg-slate-800'
                      : 'bg-purple-100/80 border-purple-300 text-purple-800 hover:bg-purple-200/90 shadow-sm'
                  }`}
                >
                  <FileCheck className="w-4 h-4" />
                  <span>Take Mock Test</span>
                </motion.button>
              </div>

              {/* Verified Badge info */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-600 dark:text-slate-400 font-semibold">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> No Registration Required
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 100% Industry Focused
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Updated for 2026 Drives
                </span>
              </div>
            </ScrollReveal>

            {/* Right Visual Interactive Card with Floating Motion Badges */}
            <ScrollReveal direction="up" delay={0.25} className="lg:col-span-5 relative">
              
              {/* Floating Badge 1: Top Left */}
              <motion.div 
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-6 -left-6 z-20 hidden sm:flex items-center gap-2.5 p-3 pr-4 rounded-2xl border bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-800 shadow-xl backdrop-blur-md"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-500 font-bold">
                  <Zap className="w-4 h-4 fill-emerald-500" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-900 dark:text-white">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span>2026 Drives Active</span>
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">TCS NQT & Infosys Prep</p>
                </div>
              </motion.div>

              {/* Floating Badge 2: Bottom Right */}
              <motion.div 
                animate={{ y: [8, -8, 8] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-6 -right-6 z-20 hidden sm:flex items-center gap-3 p-3 pr-4 rounded-2xl border bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-800 shadow-xl backdrop-blur-md"
              >
                <div className="flex -space-x-2">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Student" className="w-7 h-7 rounded-full border-2 border-white dark:border-slate-900 object-cover" />
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Student" className="w-7 h-7 rounded-full border-2 border-white dark:border-slate-900 object-cover" />
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="Student" className="w-7 h-7 rounded-full border-2 border-white dark:border-slate-900 object-cover" />
                </div>
                <div>
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-500" />
                    <span>4.9/5 Rating</span>
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">15,000+ Placed Students</p>
                </div>
              </motion.div>

              <div className={`rounded-3xl p-6 border shadow-2xl relative transition-all duration-300 ${
                darkMode
                  ? 'bg-slate-900/90 border-slate-800/90 shadow-black/40'
                  : 'bg-white border-slate-300 shadow-slate-300/60'
              }`}>
                
                {/* Visual Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500" />
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 font-semibold">placement_ready.py</span>
                </div>

                {/* Simulated Code preview */}
                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-950 text-slate-200 leading-relaxed overflow-x-auto border border-slate-800 shadow-inner">
                    <p><span className="text-purple-400">def</span> <span className="text-blue-400">crack_campus_placement</span>(student):</p>
                    <p className="pl-4 text-slate-400"># Step 1: Learn Core Programming</p>
                    <p className="pl-4"><span className="text-emerald-400">student</span>.master_languages([<span className="text-amber-300">&apos;Python&apos;</span>, <span className="text-amber-300">&apos;Java&apos;</span>, <span className="text-amber-300">&apos;SQL&apos;</span>])</p>
                    <p className="pl-4 text-slate-400"># Step 2: Solve 100+ Coding Problems</p>
                    <p className="pl-4"><span className="text-emerald-400">student</span>.solve_dsa_patterns()</p>
                    <p className="pl-4 text-slate-400"># Step 3: Mock Tests & ATS Resume</p>
                    <p className="pl-4"><span className="text-purple-400">return</span> <span className="text-emerald-300">&quot;PLACED AT TOP MNC 🚀&quot;</span></p>
                  </div>

                  {/* Quick Shortcut Badges */}
                  <div className="grid grid-cols-2 gap-2.5 pt-2">
                    <motion.div 
                      whileHover={{ scale: 1.03 }}
                      onClick={() => onNavigate('company-prep')}
                      className="p-3 rounded-xl border bg-blue-100/80 dark:bg-blue-950/60 border-blue-300 dark:border-blue-800 hover:bg-blue-200/80 dark:hover:bg-blue-900/80 cursor-pointer transition-all shadow-sm"
                    >
                      <div className="flex items-center justify-between text-blue-900 dark:text-blue-200 font-bold text-xs">
                        <span>TCS NQT Prep</span>
                        <ArrowRight className="w-3.5 h-3.5 text-blue-700 dark:text-blue-300" />
                      </div>
                      <p className="text-[10px] text-blue-700 dark:text-blue-300 font-semibold mt-0.5">Updated Pattern</p>
                    </motion.div>

                    <motion.div 
                      whileHover={{ scale: 1.03 }}
                      onClick={() => onNavigate('coding')}
                      className="p-3 rounded-xl border bg-emerald-100/80 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800 hover:bg-emerald-200/80 dark:hover:bg-emerald-900/80 cursor-pointer transition-all shadow-sm"
                    >
                      <div className="flex items-center justify-between text-emerald-900 dark:text-emerald-200 font-bold text-xs">
                        <span>Problem of Day</span>
                        <ArrowRight className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-300" />
                      </div>
                      <p className="text-[10px] text-emerald-700 dark:text-emerald-300 font-semibold mt-0.5">Two Sum Problem</p>
                    </motion.div>
                  </div>
                </div>

              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* 2. Statistics Counter Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" delay={0.1}>
          <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-8 rounded-3xl border shadow-xl ${
            darkMode ? 'bg-slate-900/60 border-slate-800/80' : 'bg-white border-slate-200/80 shadow-slate-200/50'
          }`}>
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx} 
                whileHover={{ y: -4 }}
                className="flex flex-col items-center text-center p-3 transition-all"
              >
                <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 mb-2">
                  {stat.icon}
                </div>
                <span className={`text-2xl sm:text-3xl font-extrabold font-display ${
                  darkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  <AnimatedStatNumber value={stat.value} />
                </span>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* 3. Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <ScrollReveal direction="up">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">Why Campus2Career</span>
            <h2 className={`text-3xl font-bold font-display ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Built Specially for Engineering & Degree Placement Aspirants
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Everything you need to move from basic college syllabus to solving real MNC interview questions.
            </p>
          </div>
        </ScrollReveal>

        <ScrollStaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
          {whyChooseUs.map((item, idx) => (
            <ScrollStaggerItem key={idx}>
              <div
                className={`p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 h-full ${
                  darkMode
                    ? 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                    : 'bg-white border-slate-200 hover:shadow-lg shadow-sm'
                }`}
              >
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 w-fit mb-4">
                  {item.icon}
                </div>
                <h3 className={`text-base font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </ScrollStaggerItem>
          ))}
        </ScrollStaggerContainer>
      </section>

      {/* 4. Learning Paths & Featured Courses Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <ScrollReveal direction="up">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">Structured Paths</span>
              <h2 className={`text-3xl font-bold font-display ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Featured Training Courses
              </h2>
            </div>
            <button
              onClick={() => onNavigate('courses')}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline"
            >
              View All Courses ({COURSES_DATA.length}) <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </ScrollReveal>

        <ScrollStaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.12}>
          {COURSES_DATA.slice(0, 3).map((course) => (
            <ScrollStaggerItem key={course.id}>
              <div
                onClick={() => onNavigate('courses', course.id)}
                className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between group h-full ${
                  darkMode
                    ? 'bg-slate-900/80 border-slate-800 hover:border-blue-500/50'
                    : 'bg-white border-slate-200 hover:border-blue-400 hover:shadow-xl shadow-sm'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                      {course.category}
                    </span>
                    {course.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                        {course.badge}
                      </span>
                    )}
                  </div>

                  <h3 className={`text-lg font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors ${
                    darkMode ? 'text-white' : 'text-slate-900'
                  }`}>
                    {course.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-800">
                    <span>⏱ {course.duration}</span>
                    <span>📊 {course.level}</span>
                    <span className="flex items-center gap-1 text-amber-500 font-semibold">
                      <Star className="w-3.5 h-3.5 fill-current" /> {course.rating}
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                  <span>View Full Syllabus & Outcomes</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </ScrollStaggerItem>
          ))}
        </ScrollStaggerContainer>
      </section>

      {/* 5. Company-Specific Prep Banner */}
      <section className={`py-12 border-y transition-colors ${
        darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-gradient-to-r from-blue-50 via-indigo-50 to-sky-50 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <ScrollReveal direction="up">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">Target Your Dream MNC</span>
              <h2 className={`text-2xl sm:text-3xl font-bold font-display ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Company-Specific Placement Hubs
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Selection patterns, recent interview questions, coding difficulty, and test blueprints.
              </p>
            </div>
          </ScrollReveal>

          <ScrollStaggerContainer className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4" staggerDelay={0.06}>
            {COMPANY_PREP_DATA.map((company) => (
              <ScrollStaggerItem key={company.id}>
                <button
                  onClick={() => onNavigate('company-prep', company.id)}
                  className={`w-full p-4 rounded-2xl border text-center transition-all duration-300 hover:scale-105 flex flex-col items-center justify-between h-full ${
                    darkMode
                      ? 'bg-slate-900 border-slate-800 text-slate-200 hover:border-blue-500'
                      : 'bg-white border-slate-200 text-slate-800 hover:shadow-lg shadow-sm'
                  }`}
                >
                  <div className="w-12 h-12 mb-2 rounded-xl bg-white p-2 flex items-center justify-center shadow-md border border-slate-100 dark:border-slate-800 shrink-0">
                    {company.logoUrl ? (
                      <img src={company.logoUrl} alt={company.companyName} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                    ) : (
                      <span className="text-xs font-extrabold text-slate-800">{company.logoText}</span>
                    )}
                  </div>
                  <h4 className="text-xs font-bold truncate w-full">{company.companyName}</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Selection Kit</p>
                </button>
              </ScrollStaggerItem>
            ))}
          </ScrollStaggerContainer>
        </div>
      </section>

      {/* 6. Upcoming Workshops */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <ScrollReveal direction="up">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">Live & Interactive</span>
              <h2 className={`text-3xl font-bold font-display ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Upcoming Workshops & Bootcamps
              </h2>
            </div>
            <button
              onClick={() => onNavigate('workshops')}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline"
            >
              View All Workshops <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </ScrollReveal>

        <ScrollStaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6" staggerDelay={0.15}>
          {WORKSHOPS_DATA.slice(0, 2).map((ws) => (
            <ScrollStaggerItem key={ws.id}>
              <div
                className={`p-6 rounded-2xl border flex flex-col justify-between h-full ${
                  darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5" /> {ws.mode}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                      {ws.date}
                    </span>
                  </div>

                  <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {ws.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {ws.description}
                  </p>

                  <div className="flex items-center gap-3 pt-2">
                    <img
                      src={ws.speaker.image}
                      alt={ws.speaker.name}
                      className="w-10 h-10 rounded-full object-cover border border-slate-300 dark:border-slate-700"
                    />
                    <div>
                      <h4 className="text-xs font-bold">{ws.speaker.name}</h4>
                      <p className="text-[11px] text-slate-400">{ws.speaker.designation}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-500 dark:text-slate-400">⏰ {ws.time}</span>
                  <button
                    onClick={() => onNavigate('workshops')}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors"
                  >
                    Register Free
                  </button>
                </div>
              </div>
            </ScrollStaggerItem>
          ))}
        </ScrollStaggerContainer>
      </section>

      {/* 7. Student Testimonials */}
      <section className={`py-16 border-y ${
        darkMode ? 'bg-slate-950 border-slate-900' : 'bg-slate-50 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <ScrollReveal direction="up">
            <div className="text-center space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">Success Stories</span>
              <h2 className={`text-3xl font-bold font-display ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Loved by Students Placed at Top Companies
              </h2>
            </div>
          </ScrollReveal>

          <ScrollStaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.12}>
            {testimonials.map((t, idx) => (
              <ScrollStaggerItem key={idx}>
                <div
                  className={`p-6 rounded-2xl border flex flex-col justify-between h-full ${
                    darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>

                    <p className="text-xs italic text-slate-600 dark:text-slate-300 leading-relaxed">
                      &quot;{t.text}&quot;
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center gap-3">
                    <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <h4 className="text-xs font-bold">{t.name}</h4>
                      <p className="text-[10px] text-slate-400">{t.college}</p>
                      <span className="text-[10px] font-semibold text-emerald-500 dark:text-emerald-400">
                        Placed at {t.placedAt}
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollStaggerItem>
            ))}
          </ScrollStaggerContainer>
        </div>
      </section>

      {/* 8. FAQ Accordion */}
      <section className="max-w-3xl mx-auto px-4 space-y-8">
        <ScrollReveal direction="up">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">Got Questions?</span>
            <h2 className={`text-3xl font-bold font-display ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Frequently Asked Questions
            </h2>
          </div>
        </ScrollReveal>

        <ScrollStaggerContainer className="space-y-3" staggerDelay={0.08}>
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <ScrollStaggerItem key={idx}>
                <div
                  className={`rounded-2xl border transition-colors ${
                    darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between font-bold text-xs sm:text-sm"
                  >
                    <span className={darkMode ? 'text-slate-200' : 'text-slate-800'}>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              </ScrollStaggerItem>
            );
          })}
        </ScrollStaggerContainer>
      </section>

      {/* 9. Contact CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" delay={0.1}>
          <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display">
                Ready to Accelerate Your Placement Preparation?
              </h2>
              <p className="text-xs sm:text-sm opacity-90 max-w-xl">
                Start practicing coding problems, solve timed mock tests, and download free placement notes now.
              </p>
            </div>

            <button
              onClick={() => onNavigate('coding')}
              className="px-6 py-3.5 rounded-2xl font-bold text-xs sm:text-sm bg-white text-blue-700 hover:bg-slate-100 shadow-lg shrink-0 transition-transform hover:scale-105 active:scale-95"
            >
              Start Practice Now
            </button>
          </div>
        </ScrollReveal>
      </section>

    </div>
  );
};

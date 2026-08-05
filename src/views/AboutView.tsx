import React from 'react';
import { ViewState } from '../types';
import { 
  Award, 
  Target, 
  Users, 
  BookOpen, 
  CheckCircle2, 
  GraduationCap, 
  Building,
  Sparkles
} from 'lucide-react';

interface AboutViewProps {
  onNavigate: (view: ViewState) => void;
  darkMode: boolean;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate, darkMode }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-fadeIn">
      
      {/* Hero Section */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">About Campus2Career Academy</span>
        <h1 className={`text-3xl sm:text-5xl font-extrabold font-display ${darkMode ? 'text-white' : 'text-slate-900'}`}>
          Bridging the Gap Between College & Industry
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          Campus2Career Academy is dedicated to equipping engineering and degree students with placement-ready skills in Data Structures, Software Development, Quantitative Aptitude, and Technical Interviewing.
        </p>
      </div>

      {/* Mission & Vision Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`p-8 rounded-3xl border space-y-4 ${
          darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-500 flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white">Our Mission</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            To make high-quality placement training accessible to every student across B.Tech, BCA, MCA, and degree colleges, ensuring no candidate is held back by lack of industry guidance or practice resources.
          </p>
        </div>

        <div className={`p-8 rounded-3xl border space-y-4 ${
          darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white">Our Vision</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            To be India&apos;s most trusted career preparation platform, empowering over 500,000 students to crack campus placements at top MNCs, Product Tech Giants, and high-growth startups.
          </p>
        </div>
      </div>

      {/* Why Choose Us / Key Pillars */}
      <div className={`p-8 sm:p-10 rounded-3xl border space-y-8 ${
        darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">Our Core Pillars</span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white">Why Students Trust Us</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Industry Curriculums', desc: 'Updated quarterly based on actual hiring patterns of TCS, Infosys, Accenture, and Amazon.', icon: <BookOpen className="w-5 h-5 text-blue-500" /> },
            { title: 'Interactive Problem Bank', desc: 'Over 400+ curated coding questions with multi-language online test case execution.', icon: <GraduationCap className="w-5 h-5 text-emerald-500" /> },
            { title: 'Timed Mock Exams', desc: 'Real exam pressure simulations with instant scoring, accuracy breakdown, and solutions.', icon: <Sparkles className="w-5 h-5 text-amber-500" /> },
            { title: 'Free Study Material', desc: 'Handwritten notes, DSA formula cheat sheets, and ATS resume templates for instant download.', icon: <Building className="w-5 h-5 text-purple-500" /> },
          ].map((pillar, idx) => (
            <div key={idx} className={`p-5 rounded-2xl border space-y-2 ${
              darkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 w-fit">{pillar.icon}</div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">{pillar.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white text-center space-y-4 shadow-2xl">
        <h2 className="text-2xl sm:text-3xl font-extrabold font-display">Ready to Start Your Placement Journey?</h2>
        <p className="text-xs sm:text-sm text-blue-100 max-w-xl mx-auto">
          Explore our structured roadmaps or practice coding questions designed specifically for campus recruitment.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <button
            onClick={() => onNavigate('roadmaps')}
            className="px-6 py-3 rounded-2xl text-xs font-bold bg-white text-blue-600 hover:bg-slate-100 shadow-xl"
          >
            View Career Roadmaps
          </button>
          <button
            onClick={() => onNavigate('coding')}
            className="px-6 py-3 rounded-2xl text-xs font-bold bg-blue-700 text-white hover:bg-blue-800 shadow-xl border border-blue-500"
          >
            Practice Coding Qs
          </button>
        </div>
      </div>

    </div>
  );
};

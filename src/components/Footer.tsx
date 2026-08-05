import React, { useState } from 'react';
import { ViewState } from '../types';
import { 
  GraduationCap, 
  Send, 
  Mail, 
  Linkedin, 
  Github, 
  Youtube, 
  ArrowRight,
  ShieldCheck,
  FileText
} from 'lucide-react';

interface FooterProps {
  onNavigate: (view: ViewState) => void;
  onShowToast: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
  darkMode: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onShowToast, darkMode }) => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      onShowToast('Invalid Email', 'Please enter a valid email address.', 'error');
      return;
    }
    onShowToast('Subscribed Successfully!', 'You will receive weekly placement tips and coding practice questions in your inbox.', 'success');
    setEmail('');
  };

  return (
    <footer className={`border-t pt-16 pb-12 transition-colors duration-300 ${
      darkMode ? 'bg-slate-950 border-slate-900 text-slate-400' : 'bg-slate-900 border-slate-800 text-slate-300'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Column 1: Brand Info & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div 
              onClick={() => onNavigate('home')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="font-bold text-xl tracking-tight text-white font-display">
                  Campus<span className="text-blue-400">2</span>Career <span className="text-xs font-normal text-slate-400">Academy</span>
                </span>
              </div>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Empowering engineering, B.Tech, BCA, MCA, and degree students with high-quality industry training, coding practice, aptitude preparation, company placement kits, and technical resources.
            </p>

            <div className="pt-2">
              <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-2">Subscribe to Placement Newsletter</h4>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2 max-w-sm">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your college email..."
                  className="flex-1 px-3 py-2 rounded-xl text-xs bg-slate-800/90 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all shrink-0"
                >
                  <span>Subscribe</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors flex items-center gap-1">
                  <ArrowRight className="w-3 h-3 text-blue-400" /> Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('courses')} className="hover:text-white transition-colors flex items-center gap-1">
                  <ArrowRight className="w-3 h-3 text-blue-400" /> All Courses
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('roadmaps')} className="hover:text-white transition-colors flex items-center gap-1">
                  <ArrowRight className="w-3 h-3 text-blue-400" /> Learning Roadmaps
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('coding')} className="hover:text-white transition-colors flex items-center gap-1">
                  <ArrowRight className="w-3 h-3 text-blue-400" /> Coding Practice
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('aptitude')} className="hover:text-white transition-colors flex items-center gap-1">
                  <ArrowRight className="w-3 h-3 text-blue-400" /> Aptitude Practice
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('mock-tests')} className="hover:text-white transition-colors flex items-center gap-1">
                  <ArrowRight className="w-3 h-3 text-blue-400" /> Mock Test Series
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Company Prep */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Company Prep</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('company-prep')} className="hover:text-white transition-colors flex items-center gap-1">
                  TCS NQT & Prime Prep
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('company-prep')} className="hover:text-white transition-colors flex items-center gap-1">
                  Infosys HackWithInfy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('company-prep')} className="hover:text-white transition-colors flex items-center gap-1">
                  Accenture Placement Kit
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('company-prep')} className="hover:text-white transition-colors flex items-center gap-1">
                  Cognizant GenC Next
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('company-prep')} className="hover:text-white transition-colors flex items-center gap-1">
                  Capgemini & Deloitte
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Free Resources & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Resources & Support</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('resources')} className="hover:text-white transition-colors">
                  Free Placement Notes (PDF)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('resources')} className="hover:text-white transition-colors">
                  ATS Resume Templates
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('blogs')} className="hover:text-white transition-colors">
                  Technical Placement Blogs
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('workshops')} className="hover:text-white transition-colors">
                  Live College Workshops
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                  Contact & Enquiries
                </button>
              </li>
            </ul>

            <div className="pt-2 flex items-center gap-3">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-blue-600 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700 transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-red-600 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Campus2Career Academy. All rights reserved. Learn. Practice. Get Placed.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Educational Platform
            </span>
            <span className="flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              Privacy & Terms
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

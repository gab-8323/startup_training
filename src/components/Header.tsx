import React, { useState, useEffect } from 'react';
import { ViewState } from '../types';
import { 
  GraduationCap, 
  Search, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Sparkles,
  BookOpen,
  Code2,
  Calculator,
  FileText,
  Building2,
  Download,
  Calendar,
  Compass,
  HelpCircle,
  PhoneCall,
  ShieldCheck
} from 'lucide-react';

interface HeaderProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  onOpenSearch: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onOpenSearch,
  darkMode,
  onToggleDarkMode,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { view: ViewState; label: string; icon: React.ReactNode }[] = [
    { view: 'home', label: 'Home', icon: <GraduationCap className="w-4 h-4" /> },
    { view: 'courses', label: 'Courses', icon: <BookOpen className="w-4 h-4" /> },
    { view: 'roadmaps', label: 'Roadmaps', icon: <Compass className="w-4 h-4" /> },
    { view: 'coding', label: 'Coding Practice', icon: <Code2 className="w-4 h-4" /> },
    { view: 'aptitude', label: 'Aptitude', icon: <Calculator className="w-4 h-4" /> },
    { view: 'mock-tests', label: 'Mock Tests', icon: <FileText className="w-4 h-4" /> },
    { view: 'company-prep', label: 'Company Prep', icon: <Building2 className="w-4 h-4" /> },
    { view: 'blogs', label: 'Blogs', icon: <FileText className="w-4 h-4" /> },
    { view: 'resources', label: 'Resources', icon: <Download className="w-4 h-4" /> },
    { view: 'workshops', label: 'Workshops', icon: <Calendar className="w-4 h-4" /> },
    { view: 'admin', label: 'Admin Panel', icon: <ShieldCheck className="w-4 h-4 text-emerald-400" /> },
    { view: 'about', label: 'About', icon: <HelpCircle className="w-4 h-4" /> },
    { view: 'contact', label: 'Contact', icon: <PhoneCall className="w-4 h-4" /> },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? darkMode
            ? 'bg-slate-950/90 border-b border-slate-800/80 backdrop-blur-md shadow-lg shadow-black/20'
            : 'bg-white/90 border-b border-slate-200/80 backdrop-blur-md shadow-md shadow-slate-200/50'
          : darkMode
          ? 'bg-slate-950/60 border-b border-slate-900/40 backdrop-blur-sm'
          : 'bg-white/60 border-b border-slate-100 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Tagline */}
          <div 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-sky-400 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className={`font-bold text-xl tracking-tight font-display ${
                  darkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  Campus<span className="text-blue-600 dark:text-blue-400">2</span>Career
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 dark:border dark:border-blue-800/50">
                  Academy
                </span>
              </div>
              <p className="text-[10px] font-medium tracking-wide text-slate-500 dark:text-slate-400 -mt-0.5">
                Learn. Practice. Get Placed.
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links (Primary 6) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {navItems.slice(0, 8).map((item) => {
              const isActive = currentView === item.view || (currentView === 'course-detail' && item.view === 'courses') || (currentView === 'coding-detail' && item.view === 'coding') || (currentView === 'mock-test-runner' && item.view === 'mock-tests');
              return (
                <button
                  key={item.view}
                  onClick={() => onNavigate(item.view)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap ${
                    isActive
                      ? darkMode
                        ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                        : 'bg-blue-50 text-blue-600 border border-blue-200/80 font-semibold'
                      : darkMode
                      ? 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            {/* Overflow Dropdown / Secondary Links */}
            <div className="relative group">
              <button
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                  darkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                More ▾
              </button>
              <div className={`absolute right-0 top-full mt-1 w-48 rounded-xl p-2 shadow-xl border opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 ${
                darkMode ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-800'
              }`}>
                {navItems.slice(8).map((item) => (
                  <button
                    key={item.view}
                    onClick={() => onNavigate(item.view)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2 transition-colors ${
                      currentView === item.view
                        ? 'bg-blue-600 text-white'
                        : darkMode
                        ? 'hover:bg-slate-800 text-slate-300'
                        : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </nav>

          {/* Action Buttons: Global Search, Dark Mode, Action CTA */}
          <div className="flex items-center gap-2.5">
            {/* Global Search Button */}
            <button
              onClick={onOpenSearch}
              className={`p-2.5 sm:px-3 sm:py-2 rounded-xl text-xs font-medium flex items-center gap-2 border transition-all duration-200 ${
                darkMode
                  ? 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  : 'bg-slate-100/80 border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-100'
              }`}
              title="Search website (⌘K)"
            >
              <Search className="w-4 h-4 text-slate-400" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-mono rounded bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-300 dark:border-slate-700">
                ⌘K
              </kbd>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className={`p-2.5 rounded-xl border transition-all duration-200 ${
                darkMode
                  ? 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800'
                  : 'bg-slate-100 border-slate-200 text-indigo-600 hover:bg-slate-200'
              }`}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Quick Practice CTA */}
            <button
              onClick={() => onNavigate('coding')}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-md shadow-blue-500/25 active:scale-95 transition-all duration-200"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Practice Coding</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2.5 rounded-xl border transition-colors ${
                darkMode ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-slate-100 border-slate-200 text-slate-800'
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className={`lg:hidden border-b px-4 pt-3 pb-6 space-y-2 animate-fadeIn ${
          darkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-800'
        }`}>
          <div className="grid grid-cols-2 gap-2 pt-2">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => {
                  onNavigate(item.view);
                  setMobileMenuOpen(false);
                }}
                className={`p-3 rounded-xl text-left text-xs font-medium flex items-center gap-2.5 transition-colors ${
                  currentView === item.view
                    ? 'bg-blue-600 text-white font-semibold shadow-sm'
                    : darkMode
                    ? 'bg-slate-900 hover:bg-slate-800 text-slate-300'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={() => {
                onNavigate('coding');
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center gap-2 shadow-md"
            >
              <Sparkles className="w-4 h-4" />
              <span>Start Coding Practice</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

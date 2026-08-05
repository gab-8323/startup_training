import React from 'react';
import { ViewState } from '../types';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbsProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  subTitle?: string;
  darkMode: boolean;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  currentView,
  onNavigate,
  subTitle,
  darkMode,
}) => {
  if (currentView === 'home') return null;

  const getViewLabel = (view: ViewState): string => {
    switch (view) {
      case 'about': return 'About Us';
      case 'courses': return 'Courses';
      case 'course-detail': return 'Course Details';
      case 'roadmaps': return 'Learning Roadmaps';
      case 'coding': return 'Coding Practice';
      case 'coding-detail': return 'Code Editor & Problem';
      case 'aptitude': return 'Aptitude Practice';
      case 'mock-tests': return 'Mock Tests';
      case 'mock-test-runner': return 'Live Mock Exam';
      case 'blogs': return 'Technical Blogs';
      case 'blog-detail': return 'Blog Article';
      case 'resources': return 'Free Placement Resources';
      case 'workshops': return 'Workshops';
      case 'company-prep': return 'Company Preparation';
      case 'contact': return 'Contact';
      default: return 'Page';
    }
  };

  return (
    <nav className={`py-3 px-4 sm:px-6 lg:px-8 border-b ${
      darkMode ? 'bg-slate-950/40 border-slate-900 text-slate-400' : 'bg-slate-50 border-slate-200/60 text-slate-500'
    }`}>
      <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-medium">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-1 hover:text-blue-500 transition-colors"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </button>

        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />

        <span className={subTitle ? 'hover:text-blue-500 cursor-pointer' : 'text-blue-600 dark:text-blue-400 font-semibold'}
              onClick={() => subTitle && onNavigate(currentView)}>
          {getViewLabel(currentView)}
        </span>

        {subTitle && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-blue-600 dark:text-blue-400 font-semibold truncate max-w-[200px] sm:max-w-xs">
              {subTitle}
            </span>
          </>
        )}
      </div>
    </nav>
  );
};

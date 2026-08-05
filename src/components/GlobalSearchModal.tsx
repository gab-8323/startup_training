import React, { useState, useEffect } from 'react';
import { ViewState, SearchResultItem } from '../types';
import { COURSES_DATA } from '../data/coursesData';
import { CODING_PROBLEMS_DATA } from '../data/codingProblemsData';
import { MOCK_TESTS_DATA } from '../data/mockTestsData';
import { BLOGS_DATA } from '../data/blogsData';
import { ROADMAPS_DATA } from '../data/roadmapsData';
import { RESOURCES_DATA } from '../data/resourcesData';
import { COMPANY_PREP_DATA } from '../data/companyPrepData';
import { Search, X, BookOpen, Code2, FileText, Compass, Download, Building2, ChevronRight } from 'lucide-react';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (view: ViewState, targetId?: string) => void;
  darkMode: boolean;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectResult,
  darkMode,
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled by parent or state
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase();
    const list: SearchResultItem[] = [];

    // Search Courses
    COURSES_DATA.forEach((c) => {
      if (c.title.toLowerCase().includes(q) || c.category.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)) {
        list.push({
          id: c.id,
          type: 'Course',
          title: c.title,
          subtitle: `${c.category} • ${c.duration}`,
          viewTarget: 'courses',
          targetId: c.id,
        });
      }
    });

    // Search Coding Problems
    CODING_PROBLEMS_DATA.forEach((p) => {
      if (p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.companyTags.some(t => t.toLowerCase().includes(q))) {
        list.push({
          id: p.id,
          type: 'Coding Problem',
          title: p.title,
          subtitle: `${p.category} • ${p.difficulty} • Tags: ${p.companyTags.slice(0, 3).join(', ')}`,
          viewTarget: 'coding',
          targetId: p.id,
        });
      }
    });

    // Search Mock Tests
    MOCK_TESTS_DATA.forEach((m) => {
      if (m.title.toLowerCase().includes(q) || m.subcategory.toLowerCase().includes(q) || m.category.toLowerCase().includes(q)) {
        list.push({
          id: m.id,
          type: 'Mock Test',
          title: m.title,
          subtitle: `${m.category} • ${m.durationMinutes} Mins • ${m.totalQuestions} Questions`,
          viewTarget: 'mock-tests',
          targetId: m.id,
        });
      }
    });

    // Search Blogs
    BLOGS_DATA.forEach((b) => {
      if (b.title.toLowerCase().includes(q) || b.category.toLowerCase().includes(q) || b.summary.toLowerCase().includes(q)) {
        list.push({
          id: b.id,
          type: 'Blog',
          title: b.title,
          subtitle: `${b.category} • ${b.readTime}`,
          viewTarget: 'blogs',
          targetId: b.id,
        });
      }
    });

    // Search Roadmaps
    ROADMAPS_DATA.forEach((r) => {
      if (r.title.toLowerCase().includes(q) || r.targetRole.toLowerCase().includes(q)) {
        list.push({
          id: r.id,
          type: 'Roadmap',
          title: r.title,
          subtitle: `${r.targetRole} • ${r.estimatedTime}`,
          viewTarget: 'roadmaps',
          targetId: r.id,
        });
      }
    });

    // Search Resources
    RESOURCES_DATA.forEach((res) => {
      if (res.title.toLowerCase().includes(q) || res.subject.toLowerCase().includes(q) || res.category.toLowerCase().includes(q)) {
        list.push({
          id: res.id,
          type: 'Resource',
          title: res.title,
          subtitle: `${res.category} • ${res.fileType} (${res.fileSize})`,
          viewTarget: 'resources',
          targetId: res.id,
        });
      }
    });

    // Search Companies
    COMPANY_PREP_DATA.forEach((comp) => {
      if (comp.companyName.toLowerCase().includes(q) || comp.overview.toLowerCase().includes(q)) {
        list.push({
          id: comp.id,
          type: 'Company',
          title: comp.companyName,
          subtitle: 'Placement Selection Process & Interview Questions',
          viewTarget: 'company-prep',
          targetId: comp.id,
        });
      }
    });

    setResults(list.slice(0, 10));
  }, [query]);

  if (!isOpen) return null;

  const getTypeIcon = (type: SearchResultItem['type']) => {
    switch (type) {
      case 'Course': return <BookOpen className="w-4 h-4 text-blue-500" />;
      case 'Coding Problem': return <Code2 className="w-4 h-4 text-emerald-500" />;
      case 'Mock Test': return <FileText className="w-4 h-4 text-purple-500" />;
      case 'Blog': return <FileText className="w-4 h-4 text-amber-500" />;
      case 'Roadmap': return <Compass className="w-4 h-4 text-cyan-500" />;
      case 'Resource': return <Download className="w-4 h-4 text-indigo-500" />;
      case 'Company': return <Building2 className="w-4 h-4 text-rose-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className={`w-full max-w-2xl rounded-2xl shadow-2xl border overflow-hidden transition-all duration-200 ${
          darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Search Header Input */}
        <div className={`flex items-center gap-3 px-4 py-3.5 border-b ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Courses, Coding Questions, Mock Tests, Roadmaps, Notes..."
            className="w-full bg-transparent text-sm focus:outline-none placeholder-slate-400 font-medium"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-500/10 text-slate-400 hover:text-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {query.trim() === '' ? (
            <div className="p-8 text-center text-xs text-slate-400">
              <p className="font-semibold text-sm mb-1 text-slate-300 dark:text-slate-200">Search Campus2Career Academy</p>
              <p>Type keywords like <span className="text-blue-500 font-mono">TCS</span>, <span className="text-blue-500 font-mono font-semibold">Python</span>, <span className="text-blue-500 font-mono">Arrays</span>, <span className="text-blue-500 font-mono font-semibold">SQL</span>, or <span className="text-blue-500 font-mono">Aptitude</span></p>
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">
              No matching resources found for &quot;<span className="text-slate-200 font-semibold">{query}</span>&quot;
            </div>
          ) : (
            <div className="space-y-1">
              {results.map((item) => (
                <button
                  key={`${item.type}-${item.id}`}
                  onClick={() => {
                    onSelectResult(item.viewTarget, item.targetId);
                    onClose();
                  }}
                  className={`w-full text-left p-3 rounded-xl flex items-center justify-between transition-colors ${
                    darkMode
                      ? 'hover:bg-slate-800/80 text-slate-200'
                      : 'hover:bg-blue-50/70 text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 rounded-lg bg-slate-800/50 dark:bg-slate-800 shrink-0">
                      {getTypeIcon(item.type)}
                    </div>
                    <div className="truncate">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold truncate">{item.title}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-semibold bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 shrink-0">
                          {item.type}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">{item.subtitle}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer hint */}
        <div className={`px-4 py-2.5 border-t text-[11px] flex items-center justify-between text-slate-400 ${
          darkMode ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <span>Navigation Shortcuts</span>
          <div className="flex items-center gap-3">
            <span><kbd className="px-1 bg-slate-200 dark:bg-slate-800 rounded">ESC</kbd> Close</span>
          </div>
        </div>
      </div>
    </div>
  );
};

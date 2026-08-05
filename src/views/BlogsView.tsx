import React, { useState } from 'react';
import { ViewState, Blog } from '../types';
import { BLOGS_DATA } from '../data/blogsData';
import { 
  FileText, 
  Search, 
  Clock, 
  Calendar, 
  Share2, 
  Copy, 
  Linkedin, 
  Twitter, 
  X, 
  ChevronRight, 
  BookOpen, 
  Tag 
} from 'lucide-react';

interface BlogsViewProps {
  onNavigate: (view: ViewState) => void;
  selectedBlogId?: string;
  onShowToast: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
  darkMode: boolean;
}

export const BlogsView: React.FC<BlogsViewProps> = ({
  onNavigate,
  selectedBlogId,
  onShowToast,
  darkMode,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeBlog, setActiveBlog] = useState<Blog | null>(
    selectedBlogId ? BLOGS_DATA.find((b) => b.id === selectedBlogId) || null : null
  );

  const categories = ['All', 'Placement Preparation', 'DSA', 'Resume', 'Programming', 'SQL'];

  const filteredBlogs = BLOGS_DATA.filter((blog) => {
    const matchesCategory = activeCategory === 'All' || blog.category === activeCategory;
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          blog.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    onShowToast('Link Copied!', 'Article link copied to your clipboard.', 'info');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fadeIn">
      
      {/* 1. BLOG LISTING VIEW */}
      {!activeBlog ? (
        <div className="space-y-10">
          
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">Technical & Career Insights</span>
            <h1 className={`text-3xl sm:text-4xl font-extrabold font-display ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Technical Placement Blogs & Guides
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              In-depth articles written by senior software engineers and campus mentors covering TCS NQT preparation, DSA patterns, ATS resume blueprints, and interview experiences.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b pb-6 border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    activeCategory === cat
                      ? 'bg-amber-600 text-white shadow-md shadow-amber-500/20'
                      : darkMode
                      ? 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search blog title..."
                className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs font-medium border focus:outline-none ${
                  darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
                }`}
              />
            </div>
          </div>

          {/* Featured Hero Blog (First item) */}
          {filteredBlogs.length > 0 && (
            <div
              onClick={() => setActiveBlog(filteredBlogs[0])}
              className={`p-6 sm:p-8 rounded-3xl border grid grid-cols-1 lg:grid-cols-12 gap-8 items-center cursor-pointer transition-all duration-300 hover:shadow-2xl ${
                darkMode ? 'bg-slate-900/80 border-slate-800 hover:border-amber-500/40' : 'bg-white border-slate-200 hover:border-amber-400 shadow-sm'
              }`}
            >
              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center gap-3 text-xs">
                  <span className="font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400">
                    Featured Guide
                  </span>
                  <span className="text-slate-400">{filteredBlogs[0].readTime}</span>
                </div>

                <h2 className={`text-2xl sm:text-3xl font-bold font-display ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {filteredBlogs[0].title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {filteredBlogs[0].summary}
                </p>

                <div className="flex items-center gap-3 pt-2">
                  <img src={filteredBlogs[0].author.avatar} alt={filteredBlogs[0].author.name} className="w-9 h-9 rounded-full object-cover" />
                  <div>
                    <h4 className="text-xs font-bold">{filteredBlogs[0].author.name}</h4>
                    <p className="text-[10px] text-slate-400">{filteredBlogs[0].author.role}</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <img
                  src={filteredBlogs[0].coverImage}
                  alt={filteredBlogs[0].title}
                  className="w-full h-64 sm:h-72 rounded-2xl object-cover shadow-lg"
                />
              </div>
            </div>
          )}

          {/* Blog Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.slice(1).map((blog) => (
              <div
                key={blog.id}
                onClick={() => setActiveBlog(blog)}
                className={`rounded-2xl border overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 cursor-pointer group ${
                  darkMode ? 'bg-slate-900/80 border-slate-800 hover:border-amber-500/40' : 'bg-white border-slate-200 hover:border-amber-400 shadow-sm'
                }`}
              >
                <div>
                  <img src={blog.coverImage} alt={blog.title} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span className="font-semibold text-amber-500">{blog.category}</span>
                      <span>{blog.readTime}</span>
                    </div>

                    <h3 className={`text-base font-bold group-hover:text-amber-500 transition-colors ${
                      darkMode ? 'text-white' : 'text-slate-900'
                    }`}>
                      {blog.title}
                    </h3>

                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {blog.summary}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 flex items-center justify-between text-xs font-semibold text-amber-600 dark:text-amber-400">
                  <span>Read Article</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

        </div>
      ) : (

        /* 2. BLOG READER VIEW */
        <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
          
          <button
            onClick={() => setActiveBlog(null)}
            className="text-xs font-semibold text-slate-400 hover:text-slate-200 flex items-center gap-1.5"
          >
            ← Back to All Articles
          </button>

          <div className="space-y-6">
            <div className="flex items-center gap-3 text-xs">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wider">
                {activeBlog.category}
              </span>
              <span className="text-slate-400">⏱ {activeBlog.readTime} • Published {activeBlog.publishedDate}</span>
            </div>

            <h1 className={`text-3xl sm:text-4xl font-extrabold font-display leading-tight ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}>
              {activeBlog.title}
            </h1>

            {/* Author Profile Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <img src={activeBlog.author.avatar} alt={activeBlog.author.name} className="w-11 h-11 rounded-full object-cover" />
                <div>
                  <h4 className="text-xs font-bold">{activeBlog.author.name}</h4>
                  <p className="text-[11px] text-slate-400">{activeBlog.author.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyLink}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-white"
                  title="Copy Link"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Cover Image */}
            <img src={activeBlog.coverImage} alt={activeBlog.title} className="w-full h-80 rounded-3xl object-cover shadow-xl" />

            {/* Table of Contents */}
            {activeBlog.tableOfContents && (
              <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-3 text-xs">
                <h4 className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" /> Table of Contents
                </h4>
                <ul className="space-y-1.5 text-slate-700 dark:text-slate-300 list-disc list-inside">
                  {activeBlog.tableOfContents.map((toc, idx) => (
                    <li key={idx}>{toc}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Markdown / Article Content */}
            <div className={`prose dark:prose-invert max-w-none text-xs sm:text-sm leading-relaxed space-y-4 p-6 rounded-3xl border ${
              darkMode ? 'bg-slate-900/60 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-800'
            }`}>
              <div className="whitespace-pre-line font-sans">
                {activeBlog.content}
              </div>
            </div>

            {/* Tags */}
            <div className="flex items-center gap-2 pt-4">
              <Tag className="w-4 h-4 text-slate-400" />
              {activeBlog.tags.map((tag) => (
                <span key={tag} className="text-xs px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-800 font-medium">
                  #{tag}
                </span>
              ))}
            </div>

          </div>

        </div>
      )}

    </div>
  );
};

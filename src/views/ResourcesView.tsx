import React, { useState } from 'react';
import { ViewState, ResourceItem } from '../types';
import { RESOURCES_DATA } from '../data/resourcesData';
import { ScrollReveal, ScrollStaggerContainer, ScrollStaggerItem } from '../components/ScrollReveal';
import { 
  Download, 
  Search, 
  FileText, 
  FileCode, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  Eye,
  Star,
  Check,
  X,
  Layers,
  Archive
} from 'lucide-react';

interface ResourcesViewProps {
  onNavigate: (view: ViewState) => void;
  onShowToast: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
  darkMode: boolean;
}

export const ResourcesView: React.FC<ResourcesViewProps> = ({
  onNavigate,
  onShowToast,
  darkMode,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [previewTemplate, setPreviewTemplate] = useState<ResourceItem | null>(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);

  const categories = [
    'All', 
    'Resume Templates', 
    'Project Templates', 
    'Cheat Sheets', 
    'Notes', 
    'Interview Questions', 
    'Placement PDFs'
  ];

  const filteredResources = RESOURCES_DATA.filter((res) => {
    const matchesCategory = selectedCategory === 'All' || res.category === selectedCategory;
    const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          res.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (res.tags && res.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  const handleDownload = (resource: ResourceItem) => {
    if (resource.downloadUrl && resource.downloadUrl.startsWith('http')) {
      window.open(resource.downloadUrl, '_blank');
    } else {
      // Create a real downloadable package document file
      const content = `================================================
${resource.title.toUpperCase()}
================================================
Category: ${resource.category}
Subject: ${resource.subject}
Format: ${resource.fileType}
File Size: ${resource.fileSize}
Downloaded From: CareerLaunch Placement Portal

DESCRIPTION:
${resource.description}

KEY INCLUDED FEATURES:
${(resource.features || ['Complete source code and documentation included.']).map(f => ` • ${f}`).join('\n')}

TAGS:
${(resource.tags || ['placement', 'preparation', 'resources']).map(t => `#${t}`).join(' ')}

================================================
© CareerLaunch Placement & Preparation Platform
================================================`;

      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const fileExt = resource.fileType.toLowerCase().includes('zip') ? 'zip.txt' : 'txt';
      link.download = `${resource.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_package.${fileExt}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
    onShowToast('Download Started 📥', `Downloaded "${resource.title}" (${resource.fileSize}).`, 'success');
  };

  const handleSelectTemplate = (template: ResourceItem) => {
    setSelectedTemplateId(template.id);
    onShowToast(
      'Template Selected! 🎯', 
      `"${template.title}" has been selected for your project. File package: ${template.fileType}`, 
      'success'
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fadeIn">
      
      {/* Page Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
          Template Showcase & Study Materials
        </span>
        <h1 className={`text-3xl sm:text-4xl font-extrabold font-display ${darkMode ? 'text-white' : 'text-slate-900'}`}>
          Project & Resume Templates
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          Select and download ATS-friendly resume templates, production-ready final year capstone project starters, DSA formula cheat sheets, and handwritten placement study guides.
        </p>
      </div>

      {/* Selected Template Banner if user selected one */}
      {selectedTemplateId && (() => {
        const selectedItem = RESOURCES_DATA.find(r => r.id === selectedTemplateId);
        if (!selectedItem) return null;
        return (
          <div className="p-4 sm:p-5 rounded-2xl bg-indigo-600 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-scaleUp">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md">
                <CheckCircle2 className="w-6 h-6 text-emerald-300" />
              </div>
              <div>
                <p className="text-xs font-medium text-indigo-200 uppercase tracking-wider">Currently Selected Template</p>
                <h3 className="text-base font-bold text-white">{selectedItem.title}</h3>
                <p className="text-xs text-indigo-100">{selectedItem.subject} • {selectedItem.fileType} ({selectedItem.fileSize})</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleDownload(selectedItem)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-white text-indigo-700 hover:bg-indigo-50 transition-all flex items-center gap-1.5 shadow-md"
              >
                <Download className="w-4 h-4" /> Download Selected Package
              </button>
              <button
                onClick={() => setSelectedTemplateId(null)}
                className="p-2 rounded-xl text-indigo-200 hover:text-white hover:bg-white/10 transition-colors"
                title="Deselect"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      })()}

      {/* Filter Tabs & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b pb-6 border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
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
            placeholder="Search templates or subjects..."
            className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs font-medium border focus:outline-none ${
              darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
            }`}
          />
        </div>
      </div>

      {/* Resource & Template Cards Grid */}
      <ScrollStaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.08}>
        {filteredResources.map((res) => {
          const isTemplate = res.category === 'Resume Templates' || res.category === 'Project Templates';
          const isSelected = selectedTemplateId === res.id;

          return (
            <ScrollStaggerItem key={res.id}>
              <div
                className={`p-6 rounded-2xl border flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 relative h-full ${
                  isSelected
                    ? 'border-indigo-600 ring-2 ring-indigo-500/30 dark:bg-indigo-950/20 bg-indigo-50/30'
                    : darkMode 
                    ? 'bg-slate-900/80 border-slate-800' 
                    : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                      res.category === 'Resume Templates'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300'
                        : res.category === 'Project Templates'
                        ? 'bg-purple-100 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300'
                        : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300'
                    }`}>
                      {res.category}
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {res.fileType} • {res.fileSize}
                    </span>
                  </div>

                  <div>
                    <h3 className={`text-base font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                      {res.title}
                    </h3>
                    <p className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium mt-0.5">
                      {res.subject}
                    </p>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                    {res.description}
                  </p>

                  {/* Tags if present */}
                  {res.tags && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {res.tags.map((tag, i) => (
                        <span 
                          key={i} 
                          className={`text-[10px] px-2 py-0.5 rounded-md font-medium ${
                            darkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-1">
                      {res.rating && (
                        <span className="flex items-center gap-1 text-amber-500 font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-500" /> {res.rating}
                        </span>
                      )}
                    </div>
                    <span>🔥 {res.downloadsCount.toLocaleString()} Downloads</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-2">
                  {isTemplate && (
                    <button
                      onClick={() => setPreviewTemplate(res)}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all ${
                        darkMode 
                          ? 'border-slate-700 hover:bg-slate-800 text-slate-300' 
                          : 'border-slate-200 hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5" /> Preview
                    </button>
                  )}

                  {isTemplate ? (
                    <button
                      onClick={() => handleSelectTemplate(res)}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                        isSelected
                          ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20'
                          : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-3.5 h-3.5" /> Selected
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5" /> Select Template
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleDownload(res)}
                      className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                    >
                      <Download className="w-4 h-4" /> Download PDF
                    </button>
                  )}
                </div>
              </div>
            </ScrollStaggerItem>
          );
        })}
      </ScrollStaggerContainer>

      {/* Template Details & Live Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className={`w-full max-w-2xl rounded-3xl border shadow-2xl overflow-hidden max-h-[90vh] flex flex-col ${
            darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                  {previewTemplate.category}
                </span>
                <h2 className="text-xl font-bold mt-2 font-display">{previewTemplate.title}</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">{previewTemplate.subject}</p>
              </div>
              <button
                onClick={() => setPreviewTemplate(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6 overflow-y-auto flex-1">
              {/* Layout Mockup / Visual Card */}
              <div className={`p-6 rounded-2xl border ${
                darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Archive className="w-5 h-5 text-indigo-500" />
                    <span className="text-xs font-bold font-mono">{previewTemplate.fileType} Package</span>
                  </div>
                  <span className="text-xs text-slate-500">Size: {previewTemplate.fileSize}</span>
                </div>

                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                  {previewTemplate.description}
                </p>

                {previewTemplate.features && (
                  <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
                    <p className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                      Included Key Features & Specs:
                    </p>
                    <ul className="space-y-2">
                      {previewTemplate.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Tags */}
              {previewTemplate.tags && (
                <div>
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">Categories & Keywords:</p>
                  <div className="flex flex-wrap gap-2">
                    {previewTemplate.tags.map((tag, i) => (
                      <span
                        key={i}
                        className={`text-xs px-3 py-1 rounded-lg font-medium ${
                          darkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/50 dark:bg-slate-900/50">
              <div className="text-xs text-slate-500">
                🔥 {previewTemplate.downloadsCount.toLocaleString()} downloads • Rated {previewTemplate.rating || 4.9}/5.0
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => {
                    handleSelectTemplate(previewTemplate);
                    setPreviewTemplate(null);
                  }}
                  className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all"
                >
                  <Check className="w-4 h-4" /> Select This Template
                </button>
                <button
                  onClick={() => {
                    handleDownload(previewTemplate);
                  }}
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center gap-2 transition-all"
                >
                  <Download className="w-4 h-4" /> Download
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};


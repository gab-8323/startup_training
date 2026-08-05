import React, { useState } from 'react';
import { ViewState, CompanyPrep } from '../types';
import { COMPANY_PREP_DATA } from '../data/companyPrepData';
import { ScrollReveal, ScrollStaggerContainer, ScrollStaggerItem } from '../components/ScrollReveal';
import { 
  Building2, 
  CheckCircle2, 
  Download, 
  FileCode, 
  HelpCircle, 
  Sparkles,
  ChevronRight,
  BookOpen
} from 'lucide-react';

interface CompanyPrepViewProps {
  onNavigate: (view: ViewState, targetId?: string) => void;
  selectedCompanyId?: string;
  onShowToast: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
  darkMode: boolean;
}

export const CompanyPrepView: React.FC<CompanyPrepViewProps> = ({
  onNavigate,
  selectedCompanyId,
  onShowToast,
  darkMode,
}) => {
  const [activeCompany, setActiveCompany] = useState<CompanyPrep>(
    selectedCompanyId ? COMPANY_PREP_DATA.find((c) => c.id === selectedCompanyId) || COMPANY_PREP_DATA[0] : COMPANY_PREP_DATA[0]
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fadeIn">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">Targeted Hiring Kits</span>
        <h1 className={`text-3xl sm:text-4xl font-extrabold font-display ${darkMode ? 'text-white' : 'text-slate-900'}`}>
          Company-Specific Placement Hub
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          Detailed selection process stages, coding patterns, exam blueprints, and real recent interview questions for top service and product MNCs.
        </p>
      </div>

      {/* Company Selection Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800">
        {COMPANY_PREP_DATA.map((comp) => {
          const isSelected = activeCompany.id === comp.id;
          return (
            <button
              key={comp.id}
              onClick={() => setActiveCompany(comp)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2.5 ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-105'
                  : darkMode
                  ? 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                  : 'bg-white border text-slate-700 hover:bg-slate-50 shadow-sm'
              }`}
            >
              <div className="w-6 h-6 rounded-lg bg-white p-1 flex items-center justify-center shrink-0 shadow-sm overflow-hidden">
                {comp.logoUrl ? (
                  <img src={comp.logoUrl} alt={comp.companyName} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                ) : (
                  <span className="text-[10px] font-extrabold text-slate-800">{comp.logoText[0]}</span>
                )}
              </div>
              <span>{comp.companyName}</span>
            </button>
          );
        })}
      </div>

      {/* Active Company Details Container */}
      <ScrollReveal direction="up" delay={0.1}>
        <div className={`p-6 sm:p-8 rounded-3xl border shadow-xl space-y-8 ${
          darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
        }`}>
        
        {/* Company Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white p-2.5 flex items-center justify-center shadow-md border border-slate-200 shrink-0">
              {activeCompany.logoUrl ? (
                <img src={activeCompany.logoUrl} alt={activeCompany.companyName} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
              ) : (
                <span className="text-base font-extrabold text-slate-800">{activeCompany.logoText}</span>
              )}
            </div>
            <div>
              <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">Company Placement Blueprint</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display">{activeCompany.companyName}</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">{activeCompany.overview}</p>
            </div>
          </div>

          <button
            onClick={() => onShowToast('Kit Downloaded 📦', `Downloaded ${activeCompany.companyName} complete prep kit.`, 'success')}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-500/20 flex items-center gap-1.5 shrink-0"
          >
            <Download className="w-4 h-4" /> Download Complete Prep Kit
          </button>
        </div>

        {/* 1. Selection Process Stages */}
        <div className="space-y-4">
          <h3 className="font-bold text-sm uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Selection Process Stages
          </h3>

          <ScrollStaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" staggerDelay={0.08}>
            {activeCompany.selectionProcess.map((stage) => (
              <ScrollStaggerItem key={stage.stage}>
                <div
                  className={`p-4 rounded-2xl border space-y-2 h-full ${
                    darkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                      {stage.stage}
                    </span>
                    <h4 className="font-bold text-xs text-slate-900 dark:text-slate-100">{stage.name}</h4>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    {stage.description}
                  </p>
                </div>
              </ScrollStaggerItem>
            ))}
          </ScrollStaggerContainer>
        </div>

        {/* 2. Coding Patterns & Aptitude Blueprint */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Coding Pattern */}
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-emerald-500 flex items-center gap-1.5">
              <FileCode className="w-4 h-4" /> Coding Questions Pattern
            </h3>

            <div className="space-y-2.5 text-xs">
              {activeCompany.codingPattern.map((cp, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 space-y-1">
                  <div className="flex items-center justify-between font-bold">
                    <span>{cp.topic}</span>
                    <span className="text-emerald-500 text-[10px]">{cp.frequency}</span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px]">Example: {cp.sampleQuestion}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Aptitude Exam Pattern */}
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-purple-500 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" /> Cognitive Aptitude Pattern
            </h3>

            <div className="space-y-2.5 text-xs">
              {activeCompany.aptitudePattern.map((ap, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
                  <span className="font-bold">{ap.section}</span>
                  <div className="text-right text-[11px] font-mono text-purple-400">
                    <div>{ap.numQuestions}</div>
                    <div className="text-slate-400">{ap.duration}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* 3. Recent Real Interview Questions */}
        <div className="space-y-4">
          <h3 className="font-bold text-sm uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-amber-500" /> Recent Interview Questions & Answers
          </h3>

          <div className="space-y-3">
            {activeCompany.recentInterviewQuestions.map((q, idx) => (
              <div key={idx} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-2 text-xs">
                <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                  <span>Q{idx + 1}. {q.question}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-600 dark:text-amber-400 shrink-0">
                    {q.round}
                  </span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                  <span className="font-semibold text-blue-500">Answer Summary:</span> {q.answerSummary}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
      </ScrollReveal>

    </div>
  );
};

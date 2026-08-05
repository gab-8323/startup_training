import React, { useState } from 'react';
import { ViewState, AptitudeTopic } from '../types';
import { APTITUDE_TOPICS_DATA } from '../data/aptitudeData';
import { ScrollReveal, ScrollStaggerContainer, ScrollStaggerItem } from '../components/ScrollReveal';
import { 
  Calculator, 
  Search, 
  HelpCircle, 
  CheckCircle2, 
  ChevronDown, 
  BookOpen, 
  Sparkles,
  Percent,
  Clock,
  Users,
  Brain
} from 'lucide-react';

interface AptitudeViewProps {
  onNavigate: (view: ViewState) => void;
  onShowToast: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
  darkMode: boolean;
}

export const AptitudeView: React.FC<AptitudeViewProps> = ({
  onNavigate,
  onShowToast,
  darkMode,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeTopic, setActiveTopic] = useState<AptitudeTopic>(APTITUDE_TOPICS_DATA[0]);
  const [revealedSolutions, setRevealedSolutions] = useState<{ [qId: string]: boolean }>({});
  const [selectedUserOptions, setSelectedUserOptions] = useState<{ [qId: string]: number }>({});

  const categories = ['All', 'Quantitative', 'Logical Reasoning', 'Verbal Ability', 'Data Interpretation'];

  const filteredTopics = APTITUDE_TOPICS_DATA.filter((t) => {
    return selectedCategory === 'All' || t.category === selectedCategory;
  });

  const handleSelectOption = (qId: string, optionIndex: number) => {
    setSelectedUserOptions({ ...selectedUserOptions, [qId]: optionIndex });
  };

  const toggleSolution = (qId: string) => {
    setRevealedSolutions({ ...revealedSolutions, [qId]: !revealedSolutions[qId] });
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Quantitative': return <Percent className="w-4 h-4 text-blue-500" />;
      case 'Logical Reasoning': return <Brain className="w-4 h-4 text-purple-500" />;
      case 'Verbal Ability': return <BookOpen className="w-4 h-4 text-emerald-500" />;
      default: return <Calculator className="w-4 h-4 text-amber-500" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fadeIn">
      
      {/* Page Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">Speed Math & Logic</span>
        <h1 className={`text-3xl sm:text-4xl font-extrabold font-display ${darkMode ? 'text-white' : 'text-slate-900'}`}>
          Aptitude & Reasoning Practice Hub
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          Clear the initial elimination rounds of TCS NQT, Infosys, Accenture, Cognizant, and Deloitte with topic-wise shortcut formulas and step-by-step practice questions.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : darkMode
                ? 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Split Content: Topics list & Active Practice Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Topics List */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-2">Practice Topics</h3>
          <ScrollStaggerContainer className="space-y-3" staggerDelay={0.06}>
            {filteredTopics.map((topic) => {
              const isSelected = activeTopic.id === topic.id;
              return (
                <ScrollStaggerItem key={topic.id}>
                  <div
                    onClick={() => setActiveTopic(topic)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-500 shadow-xl shadow-blue-500/20'
                        : darkMode
                        ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                        : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className={`p-2 rounded-xl ${isSelected ? 'bg-white/20' : 'bg-slate-100 dark:bg-slate-800'}`}>
                          {getCategoryIcon(topic.category)}
                        </div>
                        <div>
                          <h4 className="font-bold text-xs">{topic.title}</h4>
                          <span className={`text-[10px] ${isSelected ? 'opacity-90' : 'text-slate-500 dark:text-slate-400'}`}>
                            {topic.category} • {topic.questions.length} Practice Qs
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollStaggerItem>
              );
            })}
          </ScrollStaggerContainer>
        </div>

        {/* Right Column: Active Topic Formulas & Practice Questions */}
        <ScrollReveal direction="up" delay={0.1} className="lg:col-span-8 space-y-6">
          <div className={`p-6 rounded-3xl border shadow-xl space-y-6 ${
            darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className="pb-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">{activeTopic.category}</span>
                <h2 className="text-2xl font-bold font-display">{activeTopic.title}</h2>
              </div>
            </div>

            {/* Formula Cheat Sheet Box */}
            {activeTopic.formulaeSummary && (
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-300 space-y-2 text-xs">
                <h4 className="font-bold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" /> Shortcut Formulas & Key Rules
                </h4>
                <ul className="list-disc list-inside space-y-1 font-mono text-[11px] opacity-90">
                  {activeTopic.formulaeSummary.map((form, fIdx) => (
                    <li key={fIdx}>{form}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Practice Questions List */}
            <div className="space-y-6 pt-2">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Practice Questions</h3>

              {activeTopic.questions.map((q, qIdx) => {
                const userChoice = selectedUserOptions[q.id];
                const isRevealed = revealedSolutions[q.id];
                const isCorrect = userChoice === q.correctOptionIndex;

                return (
                  <div
                    key={q.id}
                    className={`p-5 rounded-2xl border space-y-4 ${
                      darkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50/80 border-slate-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h4 className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed">
                        Q{qIdx + 1}. {q.question}
                      </h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 shrink-0">
                        {q.difficulty}
                      </span>
                    </div>

                    {/* Options Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {q.options.map((opt, oIdx) => {
                        const isSelected = userChoice === oIdx;
                        const isRightAnswer = q.correctOptionIndex === oIdx;

                        return (
                          <button
                            key={oIdx}
                            onClick={() => handleSelectOption(q.id, oIdx)}
                            className={`p-3 rounded-xl border text-left font-medium transition-all ${
                              isSelected
                                ? isRightAnswer
                                  ? 'bg-emerald-600 text-white border-emerald-500 font-bold'
                                  : 'bg-rose-600 text-white border-rose-500 font-bold'
                                : darkMode
                                ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                                : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-100'
                            }`}
                          >
                            <span className="mr-2 font-mono text-slate-400 font-bold">
                              {String.fromCharCode(65 + oIdx)}.
                            </span>
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {/* Toggle Solution Button & Explanation */}
                    <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
                      <button
                        onClick={() => toggleSolution(q.id)}
                        className="text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center gap-1"
                      >
                        {isRevealed ? 'Hide Explanation' : 'View Step-by-Step Explanation'}
                      </button>

                      {userChoice !== undefined && (
                        <span className={`font-bold ${isCorrect ? 'text-emerald-500' : 'text-rose-500'}`}>
                          {isCorrect ? 'Correct Answer! 🎉' : 'Incorrect Choice'}
                        </span>
                      )}
                    </div>

                    {/* Revealed Solution Box */}
                    {isRevealed && (
                      <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-slate-700 dark:text-slate-200 text-xs space-y-1 animate-fadeIn">
                        <p className="font-bold text-blue-600 dark:text-blue-400">Correct Option: {String.fromCharCode(65 + q.correctOptionIndex)} ({q.options[q.correctOptionIndex]})</p>
                        <p className="leading-relaxed text-slate-500 dark:text-slate-400 pt-1">{q.explanation}</p>
                      </div>
                    )}

                  </div>
                );
              })}
            </div>

          </div>

        </ScrollReveal>

      </div>

    </div>
  );
};

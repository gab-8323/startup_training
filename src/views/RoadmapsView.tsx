import React, { useState } from 'react';
import { ViewState, Roadmap } from '../types';
import { ROADMAPS_DATA } from '../data/roadmapsData';
import { ScrollReveal, ScrollStaggerContainer, ScrollStaggerItem } from '../components/ScrollReveal';
import { 
  Compass, 
  Clock, 
  Target, 
  CheckCircle2, 
  ChevronRight, 
  Lightbulb, 
  BookOpen, 
  Sparkles 
} from 'lucide-react';

interface RoadmapsViewProps {
  onNavigate: (view: ViewState, targetId?: string) => void;
  onShowToast: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
  darkMode: boolean;
}

export const RoadmapsView: React.FC<RoadmapsViewProps> = ({
  onNavigate,
  onShowToast,
  darkMode,
}) => {
  const [activeRoadmap, setActiveRoadmap] = useState<Roadmap>(ROADMAPS_DATA[0]);
  const [completedSteps, setCompletedSteps] = useState<{ [key: string]: boolean }>({});

  const toggleStepCompletion = (stepId: string) => {
    const newState = !completedSteps[stepId];
    setCompletedSteps({ ...completedSteps, [stepId]: newState });
    if (newState) {
      onShowToast('Milestone Completed! 🎉', 'Step marked as completed in your roadmap tracker.', 'success');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fadeIn">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">Step-By-Step Guidance</span>
        <h1 className={`text-3xl sm:text-4xl font-extrabold font-display ${darkMode ? 'text-white' : 'text-slate-900'}`}>
          Structured Career Learning Roadmaps
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          Follow curated, week-by-week learning paths designed by industry engineers to prepare for specific roles and campus hiring drives.
        </p>
      </div>

      {/* Roadmap Selection Cards */}
      <ScrollStaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" staggerDelay={0.08}>
        {ROADMAPS_DATA.map((rm) => {
          const isSelected = activeRoadmap.id === rm.id;
          return (
            <ScrollStaggerItem key={rm.id}>
              <button
                onClick={() => setActiveRoadmap(rm)}
                className={`w-full p-5 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between h-full ${
                  isSelected
                    ? 'bg-gradient-to-tr from-blue-600 to-indigo-600 text-white border-blue-500 shadow-xl shadow-blue-500/25 scale-[1.02]'
                    : darkMode
                    ? 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/60'
                    : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50 shadow-sm'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}>
                      {rm.category}
                    </span>
                    <Compass className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-blue-500'}`} />
                  </div>

                  <h3 className="font-bold text-sm leading-snug">{rm.title}</h3>
                  <p className={`text-[11px] line-clamp-2 ${isSelected ? 'opacity-90' : 'text-slate-500 dark:text-slate-400'}`}>
                    {rm.targetRole}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 dark:border-slate-800 flex items-center justify-between text-[11px] font-semibold">
                  <span>⏱ {rm.estimatedTime}</span>
                  <span>{rm.steps.length} Milestones</span>
                </div>
              </button>
            </ScrollStaggerItem>
          );
        })}
      </ScrollStaggerContainer>

      {/* Active Roadmap Timeline Section */}
      <ScrollReveal direction="up" delay={0.1}>
        <div className={`p-6 sm:p-8 rounded-3xl border shadow-xl space-y-8 ${
          darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
        }`}>
        
        {/* Active Roadmap Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Selected Roadmap</span>
            <h2 className="text-2xl font-bold font-display">{activeRoadmap.title}</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{activeRoadmap.description}</p>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold px-4 py-2.5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/50">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" /> {activeRoadmap.estimatedTime}
            </span>
            <span className="flex items-center gap-1">
              <Target className="w-4 h-4" /> {activeRoadmap.targetRole}
            </span>
          </div>
        </div>

        {/* Milestone Steps Timeline */}
        <div className="relative pl-4 sm:pl-8 space-y-8 border-l-2 border-blue-500/30">
          {activeRoadmap.steps.map((step) => {
            const stepKey = `${activeRoadmap.id}-step-${step.stepNumber}`;
            const isDone = completedSteps[stepKey];

            return (
              <div key={step.stepNumber} className="relative group">
                
                {/* Timeline node badge */}
                <button
                  onClick={() => toggleStepCompletion(stepKey)}
                  className={`absolute -left-[27px] sm:-left-[43px] top-1 w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all ${
                    isDone
                      ? 'bg-emerald-500 border-emerald-400 text-white shadow-md shadow-emerald-500/30'
                      : 'bg-blue-600 border-white text-white shadow-md shadow-blue-600/30 hover:scale-110'
                  }`}
                  title="Click to mark milestone completed"
                >
                  {isDone ? <CheckCircle2 className="w-4 h-4" /> : step.stepNumber}
                </button>

                {/* Step Card content */}
                <div className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                  darkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50/70 border-slate-200/80'
                }`}>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-500">
                        Step {step.stepNumber} • {step.duration}
                      </span>
                      <h3 className={`text-base sm:text-lg font-bold ${isDone ? 'line-through opacity-75' : ''}`}>
                        {step.title}
                      </h3>
                    </div>

                    <button
                      onClick={() => toggleStepCompletion(stepKey)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors self-start sm:self-auto ${
                        isDone
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : darkMode
                          ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                          : 'bg-white text-slate-700 hover:bg-slate-100 border'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{isDone ? 'Completed' : 'Mark Complete'}</span>
                    </button>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 my-3 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Key Topics Badges */}
                  <div className="space-y-2 pt-1">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Key Topics to Master:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {step.keyTopics.map((topic, tIdx) => (
                        <span key={tIdx} className="text-xs px-2.5 py-1 rounded-lg bg-blue-100/60 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 font-medium">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Project Idea & Resources */}
                  <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {step.projectIdea && (
                      <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 flex items-start gap-2">
                        <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold block">Recommended Project:</span>
                          <span>{step.projectIdea}</span>
                        </div>
                      </div>
                    )}

                    <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-800 dark:text-blue-300 flex items-start gap-2">
                      <BookOpen className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold block">Recommended Resources:</span>
                        <span>{step.recommendedResources.join(', ')}</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
        </div>
      </ScrollReveal>

    </div>
  );
};

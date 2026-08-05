import React, { useState, useEffect } from 'react';
import { ViewState, MockTest, TestResult } from '../types';
import { MOCK_TESTS_DATA } from '../data/mockTestsData';
import confetti from 'canvas-confetti';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { 
  FileCheck, 
  Clock, 
  Play, 
  CheckCircle2, 
  X, 
  AlertCircle, 
  BarChart2, 
  RotateCcw, 
  Award,
  BookOpen,
  ChevronRight,
  ShieldCheck,
  Check,
  Download,
  FileText
} from 'lucide-react';

interface MockTestsViewProps {
  onNavigate: (view: ViewState) => void;
  selectedTestId?: string;
  onShowToast: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
  darkMode: boolean;
}

export const MockTestsView: React.FC<MockTestsViewProps> = ({
  onNavigate,
  selectedTestId,
  onShowToast,
  darkMode,
}) => {
  const [activeTabCategory, setActiveTabCategory] = useState<string>('All');
  
  // Live Test Runner States
  const [activeTest, setActiveTest] = useState<MockTest | null>(
    selectedTestId ? MOCK_TESTS_DATA.find((t) => t.id === selectedTestId) || null : null
  );
  const [testMode, setTestMode] = useState<'catalog' | 'instructions' | 'running' | 'results'>('catalog');
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [qId: string]: number }>({});
  const [markedForReview, setMarkedForReview] = useState<{ [qId: string]: boolean }>({});
  const [secondsRemaining, setSecondsRemaining] = useState<number>(0);
  const [finalResult, setFinalResult] = useState<TestResult | null>(null);

  const categories = ['All', 'Company Specific', 'Technical MCQs', 'Coding', 'Aptitude'];

  const filteredTests = MOCK_TESTS_DATA.filter((t) => {
    return activeTabCategory === 'All' || t.category === activeTabCategory;
  });

  // Countdown timer effect during live running test
  useEffect(() => {
    if (testMode !== 'running' || secondsRemaining <= 0) return;

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleFinishTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [testMode, secondsRemaining]);

  const startTestPreparation = (test: MockTest) => {
    setActiveTest(test);
    setTestMode('instructions');
    setUserAnswers({});
    setMarkedForReview({});
    setCurrentQuestionIndex(0);
  };

  const launchLiveExam = () => {
    if (!activeTest) return;
    setTestMode('running');
    setSecondsRemaining(activeTest.durationMinutes * 60);
    onShowToast('Test Started!', `Good luck! You have ${activeTest.durationMinutes} minutes to finish.`, 'info');
  };

  const handleFinishTest = () => {
    if (!activeTest) return;

    let score = 0;
    activeTest.questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });

    const total = activeTest.questions.length;
    const accuracy = Math.round((score / total) * 100);
    const passed = accuracy >= activeTest.passingScore;
    const timeSpent = activeTest.durationMinutes * 60 - secondsRemaining;

    const result: TestResult = {
      testId: activeTest.id,
      testTitle: activeTest.title,
      score,
      totalScore: total,
      accuracy,
      timeSpentSeconds: timeSpent,
      passed,
      answers: userAnswers,
    };

    setFinalResult(result);
    setTestMode('results');

    // Persist Candidate Test Results to Firestore for Admin Review
    try {
      addDoc(collection(db, 'test_results'), {
        candidateName: 'Candidate / Student',
        testId: activeTest.id,
        testTitle: activeTest.title,
        category: activeTest.category,
        score,
        totalScore: total,
        accuracy,
        timeSpentSeconds: timeSpent,
        passed,
        submittedAt: new Date().toISOString(),
        createdAt: serverTimestamp(),
      }).catch((err) => console.log('Firestore write notice:', err));
    } catch (e) {
      console.log('Firestore save error:', e);
    }

    if (passed) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
      onShowToast('Congratulations! 🎉', `You passed the mock test with ${accuracy}% accuracy!`, 'success');
    } else {
      onShowToast('Test Submitted', `Score: ${score}/${total} (${accuracy}%). Review explanations to improve.`, 'info');
    }
  };

  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleDownloadScorecard = () => {
    if (!finalResult || !activeTest) return;

    const timestamp = new Date().toLocaleString();
    const certificateId = `CERT-${activeTest.id.toUpperCase()}-${Date.now().toString().slice(-6)}`;

    const content = `====================================================================
               CAREERLAUNCH ASSESSMENT SCORECARD REPORT
====================================================================

OFFICIAL TEST REPORT & PERFORMANCE SUMMARY
--------------------------------------------------------------------
Certificate / Report ID : ${certificateId}
Date & Time             : ${timestamp}
Assessment Title        : ${activeTest.title}
Category & Module       : ${activeTest.category} (${activeTest.subcategory})
Difficulty Level        : ${activeTest.difficulty}

CANDIDATE SCORECARD METRICS
--------------------------------------------------------------------
Total Questions         : ${finalResult.totalScore}
Questions Correct       : ${finalResult.score}
Accuracy Percentage     : ${finalResult.accuracy}%
Required Passing Cutoff : ${activeTest.passingScore}%
Time Spent              : ${formatTime(finalResult.timeSpentSeconds)} / ${activeTest.durationMinutes} mins
Final Evaluation Result : ${finalResult.passed ? 'PASSED / QUALIFIED' : 'NEEDS PRACTICE'}

TOPIC BREAKDOWN & TEST QUESTIONS DETAILED SUMMARY
--------------------------------------------------------------------
${activeTest.questions.map((q, idx) => {
  const userAns = finalResult.answers[q.id];
  const isCorrect = userAns === q.correctIndex;
  const userText = userAns !== undefined ? `${String.fromCharCode(65 + userAns)}. ${q.options[userAns]}` : 'Unanswered';
  const correctText = `${String.fromCharCode(65 + q.correctIndex)}. ${q.options[q.correctIndex]}`;
  return `Q${idx + 1} [${q.topicTag}]: ${q.question}
   Status: ${isCorrect ? 'PASSED (Correct)' : 'FAILED (Incorrect)'}
   Selected Answer: ${userText}
   Correct Answer : ${correctText}
`;
}).join('\n')}
====================================================================
Verified by CareerLaunch Placement Portal Engine
Website: https://careerlaunch-prep.portal
====================================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Scorecard_${activeTest.id}_${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    onShowToast('Scorecard Downloaded 📄', `Saved official test report: ${certificateId}`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fadeIn">
      
      {/* 1. CATALOG MODE */}
      {testMode === 'catalog' && (
        <div className="space-y-10">
          
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400">Timed Exam Simulation</span>
            <h1 className={`text-3xl sm:text-4xl font-extrabold font-display ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Placement Mock Test Series
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Test your preparation under real timed conditions. Instant scorecards, accuracy analysis, and detailed step-by-step explanations for every question.
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTabCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTabCategory === cat
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                    : darkMode
                    ? 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Test Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTests.map((test) => (
              <div
                key={test.id}
                onClick={() => startTestPreparation(test)}
                className={`p-6 rounded-2xl border flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 cursor-pointer group ${
                  darkMode
                    ? 'bg-slate-900/80 border-slate-800 hover:border-purple-500/50'
                    : 'bg-white border-slate-200 hover:border-purple-400 hover:shadow-xl shadow-sm'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                      {test.subcategory}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-600 dark:text-blue-400">
                      Passing: {test.passingScore}%
                    </span>
                  </div>

                  <h3 className={`text-lg font-bold group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors ${
                    darkMode ? 'text-white' : 'text-slate-900'
                  }`}>
                    {test.title}
                  </h3>

                  <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <span>⏱ {test.durationMinutes} Mins</span>
                    <span>❓ {test.totalQuestions} Questions</span>
                    <span>📊 {test.difficulty}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-purple-600 dark:text-purple-400">
                  <span>Start Mock Exam</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* 2. INSTRUCTIONS MODE */}
      {testMode === 'instructions' && activeTest && (
        <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn">
          <div className={`p-8 rounded-3xl border shadow-2xl space-y-6 ${
            darkMode ? 'bg-slate-900/90 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className="pb-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-purple-500 uppercase tracking-widest">{activeTest.category}</span>
                <h2 className="text-2xl font-bold font-display">{activeTest.title}</h2>
              </div>
              <button
                onClick={() => setTestMode('catalog')}
                className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-100 dark:bg-slate-950 text-center text-xs">
              <div>
                <span className="text-slate-400 block">Duration</span>
                <span className="font-bold text-sm text-purple-500">{activeTest.durationMinutes} Minutes</span>
              </div>
              <div>
                <span className="text-slate-400 block">Total Questions</span>
                <span className="font-bold text-sm text-blue-500">{activeTest.totalQuestions} Questions</span>
              </div>
              <div>
                <span className="text-slate-400 block">Passing Cutoff</span>
                <span className="font-bold text-sm text-emerald-500">{activeTest.passingScore}%</span>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Exam Rules & Instructions</h4>
              <ul className="list-disc list-inside space-y-2 leading-relaxed">
                {activeTest.instructions.map((inst, idx) => (
                  <li key={idx}>{inst}</li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3">
              <button
                onClick={() => setTestMode('catalog')}
                className="px-5 py-2.5 rounded-xl font-semibold text-xs border border-slate-300 dark:border-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={launchLiveExam}
                className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-purple-600 hover:bg-purple-500 shadow-md shadow-purple-600/20 flex items-center gap-1.5"
              >
                <Play className="w-4 h-4 fill-current" /> Begin Exam Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. LIVE TEST RUNNER MODE */}
      {testMode === 'running' && activeTest && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Top Exam Status Bar */}
          <div className="p-4 rounded-2xl bg-slate-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div>
              <h3 className="font-bold text-sm">{activeTest.title}</h3>
              <span className="text-[10px] text-slate-400">Question {currentQuestionIndex + 1} of {activeTest.totalQuestions}</span>
            </div>

            {/* Timer Display */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 font-mono text-sm font-bold text-amber-400">
                <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
                <span>{formatTime(secondsRemaining)}</span>
              </div>

              <button
                onClick={handleFinishTest}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-md"
              >
                Submit Test
              </button>
            </div>
          </div>

          {/* Main Question & Palette Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column: Active Question */}
            <div className="lg:col-span-8 p-6 rounded-3xl border shadow-xl space-y-6 bg-slate-900 text-slate-100 border-slate-800">
              
              {(() => {
                const q = activeTest.questions[currentQuestionIndex];
                const selectedOpt = userAnswers[q.id];

                return (
                  <div className="space-y-5 text-xs sm:text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">Question {currentQuestionIndex + 1}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">{q.topicTag}</span>
                    </div>

                    <h4 className="font-semibold text-base leading-relaxed text-white">
                      {q.question}
                    </h4>

                    {q.codeSnippet && (
                      <pre className="p-4 rounded-xl bg-slate-950 text-emerald-300 font-mono text-xs overflow-x-auto border border-slate-800">
                        {q.codeSnippet}
                      </pre>
                    )}

                    {/* Options List */}
                    <div className="space-y-2.5 pt-2">
                      {q.options.map((opt, oIdx) => {
                        const isSelected = selectedOpt === oIdx;
                        return (
                          <button
                            key={oIdx}
                            onClick={() => setUserAnswers({ ...userAnswers, [q.id]: oIdx })}
                            className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${
                              isSelected
                                ? 'bg-purple-600 text-white border-purple-400 font-bold shadow-md'
                                : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                            }`}
                          >
                            <span>
                              <span className="mr-3 font-mono opacity-60">{String.fromCharCode(65 + oIdx)}.</span>
                              {opt}
                            </span>
                            {isSelected && <Check className="w-4 h-4 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}

              {/* Navigation Controls */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <button
                  disabled={currentQuestionIndex === 0}
                  onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-40"
                >
                  Previous
                </button>

                <button
                  onClick={() => {
                    const q = activeTest.questions[currentQuestionIndex];
                    setMarkedForReview({ ...markedForReview, [q.id]: !markedForReview[q.id] });
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold ${
                    markedForReview[activeTest.questions[currentQuestionIndex].id]
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-slate-800 text-amber-400 hover:bg-slate-700'
                  }`}
                >
                  {markedForReview[activeTest.questions[currentQuestionIndex].id] ? 'Marked for Review' : 'Mark for Review'}
                </button>

                <button
                  disabled={currentQuestionIndex === activeTest.questions.length - 1}
                  onClick={() => setCurrentQuestionIndex((prev) => Math.min(activeTest.questions.length - 1, prev + 1))}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 text-white hover:bg-purple-500 shadow-md disabled:opacity-40"
                >
                  Next Question
                </button>
              </div>

            </div>

            {/* Right Column: Question Palette */}
            <div className="lg:col-span-4 p-5 rounded-3xl border bg-slate-900 border-slate-800 text-slate-100 space-y-4">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">Question Palette</h4>
              
              <div className="grid grid-cols-5 gap-2">
                {activeTest.questions.map((q, idx) => {
                  const isAnswered = userAnswers[q.id] !== undefined;
                  const isMarked = markedForReview[q.id];
                  const isCurrent = currentQuestionIndex === idx;

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQuestionIndex(idx)}
                      className={`w-9 h-9 rounded-xl font-mono text-xs font-bold flex items-center justify-center transition-all ${
                        isCurrent
                          ? 'ring-2 ring-purple-400 scale-110 z-10'
                          : ''
                      } ${
                        isMarked
                          ? 'bg-amber-500 text-slate-950'
                          : isAnswered
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-950 text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-slate-800 space-y-2 text-[11px] text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-emerald-600" />
                  <span>Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-amber-500" />
                  <span>Marked for Review</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-slate-950 border border-slate-700" />
                  <span>Unanswered</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* 4. RESULTS & EXPLANATIONS MODE */}
      {testMode === 'results' && finalResult && activeTest && (
        <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
          
          {/* Result Scorecard Banner */}
          <div className={`p-8 rounded-3xl border shadow-2xl text-center space-y-6 ${
            finalResult.passed
              ? 'bg-gradient-to-tr from-emerald-950 via-slate-900 to-slate-950 border-emerald-500/40 text-emerald-100'
              : 'bg-gradient-to-tr from-rose-950 via-slate-900 to-slate-950 border-rose-500/40 text-rose-100'
          }`}>
            <div className="w-16 h-16 mx-auto rounded-full bg-white/10 flex items-center justify-center">
              {finalResult.passed ? <Award className="w-8 h-8 text-emerald-400" /> : <AlertCircle className="w-8 h-8 text-rose-400" />}
            </div>

            <div className="space-y-1">
              <h2 className="text-3xl font-extrabold font-display">
                {finalResult.passed ? 'Mock Test Passed! 🎉' : 'Needs Practice'}
              </h2>
              <p className="text-xs opacity-90">{finalResult.testTitle}</p>
            </div>

            {/* Metrics Breakdown */}
            <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto p-4 rounded-2xl bg-black/40 border border-white/10 text-center">
              <div>
                <span className="text-xs opacity-70 block">Score</span>
                <span className="text-xl font-bold font-mono">{finalResult.score} / {finalResult.totalScore}</span>
              </div>
              <div>
                <span className="text-xs opacity-70 block">Accuracy</span>
                <span className="text-xl font-bold font-mono">{finalResult.accuracy}%</span>
              </div>
              <div>
                <span className="text-xs opacity-70 block">Time Spent</span>
                <span className="text-xl font-bold font-mono">{formatTime(finalResult.timeSpentSeconds)}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={handleDownloadScorecard}
                className="px-6 py-2.5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" /> Download Official Scorecard PDF / Report
              </button>
              <button
                onClick={() => setTestMode('catalog')}
                className="px-6 py-2.5 rounded-xl font-bold text-xs bg-white/10 hover:bg-white/20 transition-colors"
              >
                Back to Test Series
              </button>
            </div>
          </div>

          {/* Detailed Question Explanations */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">Detailed Solutions & Explanations</h3>

            {activeTest.questions.map((q, idx) => {
              const userAns = finalResult.answers[q.id];
              const isCorrect = userAns === q.correctIndex;

              return (
                <div
                  key={q.id}
                  className={`p-6 rounded-2xl border space-y-3 ${
                    isCorrect
                      ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-100'
                      : 'bg-rose-950/20 border-rose-500/30 text-rose-100'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <h4 className="font-bold text-xs sm:text-sm">
                      Q{idx + 1}. {q.question}
                    </h4>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded ${
                      isCorrect ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                    }`}>
                      {isCorrect ? 'Correct (+1)' : 'Incorrect (0)'}
                    </span>
                  </div>

                  <div className="text-xs space-y-1">
                    <p className="text-slate-300 font-medium">Your Choice: {userAns !== undefined ? `${String.fromCharCode(65 + userAns)}. ${q.options[userAns]}` : 'Unanswered'}</p>
                    <p className="text-emerald-400 font-bold">Correct Option: {String.fromCharCode(65 + q.correctIndex)}. {q.options[q.correctIndex]}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-black/40 text-xs text-slate-300 leading-relaxed border border-white/5">
                    <span className="font-bold block text-blue-400 mb-1">Explanation:</span>
                    {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

    </div>
  );
};

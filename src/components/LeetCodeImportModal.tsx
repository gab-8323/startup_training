import React, { useState } from 'react';
import { CodingProblem } from '../types';
import {
  fetchLeetCodeProblem,
  fetchDailyLeetCodeProblem,
  POPULAR_LEETCODE_SLUGS,
  convertRawLeetCodeToCodingProblem,
} from '../lib/leetcode';
import {
  Sparkles,
  Search,
  Code2,
  CheckCircle2,
  X,
  FileJson,
  Calendar,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

interface LeetCodeImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProblemImported: (problem: CodingProblem) => void;
  darkMode: boolean;
  onShowToast?: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
}

export const LeetCodeImportModal: React.FC<LeetCodeImportModalProps> = ({
  isOpen,
  onClose,
  onProblemImported,
  darkMode,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<'leetcode' | 'json'>('leetcode');
  const [slugInput, setSlugInput] = useState('');
  const [jsonInput, setJsonInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [previewProblem, setPreviewProblem] = useState<CodingProblem | null>(null);
  const [copiedJson, setCopiedJson] = useState(false);

  if (!isOpen) return null;

  const handleFetchLeetCode = async (slugToFetch?: string) => {
    const targetSlug = slugToFetch || slugInput;
    if (!targetSlug || !targetSlug.trim()) {
      setErrorMessage('Please enter a LeetCode problem number (e.g. "141"), title or URL slug (e.g. "two-sum").');
      return;
    }

    setLoading(true);
    setErrorMessage(null);
    setPreviewProblem(null);

    try {
      const problem = await fetchLeetCodeProblem(targetSlug);
      setPreviewProblem(problem);
      if (onShowToast) {
        onShowToast('LeetCode Problem Fetched!', `Loaded "${problem.title}" successfully.`, 'success');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to fetch LeetCode problem.');
    } finally {
      setLoading(false);
    }
  };

  const handleFetchDaily = async () => {
    setLoading(true);
    setErrorMessage(null);
    setPreviewProblem(null);

    try {
      const daily = await fetchDailyLeetCodeProblem();
      setSlugInput(daily.slug);
      const problem = await fetchLeetCodeProblem(daily.slug);
      setPreviewProblem(problem);
      if (onShowToast) {
        onShowToast('Daily Challenge Loaded!', `Fetched today's problem: "${problem.title}".`, 'success');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to fetch daily challenge.');
    } finally {
      setLoading(false);
    }
  };

  const handleImportJson = () => {
    if (!jsonInput.trim()) {
      setErrorMessage('Please paste a valid JSON object representing a problem.');
      return;
    }

    try {
      const parsed = JSON.parse(jsonInput);
      const problem = convertRawLeetCodeToCodingProblem(parsed);
      setPreviewProblem(problem);
      setErrorMessage(null);
      if (onShowToast) {
        onShowToast('JSON Problem Parsed!', `Successfully parsed "${problem.title}".`, 'success');
      }
    } catch (err: any) {
      setErrorMessage('Invalid JSON syntax. Please check formatting.');
    }
  };

  const handleConfirmImport = () => {
    if (previewProblem) {
      onProblemImported(previewProblem);
      if (onShowToast) {
        onShowToast('Problem Added! 🚀', `"${previewProblem.title}" is now ready in practice IDE!`, 'success');
      }
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div
        className={`w-full max-w-2xl rounded-2xl border shadow-2xl overflow-hidden flex flex-col max-h-[90vh] ${
          darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg font-display">
                Import Problem via LeetCode & JSON
              </h3>
              <p className="text-xs text-slate-400">
                Import clean questions individually by problem number, title slug, or JSON
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 px-5 pt-3 gap-3 text-xs font-semibold bg-slate-950/30">
          <button
            onClick={() => {
              setActiveTab('leetcode');
              setErrorMessage(null);
            }}
            className={`pb-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'leetcode'
                ? 'border-amber-500 text-amber-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-4 h-4" /> LeetCode Number / Slug / URL
          </button>

          <button
            onClick={() => {
              setActiveTab('json');
              setErrorMessage(null);
            }}
            className={`pb-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'json'
                ? 'border-amber-500 text-amber-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileJson className="w-4 h-4" /> JSON Code / Paste
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1 text-xs">
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-start gap-2 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {activeTab === 'leetcode' && (
            <div className="space-y-4">
              {/* Input Form */}
              <div className="space-y-2">
                <label className="font-bold text-slate-300">Enter Problem Number (e.g. 141, 1, 704), Title or URL Slug:</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={slugInput}
                      onChange={(e) => setSlugInput(e.target.value)}
                      placeholder="e.g. 141, 1, two-sum, 3sum, or linked-list-cycle"
                      onKeyDown={(e) => e.key === 'Enter' && handleFetchLeetCode()}
                      className={`w-full pl-9 pr-3 py-2.5 rounded-xl border font-mono text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                        darkMode
                          ? 'bg-slate-950 border-slate-800 text-slate-200'
                          : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>
                  <button
                    onClick={() => handleFetchLeetCode()}
                    disabled={loading}
                    className="px-4 py-2.5 rounded-xl font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 flex items-center gap-1.5 transition-all disabled:opacity-50 shrink-0"
                  >
                    {loading ? (
                      <span className="animate-spin">⏳</span>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" /> Fetch
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Action Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <button
                  onClick={handleFetchDaily}
                  disabled={loading}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 text-xs transition-colors font-semibold"
                >
                  <Calendar className="w-3.5 h-3.5" /> Fetch Today's Daily Challenge
                </button>
                <a
                  href="https://leetcode.com/problemset/all/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-amber-400 hover:underline flex items-center gap-1"
                >
                  Browse LeetCode <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Popular Slugs Quick Pick */}
              <div className="space-y-2 pt-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Popular Quick Picks:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {POPULAR_LEETCODE_SLUGS.map((item) => (
                    <button
                      key={item.slug}
                      onClick={() => {
                        setSlugInput(item.slug);
                        handleFetchLeetCode(item.slug);
                      }}
                      className={`px-2.5 py-1 rounded-lg border text-[11px] font-medium transition-all ${
                        darkMode
                          ? 'bg-slate-950 border-slate-800 text-slate-300 hover:border-amber-500/50 hover:text-amber-400'
                          : 'bg-slate-100 border-slate-200 text-slate-700 hover:border-amber-500 hover:text-amber-600'
                      }`}
                    >
                      {item.name} <span className="opacity-50">({item.difficulty})</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'json' && (
            <div className="space-y-3">
              <label className="font-bold text-slate-300">Paste Problem JSON:</label>
              <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder='{\n  "title": "Custom Two Sum",\n  "category": "Arrays",\n  "difficulty": "Easy",\n  "problemStatement": "Given an array of integers..."\n}'
                rows={7}
                className={`w-full p-3 rounded-xl border font-mono text-[11px] focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                  darkMode
                    ? 'bg-slate-950 border-slate-800 text-slate-200'
                    : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
              <button
                onClick={handleImportJson}
                className="px-4 py-2 rounded-xl font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 flex items-center gap-1.5 transition-all text-xs"
              >
                <FileJson className="w-4 h-4" /> Parse JSON
              </button>
            </div>
          )}

          {/* Preview Section */}
          {previewProblem && (
            <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/40 space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded bg-amber-500/20 text-amber-400 font-bold text-[10px]">PREVIEW</span>
                  <h4 className="font-bold text-sm text-white">{previewProblem.title}</h4>
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    previewProblem.difficulty === 'Easy'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : previewProblem.difficulty === 'Medium'
                      ? 'bg-amber-500/20 text-amber-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}
                >
                  {previewProblem.difficulty}
                </span>
              </div>

              <p className="text-slate-300 line-clamp-3 text-xs leading-relaxed font-sans">
                {previewProblem.problemStatement.replace(/<[^>]*>?/gm, '')}
              </p>

              <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                <span>Category: {previewProblem.category}</span>
                <span>•</span>
                <span>Starters: Python, Java, C++, JS</span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl font-medium text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          {previewProblem && (
            <button
              onClick={handleConfirmImport}
              className="px-5 py-2.5 rounded-xl font-bold bg-emerald-500 hover:bg-emerald-600 text-slate-950 flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all text-xs"
            >
              <CheckCircle2 className="w-4 h-4" /> Load Problem Into IDE
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

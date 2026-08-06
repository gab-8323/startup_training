import React, { useState, useEffect } from 'react';
import { ViewState, CodingProblem, MockTest, ResourceItem } from '../types';
import { CODING_PROBLEMS_DATA } from '../data/codingProblemsData';
import { MOCK_TESTS_DATA } from '../data/mockTestsData';
import { RESOURCES_DATA } from '../data/resourcesData';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, onSnapshot, query, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { LeetCodeImportModal } from '../components/LeetCodeImportModal';
import { fetchLeetCodeProblem } from '../lib/leetcode';
import { 
  ShieldCheck, 
  Plus, 
  Code2, 
  CheckCircle2, 
  Database, 
  FileText, 
  Trash2, 
  Sparkles, 
  HardDrive, 
  Download, 
  Clock, 
  Tag, 
  BarChart3,
  Layers,
  Settings,
  HelpCircle,
  ExternalLink,
  Users,
  Award,
  Check,
  XCircle,
  Lock,
  Unlock,
  KeyRound,
  ShieldAlert,
  Eye,
  EyeOff
} from 'lucide-react';

interface StudentResultRecord {
  id: string;
  candidateName: string;
  testTitle: string;
  category: string;
  score: number;
  totalScore: number;
  accuracy: number;
  passed: boolean;
  timeSpentSeconds: number;
  submittedAt: string;
}

interface AdminViewProps {
  onNavigate: (view: ViewState) => void;
  onShowToast: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
  darkMode: boolean;
}

export const AdminView: React.FC<AdminViewProps> = ({
  onNavigate,
  onShowToast,
  darkMode,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'coding' | 'tests' | 'results' | 'resources' | 'security'>('overview');

  // Admin Security & Passcode Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('c2c_admin_auth') === 'true';
  });
  const [masterPasscode, setMasterPasscode] = useState<string>(() => {
    return localStorage.getItem('c2c_admin_passcode') || 'admin123';
  });
  const [passcodeInput, setPasscodeInput] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [passcodeError, setPasscodeError] = useState(false);

  // New Passcode settings state
  const [newPasscode, setNewPasscode] = useState('');
  const [confirmPasscode, setConfirmPasscode] = useState('');

  // Synchronize Master Admin Passcode from Firestore across all devices
  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, 'admin_config', 'security'),
      (docSnap) => {
        if (docSnap.exists() && docSnap.data()?.passcode) {
          const remotePasscode = String(docSnap.data().passcode);
          setMasterPasscode(remotePasscode);
          localStorage.setItem('c2c_admin_passcode', remotePasscode);
        }
      },
      (error) => {
        console.warn('Firestore admin_config sync fallback to local storage:', error);
      }
    );
    return () => unsub();
  }, []);

  const handleAuthenticate = async (e: React.FormEvent) => {
    e.preventDefault();
    const entered = passcodeInput.trim();
    if (entered === masterPasscode) {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem('c2c_admin_auth', 'true');
      setPasscodeError(false);
      setPasscodeInput('');
      onShowToast('Admin Panel Unlocked 🔓', 'Welcome to the Super Admin Control Portal.', 'success');
    } else {
      setPasscodeError(true);
      onShowToast('Access Denied 🔒', 'Incorrect Admin Security Passcode.', 'error');
    }
  };

  const handleLockAdmin = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem('c2c_admin_auth');
    onShowToast('Admin Panel Locked 🔒', 'Admin session has been ended securely.', 'info');
  };

  const handleChangePasscode = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPass = newPasscode.trim();
    if (!cleanPass || cleanPass.length < 4) {
      onShowToast('Invalid Passcode', 'Passcode must be at least 4 characters long.', 'error');
      return;
    }
    if (cleanPass !== confirmPasscode.trim()) {
      onShowToast('Passcode Mismatch', 'New passcode and confirmation do not match.', 'error');
      return;
    }

    try {
      // Save globally in Firestore so all devices receive the new passcode
      await setDoc(
        doc(db, 'admin_config', 'security'),
        { passcode: cleanPass, updatedAt: new Date().toISOString() },
        { merge: true }
      );
      setMasterPasscode(cleanPass);
      localStorage.setItem('c2c_admin_passcode', cleanPass);
      setNewPasscode('');
      setConfirmPasscode('');
      onShowToast('Security Passcode Updated 🔑', 'Your admin passcode has been saved globally for all devices!', 'success');
    } catch (err: any) {
      console.error('Failed updating passcode in Firestore:', err);
      // Fallback local update
      setMasterPasscode(cleanPass);
      localStorage.setItem('c2c_admin_passcode', cleanPass);
      setNewPasscode('');
      setConfirmPasscode('');
      onShowToast('Updated Locally 🔑', 'Passcode saved on this device.', 'success');
    }
  };

  // Firestore Realtime Student Results & Coding Problems
  const [studentResults, setStudentResults] = useState<StudentResultRecord[]>([]);

  useEffect(() => {
    try {
      const qResults = query(collection(db, 'test_results'));
      const unsubResults = onSnapshot(qResults, (snapshot) => {
        const results: StudentResultRecord[] = [];
        snapshot.forEach((docSnap) => {
          results.push({ id: docSnap.id, ...docSnap.data() } as StudentResultRecord);
        });
        setStudentResults(results);
      }, (err) => {
        console.log('Firestore test_results listener notice:', err);
      });

      const qProblems = query(collection(db, 'coding_problems'));
      const unsubProblems = onSnapshot(qProblems, (snapshot) => {
        const customProbs: CodingProblem[] = [];
        snapshot.forEach((docSnap) => {
          customProbs.push({ id: docSnap.id, ...docSnap.data() } as CodingProblem);
        });
        const staticIds = new Set(CODING_PROBLEMS_DATA.map((p) => p.id));
        const filteredCustom = customProbs.filter((p) => !staticIds.has(p.id));
        setProblemsList([...filteredCustom, ...CODING_PROBLEMS_DATA]);
      }, (err) => {
        console.log('Firestore coding_problems listener notice:', err);
      });

      return () => {
        unsubResults();
        unsubProblems();
      };
    } catch (e) {
      console.log('Firestore snapshot error:', e);
    }
  }, []);

  // Local state copies for dynamic admin additions
  const [problemsList, setProblemsList] = useState<CodingProblem[]>(CODING_PROBLEMS_DATA);
  const [mockTestsList, setMockTestsList] = useState<MockTest[]>(MOCK_TESTS_DATA);
  const [resourcesList, setResourcesList] = useState<ResourceItem[]>(RESOURCES_DATA);

  // LeetCode Import state
  const [isLeetCodeModalOpen, setIsLeetCodeModalOpen] = useState(false);
  const [quickSlugInput, setQuickSlugInput] = useState('');
  const [fetchingLeetCode, setFetchingLeetCode] = useState(false);

  const handleQuickFetchLeetCode = async () => {
    if (!quickSlugInput.trim()) {
      onShowToast('Slug Required', 'Enter a LeetCode problem slug (e.g. "two-sum").', 'error');
      return;
    }
    setFetchingLeetCode(true);
    try {
      const prob = await fetchLeetCodeProblem(quickSlugInput);
      setNewProblem({
        title: prob.title,
        category: prob.category || 'Arrays',
        difficulty: (prob.difficulty as any) || 'Easy',
        companyTags: prob.companyTags.join(', '),
        problemStatement: prob.problemStatement,
        constraints: prob.constraints.join('\n') || 'See problem description',
        inputSample: prob.sampleCases[0]?.input || '[1, 2, 3]',
        outputSample: prob.sampleCases[0]?.output || '[3, 2, 1]',
        pythonStarter: prob.snippets.find(s => s.language === 'python')?.code || 'def solve():\n    pass',
      });
      onShowToast('LeetCode Problem Loaded! ⚡', `Auto-filled form with "${prob.title}".`, 'success');
    } catch (err: any) {
      onShowToast('Fetch Failed', err.message || 'Could not fetch LeetCode problem.', 'error');
    } finally {
      setFetchingLeetCode(false);
    }
  };

  // New Coding Problem Form state
  const [newProblem, setNewProblem] = useState({
    title: '',
    category: 'Arrays',
    difficulty: 'Easy' as 'Easy' | 'Medium' | 'Hard',
    companyTags: 'TCS, Infosys',
    problemStatement: '',
    constraints: '1 <= N <= 10^5',
    inputSample: '[1, 2, 3]',
    outputSample: '[3, 2, 1]',
    pythonStarter: 'def solve(nums):\n    # Write your solution here\n    pass',
  });

  // New Resource Form state
  const [newResource, setNewResource] = useState({
    title: '',
    category: 'Resume Templates' as ResourceItem['category'],
    subject: 'B.Tech / Computer Science',
    fileSize: '2.5 MB',
    fileType: 'DOCX & PDF',
    description: '',
    downloadUrl: '',
    tags: 'ATS, Single Column',
  });

  // New Mock Test Form State
  const [newTest, setNewTest] = useState({
    title: '',
    category: 'Coding' as MockTest['category'],
    subcategory: 'Data Structures',
    durationMinutes: 30,
    passingScore: 70,
    instructions: 'Select the best option for each question.',
  });

  // Add problem handler
  const handleAddProblem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProblem.title || !newProblem.problemStatement) {
      onShowToast('Missing Fields', 'Please fill in problem title and description.', 'error');
      return;
    }

    const created: CodingProblem = {
      id: `prob-custom-${Date.now()}`,
      title: newProblem.title,
      category: newProblem.category,
      difficulty: newProblem.difficulty,
      companyTags: newProblem.companyTags.split(',').map((s) => s.trim()),
      acceptanceRate: '88%',
      problemStatement: newProblem.problemStatement,
      constraints: [newProblem.constraints],
      sampleCases: [
        {
          input: newProblem.inputSample,
          output: newProblem.outputSample,
        },
      ],
      editorial: 'Custom editorial provided by portal administrator.',
      snippets: [
        { language: 'python', code: newProblem.pythonStarter },
        { language: 'cpp', code: '// C++ solution snippet' },
        { language: 'java', code: '// Java solution snippet' },
        { language: 'javascript', code: '// JS solution snippet' },
      ],
    };

    setProblemsList((prev) => [created, ...prev]);
    CODING_PROBLEMS_DATA.unshift(created);

    try {
      await setDoc(doc(db, 'coding_problems', created.id), created);
      onShowToast('Problem Published! 🚀', `"${created.title}" saved to Firestore & published for all users!`, 'success');
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `coding_problems/${created.id}`);
    }

    setNewProblem({
      title: '',
      category: 'Arrays',
      difficulty: 'Easy',
      companyTags: 'TCS, Infosys',
      problemStatement: '',
      constraints: '1 <= N <= 10^5',
      inputSample: '[1, 2, 3]',
      outputSample: '[3, 2, 1]',
      pythonStarter: 'def solve(nums):\n    # Write your solution here\n    pass',
    });
  };

  const handleAddProblemFromLeetCode = async (prob: CodingProblem) => {
    setProblemsList((prev) => [prob, ...prev]);
    CODING_PROBLEMS_DATA.unshift(prob);

    try {
      await setDoc(doc(db, 'coding_problems', prob.id), prob);
      onShowToast('LeetCode Problem Published! 🚀', `"${prob.title}" saved to Firestore & published for all users!`, 'success');
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `coding_problems/${prob.id}`);
    }
  };

  // Delete problem handler
  const handleDeleteProblem = async (id: string) => {
    setProblemsList((prev) => prev.filter((p) => p.id !== id));
    try {
      await deleteDoc(doc(db, 'coding_problems', id));
      onShowToast('Problem Deleted', 'Removed problem from repository & Firestore.', 'info');
    } catch (err) {
      console.error('Failed to delete problem from Firestore:', err);
    }
  };

  // Purge all stale placeholder problems (e.g. "LeetCode Problem 30")
  const handlePurgeStaleProblems = async () => {
    const staleProblems = problemsList.filter((p) => /LeetCode Problem \d+/i.test(p.title) || p.title.toLowerCase().includes('leetcode problem'));
    
    setProblemsList((prev) => prev.filter((p) => !/LeetCode Problem \d+/i.test(p.title) && !p.title.toLowerCase().includes('leetcode problem')));

    let deletedCount = 0;
    for (const prob of staleProblems) {
      try {
        await deleteDoc(doc(db, 'coding_problems', prob.id));
        deletedCount++;
      } catch (err) {
        // ignore
      }
    }
    onShowToast('Database Cleaned! 🧹', `Purged ${deletedCount} stale placeholder problems. Clean catalog active.`, 'success');
  };

  // Add resource handler
  const handleAddResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newResource.title || !newResource.description) {
      onShowToast('Missing Fields', 'Please fill in resource title and description.', 'error');
      return;
    }

    const created: ResourceItem = {
      id: `res-custom-${Date.now()}`,
      title: newResource.title,
      category: newResource.category,
      subject: newResource.subject,
      fileSize: newResource.fileSize,
      fileType: newResource.fileType,
      downloadsCount: 1,
      description: newResource.description,
      downloadUrl: newResource.downloadUrl,
      tags: newResource.tags.split(',').map((t) => t.trim()),
      rating: 4.9,
    };

    setResourcesList([created, ...resourcesList]);
    RESOURCES_DATA.unshift(created);
    onShowToast('Resource Added! 📄', `"${created.title}" published to downloads portal.`, 'success');
    setNewResource({
      title: '',
      category: 'Resume Templates',
      subject: 'B.Tech / Computer Science',
      fileSize: '2.5 MB',
      fileType: 'DOCX & PDF',
      description: '',
      downloadUrl: '',
      tags: 'ATS, Single Column',
    });
  };

  if (!isAdminAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 animate-fadeIn">
        <div className={`p-8 rounded-3xl border shadow-2xl text-center space-y-6 ${
          darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}>
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-rose-500 to-indigo-600 flex items-center justify-center text-white shadow-xl shadow-indigo-500/20">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/20">
              Restricted Area
            </span>
            <h2 className="text-2xl font-extrabold font-display">Admin Security Gate</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Enter the Super Admin master passcode to unlock management controls for coding problems, test series, and student data.
            </p>
          </div>

          <form onSubmit={handleAuthenticate} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                Master Passcode
              </label>
              <div className="relative">
                <input
                  type={showPasscode ? 'text' : 'password'}
                  required
                  value={passcodeInput}
                  onChange={(e) => {
                    setPasscodeInput(e.target.value);
                    setPasscodeError(false);
                  }}
                  placeholder="Enter passcode..."
                  className={`w-full px-4 py-3 pr-10 rounded-xl text-sm border font-mono focus:outline-none transition-all ${
                    passcodeError
                      ? 'border-rose-500 bg-rose-500/10 text-rose-500'
                      : darkMode
                      ? 'bg-slate-950 border-slate-800 text-white focus:border-indigo-500'
                      : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-indigo-600'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPasscode(!showPasscode)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {passcodeError && (
                <p className="text-[11px] text-rose-500 mt-1.5 font-medium flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5" /> Incorrect Admin Security Passcode.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2"
            >
              <KeyRound className="w-4 h-4" /> Unlock Admin Panel
            </button>
          </form>

          <div className="pt-2">
            <button
              onClick={() => onNavigate('home')}
              className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-medium transition-colors"
            >
              ← Back to Student Learning Portal
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fadeIn">
      
      {/* Top Admin Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-indigo-500/30">
        <div className="space-y-2 max-w-2xl relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Admin Control Panel
            </span>
            <span className="text-xs text-slate-400 font-mono">Role: Super Admin</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display">
            Portal Content & Database Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Manage coding practice problems, add test series, upload resume templates/projects, and configure your persistent database.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0 relative z-10">
          <button
            onClick={() => onNavigate('coding')}
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all flex items-center gap-1.5"
          >
            <Code2 className="w-4 h-4 text-emerald-400" /> View Live Problems
          </button>
          <button
            onClick={handleLockAdmin}
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-rose-600/80 hover:bg-rose-600 text-white shadow-lg transition-all flex items-center gap-1.5 border border-rose-500/40"
          >
            <Lock className="w-4 h-4 text-rose-200" /> Lock Admin Session
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800">
        {[
          { id: 'overview', label: 'Dashboard Overview', icon: BarChart3 },
          { id: 'coding', label: 'Manage Coding Problems', icon: Code2 },
          { id: 'tests', label: 'Manage Mock Tests', icon: Layers },
          { id: 'results', label: 'Student Test Results', icon: Users },
          { id: 'resources', label: 'Templates & Resources', icon: FileText },
          { id: 'security', label: 'Security Passcode Settings', icon: KeyRound },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : darkMode
                  ? 'text-slate-400 hover:text-white hover:bg-slate-900'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-4 h-4" /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">Total Coding Problems</span>
                <Code2 className="w-5 h-5 text-emerald-500" />
              </div>
              <p className="text-2xl font-extrabold font-display mt-2 text-slate-900 dark:text-white">{problemsList.length}</p>
              <p className="text-[11px] text-emerald-500 mt-1 font-medium">Easy, Medium & Hard Arrays/Trees</p>
            </div>

            <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">Active Test Series</span>
                <Layers className="w-5 h-5 text-indigo-500" />
              </div>
              <p className="text-2xl font-extrabold font-display mt-2 text-slate-900 dark:text-white">{mockTestsList.length}</p>
              <p className="text-[11px] text-indigo-500 mt-1 font-medium">Coding & Aptitude Test Modules</p>
            </div>

            <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">Downloadable Resources</span>
                <FileText className="w-5 h-5 text-purple-500" />
              </div>
              <p className="text-2xl font-extrabold font-display mt-2 text-slate-900 dark:text-white">{resourcesList.length}</p>
              <p className="text-[11px] text-purple-500 mt-1 font-medium">Resumes, Notes & Projects</p>
            </div>

            <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">Database Cost Tier</span>
                <Database className="w-5 h-5 text-amber-500" />
              </div>
              <p className="text-2xl font-extrabold font-display mt-2 text-emerald-600 dark:text-emerald-400">$0 / Free Tier</p>
              <p className="text-[11px] text-slate-400 mt-1">1 GB Firestore + Free Piston Execution</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className={`p-6 rounded-3xl border space-y-4 ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Admin Operations & Workflow</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div 
                onClick={() => setActiveTab('coding')} 
                className={`p-4 rounded-2xl border cursor-pointer hover:border-emerald-500 transition-all ${
                  darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <Code2 className="w-6 h-6 text-emerald-500 mb-2" />
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Add New Coding Problem</h4>
                <p className="text-xs text-slate-500 mt-1">Define test cases, constraints, company tags, and sample snippets.</p>
              </div>

              <div 
                onClick={() => setActiveTab('tests')} 
                className={`p-4 rounded-2xl border cursor-pointer hover:border-indigo-500 transition-all ${
                  darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <Layers className="w-6 h-6 text-indigo-500 mb-2" />
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Create Mock Test Series</h4>
                <p className="text-xs text-slate-500 mt-1">Setup timed quizzes for TCS, Infosys, and Aptitude rounds.</p>
              </div>

              <div 
                onClick={() => setActiveTab('resources')} 
                className={`p-4 rounded-2xl border cursor-pointer hover:border-purple-500 transition-all ${
                  darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <FileText className="w-6 h-6 text-purple-500 mb-2" />
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Upload Templates & Notes</h4>
                <p className="text-xs text-slate-500 mt-1">Add ATS Word resumes and final year MERN/Python capstone projects.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MANAGE CODING PROBLEMS */}
      {activeTab === 'coding' && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* Add Problem Form */}
          <form onSubmit={handleAddProblem} className={`p-6 rounded-3xl border space-y-6 ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="flex items-center justify-between border-b pb-4 border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-emerald-500" /> Add New Coding Practice Problem
              </h3>
              <span className="text-xs text-emerald-600 font-semibold bg-emerald-500/10 px-3 py-1 rounded-full">
                Live Interactive Playground
              </span>
            </div>

            {/* LeetCode Auto-Fetch Bar */}
            <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-amber-500/10 border-amber-500/30 text-amber-200' : 'bg-amber-50 border-amber-200 text-amber-900'}`}>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <span className="font-bold text-xs sm:text-sm">⚡ Auto-Import from LeetCode</span>
                    <p className="text-[11px] opacity-80">Enter a slug or URL to auto-fill title, problem description, constraints, and snippets!</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <input
                    type="text"
                    value={quickSlugInput}
                    onChange={(e) => setQuickSlugInput(e.target.value)}
                    placeholder="e.g. two-sum, 3sum"
                    className={`px-3 py-1.5 rounded-xl border font-mono text-xs focus:outline-none w-full sm:w-48 ${
                      darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={handleQuickFetchLeetCode}
                    disabled={fetchingLeetCode}
                    className="px-3.5 py-1.5 rounded-xl font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs transition-all shrink-0 flex items-center gap-1"
                  >
                    {fetchingLeetCode ? 'Fetching...' : 'Fetch'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsLeetCodeModalOpen(true)}
                    className="px-3 py-1.5 rounded-xl font-bold bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/30 text-xs transition-all shrink-0 flex items-center gap-1"
                  >
                    Modal / Parts Importer
                  </button>
                  <button
                    type="button"
                    onClick={handlePurgeStaleProblems}
                    className="px-3 py-1.5 rounded-xl font-bold bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30 text-xs transition-all shrink-0"
                    title="Delete any legacy placeholder LeetCode Problem X entries"
                  >
                    Purge Stale
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Problem Title</label>
                <input
                  type="text"
                  required
                  value={newProblem.title}
                  onChange={(e) => setNewProblem({ ...newProblem, title: e.target.value })}
                  placeholder="e.g. Longest Substring Without Repeating Characters"
                  className={`w-full mt-1 px-3 py-2 rounded-xl text-xs border focus:outline-none ${
                    darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Category</label>
                <select
                  value={newProblem.category}
                  onChange={(e) => setNewProblem({ ...newProblem, category: e.target.value })}
                  className={`w-full mt-1 px-3 py-2 rounded-xl text-xs border focus:outline-none ${
                    darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                >
                  <option value="Arrays">Arrays</option>
                  <option value="Strings">Strings</option>
                  <option value="Linked Lists">Linked Lists</option>
                  <option value="Trees">Trees</option>
                  <option value="Dynamic Programming">Dynamic Programming</option>
                  <option value="Graphs">Graphs</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Difficulty</label>
                <select
                  value={newProblem.difficulty}
                  onChange={(e) => setNewProblem({ ...newProblem, difficulty: e.target.value as any })}
                  className={`w-full mt-1 px-3 py-2 rounded-xl text-xs border focus:outline-none ${
                    darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Company Tags (Comma separated)</label>
              <input
                type="text"
                value={newProblem.companyTags}
                onChange={(e) => setNewProblem({ ...newProblem, companyTags: e.target.value })}
                placeholder="TCS, Infosys, Accenture, Amazon"
                className={`w-full mt-1 px-3 py-2 rounded-xl text-xs border focus:outline-none ${
                  darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Problem Description</label>
              <textarea
                required
                rows={3}
                value={newProblem.problemStatement}
                onChange={(e) => setNewProblem({ ...newProblem, problemStatement: e.target.value })}
                placeholder="Given an array of integers nums and an integer target..."
                className={`w-full mt-1 px-3 py-2 rounded-xl text-xs border focus:outline-none font-sans ${
                  darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Sample Input</label>
                <input
                  type="text"
                  value={newProblem.inputSample}
                  onChange={(e) => setNewProblem({ ...newProblem, inputSample: e.target.value })}
                  placeholder="nums = [2,7,11,15], target = 9"
                  className={`w-full mt-1 px-3 py-2 rounded-xl text-xs font-mono border focus:outline-none ${
                    darkMode ? 'bg-slate-950 border-slate-800 text-emerald-400' : 'bg-slate-50 border-slate-300 text-emerald-700'
                  }`}
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Sample Output</label>
                <input
                  type="text"
                  value={newProblem.outputSample}
                  onChange={(e) => setNewProblem({ ...newProblem, outputSample: e.target.value })}
                  placeholder="[0, 1]"
                  className={`w-full mt-1 px-3 py-2 rounded-xl text-xs font-mono border focus:outline-none ${
                    darkMode ? 'bg-slate-950 border-slate-800 text-emerald-400' : 'bg-slate-50 border-slate-300 text-emerald-700'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Python Starter Code Template</label>
              <textarea
                rows={3}
                value={newProblem.pythonStarter}
                onChange={(e) => setNewProblem({ ...newProblem, pythonStarter: e.target.value })}
                className={`w-full mt-1 px-3 py-2 rounded-xl text-xs font-mono border focus:outline-none ${
                  darkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-600/20 transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Publish Problem
            </button>
          </form>

          {/* Existing Problems List */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Existing Problems in Repository</h3>
            {problemsList.map((prob) => (
              <div
                key={prob.id}
                className={`p-4 rounded-2xl border flex items-center justify-between gap-4 ${
                  darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-500">
                      {prob.difficulty}
                    </span>
                    <span className="text-xs font-bold text-slate-900 dark:text-white">{prob.title}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{prob.category} • Companies: {prob.companyTags.join(', ')}</p>
                </div>

                <button
                  onClick={() => handleDeleteProblem(prob.id)}
                  className="p-2 rounded-xl text-rose-500 hover:bg-rose-500/10 transition-colors"
                  title="Delete Problem"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* TAB 3: MANAGE MOCK TESTS */}
      {activeTab === 'tests' && (
        <div className="space-y-8 animate-fadeIn">
          <div className={`p-6 rounded-3xl border space-y-4 ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Mock Test Series Manager</h3>
            <p className="text-xs text-slate-500">
              Create and organize timed online assessment tests for TCS NQT, Wipro, Infosys, and Aptitude practice.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {mockTestsList.map((test) => (
                <div
                  key={test.id}
                  className={`p-5 rounded-2xl border space-y-3 ${
                    darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                      {test.category}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-400">
                      <Clock className="w-3.5 h-3.5 inline mr-1" /> {test.durationMinutes} mins
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{test.title}</h4>
                  <p className="text-xs text-slate-500">{test.totalQuestions} Questions • Passing Score: {test.passingScore}%</p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800 text-xs">
                    <span className="text-emerald-500 font-bold">Difficulty: {test.difficulty}</span>
                    <button
                      onClick={() => onNavigate('mock-test-runner')}
                      className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
                    >
                      Test Drive Runner →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB: STUDENT TEST RESULTS (FIRESTORE REALTIME) */}
      {activeTab === 'results' && (
        <div className="space-y-6 animate-fadeIn">
          <div className={`p-6 rounded-3xl border space-y-4 ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-4 border-slate-200 dark:border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-indigo-500" /> Real-time Student Assessment Attempts
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Live scores, pass/fail evaluations, accuracy %, and test timings captured from Firestore database.
                </p>
              </div>

              <button
                onClick={() => {
                  if (studentResults.length === 0) {
                    onShowToast('No Results Yet', 'No student test attempts recorded yet.', 'info');
                    return;
                  }
                  const csvHeader = 'Candidate,Test Title,Category,Score,Total,Accuracy %,Result,Date\n';
                  const csvRows = studentResults.map(r => 
                    `"${r.candidateName}","${r.testTitle}","${r.category}",${r.score},${r.totalScore},${r.accuracy}%,"${r.passed ? 'PASSED' : 'FAILED'}","${r.submittedAt || ''}"`
                  ).join('\n');
                  const blob = new Blob([csvHeader + csvRows], { type: 'text/csv' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `Student_Test_Results_${Date.now()}.csv`;
                  a.click();
                  URL.revokeObjectURL(url);
                  onShowToast('Export Complete 📊', 'Downloaded student test results CSV.', 'success');
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md flex items-center gap-2"
              >
                <Download className="w-4 h-4" /> Export Results CSV
              </button>
            </div>

            {studentResults.length === 0 ? (
              <div className="py-12 text-center space-y-3">
                <Award className="w-10 h-10 text-slate-400 mx-auto opacity-40" />
                <p className="text-sm font-bold text-slate-600 dark:text-slate-400">No Student Test Attempts Yet</p>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  When students complete coding or aptitude mock tests in the platform, their results will automatically sync here in real time.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className={`border-b ${darkMode ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500'}`}>
                      <th className="py-3 px-3 font-bold">Candidate</th>
                      <th className="py-3 px-3 font-bold">Assessment Module</th>
                      <th className="py-3 px-3 font-bold">Score</th>
                      <th className="py-3 px-3 font-bold">Accuracy</th>
                      <th className="py-3 px-3 font-bold">Status</th>
                      <th className="py-3 px-3 font-bold">Submitted Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {studentResults.map((r) => (
                      <tr key={r.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors">
                        <td className="py-3 px-3 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-indigo-500/10 text-indigo-500 font-bold flex items-center justify-center text-[10px]">
                            {r.candidateName.charAt(0)}
                          </span>
                          {r.candidateName}
                        </td>
                        <td className="py-3 px-3">
                          <p className="font-semibold text-slate-800 dark:text-slate-200">{r.testTitle}</p>
                          <span className="text-[10px] text-slate-500">{r.category}</span>
                        </td>
                        <td className="py-3 px-3 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                          {r.score} / {r.totalScore}
                        </td>
                        <td className="py-3 px-3 font-mono font-bold">
                          {r.accuracy}%
                        </td>
                        <td className="py-3 px-3">
                          {r.passed ? (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 inline-flex items-center gap-1">
                              <Check className="w-3 h-3" /> PASSED
                            </span>
                          ) : (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-500 border border-rose-500/20 inline-flex items-center gap-1">
                              <XCircle className="w-3 h-3" /> FAILED
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-3 text-slate-400 text-[11px] font-mono">
                          {r.submittedAt ? new Date(r.submittedAt).toLocaleDateString() : 'Just now'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: TEMPLATES & RESOURCES */}
      {activeTab === 'resources' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Add Resource Form */}
          <form onSubmit={handleAddResource} className={`p-6 rounded-3xl border space-y-5 ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-purple-500" /> Upload New Resource or Template
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Resource Title</label>
                <input
                  type="text"
                  required
                  value={newResource.title}
                  onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
                  placeholder="e.g. ATS Professional Single Column Resume Template"
                  className={`w-full mt-1 px-3 py-2 rounded-xl text-xs border focus:outline-none ${
                    darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Category</label>
                <select
                  value={newResource.category}
                  onChange={(e) => setNewResource({ ...newResource, category: e.target.value as any })}
                  className={`w-full mt-1 px-3 py-2 rounded-xl text-xs border focus:outline-none ${
                    darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                >
                  <option value="Resume Templates">Resume Templates</option>
                  <option value="Project Templates">Project Templates</option>
                  <option value="Notes">Notes</option>
                  <option value="Cheat Sheets">Cheat Sheets</option>
                  <option value="Interview Questions">Interview Questions</option>
                  <option value="Placement PDFs">Placement PDFs</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">File Type & Size</label>
                <input
                  type="text"
                  value={newResource.fileType}
                  onChange={(e) => setNewResource({ ...newResource, fileType: e.target.value })}
                  placeholder="DOCX & PDF (1.5 MB)"
                  className={`w-full mt-1 px-3 py-2 rounded-xl text-xs border focus:outline-none ${
                    darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Description</label>
              <textarea
                required
                rows={2}
                value={newResource.description}
                onChange={(e) => setNewResource({ ...newResource, description: e.target.value })}
                placeholder="High scoring ATS resume template for B.Tech freshers..."
                className={`w-full mt-1 px-3 py-2 rounded-xl text-xs border focus:outline-none ${
                  darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 shadow-lg shadow-purple-600/20 transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Downloadable Template
            </button>
          </form>
        </div>
      )}

      {/* TAB 5: ADMIN SECURITY PASSCODE SETTINGS */}
      {activeTab === 'security' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Admin Security Passcode Configuration */}
          <div className={`p-6 sm:p-8 rounded-3xl border space-y-5 ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Admin Security Passcode Settings</h3>
                <p className="text-xs text-slate-500">Change the master security passcode required to unlock the Admin Control Panel globally for all devices.</p>
              </div>
            </div>

            <form onSubmit={handleChangePasscode} className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">New Admin Passcode</label>
                <input
                  type="password"
                  required
                  value={newPasscode}
                  onChange={(e) => setNewPasscode(e.target.value)}
                  placeholder="Enter new passcode..."
                  className={`w-full mt-1 px-3 py-2.5 rounded-xl text-xs border font-mono focus:outline-none ${
                    darkMode ? 'bg-slate-950 border-slate-800 text-white focus:border-indigo-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-indigo-600'
                  }`}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Confirm New Passcode</label>
                <input
                  type="password"
                  required
                  value={confirmPasscode}
                  onChange={(e) => setConfirmPasscode(e.target.value)}
                  placeholder="Re-enter new passcode..."
                  className={`w-full mt-1 px-3 py-2.5 rounded-xl text-xs border font-mono focus:outline-none ${
                    darkMode ? 'bg-slate-950 border-slate-800 text-white focus:border-indigo-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-indigo-600'
                  }`}
                />
              </div>

              <div className="sm:col-span-2 pt-1 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">Current Active Passcode: <strong className="font-mono text-indigo-400">{masterPasscode}</strong></span>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/20 transition-all flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-4 h-4" /> Save Security Passcode
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* LeetCode Import Modal */}
      <LeetCodeImportModal
        isOpen={isLeetCodeModalOpen}
        onClose={() => setIsLeetCodeModalOpen(false)}
        onProblemImported={handleAddProblemFromLeetCode}
        darkMode={darkMode}
        onShowToast={onShowToast}
      />

    </div>
  );
};

import React, { useState } from 'react';
import { ViewState, Course } from '../types';
import { COURSES_DATA } from '../data/coursesData';
import { ScrollReveal, ScrollStaggerContainer, ScrollStaggerItem } from '../components/ScrollReveal';
import { 
  BookOpen, 
  Search, 
  Clock, 
  BarChart, 
  Star, 
  CheckCircle2, 
  X, 
  ChevronRight, 
  Download, 
  Sparkles,
  HelpCircle,
  FileCheck
} from 'lucide-react';

interface CoursesViewProps {
  onNavigate: (view: ViewState) => void;
  selectedCourseId?: string;
  onShowToast: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
  darkMode: boolean;
}

export const CoursesView: React.FC<CoursesViewProps> = ({
  onNavigate,
  selectedCourseId,
  onShowToast,
  darkMode,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalCourse, setActiveModalCourse] = useState<Course | null>(
    selectedCourseId ? COURSES_DATA.find((c) => c.id === selectedCourseId) || null : null
  );
  const [enrollModalOpen, setEnrollModalOpen] = useState<boolean>(false);
  const [enrollForm, setEnrollForm] = useState({ name: '', college: '', email: '', branch: 'B.Tech CS' });

  const categories = ['All', 'Programming', 'Core CS', 'Web Dev', 'Placement', 'Aptitude'];

  const filteredCourses = COURSES_DATA.filter((course) => {
    const matchesCategory = activeCategory === 'All' || course.category === activeCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleEnrollSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enrollForm.name || !enrollForm.email) {
      onShowToast('Missing Fields', 'Please fill in your name and email address.', 'error');
      return;
    }
    setEnrollModalOpen(false);
    onShowToast('Interest Registered!', `Thank you ${enrollForm.name}. We have sent syllabus updates to ${enrollForm.email}.`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">Targeted Skill Training</span>
        <h1 className={`text-3xl sm:text-4xl font-extrabold font-display ${darkMode ? 'text-white' : 'text-slate-900'}`}>
          Placement-Oriented Training Courses
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          Designed specifically for B.Tech, BCA, MCA, and degree students. High quality modules covering Python, C++, DSA, SQL, System Design, Resume Building, and Aptitude.
        </p>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-2 border-b pb-6 border-slate-200 dark:border-slate-800">
        
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : darkMode
                  ? 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search courses..."
            className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs font-medium border focus:outline-none focus:border-blue-500 ${
              darkMode ? 'bg-slate-900 border-slate-800 text-slate-100 placeholder-slate-500' : 'bg-white border-slate-200 text-slate-900'
            }`}
          />
        </div>
      </div>

      {/* Course Cards Grid */}
      <ScrollStaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.08}>
        {filteredCourses.map((course) => (
          <ScrollStaggerItem key={course.id}>
            <div
              onClick={() => setActiveModalCourse(course)}
              className={`rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 cursor-pointer group h-full ${
                darkMode
                  ? 'bg-slate-900/80 border-slate-800 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-black/40'
                  : 'bg-white border-slate-200 hover:border-blue-400 hover:shadow-xl shadow-sm'
              }`}
            >
              <div className="space-y-4">
                
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                    {course.category}
                  </span>
                  {course.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                      {course.badge}
                    </span>
                  )}
                </div>

                <h3 className={`text-lg font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors ${
                  darkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  {course.title}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                  {course.description}
                </p>

                {/* Course Meta Info */}
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-blue-400" /> {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <BarChart className="w-3.5 h-3.5 text-emerald-400" /> {course.level}
                  </span>
                  <span className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" /> {course.rating}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
                <span>View Details & Syllabus</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </ScrollStaggerItem>
        ))}
      </ScrollStaggerContainer>

      {/* Course Details Modal */}
      {activeModalCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className={`w-full max-w-3xl max-h-[90vh] rounded-3xl shadow-2xl border overflow-hidden flex flex-col ${
            darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between bg-blue-50/50 dark:bg-blue-950/20">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-600 text-white">
                    {activeModalCourse.category}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">⏱ {activeModalCourse.duration} • {activeModalCourse.level}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold">{activeModalCourse.title}</h2>
              </div>
              <button
                onClick={() => setActiveModalCourse(null)}
                className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm">
              
              <div>
                <h3 className="font-bold text-sm mb-1 text-blue-600 dark:text-blue-400">Course Overview</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{activeModalCourse.description}</p>
              </div>

              {/* Learning Outcomes */}
              <div>
                <h3 className="font-bold text-sm mb-2 text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-500" /> Learning Outcomes
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeModalCourse.learningOutcomes.map((outcome, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-700 dark:text-slate-300">{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Syllabus Breakdown */}
              <div>
                <h3 className="font-bold text-sm mb-3 text-slate-900 dark:text-white flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-blue-500" /> Detailed Syllabus
                </h3>
                <div className="space-y-3">
                  {activeModalCourse.syllabus.map((mod, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
                      <div className="flex items-center justify-between font-bold text-xs text-blue-600 dark:text-blue-400 mb-2">
                        <span>{mod.title}</span>
                        <span className="text-[11px] text-slate-400">{mod.duration}</span>
                      </div>
                      <ul className="list-disc list-inside space-y-1 text-xs text-slate-600 dark:text-slate-300">
                        {mod.topics.map((t, tIdx) => (
                          <li key={tIdx}>{t}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prerequisites & FAQ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                  <h4 className="font-bold text-xs mb-2 text-slate-900 dark:text-white">Prerequisites</h4>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-500 dark:text-slate-400">
                    {activeModalCourse.prerequisites.map((p, pIdx) => (
                      <li key={pIdx}>{p}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                  <h4 className="font-bold text-xs mb-2 text-slate-900 dark:text-white flex items-center gap-1">
                    <HelpCircle className="w-3.5 h-3.5 text-amber-500" /> FAQ Highlight
                  </h4>
                  {activeModalCourse.faq.slice(0, 1).map((f, fIdx) => (
                    <div key={fIdx} className="text-xs">
                      <p className="font-semibold text-slate-700 dark:text-slate-300">Q: {f.question}</p>
                      <p className="text-slate-500 dark:text-slate-400 mt-1">{f.answer}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/50">
              <button
                onClick={() => {
                  onShowToast('Syllabus Downloaded', `Downloaded PDF syllabus for ${activeModalCourse.title}.`, 'info');
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold border border-slate-300 dark:border-slate-700 flex items-center gap-1.5 hover:bg-slate-200 dark:hover:bg-slate-800"
              >
                <Download className="w-3.5 h-3.5" /> Download Syllabus PDF
              </button>

              <button
                onClick={() => setEnrollModalOpen(true)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-500/20"
              >
                Register Interest
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Enroll / Interest Registration Modal */}
      {enrollModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className={`w-full max-w-md p-6 rounded-3xl border shadow-2xl space-y-4 ${
            darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className="flex items-center justify-between border-b pb-3 border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-base flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-blue-500" /> Register Interest
              </h3>
              <button onClick={() => setEnrollModalOpen(false)} className="text-slate-400 hover:text-slate-200">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleEnrollSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={enrollForm.name}
                  onChange={(e) => setEnrollForm({ ...enrollForm, name: e.target.value })}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">College Email Address</label>
                <input
                  type="email"
                  required
                  value={enrollForm.email}
                  onChange={(e) => setEnrollForm({ ...enrollForm, email: e.target.value })}
                  placeholder="e.g. rahul@college.edu"
                  className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Branch / Degree</label>
                <select
                  value={enrollForm.branch}
                  onChange={(e) => setEnrollForm({ ...enrollForm, branch: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700 focus:outline-none"
                >
                  <option value="B.Tech CS/IT">B.Tech Computer Science / IT</option>
                  <option value="B.Tech ECE/EEE">B.Tech ECE / EEE / Mechanical</option>
                  <option value="BCA">BCA</option>
                  <option value="MCA">MCA</option>
                  <option value="B.Sc Computers">B.Sc Computer Science</option>
                  <option value="Graduate">Recent Graduate</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEnrollModalOpen(false)}
                  className="px-4 py-2 rounded-xl font-semibold border border-slate-300 dark:border-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold bg-blue-600 text-white hover:bg-blue-500 shadow-md"
                >
                  Submit Interest
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

import React, { useState } from 'react';
import { ViewState, Workshop } from '../types';
import { WORKSHOPS_DATA } from '../data/workshopsData';
import { ScrollReveal, ScrollStaggerContainer, ScrollStaggerItem } from '../components/ScrollReveal';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  X, 
  Flame 
} from 'lucide-react';

interface WorkshopsViewProps {
  onNavigate: (view: ViewState) => void;
  onShowToast: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
  darkMode: boolean;
}

export const WorkshopsView: React.FC<WorkshopsViewProps> = ({
  onNavigate,
  onShowToast,
  darkMode,
}) => {
  const [registerModalWorkshop, setRegisterModalWorkshop] = useState<Workshop | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', college: '' });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      onShowToast('Required Fields Missing', 'Please enter your name and email.', 'error');
      return;
    }
    setRegisterModalWorkshop(null);
    onShowToast('Registered Successfully! 🎉', `Confirmation details sent to ${formData.email}.`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fadeIn">
      
      {/* Page Header */}
      <ScrollReveal direction="up">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Live Training Sessions</span>
          <h1 className={`text-3xl sm:text-4xl font-extrabold font-display ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Placement Bootcamps & Workshops
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Join live online webinars and college campus bootcamps led by senior software engineers and industry mentors.
          </p>
        </div>
      </ScrollReveal>

      {/* Workshop List */}
      <ScrollStaggerContainer className="space-y-6" staggerDelay={0.15}>
        {WORKSHOPS_DATA.map((ws) => (
          <ScrollStaggerItem key={ws.id}>
            <div
              className={`p-6 sm:p-8 rounded-3xl border grid grid-cols-1 lg:grid-cols-12 gap-6 items-center transition-all ${
                darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div className="lg:col-span-8 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 ${
                    ws.isUpcoming
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                  }`}>
                    <Flame className="w-3.5 h-3.5" /> {ws.isUpcoming ? 'Upcoming Workshop' : 'Past Session'}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold">Mode: {ws.mode}</span>
                </div>

                <h2 className={`text-xl sm:text-2xl font-bold font-display ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {ws.title}
                </h2>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {ws.description}
                </p>

                {/* Speaker Card */}
                <div className="flex items-center gap-3 pt-2">
                  <img src={ws.speaker.image} alt={ws.speaker.name} className="w-11 h-11 rounded-full object-cover border border-slate-300 dark:border-slate-700" />
                  <div>
                    <h4 className="text-xs font-bold">{ws.speaker.name}</h4>
                    <p className="text-[11px] text-slate-400">{ws.speaker.designation} • {ws.speaker.company}</p>
                  </div>
                </div>

                {/* Topics */}
                <div className="pt-2 flex flex-wrap gap-1.5">
                  {ws.topicsCovered.map((t, idx) => (
                    <span key={idx} className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      ✓ {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 space-y-4 text-xs">
                <div className="space-y-2 font-medium">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-500" />
                    <span>{ws.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span>{ws.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-purple-500" />
                    <span>{ws.mode}</span>
                  </div>
                </div>

                {ws.registrationOpen ? (
                  <button
                    onClick={() => setRegisterModalWorkshop(ws)}
                    className="w-full py-3 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02]"
                  >
                    Register Free Seat
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full py-3 rounded-xl font-bold text-xs bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
                  >
                    Registration Closed
                  </button>
                )}
              </div>
            </div>
          </ScrollStaggerItem>
        ))}
      </ScrollStaggerContainer>

      {/* Registration Modal */}
      {registerModalWorkshop && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className={`w-full max-w-md p-6 rounded-3xl border shadow-2xl space-y-4 ${
            darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className="flex items-center justify-between border-b pb-3 border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-base truncate pr-4">Register for {registerModalWorkshop.title}</h3>
              <button onClick={() => setRegisterModalWorkshop(null)} className="text-slate-400 hover:text-slate-200">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleRegister} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Anish Kumar"
                  className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. anish@gmail.com"
                  className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">WhatsApp Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. 9876543210"
                  className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">College Name</label>
                <input
                  type="text"
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  placeholder="e.g. NIT / JNTU / SRM"
                  className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setRegisterModalWorkshop(null)}
                  className="px-4 py-2 rounded-xl font-semibold border border-slate-300 dark:border-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold bg-emerald-600 text-white hover:bg-emerald-500 shadow-md"
                >
                  Confirm Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

import React, { useState } from 'react';
import { ViewState } from '../types';
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageSquare, 
  Send, 
  HelpCircle, 
  ChevronDown, 
  CheckCircle2 
} from 'lucide-react';

interface ContactViewProps {
  onNavigate: (view: ViewState) => void;
  onShowToast: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
  darkMode: boolean;
}

export const ContactView: React.FC<ContactViewProps> = ({
  onNavigate,
  onShowToast,
  darkMode,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    college: '',
    message: '',
  });

  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      onShowToast('Validation Error', 'Please fill in your name, email, and message.', 'error');
      return;
    }
    setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', college: '', message: '' });
    onShowToast('Message Sent! ✉️', 'Thank you for reaching out. Our student support team will reply within 24 hours.', 'success');
  };

  const faqs = [
    { question: 'Are all training materials on Campus2Career Academy free?', answer: 'Yes! All our roadmaps, coding practice problems, aptitude cheat sheets, and downloadable notes are completely free for students.' },
    { question: 'Do I need to create a student account or login?', answer: 'No login or registration is required. You can practice coding problems, attempt mock tests, and download resources immediately.' },
    { question: 'How can colleges request campus training workshops?', answer: 'T&P Officers or college student coordinators can send us a message using the contact form above with subject "Campus Workshop Request", and our team will get back to schedule a live session.' },
    { question: 'Are the coding questions updated for latest 2025/2026 hiring pattern?', answer: 'Yes, our problems and company prep hubs are updated quarterly based on actual interview experiences shared by candidates.' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-fadeIn">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">Get in Touch</span>
        <h1 className={`text-3xl sm:text-4xl font-extrabold font-display ${darkMode ? 'text-white' : 'text-slate-900'}`}>
          Contact & College Collaboration
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          Have questions regarding placement preparation? Want to organize a placement bootcamp or workshop at your college campus? Reach out to us below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Contact Form */}
        <div className={`lg:col-span-7 p-6 sm:p-8 rounded-3xl border shadow-xl space-y-6 ${
          darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="space-y-1">
            <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white">Send Us a Message</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Fill in the details below and our team will get back to you promptly.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Vikramaditya Roy"
                  className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none ${
                    darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. vikram@college.edu"
                  className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none ${
                    darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-1">Phone / WhatsApp Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. +91 9876543210"
                  className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none ${
                    darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Inquiry Subject</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none ${
                    darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Campus Workshop Request">College Campus Workshop Request</option>
                  <option value="Course Syllabus Question">Course Syllabus Question</option>
                  <option value="Sponsorship / Partnership">Partnership Inquiry</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-1">College / Institution Name</label>
              <input
                type="text"
                value={formData.college}
                onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                placeholder="e.g. SRM Institute of Science and Technology"
                className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none ${
                  darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Your Message *</label>
              <textarea
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us how we can help you or detail your campus workshop requirements..."
                className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none resize-none ${
                  darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold text-xs text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
            >
              <Send className="w-4 h-4" /> Send Message Now
            </button>
          </form>
        </div>

        {/* Right Column: Info Cards & FAQs */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className={`p-6 rounded-3xl border space-y-4 ${
            darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Direct Support Handles</h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-500">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 block">Email Support</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">support@campus2career.academy</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-500">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 block">Student Helpline / WhatsApp</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">+91 (800) 123-CAMPUS</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-500">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 block">Headquarters</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Tech Hub Towers, HSR Layout, Bengaluru, Karnataka</span>
                </div>
              </div>
            </div>
          </div>

          {/* FAQs Accordion */}
          <div className={`p-6 rounded-3xl border space-y-4 ${
            darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-500" /> Frequently Asked Questions
            </h3>

            <div className="space-y-2 text-xs">
              {faqs.map((faq, idx) => {
                const isOpen = expandedFaq === idx;
                return (
                  <div key={idx} className="border-b border-slate-200 dark:border-slate-800 pb-2">
                    <button
                      onClick={() => setExpandedFaq(isOpen ? null : idx)}
                      className="w-full text-left font-semibold py-1.5 flex items-center justify-between text-slate-800 dark:text-slate-200 hover:text-blue-500"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180 text-blue-500' : 'text-slate-400'}`} />
                    </button>
                    {isOpen && (
                      <p className="text-slate-500 dark:text-slate-400 leading-relaxed pt-1 pb-2">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

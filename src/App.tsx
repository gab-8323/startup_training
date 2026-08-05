import React, { useState, useEffect } from 'react';
import { ViewState } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Breadcrumbs } from './components/Breadcrumbs';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { Toast } from './components/Toast';
import { BackToTop } from './components/BackToTop';

import { HomeView } from './views/HomeView';
import { CoursesView } from './views/CoursesView';
import { RoadmapsView } from './views/RoadmapsView';
import { CodingPracticeView } from './views/CodingPracticeView';
import { AptitudeView } from './views/AptitudeView';
import { MockTestsView } from './views/MockTestsView';
import { BlogsView } from './views/BlogsView';
import { ResourcesView } from './views/ResourcesView';
import { WorkshopsView } from './views/WorkshopsView';
import { CompanyPrepView } from './views/CompanyPrepView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';
import { AdminView } from './views/AdminView';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedItemId, setSelectedItemId] = useState<string | undefined>(undefined);

  // Dark mode state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('c2c_dark_mode');
    return saved ? JSON.parse(saved) : false;
  });

  // Global search modal state
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Toast notification state
  const [toast, setToast] = useState<{
    show: boolean;
    title: string;
    description?: string;
    type: 'success' | 'error' | 'info';
  }>({
    show: false,
    title: '',
    description: '',
    type: 'info',
  });

  // Apply Dark Mode Class to document Element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('c2c_dark_mode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Scroll to top on View transition
  const handleNavigate = (view: ViewState, targetId?: string) => {
    setCurrentView(view);
    setSelectedItemId(targetId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToastNotification = (
    title: string,
    description?: string,
    type: 'success' | 'error' | 'info' = 'info'
  ) => {
    setToast({ show: true, title, description, type });
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
      darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* Toast Notification Container */}
      <Toast
        show={toast.show}
        title={toast.title}
        description={toast.description}
        type={toast.type}
        onClose={() => setToast((prev) => ({ ...prev, show: false }))}
      />

      {/* Sticky Main Header */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Page Area */}
      <main className="flex-1">
        <Breadcrumbs currentView={currentView} onNavigate={handleNavigate} />

        {currentView === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onShowToast={showToastNotification}
            darkMode={darkMode}
          />
        )}

        {currentView === 'courses' && (
          <CoursesView
            onNavigate={handleNavigate}
            selectedCourseId={selectedItemId}
            onShowToast={showToastNotification}
            darkMode={darkMode}
          />
        )}

        {currentView === 'roadmaps' && (
          <RoadmapsView
            onNavigate={handleNavigate}
            onShowToast={showToastNotification}
            darkMode={darkMode}
          />
        )}

        {currentView === 'coding' && (
          <CodingPracticeView
            onNavigate={handleNavigate}
            selectedProblemId={selectedItemId}
            onShowToast={showToastNotification}
            darkMode={darkMode}
          />
        )}

        {currentView === 'aptitude' && (
          <AptitudeView
            onNavigate={handleNavigate}
            onShowToast={showToastNotification}
            darkMode={darkMode}
          />
        )}

        {currentView === 'mock-tests' && (
          <MockTestsView
            onNavigate={handleNavigate}
            selectedTestId={selectedItemId}
            onShowToast={showToastNotification}
            darkMode={darkMode}
          />
        )}

        {currentView === 'blogs' && (
          <BlogsView
            onNavigate={handleNavigate}
            selectedBlogId={selectedItemId}
            onShowToast={showToastNotification}
            darkMode={darkMode}
          />
        )}

        {currentView === 'resources' && (
          <ResourcesView
            onNavigate={handleNavigate}
            onShowToast={showToastNotification}
            darkMode={darkMode}
          />
        )}

        {currentView === 'workshops' && (
          <WorkshopsView
            onNavigate={handleNavigate}
            onShowToast={showToastNotification}
            darkMode={darkMode}
          />
        )}

        {currentView === 'company-prep' && (
          <CompanyPrepView
            onNavigate={handleNavigate}
            selectedCompanyId={selectedItemId}
            onShowToast={showToastNotification}
            darkMode={darkMode}
          />
        )}

        {currentView === 'about' && (
          <AboutView
            onNavigate={handleNavigate}
            darkMode={darkMode}
          />
        )}

        {currentView === 'contact' && (
          <ContactView
            onNavigate={handleNavigate}
            onShowToast={showToastNotification}
            darkMode={darkMode}
          />
        )}

        {currentView === 'admin' && (
          <AdminView
            onNavigate={handleNavigate}
            onShowToast={showToastNotification}
            darkMode={darkMode}
          />
        )}
      </main>

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
        darkMode={darkMode}
      />

      {/* Back to Top Scroll Floating Button */}
      <BackToTop />

      {/* Main Footer */}
      <Footer onNavigate={handleNavigate} darkMode={darkMode} />

    </div>
  );
}

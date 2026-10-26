import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomeVerificationView } from './components/HomeVerificationView';
import { DashboardView } from './components/DashboardView';
import { HistoryView } from './components/HistoryView';
import { PredictionResult } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'dashboard' | 'history'>('home');
  const [history, setHistory] = useState<PredictionResult[]>(() => {
    try {
      // Purge any old seed items from previous sessions
      const oldSaved = localStorage.getItem('veritas_verification_history');
      if (oldSaved) {
        localStorage.removeItem('veritas_verification_history');
      }

      const saved = localStorage.getItem('fakenews_dynamic_history');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Keep only user-generated predictions, exclude any seed- mock data
          return parsed.filter((item: any) => item && typeof item.id === 'string' && !item.id.startsWith('seed-'));
        }
      }
      return [];
    } catch {
      return [];
    }
  });

  // Save history updates to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('fakenews_dynamic_history', JSON.stringify(history));
    } catch (e) {
      console.warn('Could not save history to localStorage:', e);
    }
  }, [history]);

  // When user tests an article on Home, prepend to history so dashboard and history update live!
  const handleVerificationComplete = (newResult: PredictionResult) => {
    setHistory((prev) => [newResult, ...prev]);
  };

  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem('fakenews_dynamic_history');
      localStorage.removeItem('veritas_verification_history');
    } catch {}
  };

  const handleSelectHistoryResult = (_result: PredictionResult) => {
    setActiveTab('home');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans">
      {/* Header matching PDF: 📰 Fake News Detector | Home Dashboard History | ML Active */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main View Area */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {activeTab === 'home' && (
          <HomeVerificationView
            onVerificationComplete={handleVerificationComplete}
            onNavigateToDashboard={() => setActiveTab('dashboard')}
            onNavigateToHistory={() => setActiveTab('history')}
          />
        )}

        {activeTab === 'dashboard' && (
          <DashboardView
            history={history}
            onNavigateToHistory={() => setActiveTab('history')}
            onNavigateToHome={() => setActiveTab('home')}
            onClearHistory={handleClearHistory}
          />
        )}

        {activeTab === 'history' && (
          <HistoryView
            history={history}
            onClearHistory={handleClearHistory}
            onSelectResult={handleSelectHistoryResult}
            onNavigateToHome={() => setActiveTab('home')}
          />
        )}
      </main>

      {/* Footer matching PDF: Fake News Detection System • Machine Learning Project */}
      <footer className="py-8 text-center text-xs text-slate-500 font-normal">
        Fake News Detection System • Machine Learning Project
      </footer>
    </div>
  );
}

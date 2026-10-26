import React from 'react';
import { Database } from 'lucide-react';

interface NavbarProps {
  activeTab: 'home' | 'dashboard' | 'history';
  setActiveTab: (tab: 'home' | 'dashboard' | 'history') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: 📰 Fake News Detector */}
        <div className="flex items-center gap-2.5">
          <span className="text-xl" role="img" aria-label="newspaper">
            📰
          </span>
          <button
            onClick={() => setActiveTab('home')}
            className="text-base sm:text-lg font-bold tracking-tight text-slate-900 hover:text-blue-600 transition-colors"
          >
            Fake News Detector
          </button>
        </div>

        {/* Center: Home · Dashboard · History */}
        <nav className="flex items-center gap-6 sm:gap-8">
          <button
            onClick={() => setActiveTab('home')}
            className={`text-sm font-medium transition-colors pb-1 pt-1 ${
              activeTab === 'home'
                ? 'text-blue-600 border-b-2 border-blue-600 font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => setActiveTab('dashboard')}
            className={`text-sm font-medium transition-colors pb-1 pt-1 ${
              activeTab === 'dashboard'
                ? 'text-blue-600 border-b-2 border-blue-600 font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Dashboard
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`text-sm font-medium transition-colors pb-1 pt-1 ${
              activeTab === 'history'
                ? 'text-blue-600 border-b-2 border-blue-600 font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            History
          </button>
        </nav>

        {/* Right: ML Active */}
        <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-slate-600 font-sans text-xs font-semibold">
            ML Active
          </span>
        </div>
      </div>
    </header>
  );
};

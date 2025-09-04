
import React from 'react';
import Dashboard from './components/Dashboard';
import { LogoIcon } from './components/Icons';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <LogoIcon className="h-8 w-8 text-cyan-400" />
              <h1 className="text-2xl font-bold text-white tracking-tight">
                Budget<span className="text-cyan-400">Twin</span>
              </h1>
            </div>
            <p className="text-sm text-gray-400 hidden md:block">Your AI-Powered Financial Co-Pilot</p>
          </div>
        </div>
      </header>
      <main>
        <Dashboard />
      </main>
    </div>
  );
}

export default App;

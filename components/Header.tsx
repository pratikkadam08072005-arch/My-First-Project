
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
            <i className="fas fa-graduation-cap text-xl"></i>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Student Performance
            </h1>
            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Predictive Performance Engine</p>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Dashboard</a>
          <a href="#" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Students</a>
          <a href="#" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Analytics</a>
        </nav>

        <div className="flex items-center gap-4">
          <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
            <i className="fas fa-bell"></i>
          </button>
          <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden">
            <img src="https://picsum.photos/100/100?random=1" alt="Profile" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
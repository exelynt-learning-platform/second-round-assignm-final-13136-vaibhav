import React from 'react';
import { Bot, RotateCcw } from 'lucide-react';

/**
 * Elegant header with branding and action button.
 */
const Header = ({ onReset }) => {
  return (
    <header className="h-16 bg-white border-b border-slate-100 px-6 flex items-center justify-between shrink-0 shadow-[0_1px_2px_rgba(0,0,0,0.03)] z-10">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-blue-200 shadow-lg">
          <Bot size={22} />
        </div>
        <div>
          <h1 className="text-[15px] font-bold text-slate-900 tracking-tight leading-none mb-1">AI Chatbox</h1>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Active Now</span>
          </div>
        </div>
      </div>

      <button
        onClick={onReset}
        title="Start Fresh"
        className="p-2.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all duration-200 active:scale-95"
      >
        <RotateCcw size={18} />
      </button>
    </header>
  );
};

export default Header;

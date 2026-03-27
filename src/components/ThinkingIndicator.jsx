import React, { memo } from 'react';
import { Bot } from 'lucide-react';

/**
 * A sleek, animated typing indicator with a premium feel.
 * Matches the AI message bubble style.
 */
const ThinkingIndicator = memo(() => {
  return (
    <div className="flex w-full justify-end mb-6 px-6 animate-msg">
      <div className="flex flex-row-reverse gap-3 items-end text-right">
        {/* Bot Icon */}
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-white border border-slate-50 text-slate-300 shadow-sm">
          <Bot size={16} />
        </div>

        {/* Bubble */}
        <div className="bg-white border border-slate-100 rounded-2xl rounded-tr-none p-4 bubble-shadow-ai text-left">
          <div className="typing-dots">
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ThinkingIndicator;

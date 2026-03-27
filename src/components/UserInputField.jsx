import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import { SendHorizonal, Trash2 } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Standard utility for conditional tailwind classes
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Main input area for user prompts
 */
const UserInputField = memo(({ onSend, onClear, disabled }) => {
  const [draft, setDraft] = useState('');
  const inputRef = useRef(null);

  // Auto-focus on release
  useEffect(() => {
    if (!disabled) inputRef.current?.focus();
  }, [disabled]);

  const handleFire = useCallback(() => {
    if (!draft.trim() || disabled) return;
    onSend(draft);
    setDraft('');
  }, [draft, onSend, disabled]);

  const onKeyHandler = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleFire();
    }
  };

  return (
    <footer className="p-4 md:p-8 bg-gradient-to-t from-slate-50 to-transparent shrink-0">
      <div className="max-w-4xl mx-auto relative group">
        <textarea
          ref={inputRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKeyHandler}
          placeholder="How can I help you today?"
          aria-label="Message input"
          disabled={disabled}
          rows={1}
          className={cn(
            "w-full bg-white border border-slate-200 rounded-3xl py-4 pl-6 pr-32 outline-none resize-none transition-all duration-300 min-h-[58px] max-h-32",
            "focus:border-blue-400 focus:ring-4 focus:ring-blue-50 focus:shadow-sm",
            "placeholder:text-slate-300 placeholder:font-medium disabled:bg-slate-50 disabled:text-slate-400"
          )}
        />

        {/* Action Tray */}
        <div className="absolute right-2 top-2 bottom-2 flex items-center gap-1">
          {draft && !disabled && (
            <button
               onClick={() => setDraft('')}
               aria-label="Clear drafting message"
               className="p-3 text-slate-300 hover:text-slate-500 transition-colors"
            >
               <Trash2 size={18} />
            </button>
          )}

          <button
            onClick={handleFire}
            disabled={!draft.trim() || disabled}
            aria-label="Send message"
            className={cn(
              "p-3 rounded-2xl transition-all duration-300 flex items-center justify-center",
              draft.trim() && !disabled 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-95" 
                : "bg-slate-100 text-slate-300 cursor-not-allowed"
            )}
          >
            <SendHorizonal size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
});

export default UserInputField;

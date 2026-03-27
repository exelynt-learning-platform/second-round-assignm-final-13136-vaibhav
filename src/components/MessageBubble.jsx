import React, { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import { User, Bot, Trash2 } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Simple helper for merging tailwind classes using tailwind-merge
const cn = (...inputs) => twMerge(clsx(inputs));

// Individual message component
const MessageBubble = memo(({ id, text, sender, timestamp, onDelete }) => {
  const isUser = sender === 'user';

  return (
    <div 
      className={cn(
        "flex w-full mb-6 group animate-msg",
        isUser ? "justify-start" : "justify-end"
      )}
    >
      <div 
        className={cn(
          "flex max-w-[85%] md:max-w-[70%] gap-3",
          isUser ? "flex-row" : "flex-row-reverse text-right"
        )}
      >
        {/* Avatar */}
        <div 
          className={cn(
            "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm",
            isUser ? "bg-blue-600 text-white" : "bg-white text-slate-600 border border-slate-100"
          )}
        >
          {isUser ? <User size={18} /> : <Bot size={18} />}
        </div>

        {/* Content Area */}
        <div className={cn("flex flex-col", isUser ? "items-start" : "items-end")}>
          <div 
            className={cn(
              "relative px-5 py-3.5 rounded-2xl text-[14.5px] leading-relaxed shadow-sm transition-shadow",
              isUser 
                ? "bg-blue-600 text-white rounded-tl-none" 
                : "bg-white text-slate-700 border border-slate-100 rounded-tr-none text-left"
            )}
          >
            <ReactMarkdown className="prose prose-sm max-w-none">
              {text}
            </ReactMarkdown>

            {/* Delete Button (WhatsApp style - appears on hover) */}
            <button
              onClick={() => onDelete(id)}
              className={cn(
                "absolute top-2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-full hover:bg-black/5 flex items-center justify-center",
                isUser ? "-right-10 text-slate-400" : "-left-10 text-slate-400"
              )}
              title="Delete message"
            >
              <Trash2 size={14} />
            </button>
          </div>
          
          {/* Timestamp */}
          <div className="text-[10px] opacity-40 font-bold uppercase tracking-widest px-1">
            {timestamp}
          </div>
        </div>
      </div>
    </div>
  );
});

// Setting a display name because memo components can be anonymous in dev tools
MessageBubble.displayName = 'ChatBubble';

export default MessageBubble;

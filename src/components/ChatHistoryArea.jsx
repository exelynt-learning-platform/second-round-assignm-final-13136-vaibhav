import React, { useRef, useEffect, memo } from 'react';
import MessageBubble from './MessageBubble';
import ThinkingIndicator from './ThinkingIndicator';
import { AlertCircle, Sparkles } from 'lucide-react';
import { STARTER_PROMPTS } from '../utils/constants';

/**
 * Scrollable container for the chat history.
 */
const ChatHistoryArea = ({ messages, isThinking, error, onSelectStarter, onDelete }) => {
  const scrollRef = useRef(null);

  // Auto-scroll on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isThinking, error]);

  return (
    <main 
      ref={scrollRef}
      className="flex-1 overflow-y-auto pt-8 pb-4 scroll-smooth"
    >
      <div className="max-w-4xl mx-auto px-4 md:px-0">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
             <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mb-6 animate-bounce">
                <Sparkles size={28} />
             </div>
             <h2 className="text-xl font-bold text-slate-800 mb-2">How can I help you today?</h2>
             <p className="text-sm text-slate-500 max-w-xs mb-8">Start a conversation to see premium AI responses in action.</p>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-lg px-6">
                 {STARTER_PROMPTS.map(txt => (
                   <button 
                     key={txt}
                     onClick={() => onSelectStarter(txt)}
                     aria-label={`Send starter prompt: ${txt}`}
                     className="p-4 bg-white border border-slate-100 rounded-xl text-sm font-medium text-slate-600 hover:border-blue-200 hover:text-blue-600 transition-all text-left shadow-sm hover:shadow-md"
                   >
                     {txt}
                   </button>
                 ))}
             </div>
          </div>
        ) : (
          messages.map((msg) => (
            <MessageBubble 
              key={msg.id}
              id={msg.id}
              text={msg.text} 
              sender={msg.sender} 
              timestamp={msg.timestamp} 
              onDelete={onDelete}
            />
          ))
        )}

        {isThinking && <ThinkingIndicator />}

        {error && (
          <div className="mx-6 mb-8 p-6 bg-red-50 border border-red-100 rounded-2xl flex gap-4 animate-msg">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-red-500 shadow-sm shrink-0">
              <AlertCircle size={20} />
            </div>
            <div>
              <p className="font-bold text-red-900 text-[14px] mb-0.5">Connection Issue</p>
              <p className="text-red-500 text-[13px] leading-relaxed">{error}</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default memo(ChatHistoryArea);

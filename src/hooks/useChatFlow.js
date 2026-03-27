import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleUserSubmission, restoreHistory, wipeChat, deleteMessage } from '../redux/actions';
import { STORAGE_KEY } from '../utils/constants';

/**
 * High-level hook to manage the lifecycle and interaction flow of the chat.
 */
export function useChatFlow() {
  const dispatch = useDispatch();
  
  // Selectors for UI state
  // Main state pieces pulled from Redux
  const messages = useSelector((state) => state.chat.messages);
  const loading = useSelector((state) => state.chat.isThinking);
  const error = useSelector((state) => state.chat.errorMessage);

  // 1. Perspective: Persist chat on every change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  // 2. Hydration: Pull saved chats on first load
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) dispatch(restoreHistory(parsed));
      } catch (e) {
        console.error("Failed to restore history", e);
      }
    }
  }, [dispatch]);

  // Actions
  const submitPrompt = useCallback((txt) => dispatch(handleUserSubmission(txt)), [dispatch]);
  const clearEntireSession = useCallback(() => dispatch(wipeChat()), [dispatch]);
  const deleteOneMessage = useCallback((id) => dispatch(deleteMessage(id)), [dispatch]);

  return {
    messages,
    loading,
    error,
    submitPrompt,
    clearEntireSession,
    deleteOneMessage
  };
}

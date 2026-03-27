import { 
  ADD_MESSAGE_TO_CHAT, 
  SET_AI_LOADING, 
  SET_ERROR_MESSAGE, 
  CLEAR_CHAT_HISTORY,
  LOAD_SAVED_HISTORY,
  DELETE_MESSAGE_FROM_CHAT
} from './actionTypes';
import { getSmartAIResponse } from '../services/aiChatService';

// Generate a quick random ID for each list item
const createUniqueId = () => `id_${Math.random().toString(36).substr(2, 9)}`;

// Standard Sync Actions
export const addMessage = (content, role) => ({
  type: ADD_MESSAGE_TO_CHAT,
  payload: {
    id: createUniqueId(),
    text: content,
    sender: role,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
});

export const setLoading = (isLoading) => ({
  type: SET_AI_LOADING,
  payload: isLoading
});

export const setError = (error) => ({
  type: SET_ERROR_MESSAGE,
  payload: error
});

export const wipeChat = () => {
  // Clear persistence layer
  localStorage.removeItem('multigenysys_chat_history');
  return { type: CLEAR_CHAT_HISTORY };
};

export const restoreHistory = (data) => ({
  type: LOAD_SAVED_HISTORY,
  payload: data
});

export const deleteMessage = (id) => ({
  type: DELETE_MESSAGE_FROM_CHAT,
  payload: id
});

/**
 * Main thunk to handle the full message cycle
 */
export const handleUserSubmission = (input) => {
  return async (dispatch, getState) => {
    if (!input.trim()) return;

    // 1. Instantly show user message in UI
    dispatch(addMessage(input, 'user'));
    dispatch(setError(null));

    // 2. Show the "Thinking" indicator
    dispatch(setLoading(true));

    try {
      // 3. Request response from our AI service
      const { chat } = getState();
      const response = await getSmartAIResponse(chat.messages);

      // 4. Add the AI's reply to the chat list
      dispatch(addMessage(response, 'ai'));
    } catch (err) {
      // Handle network or quota issues gracefully
      dispatch(setError(err.message || "I'm having a bit of trouble connecting to my AI brain. Please try again!"));
    } finally {
      // 5. Always hide the loading state
      dispatch(setLoading(false));
    }
  };
};

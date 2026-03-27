import { 
  ADD_MESSAGE_TO_CHAT, 
  SET_AI_LOADING, 
  SET_ERROR_MESSAGE, 
  CLEAR_CHAT_HISTORY,
  LOAD_SAVED_HISTORY,
  DELETE_MESSAGE_FROM_CHAT
} from './actionTypes';
import { getSmartAIResponse } from '../services/aiChatService';
import { STORAGE_KEY } from '../utils/constants';

// Robust ID generation for chat messages
const createUniqueId = () => `${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;

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
  localStorage.removeItem(STORAGE_KEY);
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
  return async (dispatch, _getState) => {
    const trimmedInput = input?.trim();
    if (!trimmedInput || trimmedInput.length > 2000) return;

    // 1. Instantly show user message in UI
    dispatch(addMessage(trimmedInput, 'user'));
    dispatch(setError(null));

    // 2. Show the "Thinking" indicator
    dispatch(setLoading(true));

    try {
      // 3. Request response from our AI service
      // Directly pass the user input as recommended in the review
      const response = await getSmartAIResponse(trimmedInput);

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

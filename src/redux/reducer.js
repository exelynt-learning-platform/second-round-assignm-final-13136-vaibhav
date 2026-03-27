import { 
  ADD_MESSAGE_TO_CHAT, 
  SET_AI_LOADING, 
  SET_ERROR_MESSAGE, 
  CLEAR_CHAT_HISTORY,
  LOAD_SAVED_HISTORY,
  DELETE_MESSAGE_FROM_CHAT
} from './actionTypes';

const initialState = {
  messages: [],
  isThinking: false,
  errorMessage: null,
};

/**
 * Handlers for updating our conversational state
 */
const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    // Add a new message to the list
    case ADD_MESSAGE_TO_CHAT:
      return {
        ...state,
        messages: [...state.messages, action.payload]
      };

    // Toggle the loading/thinking state
    case SET_AI_LOADING:
      return {
        ...state,
        isThinking: action.payload
      };

    // Store any error messages from the API
    case SET_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.payload
      };

    // Reset everything
    case CLEAR_CHAT_HISTORY:
      return {
        ...initialState
      };

    // Hydrate state from local storage
    case LOAD_SAVED_HISTORY:
      return {
        ...state,
        messages: action.payload
      };

    // Remove a specific message by ID
    case DELETE_MESSAGE_FROM_CHAT:
      return {
        ...state,
        messages: state.messages.filter(msg => msg.id !== action.payload)
      };

    default:
      return state;
  }
};

export default chatReducer;

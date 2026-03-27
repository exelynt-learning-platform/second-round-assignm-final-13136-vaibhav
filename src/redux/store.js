import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './reducer';

/**
 * Global Redux Store.
 * Standard configuration using Redux Toolkit for simplicity and power.
 */
const store = configureStore({
  reducer: {
    chat: chatReducer,
  },
});

export default store;

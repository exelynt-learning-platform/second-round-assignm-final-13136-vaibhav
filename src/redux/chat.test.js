import { describe, it, expect } from 'vitest';
import chatReducer from './reducer';
import * as types from './actionTypes';

describe('chatReducer', () => {
  const initialState = {
    messages: [],
    isThinking: false,
    errorMessage: null
  };

  it('should return the initial state', () => {
    expect(chatReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle ADD_MESSAGE_TO_CHAT', () => {
    const newMessage = { id: 1, text: 'Hello', sender: 'user' };
    const action = {
      type: types.ADD_MESSAGE_TO_CHAT,
      payload: newMessage
    };
    const expectedState = {
      ...initialState,
      messages: [newMessage]
    };
    expect(chatReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle SET_AI_LOADING', () => {
    const action = {
      type: types.SET_AI_LOADING,
      payload: true
    };
    const expectedState = {
      ...initialState,
      isThinking: true
    };
    expect(chatReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle SET_ERROR_MESSAGE', () => {
    const action = {
      type: types.SET_ERROR_MESSAGE,
      payload: 'API Error'
    };
    const expectedState = {
      ...initialState,
      errorMessage: 'API Error'
    };
    expect(chatReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle CLEAR_CHAT_HISTORY', () => {
    const populatedState = {
      messages: [{ id: 1, text: 'Hi', sender: 'user' }],
      isThinking: false,
      errorMessage: null
    };
    const action = { type: types.CLEAR_CHAT_HISTORY };
    expect(chatReducer(populatedState, action)).toEqual(initialState);
  });

  it('should handle DELETE_MESSAGE_FROM_CHAT', () => {
    const stateWithMessages = {
      ...initialState,
      messages: [
        { id: '1', text: 'First', sender: 'user' },
        { id: '2', text: 'Second', sender: 'ai' }
      ]
    };
    const action = {
      type: types.DELETE_MESSAGE_FROM_CHAT,
      payload: '1'
    };
    expect(chatReducer(stateWithMessages, action).messages).toHaveLength(1);
    expect(chatReducer(stateWithMessages, action).messages[0].id).toBe('2');
  });
});

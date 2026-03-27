/**
 * Centralized constants for the MultiGenesys application.
 */

export const STORAGE_KEY = 'multigenesys_chat_history';

export const AI_TIMEOUTS = {
  OPENAI: 8000,
  GROQ: 10000
};

export const STARTER_PROMPTS = [
  'Hi',
  'Hello',
  'How are you?',
  'What can you do?'
];

export const AI_FALLBACK_RESPONSES = [
  "That's a great question! I'm currently running in 'Offline Mode' to save power, but I'd love to chat more once my main brains are back online.",
  "Interesting! I'm seeing a bit of network congestion right now, so I'm giving you this pre-programmed greeting. Try again in 30 seconds!",
  "Hello! I am MultiGenesys. My primary AI services are currently hitting a quota limit, but I am still here to help you navigate the UI."
];

export const MAX_INPUT_LENGTH = 2000;

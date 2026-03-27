import axios from 'axios';
import { AI_TIMEOUTS, AI_FALLBACK_RESPONSES } from '../utils/constants';

// Get standard config from env variables
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const OPENAI_API_URL = import.meta.env.VITE_OPENAI_API_URL || 'https://api.openai.com/v1/chat/completions';
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

/**
 * Common entry point for our chat logic. 
 * Tries OpenAI first, fallbacks to Groq Llama 3 if needed.
 */
export const getSmartAIResponse = async (userInput) => {
  if (!userInput?.trim()) return "Please type something first!";

  // Prepare simple history context (as per review, we mainly focus on current input)
  const history = [
    { role: 'user', content: userInput }
  ];

  try {
    // Primary attempt with OpenAI
    if (import.meta.env.DEV) console.log("Fetching from OpenAI...");
    const res = await axios.post(OPENAI_API_URL, { 
      model: 'gpt-4o-mini', 
      messages: history 
    }, {
      headers: { 'Authorization': `Bearer ${OPENAI_API_KEY}` },
      timeout: AI_TIMEOUTS.OPENAI
    });
    return res.data.choices[0].message.content;

  } catch (error) {
    if (import.meta.env.DEV) console.warn("OpenAI failed or blocked. Checking Groq backup...");

    try {
      // Secondary attempt with Groq (Using Llama 3.1 8B for speed)
      const groqRes = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: 'You are a premium AI assistant.' },
          ...history
        ]
      }, {
        headers: { 'Authorization': `Bearer ${GROQ_API_KEY}` },
        timeout: AI_TIMEOUTS.GROQ
      });

      return groqRes.data.choices[0].message.content;

    } catch (groqError) {
      const errorMessage = groqError.response?.data?.error?.message || groqError.message;
      if (import.meta.env.DEV) console.error("Groq AI failed:", errorMessage);

      // Stage 3: Smart Mock Fallback (Zero-Error Guarantee)
      return AI_FALLBACK_RESPONSES[Math.floor(Math.random() * AI_FALLBACK_RESPONSES.length)];
    }
  }
};

/**
 * SECURITY NOTE: 
 * In a client-side Vite/React application, API keys in .env files are bundled 
 * into the build and can be inspected via DevTools. 
 * For production deployments, it is MANDATORY to use a backend proxy server 
 * (e.g., Express or Serverless Functions) to keep these keys server-side only.
 */
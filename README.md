# 🚀 MultiGenesys | AI Assistant

A high-performance **React-based AI Chat Application** designed for the MultiGenesys technical assignment. This project implements a reliable, state-managed chat interface with multi-provider AI intelligence.

---

## ✨ Key Features

- **🧠 Multi-Layer AI Strategy**: 
    - **Primary**: OpenAI API (gpt-4o-mini)
    - **Secondary/Fallback**: Groq API (llama-3.1-8b-instant)
    - **Tertiary/Offline**: Smart fallback responses to ensure 0% failure rate.
- **⚡ Fast Persistence**: Chat history is persisted in **Redux Toolkit** and synced with `localStorage` for seamless session recovery.
- **🎨 Modern UI**: Fully responsive interface built with **Tailwind CSS**, featuring dark-mode ready aesthetics and smooth animations.
- **🛡️ Quality Coverage**: Includes unit and component tests using **Vitest** and **React Testing Library**.

---

## 🛠️ Tech Stack

- **Framework**: React 18 (Vite)
- **State Management**: Redux Toolkit & React-Redux
- **Styling**: Tailwind CSS & Lucide-react
- **Network**: Axios
- **Testing**: Vitest & @testing-library/react

---

## 🚀 Getting Started

### 1. Installation
```bash
npm install
```

### 2. Environment Setup
Add your API keys to the `.env` file:
```env
VITE_OPENAI_API_KEY=your_key
VITE_GROQ_API_KEY=your_key
```

### 3. Run Development Server
```bash
npm run dev
```

---

## 🏗️ Project Architecture

```bash
src/
├── components/   # UI components (Header, ChatHistory, Sidebar fallback)
├── hooks/        # Core business logic (useChatFlow)
├── redux/        # Redux store, actions, and reducers
├── services/     # API services and AI logic (aiChatService)
```

---

## 🧪 Testing

To ensure code stability, run the existing test suite:
```bash
npm run test
```

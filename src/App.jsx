import React, { Suspense, lazy } from "react";
import { useChatFlow } from "./hooks/useChatFlow";
import ErrorBoundary from './components/ErrorBoundary';

// Lazy loading layout components for faster initial paint
const Header = lazy(() => import("./components/Header"));
const ChatHistoryArea = lazy(() => import("./components/ChatHistoryArea"));
const UserInputField = lazy(() => import("./components/UserInputField"));

/**
 * Main application container.
 */
function App() {
  const { messages, loading, error, submitPrompt, clearEntireSession, deleteOneMessage } =
    useChatFlow();

  return (
    <ErrorBoundary>
      <div className="flex flex-col h-screen bg-slate-50 overflow-hidden font-sans">
        <Suspense fallback={<div className="flex-1 bg-slate-50" />}>
          <Header onReset={clearEntireSession} />

          <ChatHistoryArea
            messages={messages}
            isThinking={loading}
            error={error}
            onSelectStarter={submitPrompt}
            onDelete={deleteOneMessage}
          />

          <UserInputField
            onSend={submitPrompt}
            onClear={clearEntireSession}
            disabled={loading}
          />
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}

export default App;

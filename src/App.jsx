import React from "react";
import { useChatFlow } from "./hooks/useChatFlow";
import ErrorBoundary from './components/ErrorBoundary';
import Header from "./components/Header";
import ChatHistoryArea from "./components/ChatHistoryArea";
import UserInputField from "./components/UserInputField";

/**
 * Main application container.
 */
function App() {
  const { messages, loading, error, submitPrompt, clearEntireSession, deleteOneMessage } =
    useChatFlow();

  return (
    <ErrorBoundary>
      <div className="flex flex-col h-screen bg-slate-50 overflow-hidden font-sans">
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
      </div>
    </ErrorBoundary>
  );
}

export default App;

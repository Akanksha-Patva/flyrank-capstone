import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";

import "./CareerChat.css";

export default function CareerChat() {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const shouldAutoScrollRef = useRef(true);

  const { messages, sendMessage, status, stop, error } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }), 
  });

  const isGenerating =
    status === "submitted" || status === "streaming";

  // Check whether the user is already near the bottom.
  // If they have scrolled up, we don't force them back down.
  const handleScroll = () => {
    const container = messagesContainerRef.current;

    if (!container) return;

    const distanceFromBottom =
      container.scrollHeight -
      container.scrollTop -
      container.clientHeight;

    shouldAutoScrollRef.current = distanceFromBottom < 100;
  };

  // Automatically follow a streaming response only when
  // the user hasn't intentionally scrolled upward.
  useEffect(() => {
    if (!shouldAutoScrollRef.current) return;

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const text = input.trim();

    if (!text || isGenerating) return;

    sendMessage({ text });
    setInput("");

    // When a new message is sent, follow the conversation.
    shouldAutoScrollRef.current = true;
  };

  return (
    <div className="career-chat">
      <header className="chat-header">
        <div>
          <p className="chat-eyebrow">AI CAREER COACH</p>
          <h1>Plan your next career move</h1>
          <p className="chat-subtitle">
            Tell me about your background, skills, and career goals.
          </p>
        </div>

        <div className="online-indicator">
          <span />
          Gemini AI
        </div>
      </header>

      <main
        className="messages-container"
        ref={messagesContainerRef}
        onScroll={handleScroll}
      >
        {messages.length === 0 && (
          <div className="welcome-card">
            <div className="welcome-icon">✦</div>

            <h2>Let's understand your career goals.</h2>

            <p>
              Start by telling me your education, current skills,
              experience, or the type of career you're interested in.
            </p>

            <div className="example-prompts">
              <button
                type="button"
                onClick={() =>
                  setInput(
                    "I'm a BCA graduate interested in frontend development."
                  )
                }
              >
                BCA + frontend development
              </button>

              <button
                type="button"
                onClick={() =>
                  setInput(
                    "I don't know which tech career is right for me."
                  )
                }
              >
                I'm unsure about my career path
              </button>
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`message-row ${message.role}`}
          >
            <div className="message-label">
              {message.role === "user" ? "You" : "Career Coach"}
            </div>

            <div className="message-bubble">
              {message.parts.map((part, index) => {
                if (part.type === "text") {
                  return (
                    <p
                      key={`${message.id}-${index}`}
                      className="message-text"
                    >
                      {part.text}
                    </p>
                  );
                }

                return null;
              })}
            </div>
          </div>
        ))}

        {status === "submitted" && (
          <div className="message-row assistant">
            <div className="message-label">Career Coach</div>

            <div className="message-bubble thinking">
              <span />
              <span />
              <span />
              <strong>Thinking...</strong>
            </div>
          </div>
        )}

        {error && (
          <div className="error-message">
            Something went wrong. Please try sending your message again.
          </div>
        )}

        <div ref={messagesEndRef} />
      </main>

      <form className="chat-input-area" onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Tell me about your career goals..."
            rows={1}
            disabled={isGenerating}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                handleSubmit(event);
              }
            }}
          />

          {isGenerating ? (
            <button
              type="button"
              className="stop-button"
              onClick={stop}
            >
              Stop
            </button>
          ) : (
            <button
              type="submit"
              className="send-button"
              disabled={!input.trim()}
            >
              Send
            </button>
          )}
        </div>

        <p className="input-hint">
          Enter to send · Shift + Enter for a new line
        </p>
      </form>
    </div>
  );
}
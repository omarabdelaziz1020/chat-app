import React from "react";
import type { Message, User } from "../../types";
import "../../styles/components/ChatWindow.scss";

interface ChatWindowProps {
  messages: Message[];
  input: string;
  setInput: (v: string) => void;
  file: File | null;
  setFile: (f: File | null) => void;
  progress: number;
  handleSend: () => void;
  bottomRef: React.RefObject<HTMLDivElement | null>;
  onBack?: () => void;
  recipients?: User[];
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  input,
  setInput,
  file,
  setFile,
  progress,
  handleSend,
  bottomRef,
  onBack,
  recipients,
}) => {
  return (
    <div className="chat-window">
      <button className="back-btn" onClick={onBack}>
        <span className="arrow">➜</span> Back
      </button>
      {recipients && recipients.length > 0 ? (
        <div className="recipients-info">
          Broadcasting to: {recipients.map((r) => r.name).join(", ")}
        </div>
      ) : recipients && recipients.length === 0 ? (
        <div className="recipients-info error">
          No recipients selected. Please go back and select users.
        </div>
      ) : null}

      <div className="messages">
        {messages.map((m, i) => (
          <div key={i} className={`message ${m.sender === "me" ? "me" : ""}`}>
            {m.mediaUrl && (
              <img src={m.mediaUrl} alt="media" className="media-preview" />
            )}
            <span>{m.text}</span>
            <span className="timestamp">
              {new Date(m.timestamp).toLocaleTimeString()}
            </span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="input-area">
        <div className="input-row">
          <label className="upload-label">
            <input
              type="file"
              accept="image/*,video/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              style={{ display: "none" }}
            />
            <span className="upload-btn">📎 Upload</span>
          </label>{" "}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Type a message..."
          />
        </div>
        {file && (
          <span>
            {file.name.length > 20 ? file.name.slice(0, 20) + "..." : file.name}{" "}
            {progress > 0 && `(${progress}%)`}
          </span>
        )}{" "}
        <button
          className="send-btn"
          onClick={handleSend}
          disabled={
            (!input && !file) || (recipients && recipients.length === 0)
          }
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;

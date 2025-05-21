import React, { useMemo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMessaging } from "../hooks";
import useMockApi from "../api/useMockApi";
import ChatWindow from "../components/chat/ChatWindow";

const BroadcastPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const ids = useMemo(
    () => new URLSearchParams(location.search).get("ids")?.split(",") || [],
    [location.search]
  );

  const api = useMockApi();
  const {
    messages,
    setMessages,
    input,
    setInput,
    file,
    setFile,
    progress,
    handleSend: baseHandleSend,
    bottomRef,
  } = useMessaging();

  // Clear messages when recipients change
  useEffect(() => {
    setMessages([]); // No history for broadcast
  }, [ids, setMessages]);

  // Custom send handler for broadcasting
  const handleSend = async () => {
    if (!input && !file) return;

    // Get media URL from base handler
    const result = await baseHandleSend();
    if (!result) return;

    // Send to all selected users
    for (const id of ids) {
      await api.sendMessage(id, input, result.mediaUrl);
    }

    // Add message to UI
    setMessages((msgs) => [
      ...msgs,
      {
        sender: "me",
        text: input,
        mediaUrl: result.mediaUrl,
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  return (
    <ChatWindow
      messages={messages}
      input={input}
      setInput={setInput}
      file={file}
      setFile={setFile}
      progress={progress}
      handleSend={handleSend}
      bottomRef={bottomRef}
      onBack={() => navigate("/chats")}
    />
  );
};

export default BroadcastPage;

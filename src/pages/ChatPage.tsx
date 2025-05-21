import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMessaging } from "../hooks";
import ChatWindow from "../components/chat/ChatWindow";

const ChatPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    messages,
    input,
    setInput,
    file,
    setFile,
    progress,
    handleSend,
    bottomRef,
  } = useMessaging({ chatId: id });

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

export default ChatPage;

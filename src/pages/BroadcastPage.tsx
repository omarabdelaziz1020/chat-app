import React, { useMemo, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMessaging } from "../hooks";
import useMockApi from "../api/useMockApi";
import ChatWindow from "../components/chat/ChatWindow";
import type { User } from "../types";

const BroadcastPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const ids = useMemo(
    () => new URLSearchParams(location.search).get("ids")?.split(",") || [],
    [location.search]
  );
  const [recipients, setRecipients] = useState<User[]>([]);

  const api = useMockApi();
  const {
    messages,
    setMessages,
    input,
    setInput,
    file,
    setFile,
    progress,
    setProgress,
    bottomRef,
  } = useMessaging();
  // Clear messages when recipients change
  useEffect(() => {
    setMessages([]); // No history for broadcast
  }, [ids, setMessages]);

  // Fetch recipient information
  useEffect(() => {
    if (ids.length > 0) {
      api.getUsers().then((users) => {
        const selectedUsers = users.filter((user: User) =>
          ids.includes(user.id)
        );
        setRecipients(selectedUsers);
      });
    }
  }, [ids, api]); // Custom send handler for broadcasting
  const handleSend = async () => {
    if ((!input && !file) || ids.length === 0) return;

    let mediaUrl = "";
    // Process file upload if there is a file
    if (file) {
      try {
        setProgress(0);
        for (let i = 1; i <= 10; i++) {
          await new Promise((res) => setTimeout(res, 80));
          setProgress(i * 10);
        }
        mediaUrl = URL.createObjectURL(file);
      } catch (error) {
        console.error("Error uploading file:", error);
        return;
      }
    }

    try {
      // Send to all selected users
      const sendPromises = ids.map((id) =>
        api.sendMessage(id, input, mediaUrl)
      );
      await Promise.all(sendPromises);

      // Add message to UI
      setMessages((msgs) => [
        ...msgs,
        {
          sender: "me",
          text: input,
          mediaUrl,
          timestamp: new Date().toISOString(),
        },
      ]);

      // Reset input fields
      setInput("");
      setFile(null);
      setProgress(0);
    } catch (error) {
      console.error("Error sending messages:", error);
      // Reset progress if there was an error
      setProgress(0);
    }
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
      recipients={recipients}
    />
  );
};

export default BroadcastPage;

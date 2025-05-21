import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useMockApi from "../api/useMockApi";
import type { User } from "../types";
import "../styles/components/ChatList.scss";

const ChatListPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const navigate = useNavigate();
  const api = useMockApi();

  useEffect(() => {
    api.getUsers().then(setUsers);
  }, [api]);

  const handleSelect = (id: string) => {
    setSelected((sel) =>
      sel.includes(id) ? sel.filter((s) => s !== id) : [...sel, id]
    );
  };

  const handleChat = () => {
    if (selected.length === 1) navigate(`/chat/${selected[0]}`);
    if (selected.length > 1)
      navigate(`/chat/broadcast?ids=${selected.join(",")}`);
  };

  return (
    <div className="chat-list">
      <h2>Chats</h2>
      <ul>
        {users.map((u) => (
          <li
            key={u.id}
            className={selected.includes(u.id) ? "selected" : ""}
            onClick={() => handleSelect(u.id)}
          >
            {u.name}
          </li>
        ))}
      </ul>
      <button onClick={handleChat} disabled={selected.length === 0}>
        {selected.length > 1 ? "Broadcast" : "Open Chat"}
      </button>
    </div>
  );
};

export default ChatListPage;

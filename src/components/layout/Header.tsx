import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import "../../styles/components/_layout.scss";

const Header: React.FC = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="app-header">
      <div className="logo">React Chat App</div>

      <div className="actions">
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>
        {isAuthenticated && (
          <div className="user-info">
            <span className="username">{user?.name || "User"}</span>
            <button className="logout" onClick={logout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

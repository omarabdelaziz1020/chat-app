import type { JSX } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import LoginPage from "./pages/LoginPage";
import ChatListPage from "./pages/ChatListPage";
import ChatPage from "./pages/ChatPage";
import BroadcastPage from "./pages/BroadcastPage";
import Header from "./components/layout/Header";
import "./styles/App.scss";

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

function AppContent() {
  const { theme } = useTheme();
  return (
    <div className={`app-root ${theme}`} data-theme={theme}>
      <Header />
      <main className="app-main">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/chats"
            element={
              <PrivateRoute>
                <ChatListPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/chat/:id"
            element={
              <PrivateRoute>
                <ChatPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/chat/broadcast"
            element={
              <PrivateRoute>
                <BroadcastPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/chats" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

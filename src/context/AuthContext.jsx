// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for existing session
    const savedUserId = localStorage.getItem("userId");
    if (savedUserId) {
      try {
        const uid = JSON.parse(savedUserId);
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const foundUser = users.find(u => u.uid === uid);

        if (foundUser) {
          setUser({
            id: foundUser.uid,
            uid: foundUser.uid,
            email: foundUser.email,
            name: foundUser.name,
            avatar: foundUser.avatar || `https://i.pravatar.cc/40?u=${foundUser.uid}`,
          });
        } else {
          localStorage.removeItem("userId");
        }
      } catch (e) {
        console.error("Error parsing local session:", e);
        localStorage.removeItem("userId");
      }
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    localStorage.setItem("userId", JSON.stringify(userData.uid));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("userId");
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
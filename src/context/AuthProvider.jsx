import { useState } from "react";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  // Initialize state directly from localStorage (no effect needed)
  const [name, setName] = useState("");
  const [role, setRole] = useState(() => {
    if (localStorage.getItem("adminToken")) return "admin";
    return localStorage.getItem("role") || null;
  });

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Login
  const login = (userData, roleValue) => {
    localStorage.setItem("role", roleValue);
    localStorage.setItem("user", JSON.stringify(userData));

    setRole(roleValue);
    setUser(userData);
  };

  // Logout
  const logout = () => {
    localStorage.clear();
    setRole(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ role, user, login, logout, setRole, name, setName }}
    >
      {children}
    </AuthContext.Provider>
  );
}

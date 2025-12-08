import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [role, setRole] = useState(null); // patient, doctor, admin
  const [user, setUser] = useState(null);

  // Load token/role on page refresh
  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    const savedUser = localStorage.getItem("user");

    if (savedRole) setRole(savedRole);
    if (savedUser) setUser(JSON.parse(savedUser));
    if (localStorage.getItem("adminToken")) setRole("admin");
  }, []);

  const login = (userData, roleValue) => {
    localStorage.setItem("role", roleValue);
    localStorage.setItem("user", JSON.stringify(userData));
    setRole(roleValue);
    setUser(userData);
  };

  const logout = () => {
    localStorage.clear();
    setRole(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ role, user, login, logout, setRole }}>
      {children}
    </AuthContext.Provider>
  );
}

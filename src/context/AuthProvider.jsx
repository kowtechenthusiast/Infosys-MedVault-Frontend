import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [role, setRole] = useState(() => {
    if (localStorage.getItem("adminToken")) return "admin";
    return localStorage.getItem("role");
  });

  const [user, setUser] = useState(null);
  const [name, setName] = useState("");

  const userId = localStorage.getItem("userId");

  /* ================= FETCH USER BY ROLE ================= */

  const fetchUserByRole = async (userId, role) => {
    if (!userId || !role) return;

    try {
      const res = await fetch(
        `http://localhost:8080/api/profile/${role}/${userId}`
      );
      if (!res.ok) throw new Error("Failed to fetch user");

      const data = await res.json();
      setUser(data);
      setName(data.name || "");
      console.log("Fetched user data:", user);
    } catch (err) {
      console.error("Auth fetch error:", err);
      logout();
    }
  };

  /* ================= ON LOAD / REFRESH ================= */

  useEffect(() => {
    if (userId && role) {
      fetchUserByRole(userId, role);
    }
  }, [userId, role]);

  /* ================= LOGIN ================= */

  const login = (userData, roleValue) => {
    localStorage.setItem("role", roleValue);
    localStorage.setItem("userId", userData.id);

    setRole(roleValue);
    setUser(userData);
    setName(userData.name || "");
  };

  /* ================= LOGOUT ================= */

  const logout = () => {
    localStorage.clear();
    setRole(null);
    setUser(null);
    setName("");
  };

  return (
    <AuthContext.Provider
      value={{
        role,
        user,
        name,
        setName,
        login,
        logout,
        setRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

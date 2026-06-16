import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import UserApi from "../api/UserApi.jsx";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On first load, restore the session from a stored token (if any).
  useEffect(() => {
    const token = sessionStorage.getItem("jwt_token");
    if (!token) {
      setLoading(false);
      return;
    }
    UserApi.getSession()
      .then((res) => setUser(res.data))
      .catch(() => sessionStorage.removeItem("jwt_token"))
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (username, password) => {
    const res = await UserApi.login(username, password);
    const token = res.data.access_token;
    sessionStorage.setItem("jwt_token", token);
    const session = await UserApi.getSession();
    setUser(session.data);
    return session.data;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem("jwt_token");
    setUser(null);
  }, []);

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

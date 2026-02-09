import { createContext, useContext, useEffect, useRef, useState } from "react";
import api from "@/lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const initializedRef = useRef(false);

const refreshAuth = async () => {
  setLoading(true);

  try {
    const res = await api.get("/auth/me");
    const user = res.data?.user ?? null;

    setUser(user);
    setIsAuthenticated(Boolean(user));
  } catch (err) {
    setUser(null);
    setIsAuthenticated(false);
  } finally {
    setLoading(false);
  }
};

  /* Run once on app start */
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    refreshAuth();
  }, []);

  /* Clear auth locally (used on logout) */
  const clearAuth = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        refreshAuth,
        clearAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuthContext must be used inside AuthProvider");
  }
  return ctx;
}

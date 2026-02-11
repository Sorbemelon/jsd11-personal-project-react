import { createContext, useContext, useEffect, useRef, useState } from "react";
import api from "@/lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Start as false so Home renders instantly
  const [loading, setLoading] = useState(false);

  const initializedRef = useRef(false);
  const refreshingRef = useRef(false);

  /* Refresh auth state from backend
     - silent failure (no UI blocking)
     - prevents parallel calls */
  const refreshAuth = async () => {
    if (refreshingRef.current) return;
    refreshingRef.current = true;

    try {
      const res = await api.get("/auth/me");
      const userData = res.data?.user ?? null;

      setUser(userData);
      setIsAuthenticated(Boolean(userData));
    } catch {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      refreshingRef.current = false;
      setLoading(false);
    }
  };

  /* Run once on app start
     - DO NOT block initial render */
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    // run in background (next tick)
    setTimeout(refreshAuth, 0);
  }, []);

  // Clear auth locally (logout)
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

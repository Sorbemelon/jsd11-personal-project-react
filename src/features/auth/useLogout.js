// src/features/auth/useLogout.js
import { useNavigate } from "react-router-dom";
import api from "../../lib/api";
import useAuth from "./useAuth";

export default function useLogout() {
  const navigate = useNavigate();
  const { setIsAuthenticated, setUser } = useAuth();

  const logout = async () => {
    try {
      // 🔐 tell backend to clear refresh token cookie
      await api.post("/auth/logout");
    } catch (err) {
      // even if this fails, we still log out locally
      console.warn("Logout request failed:", err.message);
    } finally {
      // 🧹 clear local auth state
      localStorage.removeItem("accessToken");
      setIsAuthenticated(false);
      setUser(null);

      navigate("/");
    }
  };

  return logout;
}

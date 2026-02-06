import { useNavigate } from "react-router-dom";
import api from "../../lib/api";
import useAuth from "./useAuth";

export default function useLogout() {
  const navigate = useNavigate();
  const { clearAuth } = useAuth(); // centralised reset

  const logout = async () => {
    try {
      // tell backend to clear refresh token cookie
      await api.post("/auth/logout");
    } catch (err) {
      // even if this fails, we still log out locally
      console.warn("Logout request failed:", err?.message);
    } finally {
      // clear auth state via context (single source of truth)
      clearAuth();

      // redirect
      navigate("/", { replace: true });
    }
  };

  return logout;
}

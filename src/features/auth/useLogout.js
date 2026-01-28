// src/features/auth/useLogout.js
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

export default function useLogout() {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  const logout = () => {
    localStorage.removeItem("auth");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return logout;
}
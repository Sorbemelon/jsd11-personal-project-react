import { Navigate } from "react-router-dom";
import { useAuthContext } from "./AuthContext";

export default function RedirectIfAuth({ children }) {
  const { isAuthenticated, loading } = useAuthContext();

  if (loading) return null;

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

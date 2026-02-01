import { Navigate, useLocation } from "react-router-dom";
import useAuth from "./useAuth";

export default function RequireAuth({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // ⏳ still checking auth (e.g. /auth/me)
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-slate-500">
        Checking authentication…
      </div>
    );
  }

  // 🔒 not logged in → redirect to home (login)
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/"
        replace
        state={{ from: location }}
      />
    );
  }

  // ✅ authenticated
  return children;
}

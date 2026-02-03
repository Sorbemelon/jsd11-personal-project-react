import { Navigate, useLocation } from "react-router-dom";
import useAuth from "./useAuth";

export default function RequireAuth({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // ⏳ Still resolving auth state (/auth/me)
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-slate-500">
        Checking authentication…
      </div>
    );
  }

  // 🔒 Auth resolved → not logged in
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  // ✅ Authenticated
  return children;
}

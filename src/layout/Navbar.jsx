import { Link } from "react-router-dom";
import useAuth from "@/features/auth/useAuth";
import useLogout from "@/features/auth/useLogout";

export default function Navbar() {
  const { isAuthenticated } = useAuth();
  const logout = useLogout();

  return (
    <nav className="bg-linear-to-r from-black via-gray-800 via-60% to-[#CCFF00] text-white px-6 py-4 shadow-xl">
      <div className="flex items-center justify-between mx-auto h-8">
        {/* Logo */}
        <Link
          to="/"
          className="flex text-3xl font-bold tracking-wide text-gray-100"
        >
          <div>Autumdata</div>
          <div className="hidden lg:block">: AI Document RAG System</div>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <button
                onClick={logout}
                className="px-4 py-1.5 rounded-full bg-black border border-white/20 hover:bg-white hover:text-black transition font-semibold text-sm"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              {/* <Link
                to="/"
                className="px-4 py-1.5 rounded-full bg-black border border-white/20 hover:bg-white hover:text-black transition"
              >
                Get Started
              </Link> */}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
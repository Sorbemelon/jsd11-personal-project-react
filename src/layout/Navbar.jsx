import { Link, useLocation } from "react-router-dom";
import useAuth from "@/features/auth/useAuth";
import useLogout from "@/features/auth/useLogout";
import { useState, useEffect } from "react";
import { AuroraText } from "@/components/ui/aurora-text";

export default function Navbar() {
  const { isAuthenticated } = useAuth();
  const logout = useLogout();
  const location = useLocation();
  const [view, setView] = useState("");

  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/home" ) {
      setView("home");
    } else if (location.pathname === "/dashboard") {
      setView("dashboard");
    } else {
      setView("");
    }
  }, [location.pathname]);


  return (
    <nav className="bg-linear-to-r from-black via-gray-800 via-60% to-[#CCFF00] text-white px-6 py-4 shadow-xl absolute w-full">
      <div className="flex items-center justify-between mx-auto h-8">
        <Link
          to="/"
          className="flex text-3xl font-bold tracking-wide text-gray-100"
        >
          { view === "home" && <div className="hidden lg:block">Autumdata</div>}
          { view === "dashboard" && <AuroraText>Autumdata</AuroraText>}
          <div className="hidden lg:block">: </div>
          { view === "home" && <div className="text-2xl lg:hidden">AI Document RAG System</div>}
          <div className="hidden lg:block text-3xl ml-2">AI Document RAG System</div>
        </Link>

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
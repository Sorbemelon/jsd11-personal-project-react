import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import { Toaster } from "sonner";

export default function Layout() {
    return (
        <div className="h-screen min-h-fit">
            <Navbar />
            <div className="pt-16 h-full">
                <Toaster position="top-center" richColors />
                <Outlet />
            </div>
        </div>
    )
}
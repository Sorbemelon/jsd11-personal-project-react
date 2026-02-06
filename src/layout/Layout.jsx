import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"

export default function Layout() {
    return (
        <>
            <Navbar />
            <div className="min-h-[calc(100dvh-64px)]">
                <Outlet />
            </div>
        </>
    )
}
import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import MessageProvider from "../context/MessageProvider";


export default function Layout() {
    return (
        <MessageProvider>
            <Navbar />
            <div className="min-h-[calc(100dvh-64px)]">
                <Outlet />
            </div>
        </MessageProvider>
    )
}
import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import MessageProvider from "../context/MessageProvider";


export default function Layout() {
    return (
        <MessageProvider>
            <Navbar />
            <div>
                <Outlet />
            </div>
        </MessageProvider>
    )
}
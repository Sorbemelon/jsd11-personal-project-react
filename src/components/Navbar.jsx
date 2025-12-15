import { Link } from "react-router-dom";
import { MessageContext } from "../context/MessageContext";

export default function Navbar() {

    return (
        <nav className="bg-linear-to-br from-black to-gray-800 text-white p-4 shadow-xl">
            <ul className="flex justify-center gap-8 text-2xl *:whitespace-nowrap">
                <li className="w-full justify-self-start text-start">
                    <div>
                        Logo
                    </div>
                </li>
                <li>
                    <Link to="/" >
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/owner">
                        Explore
                    </Link>
                </li>
                <li>
                    Contact Us
                </li>
                <li className="w-full justify-self-end">
                    <div className="flex w-fit border rounded-full ml-auto py-1 px-4 hover:cursor-pointer">
                        <p className="text-base font-bold">Sign In</p>
                    </div>
                </li>
            </ul>
        </nav>
    )
}
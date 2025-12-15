import { useContext } from "react";
import { MessageContext } from "../context/MessageContext";
import { Link } from "react-router-dom";
import ViewToggleButton from "../components/ViewToggleButton";

export default function Home() {
    return (
        <div>
            <section className="flex flex-col h-[calc(100dvh-66px)] pt-10 gap-y-4 items-center 800 text-white">
                <div className="font-semibold tracking-widest text-[#CCFF00] bg-black rounded-full py-1 px-4 border border-gray-500 md:mt-18 mb-8"> + POWERED BY AI + </div>
                <h1 className="text-center md:leading-20">Reliable User Friendly<br />Data Storage Service</h1>
                <p className="max-w-150 text-lg my-8 px-4">The easiest wat to query Blockchain data from 35+ chains including Ehereum, BSC, Polygon to AI Powered Blockchain Data</p>
                <div className="flex gap-2 md:gap-8">
                    <button className="px-6 py-3 text-black bg-[#CCFF00] rounded-full shadow-lg text-lg font-semibold transition duration-300 ease-in-out hover:bg-indigo-700 hover:text-white hover:cursor-pointer">
                        TRY NOW!
                    </button>
                    <button className="px-6 py-3 text-black bg-gray-100 rounded-full shadow-lg text-lg font-semibold transition duration-300 ease-in-out hover:bg-indigo-700 hover:text-white hover:cursor-pointer">
                        GET STARTED -{">"}
                    </button>
                </div>
                <div className="w-full flex flex-col items-center mt-auto mb-12">
                    <div className="w-full flex items-center mb-4">
                        <hr className="h-0.5 w-full md:ml-30 mr-4 bg-linear-to-r from-none to-white border-none" />
                            <h3 className="text-center text-2xl">PARTNER</h3>
                        <hr className="h-0.5 w-full ml-4 md:mr-30 bg-linear-to-l from-none to-white border-none" />
                    </div>
                    <div>
                        <img src="generation_thailand_logo.webp" className="h-30" />
                    </div>
                </div>
            </section>
            <section className="flex flex-col md:mt-30 pt-10 gap-y-4 items-center 800 text-white">
                <div className="w-full flex flex-col items-center mt-auto mb-60">
                    <div className="w-full flex items-center mb-8">
                        <hr className="h-0.5 w-full md:ml-30 mr-4 bg-linear-to-r from-none to-white border-none" />
                            <h3 className="text-center text-2xl md:whitespace-nowrap">Blockchain and AI Integration</h3>
                        <hr className="h-0.5 w-full ml-4 md:mr-30 bg-linear-to-l from-none to-white border-none" />
                    </div>
                    <div>
                        <p className="text-xl px-10 md:text-5xl md:px-65">Unmarshal in revolutionising the intersection of blockchain and artificial intelligence, ushering in a new era of blockchain data indexing. Our mission is to seamlessly inetgrate these key technologies to unlock new possibilities and drive innovations</p>
                    </div>
                </div>
            </section>
        </div>
    )
}
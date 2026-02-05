import { Sparkles } from "lucide-react";
import { useState } from "react";
import LoginForm from "./Login/LoginForm";
import CreateAccountForm from "./Login/CreateAccountForm";
import { AuroraText } from "@/components/ui/aurora-text";

export default function Home() {
  const [mode, setMode] = useState("login"); // "login" | "register"

  return (
    <div className="min-h-[calc(100dvh-64px)] bg-linear-to-br from-gray-800 to-black flex flex-col lg:flex-row">
      {/* LEFT: HERO */}
      <section className="flex flex-col justify-center lg:w-1/2 lg:px-16 text-white">
        <div className="max-w-xl flex flex-col items-center">
          <AuroraText className="text-7xl mb-2 font-bold leading-tight text-center">
            Autumnata
          </AuroraText>

          <div className="hidden lg:inline-flex items-center gap-2 px-4 py-1 mb-4 rounded-full border border-white/20 bg-gray-700 text-[#CCFF00] tracking-widest text-xs font-semibold">
            <Sparkles size={14} />
            POWERED BY AI
          </div>

          <h2 className="text-2xl font-semibold leading-tight mb-10 text-center">
            AI Document RAG System for<br /> 
            Intelligent Knowledge Discovery
          </h2>

          <p className="hidden lg:block text-lg text-white mb-6 text-center">
            Upload, transform, and query your documents with AI-powered retrieval.
            Turn structured and unstructured data into actionable insights.
          </p>

          <ul className="hidden lg:block space-y-4 text-white">
            <li>• Retrieval-augmented AI document search</li>
            <li>• Automatic text extraction, chunking, and embeddings</li>
            <li>• Scalable knowledge system built for real-world use</li>
          </ul>
        </div>
      </section>

      {/* RIGHT: AUTH CARD */}
      <section className="flex lg:flex-1 items-center justify-center px-6 mt-6 lg:mt-0">
        {mode === "login" ? (
          <LoginForm onSwitch={() => setMode("register")} />
        ) : (
          <CreateAccountForm onSwitch={() => setMode("login")} />
        )}
      </section>
    </div>
  );
}

import { Sparkles } from "lucide-react";
import { useState } from "react";
import LoginForm from "./Login/LoginForm";
import CreateAccountForm from "./Login/CreateAccountForm";
import { AuroraText } from "@/components/ui/aurora-text";

export default function Home() {
  const [mode, setMode] = useState("login"); // "login" | "register"

  return (
    <div className="h-full bg-linear-to-br from-gray-800 to-black flex flex-col lg:flex-row lg:justify-around px-6">
      {/* LEFT: HERO */}
      <section className="flex flex-col justify-center text-white">
        <div className="max-w-xl flex flex-col items-center text-center">
          <AuroraText className="text-7xl mb-3 font-bold leading-tight">
            Autumdata
          </AuroraText>

          <div className="flex items-center gap-2 px-4 py-1 mb-8 rounded-full border border-white/20 bg-gray-700 text-[#CCFF00] tracking-widest text-xs font-semibold">
            <Sparkles size={14} />
            AI-POWERED KNOWLEDGE
          </div>

          <p className="text-lg text-white/90 lg:mb-6">
            Turn your documents into a searchable AI knowledge hub.
            Upload files, extract insights automatically, and chat with your data
            to get precise answers in seconds.
          </p>

          <ul className="hidden lg:block space-y-4 text-white/90 text-left">
            <li>• Works with text, PDF, Word, Excel, PowerPoint, and images (OCR)</li>
            <li>• Smart extraction, chunking, embeddings, and semantic retrieval</li>
            <li>• Instant AI answers grounded in your own documents</li>
          </ul>
        </div>
      </section>

      {/* RIGHT: AUTH CARD */}
      <section className="flex items-center mt-6 lg:mt-0">
        {mode === "login" ? (
          <LoginForm onSwitch={() => setMode("register")} />
        ) : (
          <CreateAccountForm onSwitch={() => setMode("login")} setMode={setMode} />
        )}
      </section>
    </div>
  );
}

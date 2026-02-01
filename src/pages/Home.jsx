import { Sparkles } from "lucide-react";
import { useState } from "react";
import LoginForm from "./Login/LoginForm";
import CreateAccountForm from "./Login/CreateAccountForm";

export default function Home() {
  const [mode, setMode] = useState("login"); // "login" | "register"

  return (
    <div className="min-h-[calc(100dvh-64px)] bg-linear-to-br from-gray-800 to-black flex">
      {/* LEFT: HERO */}
      <section className="hidden lg:flex flex-col justify-center w-1/2 px-16 text-white">
        <div className="max-w-xl flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1 mb-6 rounded-full border border-white/20 bg-black text-[#CCFF00] tracking-widest text-xs font-semibold">
            <Sparkles size={14} />
            POWERED BY AI
          </div>

          <h1 className="text-5xl font-bold leading-tight mb-6 text-center">
            Smart File Management <br />
            for AI-Driven Insights
          </h1>

          <p className="text-lg text-white/80 mb-10 text-center">
            Upload, organize, and query your documents effortlessly.
            AI-powered insights from structured and unstructured data.
          </p>

          <ul className="space-y-4 text-white/80">
            <li>• AI-powered document search</li>
            <li>• Structured JSON storage</li>
            <li>• Built for teams & scalability</li>
          </ul>
        </div>
      </section>

      {/* RIGHT: AUTH CARD */}
      <section className="flex flex-1 items-center justify-center px-6">
        {mode === "login" ? (
          <LoginForm onSwitch={() => setMode("register")} />
        ) : (
          <CreateAccountForm onSwitch={() => setMode("login")} />
        )}
      </section>
    </div>
  );
}

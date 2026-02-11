import Sparkles from "lucide-react/dist/esm/icons/sparkles";
import { useState, lazy, Suspense } from "react";
import { AuroraText } from "@/components/ui/aurora-text";

// Lazy load heavy auth components
const LoginForm = lazy(() => import("./Login/LoginForm"));
const CreateAccountForm = lazy(() => import("./Login/CreateAccountForm"));

export default function Home() {
  const [mode, setMode] = useState("login"); // "login" | "register"

  return (
    <div className="min-h-full bg-linear-to-br from-gray-800 to-black flex flex-col lg:flex-row lg:justify-around items-center px-6">
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

          <p className="lg:text-lg text-white/90 lg:mb-6">
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
        <Suspense
          fallback={
            <div className="text-white/70 text-sm animate-pulse">
              Loading authentication…
            </div>
          }
        >
          {mode === "login" ? (
            <LoginForm onSwitch={() => setMode("register")} />
          ) : (
            <CreateAccountForm
              onSwitch={() => setMode("login")}
              setMode={setMode}
            />
          )}
        </Suspense>
      </section>
    </div>
  );
}

// src/pages/Login/LoginPage.jsx
import { Sparkles, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import useLogin from "@/features/auth/useLogin";

export default function LoginPage() {
  const {
    form,
    loading,
    error,
    handleChange,
    handleSubmit,
  } = useLogin();

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

      {/* RIGHT: LOGIN */}
      <section className="flex flex-1 items-center justify-center px-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-2 text-black">
            Sign in to access your dashboard
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="text-sm font-medium text-slate-700">
                Email
              </label>
              <div className="mt-1 relative">
                <Mail
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-10 pr-3 py-2 border rounded-xl text-sm focus:outline-none focus:ring focus:ring-[#CCFF00]/40"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-slate-700">
                Password
              </label>
              <div className="mt-1 relative">
                <Lock
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-3 py-2 border rounded-xl text-sm focus:outline-none focus:ring focus:ring-[#CCFF00]/40"
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-600">
                <input
                  type="checkbox"
                  name="remember"
                  checked={form.remember}
                  onChange={handleChange}
                  className="rounded"
                />
                Remember me
              </label>
              <button
                type="button"
                className="text-[#6a7f00] hover:underline"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#CCFF00] text-black font-semibold rounded-xl hover:bg-[#b8e600] disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Don’t have an account?{" "}
            <span className="text-black font-medium cursor-pointer hover:underline">
              Get started
            </span>
          </p>
        </div>
      </section>
    </div>
  );
}
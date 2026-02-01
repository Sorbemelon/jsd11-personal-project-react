import { useState } from "react";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { Mail, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuth from "@/features/auth/useAuth";

export default function CreateAccountForm({ onSwitch }) {
  const navigate = useNavigate();
  const { setIsAuthenticated, setUser } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setError(null);

    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match");
    }

    setLoading(true);

    try {
      // 1️⃣ Register (wait until success)
      await api.post("/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      // 2️⃣ Login using SAME logic as LoginForm
      const res = await api.post("/auth/login", {
        email: form.email,
        password: form.password,
      });

      const { accessToken, user } = res.data;

      // 3️⃣ Persist auth (same as useLogin)
      localStorage.setItem("accessToken", accessToken);
      setIsAuthenticated(true);
      setUser(user);

      // 4️⃣ Redirect AFTER auth state is ready
      navigate("/dashboard");
    } catch (err) {
      if (err.response?.status === 409) {
        setError("Email already registered. Please sign in instead.");
      } else {
        setError(
          err.response?.data?.message || "Failed to create account"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-2xl font-bold mb-2 text-black">
        Create your account
      </h2>

      <p className="text-sm text-slate-600 mb-6">
        Get started with your AI-powered workspace
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="text-sm font-medium text-slate-700">
            Name
          </label>
          <div className="relative mt-1">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-3 py-2 border rounded-xl text-sm"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="text-sm font-medium text-slate-700">
            Email
          </label>
          <div className="relative mt-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-3 py-2 border rounded-xl text-sm"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="text-sm font-medium text-slate-700">
            Password
          </label>
          <div className="relative mt-1">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-3 py-2 border rounded-xl text-sm"
            />
          </div>
        </div>

        {/* Confirm */}
        <div>
          <label className="text-sm font-medium text-slate-700">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-xl text-sm"
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-[#CCFF00] text-black font-semibold rounded-xl hover:bg-[#b8e600] disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Create Account"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <span
          onClick={onSwitch}
          className="text-black font-medium cursor-pointer hover:underline"
        >
          Sign in
        </span>
      </p>
    </div>
  );
}

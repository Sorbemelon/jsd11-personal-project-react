import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../lib/api";
import useAuth from "./useAuth";

export default function useLogin() {
  const navigate = useNavigate();
  const { setIsAuthenticated, setUser } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🚫 prevent spam submit
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      const res = await api.post("/auth/login", {
        email: form.email,
        password: form.password,
        remember: form.remember,
      });

      const { accessToken, user } = res.data;

      // 🔐 short-lived token
      localStorage.setItem("accessToken", accessToken);

      // refreshToken is HttpOnly cookie
      setIsAuthenticated(true);
      setUser(user);

      navigate("/dashboard");
    } catch (err) {
      if (err.response?.status === 429) {
        setError(
          "Too many login attempts. Please wait a moment before trying again."
        );
      } else {
        setError(
          err?.response?.data?.message || "Invalid email or password"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    error,
    handleChange,
    handleSubmit,
  };
}

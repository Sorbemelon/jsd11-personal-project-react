import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

export default function useLogin() {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

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
    setLoading(true);
    setError(null);

    try {
      // 🔁 Replace with real API later
      await new Promise((r) => setTimeout(r, 800));

      localStorage.setItem("auth", "true");
      setIsAuthenticated(true);

      navigate("/dashboard");
    } catch {
      setError("Invalid email or password");
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
import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    "http://localhost:3000/api/v1",
  withCredentials: true, // 🔑 required for refresh cookie
});

/* ======================================================
   REQUEST: Attach access token
====================================================== */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* ======================================================
   RESPONSE: Auto refresh on 401
====================================================== */
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (!originalRequest || originalRequest._retry) {
      return Promise.reject(err);
    }

    const isAuthEndpoint = [
      "/auth/login",
      "/auth/register",
      "/auth/refresh",
      "/auth/logout",
    ].some((path) => originalRequest.url?.includes(path));

    if (err.response?.status === 401 && !isAuthEndpoint) {
      originalRequest._retry = true;

      try {
        // 🔁 refreshToken is sent automatically via cookie
        const refreshRes = await api.post("/auth/refresh");

        const newAccessToken =
          refreshRes.data?.accessToken ||
          refreshRes.headers?.["x-access-token"];

        if (!newAccessToken) {
          throw new Error("No access token returned");
        }

        localStorage.setItem("accessToken", newAccessToken);
        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch {
        // ❌ refresh failed → force logout
        localStorage.removeItem("accessToken");
        window.location.href = "/";
      }
    }

    return Promise.reject(err);
  }
);

export default api;

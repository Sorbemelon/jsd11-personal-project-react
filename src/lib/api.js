import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1",
  withCredentials: true, // REQUIRED for refresh token cookie
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
   RESPONSE: Auto refresh on 401 (SAFE)
====================================================== */
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    const isAuthEndpoint =
      originalRequest?.url?.includes("/auth/login") ||
      originalRequest?.url?.includes("/auth/register") ||
      originalRequest?.url?.includes("/auth/refresh") ||
      originalRequest?.url?.includes("/auth/logout");

    // 🔒 Only refresh for protected APIs
    if (
      err.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthEndpoint
    ) {
      originalRequest._retry = true;

      try {
        const { data } = await api.post("/auth/refresh");

        localStorage.setItem("accessToken", data.accessToken);
        originalRequest.headers.Authorization =
          `Bearer ${data.accessToken}`;

        return api(originalRequest);
      } catch {
        // refresh failed → force logout
        localStorage.removeItem("accessToken");
        window.location.href = "/";
      }
    }

    return Promise.reject(err);
  }
);

export default api;

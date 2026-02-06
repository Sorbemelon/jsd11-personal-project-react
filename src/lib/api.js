import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    "http://localhost:3000/api/v1",
  withCredentials: true, // cookie-based auth
});

/* RESPONSE: Auto refresh on 401 (SAFE & LOOP-PROOF) */
let isRefreshing = false;
let refreshQueue = [];

const processQueue = (error) => {
  refreshQueue.forEach((p) => {
    error ? p.reject(error) : p.resolve();
  });
  refreshQueue = [];
};

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (!originalRequest || originalRequest._retry) {
      return Promise.reject(err);
    }

    const NO_REFRESH_ENDPOINTS = [
      "/auth/login",
      "/auth/register",
      "/auth/logout",
      "/auth/refresh",
      "/auth/me",
    ];

    const shouldSkipRefresh =
      err.response?.status !== 401 ||
      NO_REFRESH_ENDPOINTS.some((path) =>
        originalRequest.url?.includes(path)
      );

    if (shouldSkipRefresh) {
      return Promise.reject(err);
    }

    originalRequest._retry = true;

    // Queue while refresh is running
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        refreshQueue.push({ resolve, reject });
      }).then(() => api(originalRequest));
    }

    isRefreshing = true;

    try {
      await api.post("/auth/refresh");

      processQueue(null);
      return api(originalRequest);
    } catch (refreshErr) {
      // Refresh failed = unauthenticated
      processQueue(refreshErr);

      // DO NOT redirect / reload here
      return Promise.reject(refreshErr);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;

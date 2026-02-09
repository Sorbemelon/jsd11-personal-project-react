import axios from "axios";
import { toast } from "sonner";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    "http://localhost:3000/api/v1",
  withCredentials: true,
});

/* LOGIN SESSION MEMORY FLAG */
let hasLoggedIn = false;

export const setHasLoggedIn = (value) => {
  hasLoggedIn = value;
};

/* AUTO REFRESH (SAFE & LOOP-PROOF) */
let isRefreshing = false;
let refreshQueue = [];

/* prevent multiple logout toasts */
let hasShownForceLogoutToast = false;

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
    const status = err.response?.status;
    const url = originalRequest?.url || "";

    /* 1️⃣ SILENT 401 FOR /auth/me
       Not logged in = NORMAL */
    if (status === 401 && url.includes("/auth/me")) {
      if (import.meta.env.DEV) {
        console.info("Auth check: user not logged in.");
      }

      return Promise.resolve({ data: { user: null } });
    }

    /* stop if already retried or invalid request */
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
      status !== 401 ||
      NO_REFRESH_ENDPOINTS.some((path) => url.includes(path));

    /* never refresh if:
       - endpoint skipped
       - user never logged in */
    if (shouldSkipRefresh || !hasLoggedIn) {
      return Promise.reject(err);
    }

    originalRequest._retry = true;

    /* queue while refresh is running */
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
      processQueue(refreshErr);

      /* FORCE LOGOUT DETECTED */
      if (!hasShownForceLogoutToast) {
        hasShownForceLogoutToast = true;

        toast.error("Session expired", {
          description: "Please sign in again.",
        });
      }

      /* reset login memory */
      hasLoggedIn = false;

      return Promise.reject(refreshErr);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;

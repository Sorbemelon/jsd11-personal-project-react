import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

import Layout from "@/layout/Layout";
import Home from "@/pages/Home";
import RequireAuth from "@/features/auth/RequireAuth";
import RedirectIfAuth from "@/features/auth/RedirectIfAuth";

// Lazy load heavy pages
const Dashboard = lazy(() => import("@/pages/Dashboard"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-4xl font-semibold">
          404 – Page Not Found 🤒
        </h1>
      </div>
    ),
    children: [
      // Public routes
      {
        index: true,
        element: (
          <RedirectIfAuth>
            <Home />
          </RedirectIfAuth>
        ),
      },
      {
        path: "home",
        element: (
          <RedirectIfAuth>
            <Home />
          </RedirectIfAuth>
        ),
      },

      // Protected routes
      {
        path: "dashboard",
        element: (
          <RequireAuth>
            <Suspense
              fallback={
                <div className="flex h-full items-center justify-center">
                  <p className="text-slate-500">Loading dashboard…</p>
                </div>
              }
            >
              <Dashboard />
            </Suspense>
          </RequireAuth>
        ),
      },
    ],
  },
]);

export default router;

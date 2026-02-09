import { createBrowserRouter } from "react-router-dom";
import Layout from "@/layout/Layout";
import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";
import RequireAuth from "@/features/auth/RequireAuth";
import RedirectIfAuth from "@/features/auth/RedirectIfAuth";

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
            <Dashboard />
          </RequireAuth>
        ),
      },
    ],
  },
]);

export default router;

import { createBrowserRouter } from "react-router-dom";

import Layout from "@/layout/Layout";
import Login from "@/pages/LoginPage";
import Dashboard from "@/pages/Dashboard";

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
      { index: true, element: <Login /> },      // "/"
      { path: "login", element: <Login /> },     // "/user"
      { path: "dashboard", element: <Dashboard /> } // "/dashboard"
    ]
  }
]);

export default router;
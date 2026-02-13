import { RouterProvider } from "react-router-dom";
import router from "./router";
import { AuthProvider } from "@/features/auth/AuthContext";
import { Analytics } from "@vercel/analytics/react";

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <Analytics />
    </AuthProvider>
  );
}
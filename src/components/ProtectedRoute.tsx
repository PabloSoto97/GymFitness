// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const { user } = useAuth();

  // 🔥 Si hay usuario Firebase → cliente logeado
  if (user) return children;

  // 🔥 Si hay token → admin logeado
  if (token) return children;

  // ❌ Si no hay nada → fuera
  return <Navigate to="/login" replace />;
};

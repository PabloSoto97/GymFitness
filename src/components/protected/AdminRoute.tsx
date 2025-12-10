// src/components/protected/AdminRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface Props {
  children: JSX.Element;
}

export const AdminRoute = ({ children }: Props) => {
  const { admin } = useAuth();

  return admin ? children : <Navigate to="/ingresar" replace />;
};

// AppRouter.jsx
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "./layouts/AppLayout";

import {
  Ejercicios,
  Inicio,
  Rutinas,
  RutinaAvanzado,
  RutinaIntermedio,
  RutinaPrincipiante,
  RutinaGluteosFemorales,
  RutinaFullBody3Dias,
  RutinaActivoFuncional,
  CalculadoraMacros,
  Login,
} from "./view";
import Register from "./view/Register";
import LoginFire from "./view/LoginFire";
import AdminPanel from "./view/AdminPanel";

import { ProtectedRoute } from "./components/ProtectedRoute";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🔥 LOGIN SIN LAYOUT (para evitar el formato viejo) */}
        <Route path="/login" element={<LoginFire />} />
        <Route path="/ingresar" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🔥 TODO LO QUE SI USA LAYOUT PRINCIPAL */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<Inicio />} />

          {/* 🔒 RUTAS PROTEGIDAS */}
          <Route
            path="/ejercicios"
            element={
              <ProtectedRoute>
                <Ejercicios />
              </ProtectedRoute>
            }
          />

          <Route
            path="/rutinas"
            element={
              <ProtectedRoute>
                <Rutinas />
              </ProtectedRoute>
            }
          />

          <Route
            path="/macros"
            element={
              <ProtectedRoute>
                <CalculadoraMacros />
              </ProtectedRoute>
            }
          />

          <Route
            path="/rutinas/principiante"
            element={
              <ProtectedRoute>
                <RutinaPrincipiante />
              </ProtectedRoute>
            }
          />

          <Route
            path="/rutinas/intermedio"
            element={
              <ProtectedRoute>
                <RutinaIntermedio />
              </ProtectedRoute>
            }
          />

          <Route
            path="/rutinas/avanzado"
            element={
              <ProtectedRoute>
                <RutinaAvanzado />
              </ProtectedRoute>
            }
          />

          <Route
            path="/rutinas/gluteos-femorales"
            element={
              <ProtectedRoute>
                <RutinaGluteosFemorales />
              </ProtectedRoute>
            }
          />

          <Route
            path="/rutinas/activo-funcional"
            element={
              <ProtectedRoute>
                <RutinaActivoFuncional />
              </ProtectedRoute>
            }
          />

          <Route
            path="/rutinas/full-body-3dias"
            element={
              <ProtectedRoute>
                <RutinaFullBody3Dias />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* 🔒 PANEL ADMIN (fuera del layout principal) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />

        {/* RUTA DEFAULT */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

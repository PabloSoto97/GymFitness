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
  Login,
} from "./view";
import AdminPanel from "./view/AdminPanel";
import { ProtectedRoute } from "./components/ProtectedRoute";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* RUTAS CON LAYOUT PRINCIPAL */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<Login />} />

          {/* RUTAS PROTEGIDAS */}
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

        {/* PANEL ADMIN PROTEGIDO */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />

        {/* RUTA POR DEFECTO */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

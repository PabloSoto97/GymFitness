import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";

export const AppLayout = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#050505] via-[#0d0d0d] to-[#111] text-white">
      {/* Sidebar fijo */}
      <Sidebar />

      {/* Contenido principal ocupa todo el espacio sin márgenes */}
      <main className="flex-1 ml-0 md:ml-56 h-screen overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

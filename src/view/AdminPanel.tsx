import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getClientes,
  crearCliente,
  eliminarCliente,
  actualizarCliente,
} from "../services/clienteService";
import ClienteTable from "../components/ClienteTable";
import ClienteForm from "../components/ClienteForm";
import { Link } from "react-router-dom";
interface Cliente {
  id: number;
  nombre: string;
  email: string;
  telefono?: string;
  fechaInicio: string;
  fechaFin?: string;
  notificado?: boolean;
  pagado: boolean;
}

const AdminPanel: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [filtro, setFiltro] = useState<string>("todos");
  const [token] = useState(localStorage.getItem("token") || "");
  const [modo, setModo] = useState<"tabla" | "nuevo" | "editar">("tabla");
  const [clienteActual, setClienteActual] = useState<Cliente | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const rol = localStorage.getItem("rol");
    if (!token || rol !== "ADMIN") {
      navigate("/login");
    }
  }, [navigate]);

  const cargarClientes = async () => {
    try {
      const data = await getClientes(token);
      setClientes(data);
    } catch (error) {
      console.error("Error al cargar clientes:", error);
    }
  };

  useEffect(() => {
    cargarClientes();
  }, []);

  const handleCrear = async (data: Omit<Cliente, "id" | "fechaInicio">) => {
    try {
      await crearCliente(data, token);
      setModo("tabla");
      await cargarClientes();
    } catch (error) {
      console.error("Error al crear cliente:", error);
    }
  };

  const handleActualizar = async (data: Partial<Cliente>) => {
    if (!clienteActual) return;
    try {
      await actualizarCliente(clienteActual.id, data, token);
      setModo("tabla");
      setClienteActual(null);
      await cargarClientes();
    } catch (error) {
      console.error("Error al actualizar cliente:", error);
    }
  };

  const handleEliminar = async (id: number) => {
    if (!window.confirm("¿Seguro que deseas eliminar este cliente?")) return;
    try {
      await eliminarCliente(id, token);
      await cargarClientes();
    } catch (error) {
      console.error("Error al eliminar cliente:", error);
    }
  };

  // 🔍 Filtro de clientes
  const clientesFiltrados = clientes.filter((c) => {
    const hoy = new Date();
    const fechaInicio = new Date(c.fechaInicio);
    const fechaFin = c.fechaFin ? new Date(c.fechaFin) : null;
    const diasDesdeInicio =
      (hoy.getTime() - fechaInicio.getTime()) / (1000 * 60 * 60 * 24);
    const diasParaVencer = fechaFin
      ? (fechaFin.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24)
      : null;

    switch (filtro) {
      case "ultimos14":
        return diasDesdeInicio <= 14;
      case "ultimos30":
        return diasDesdeInicio <= 30;
      case "porVencer":
        return (
          diasParaVencer !== null && diasParaVencer <= 3 && diasParaVencer >= 0
        );
      case "vencidos":
        return diasParaVencer !== null && diasParaVencer < 0;
      default:
        return true;
    }
  });

  // 📊 Métricas para el resumen
  const hoy = new Date();
  const activos = clientes.filter(
    (c) => c.fechaFin && new Date(c.fechaFin) > hoy
  ).length;
  const porVencer = clientes.filter((c) => {
    if (!c.fechaFin) return false;
    const dias =
      (new Date(c.fechaFin).getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24);
    return dias <= 3 && dias >= 0;
  }).length;
  const vencidos = clientes.filter(
    (c) => c.fechaFin && new Date(c.fechaFin) < hoy
  ).length;
  const nuevos14 = clientes.filter((c) => {
    const dias =
      (hoy.getTime() - new Date(c.fechaInicio).getTime()) /
      (1000 * 60 * 60 * 24);
    return dias <= 14;
  }).length;

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-gray-950 to-black text-white p-8 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/bg.jpeg')] bg-cover bg-center opacity-30 blur-sm"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <Link to="/">
            <h1 className="text-4xl font-extrabold text-pink-400 drop-shadow-[0_0_15px_#ec4899]">
              Panel de Administración 💪
            </h1>
          </Link>

          <div className="flex flex-wrap items-center gap-4 mt-4 sm:mt-0">
            {/* Selector de filtro */}
            <select
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="bg-gray-800 border border-pink-500 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option value="todos">Todos</option>
              <option value="ultimos14">Inscritos últimos 14 días</option>
              <option value="ultimos30">Inscritos últimos 30 días</option>
              <option value="porVencer">Vencen en ≤ 3 días</option>
              <option value="vencidos">Vencidos</option>
            </select>

            <button
              onClick={() => {
                if (modo === "nuevo") {
                  setModo("tabla");
                  setClienteActual(null);
                } else {
                  setModo("nuevo");
                }
              }}
              className="bg-pink-600 hover:bg-pink-500 px-5 py-2 rounded-xl font-semibold shadow-lg shadow-pink-500/40 transition-all duration-300"
            >
              {modo === "nuevo" ? "Cancelar" : "Agregar Cliente"}
            </button>
          </div>
        </header>

        {/* 📈 Tarjetas de métricas */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 animate-fadeIn">
          <div className="bg-gray-900 p-4 rounded-xl text-center border border-pink-500/30 shadow-md">
            <p className="text-sm text-gray-400">Activos</p>
            <p className="text-2xl font-bold text-green-400">{activos}</p>
          </div>
          <div className="bg-gray-900 p-4 rounded-xl text-center border border-yellow-500/30 shadow-md">
            <p className="text-sm text-gray-400">Por vencer (≤3 días)</p>
            <p className="text-2xl font-bold text-yellow-400">{porVencer}</p>
          </div>
          <div className="bg-gray-900 p-4 rounded-xl text-center border border-red-500/30 shadow-md">
            <p className="text-sm text-gray-400">Vencidos</p>
            <p className="text-2xl font-bold text-red-400">{vencidos}</p>
          </div>
          <div className="bg-gray-900 p-4 rounded-xl text-center border border-pink-500/30 shadow-md">
            <p className="text-sm text-gray-400">Nuevos (14 días)</p>
            <p className="text-2xl font-bold text-pink-400">{nuevos14}</p>
          </div>
        </div>

        {modo !== "tabla" && (
          <div className="mb-10 animate-fadeIn">
            <ClienteForm
              clienteEditando={modo === "editar" ? clienteActual : undefined}
              onSubmit={modo === "editar" ? handleActualizar : handleCrear}
              onCancel={() => {
                setModo("tabla");
                setClienteActual(null);
              }}
            />
          </div>
        )}

        {modo === "tabla" && (
          <ClienteTable
            clientes={clientesFiltrados}
            onDelete={handleEliminar}
            onEdit={(cliente) => {
              setClienteActual(cliente);
              setModo("editar");
            }}
          />
        )}
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-pink-500/50 blur-md"></div>
    </section>
  );
};

export default AdminPanel;

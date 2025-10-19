import React from "react";

interface Cliente {
  id: number;
  nombre: string;
  email: string;
  telefono?: string;
  fechaInicio: string;
  fechaFin?: string;
  pagado: boolean;
}

interface ClienteTableProps {
  clientes: Cliente[];
  onDelete: (id: number) => void;
  onEdit: (cliente: Cliente) => void;
}

const ClienteTable: React.FC<ClienteTableProps> = ({
  clientes,
  onDelete,
  onEdit,
}) => {
  // Función para formatear fechas a DD/MM/YYYY
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "—";
    const date = new Date(dateStr);
    return date.toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="overflow-x-auto bg-black/60 rounded-xl border border-pink-700/50 shadow-lg shadow-pink-500/20">
      <table className="w-full text-sm text-gray-300">
        <thead className="text-pink-400 border-b border-pink-600/30">
          <tr>
            <th className="py-3 px-4 text-left">Nombre</th>
            <th className="py-3 px-4 text-left">Email</th>
            <th className="py-3 px-4 text-left">Teléfono</th>
            <th className="py-3 px-4 text-left">Inicio</th>
            <th className="py-3 px-4 text-left">Fin</th>
            <th className="py-3 px-4 text-left">Pago</th>
            <th className="py-3 px-4 text-center">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {clientes.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center py-6 text-gray-500 italic">
                No hay clientes registrados aún.
              </td>
            </tr>
          ) : (
            clientes.map((cliente) => (
              <tr
                key={cliente.id}
                className="border-b border-gray-700 hover:bg-gray-800/70 transition"
              >
                <td className="py-3 px-4">{cliente.nombre}</td>
                <td className="py-3 px-4">{cliente.email}</td>
                <td className="py-3 px-4">{cliente.telefono || "—"}</td>
                <td className="py-3 px-4">{formatDate(cliente.fechaInicio)}</td>
                <td className="py-3 px-4">{formatDate(cliente.fechaFin)}</td>
                <td className="py-3 px-4">
                  {cliente.pagado ? (
                    <span className="text-green-400 font-semibold">✔️</span>
                  ) : (
                    <span className="text-red-400 font-semibold">❌</span>
                  )}
                </td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => onEdit(cliente)}
                    className="bg-pink-600 hover:bg-pink-500 px-3 py-1 rounded-lg text-white font-semibold mr-2 transition"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onDelete(cliente.id)}
                    className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded-lg text-white font-semibold transition"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ClienteTable;

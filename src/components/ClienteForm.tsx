import React, { useState, useEffect } from "react";

interface ClienteFormProps {
  onSubmit: (data: any) => void;
  clienteEditando?: any;
  onCancel?: () => void;
}

const ClienteForm: React.FC<ClienteFormProps> = ({
  onSubmit,
  clienteEditando,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    pagado: false,
    fechaInicio: "",
    fechaFin: "",
  });

  useEffect(() => {
    if (clienteEditando) {
      setFormData({
        nombre: clienteEditando.nombre,
        email: clienteEditando.email,
        telefono: clienteEditando.telefono || "",
        pagado: clienteEditando.pagado,
        fechaInicio: clienteEditando.fechaInicio
          ? clienteEditando.fechaInicio.split("T")[0]
          : "",
        fechaFin: clienteEditando.fechaFin
          ? clienteEditando.fechaFin.split("T")[0]
          : "",
      });
    }
  }, [clienteEditando]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      fechaInicio: formData.fechaInicio ? new Date(formData.fechaInicio) : null,
      fechaFin: formData.fechaFin ? new Date(formData.fechaFin) : null,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-black/60 p-6 rounded-xl border border-pink-700/50 shadow-lg shadow-pink-500/20"
    >
      <h2 className="text-xl font-bold text-pink-400 mb-4">
        {clienteEditando ? "Editar Cliente" : "Nuevo Cliente"}
      </h2>

      <div className="space-y-4">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          className="w-full bg-gray-800 text-white rounded-lg p-2 border border-gray-600 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 outline-none"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
          className="w-full bg-gray-800 text-white rounded-lg p-2 border border-gray-600 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 outline-none"
          required
        />

        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
          value={formData.telefono}
          onChange={handleChange}
          className="w-full bg-gray-800 text-white rounded-lg p-2 border border-gray-600 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 outline-none"
        />

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-gray-300 mb-1">Fecha de inicio</label>
            <input
              type="date"
              name="fechaInicio"
              value={formData.fechaInicio}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white rounded-lg p-2 border border-gray-600 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 outline-none"
            />
          </div>

          <div className="flex-1">
            <label className="block text-gray-300 mb-1">
              Fecha de finalización
            </label>
            <input
              type="date"
              name="fechaFin"
              value={formData.fechaFin}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white rounded-lg p-2 border border-gray-600 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 outline-none"
            />
          </div>
        </div>

        <label className="flex items-center space-x-2 text-gray-300">
          <input
            type="checkbox"
            name="pagado"
            checked={formData.pagado}
            onChange={handleChange}
            className="accent-pink-500"
          />
          <span>Pago realizado</span>
        </label>

        <button
          type="submit"
          className="w-full bg-pink-600 hover:bg-pink-500 text-white py-2 rounded-lg font-semibold shadow-md shadow-pink-500/30 transition-all"
        >
          {clienteEditando ? "Actualizar" : "Crear"}
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg font-semibold transition"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default ClienteForm;

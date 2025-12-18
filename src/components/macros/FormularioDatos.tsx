import { Calculator } from "lucide-react";

type Props = {
  formData: any;
  handleChange: any;
  handleCalculate: any;
};

export const FormularioDatos = ({
  formData,
  handleChange,
  handleCalculate,
}: Props) => {
  return (
    <form
      onSubmit={handleCalculate}
      className="backdrop-blur-xl bg-white/5 p-6 md:p-8 rounded-3xl border border-white/10 shadow-xl animate-fadeIn"
    >
      <h2 className="text-2xl font-bold text-pink-400 flex items-center gap-2 mb-6">
        <Calculator size={26} /> Tus Datos
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Peso */}
        <div className="flex flex-col">
          <label className="text-gray-300 text-sm">Peso (kg)</label>
          <input
            type="number"
            name="peso"
            value={formData.peso}
            onChange={handleChange}
            required
            className="input-modern"
          />
        </div>

        {/* Altura */}
        <div className="flex flex-col">
          <label className="text-gray-300 text-sm">Altura (cm)</label>
          <input
            type="number"
            name="altura"
            value={formData.altura}
            onChange={handleChange}
            required
            className="input-modern"
          />
        </div>

        {/* Edad */}
        <div className="flex flex-col">
          <label className="text-gray-300 text-sm">Edad</label>
          <input
            type="number"
            name="edad"
            value={formData.edad}
            onChange={handleChange}
            required
            className="input-modern"
          />
        </div>

        {/* Sexo */}
        <div className="flex flex-col">
          <label className="text-gray-300 text-sm">Sexo</label>
          <select
            name="sexo"
            value={formData.sexo}
            onChange={handleChange}
            className="input-modern"
          >
            <option value="">Seleccionar…</option>
            <option value="mujer">Mujer</option>
            <option value="hombre">Hombre</option>
          </select>
        </div>

        {/* Actividad */}
        <div className="flex flex-col sm:col-span-2">
          <label className="text-gray-300 text-sm">Nivel de Actividad</label>
          <select
            name="actividad"
            value={formData.actividad}
            onChange={handleChange}
            className="input-modern"
          >
            <option value="">Selecciona tu nivel</option>
            <option value="sedentario">Sedentario</option>
            <option value="ligero">Ligero</option>
            <option value="moderado">Moderado</option>
            <option value="activo">Activo</option>
            <option value="muyActivo">Muy Activo</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="btn-primary mt-8 w-full py-3 text-lg font-semibold rounded-xl"
      >
        Calcular
      </button>
    </form>
  );
};

import { useState } from "react";
import {
  Calculator,
  Scale,
  Activity,
  TrendingUp,
  TrendingDown,
  Users,
  RefreshCw,
} from "lucide-react";

// Constantes para el cálculo del Gasto Energético Total (TMB * Factor de Actividad)
const ACTIVITY_FACTORS = {
  sedentario: 1.2, // Poco o ningún ejercicio
  ligero: 1.375, // Ejercicio ligero 1-3 días a la semana
  moderado: 1.55, // Ejercicio moderado 3-5 días a la semana
  activo: 1.725, // Ejercicio fuerte 6-7 días a la semana
  muyActivo: 1.9, // Ejercicio muy fuerte, dos veces al día, etc.
};

// Definición de las interfaces para los datos (usando TypeScript sintáctico para claridad)
type FormData = {
  peso: number; // kg
  altura: number; // cm
  edad: number;
  sexo: "hombre" | "mujer" | "";
  actividad: keyof typeof ACTIVITY_FACTORS | "";
};

type Results = {
  tmb: number;
  get: number; // Gasto Energético Total (Mantenimiento)
  deficit: number;
  aumento: number;
};

// --- COMPONENTE PRINCIPAL ---
export const CalculadoraMacros = () => {
  const [formData, setFormData] = useState<FormData>({
    peso: 70,
    altura: 175,
    edad: 30,
    sexo: "mujer",
    actividad: "moderado",
  });
  const [results, setResults] = useState<Results | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "number" ? parseFloat(value) : value,
    }));
  };

  // 1. CÁLCULO DE TMB (Harris-Benedict Revisada)
  const calcularTMB = (data: FormData): number => {
    const { peso, altura, edad, sexo } = data;

    if (sexo === "hombre") {
      // Hombres: 88.362 + (13.397 * peso en kg) + (4.799 * altura en cm) - (5.677 * edad en años)
      return 88.362 + 13.397 * peso + 4.799 * altura - 5.677 * edad;
    } else if (sexo === "mujer") {
      // Mujeres: 447.593 + (9.247 * peso en kg) + (3.098 * altura en cm) - (4.330 * edad en años)
      return 447.593 + 9.247 * peso + 3.098 * altura - 4.33 * edad;
    }
    return 0; // Si no hay sexo seleccionado
  };

  // 2. CÁLCULO DEL GASTO ENERGÉTICO TOTAL (GET - Mantenimiento)
  const calcularGET = (
    tmb: number,
    actividad: keyof typeof ACTIVITY_FACTORS | ""
  ): number => {
    if (!actividad) return 0;
    return tmb * ACTIVITY_FACTORS[actividad];
  };

  // 3. CÁLCULO DEL OBJETIVO (Ajuste para déficit/aumento)
  const calcularObjetivo = (
    get: number,
    objetivo: "deficit" | "aumento"
  ): number => {
    // Definimos un rango común de ajuste de 400-500 kcal
    const ajuste = 450;

    if (objetivo === "deficit") {
      return get - ajuste;
    } else if (objetivo === "aumento") {
      return get + ajuste;
    }
    return get;
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.sexo || !formData.actividad) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {
      const tmb = calcularTMB(formData);
      const get = calcularGET(tmb, formData.actividad);
      const deficit = calcularObjetivo(get, "deficit");
      const aumento = calcularObjetivo(get, "aumento");

      setResults({
        tmb: Math.round(tmb),
        get: Math.round(get),
        deficit: Math.round(deficit),
        aumento: Math.round(aumento),
      });
    } catch (error) {
      console.error("Error durante el cálculo:", error);
      alert("Hubo un error en el cálculo. Revisa los valores ingresados.");
    }
  };

  const handleReset = () => {
    setFormData({
      peso: 70,
      altura: 175,
      edad: 30,
      sexo: "mujer",
      actividad: "moderado",
    });
    setResults(null);
  };

  // Estilo de acento basado en tu código
  const ACCENT_CLASS = "pink-500";
  const ACCENT_FOCUS = "focus:ring-pink-500 focus:border-pink-500";
  const ACCENT_BUTTON = `bg-${ACCENT_CLASS} hover:bg-pink-600 shadow-lg shadow-pink-500/50`;

  return (
    <section className="min-h-screen bg-gray-900 text-white p-6 md:p-10 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* TÍTULO Y DESCRIPCIÓN */}
        <header className="text-center mb-12">
          <h1
            className={`text-5xl md:text-6xl font-extrabold text-${ACCENT_CLASS} mb-3 drop-shadow-md`}
          >
            <Calculator className="inline-block w-10 h-10 mr-2" /> Calorías y
            Macros
          </h1>
          <p className="text-gray-300 text-lg">
            Calcula tu Gasto Energético Total (GET) y define tu objetivo
            (déficit o aumento).
          </p>
        </header>

        <div className="bg-gray-800 p-6 md:p-10 rounded-2xl shadow-xl border border-pink-700/50">
          <form onSubmit={handleCalculate}>
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-gray-200 border-b border-pink-500/30 pb-3">
              <Scale size={24} className={`text-${ACCENT_CLASS}`} /> 1. Ingresa
              tus Datos
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {/* Peso */}
              <label className="flex flex-col text-gray-300">
                Peso (kg)
                <input
                  type="number"
                  name="peso"
                  value={formData.peso}
                  onChange={handleChange}
                  min="30"
                  required
                  className={`mt-2 p-3 rounded-lg border border-gray-700 bg-gray-900 text-white outline-none transition ${ACCENT_FOCUS}`}
                />
              </label>

              {/* Altura */}
              <label className="flex flex-col text-gray-300">
                Altura (cm)
                <input
                  type="number"
                  name="altura"
                  value={formData.altura}
                  onChange={handleChange}
                  min="100"
                  required
                  className={`mt-2 p-3 rounded-lg border border-gray-700 bg-gray-900 text-white outline-none transition ${ACCENT_FOCUS}`}
                />
              </label>

              {/* Edad */}
              <label className="flex flex-col text-gray-300">
                Edad (años)
                <input
                  type="number"
                  name="edad"
                  value={formData.edad}
                  onChange={handleChange}
                  min="16"
                  required
                  className={`mt-2 p-3 rounded-lg border border-gray-700 bg-gray-900 text-white outline-none transition ${ACCENT_FOCUS}`}
                />
              </label>

              {/* Sexo */}
              <label className="flex flex-col text-gray-300">
                Sexo
                <select
                  name="sexo"
                  value={formData.sexo}
                  onChange={handleChange}
                  required
                  className={`mt-2 p-3 rounded-lg border border-gray-700 bg-gray-900 text-white outline-none transition ${ACCENT_FOCUS} appearance-none`}
                >
                  <option value="" disabled>
                    Selecciona...
                  </option>
                  <option value="mujer">Mujer</option>
                  <option value="hombre">Hombre</option>
                </select>
              </label>

              {/* Nivel de Actividad */}
              <label className="flex flex-col text-gray-300 sm:col-span-2">
                Nivel de Actividad
                <select
                  name="actividad"
                  value={formData.actividad}
                  onChange={handleChange}
                  required
                  className={`mt-2 p-3 rounded-lg border border-gray-700 bg-gray-900 text-white outline-none transition ${ACCENT_FOCUS} appearance-none`}
                >
                  <option value="" disabled>
                    Selecciona tu nivel de ejercicio semanal
                  </option>
                  <option value="sedentario">
                    Sedentario (Poco o nada de ejercicio)
                  </option>
                  <option value="ligero">Ligero (1-3 días a la semana)</option>
                  <option value="moderado">
                    Moderado (3-5 días a la semana)
                  </option>
                  <option value="activo">Activo (6-7 días a la semana)</option>
                  <option value="muyActivo">
                    Muy Activo (Ejercicios intensos, dos veces al día)
                  </option>
                </select>
              </label>
            </div>

            <div className="flex justify-center gap-4 mt-8">
              <button
                type="submit"
                className={`py-3 px-8 rounded-full font-bold text-lg transition transform hover:scale-[1.03] ${ACCENT_BUTTON} text-white`}
              >
                Calcular Calorías
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="py-3 px-8 rounded-full font-bold text-lg transition transform hover:scale-[1.03] bg-gray-700 hover:bg-gray-600 text-white flex items-center gap-2"
              >
                <RefreshCw size={20} /> Resetear
              </button>
            </div>
          </form>

          {/* RESULTADOS */}
          {results && (
            <div className="mt-12 pt-8 border-t border-pink-500/30 animate-fade-in">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 text-gray-200">
                <Activity size={28} className={`text-${ACCENT_CLASS}`} /> 2.
                Resultados Clave (kcal/día)
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* TMB */}
                <div className="p-5 bg-gray-700 rounded-xl shadow-lg border border-gray-600">
                  <p className="text-sm font-light text-gray-300">
                    Tasa Metabólica Basal (TMB)
                  </p>
                  <p
                    className={`text-4xl font-extrabold text-${ACCENT_CLASS} mt-1`}
                  >
                    {results.tmb}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    Calorías que quemas en reposo total.
                  </p>
                </div>

                {/* MANTENIMIENTO (GET) */}
                <div className="p-5 bg-gray-700 rounded-xl shadow-lg border border-gray-600">
                  <p className="text-sm font-light text-gray-300">
                    Mantenimiento (Gasto Energético Total - GET)
                  </p>
                  <p
                    className={`text-4xl font-extrabold text-${ACCENT_CLASS} mt-1`}
                  >
                    {results.get}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    Calorías para mantener tu peso actual.
                  </p>
                </div>

                {/* DÉFICIT */}
                <div className="p-5 bg-pink-900/40 rounded-xl shadow-lg border border-pink-700 flex flex-col justify-center">
                  <div className="flex items-center gap-3">
                    <TrendingDown size={32} className="text-red-400" />
                    <p className="text-xl font-light text-gray-200">
                      Objetivo:
                    </p>
                  </div>
                  <p className={`text-5xl font-extrabold text-red-400 mt-1`}>
                    {results.deficit}
                  </p>
                  <p className="text-sm text-gray-200 mt-2">
                    Calorías para **DÉFICIT** (Pérdida de peso ~0.5kg/semana).
                  </p>
                </div>

                {/* AUMENTO */}
                <div className="p-5 bg-green-900/40 rounded-xl shadow-lg border border-green-700 flex flex-col justify-center">
                  <div className="flex items-center gap-3">
                    <TrendingUp size={32} className="text-green-400" />
                    <p className="text-xl font-light text-gray-200">
                      Objetivo:
                    </p>
                  </div>
                  <p className={`text-5xl font-extrabold text-green-400 mt-1`}>
                    {results.aumento}
                  </p>
                  <p className="text-sm text-gray-200 mt-2">
                    Calorías para **AUMENTO** (Ganancia muscular ~0.5kg/semana).
                  </p>
                </div>
              </div>

              <div className="mt-8 p-4 bg-gray-700/50 rounded-lg text-sm text-gray-300">
                <p>
                  ⚠️ **Nota:** Estos valores son estimados (usando
                  Harris-Benedict revisada). Consulta siempre a un profesional
                  de la nutrición para planes personalizados.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Estilos para el fade-in */}
      <style>{`
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default CalculadoraMacros;

import { useState } from "react";
import {
  Calculator,
  Flame,
  Gauge,
  ArrowDown,
  ArrowUp,
  MousePointerClick,
} from "lucide-react";
import { useNutrition } from "../context/NutritionContext";
import { useNavigate } from "react-router-dom";

export const CalculadoraMacros = () => {
  // ------------------ STATE ------------------
  const { setNutrition } = useNutrition();
  const navigate = useNavigate();

  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [edad, setEdad] = useState("");
  const [sexo, setSexo] = useState("");
  const [actividad, setActividad] = useState("");

  const [resultados, setResultados] = useState({
    tmb: "---",
    mantenimiento: "---",
    deficit: "---",
    aumento: "---",
  });

  // ------------------ CALCULO ------------------
  const calcular = () => {
    if (!peso || !altura || !edad || !sexo || !actividad) return;

    const p = parseFloat(peso);
    const a = parseFloat(altura);
    const e = parseFloat(edad);

    const tmb =
      sexo === "Mujer"
        ? 655 + 9.6 * p + 1.8 * a - 4.7 * e
        : 66 + 13.7 * p + 5 * a - 6.8 * e;

    const factores: Record<string, number> = {
      Sedentario: 1.2,
      Ligero: 1.375,
      Moderado: 1.55,
      Activo: 1.725,
      "Muy Activo": 1.9,
    };

    const mantenimiento = tmb * factores[actividad];
    const deficit = mantenimiento - 400;
    const aumento = mantenimiento + 400;

    setResultados({
      tmb: Math.round(tmb).toString(),
      mantenimiento: Math.round(mantenimiento).toString(),
      deficit: Math.round(deficit).toString(),
      aumento: Math.round(aumento).toString(),
    });
  };

  const resetear = () => {
    setPeso("");
    setAltura("");
    setEdad("");
    setSexo("");
    setActividad("");
    setResultados({
      tmb: "---",
      mantenimiento: "---",
      deficit: "---",
      aumento: "---",
    });
  };

  const elegirPlan = (
    goal: "deficit" | "maintain" | "bulk",
    calories: string
  ) => {
    if (calories === "---") return;

    setNutrition({
      goal,
      calories: Number(calories),
    });

    navigate("/meal-plan");
  };

  return (
    <section className="min-h-screen w-full bg-black text-white px-6 pt-15 pb-20 font-sans relative overflow-hidden">
      {/* ---- Glow Fondo ---- */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-pink-600/20 blur-[160px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-pink-500/10 blur-[140px] rounded-full" />

      <div className="max-w-xl mx-auto relative z-20">
        {/* ---- HEADER ---- */}
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400">
            Calculadora de Macros
          </h1>
          <p className="text-gray-300 text-sm font-semibold">
            Descubrí tus calorías ideales según tu cuerpo y actividad.
          </p>
        </header>

        {/* ---- CARD PRINCIPAL ---- */}
        <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-xl animate-fade-in">
          <h2 className="text-lg font-semibold mb-6 text-gray-200 tracking-tight flex items-center gap-2">
            <Gauge className="text-pink-500" />
            Tus datos
          </h2>

          {/* ---- INPUTS ---- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input
              label="Peso (kg)"
              placeholder="Ej: 70"
              value={peso}
              onChange={setPeso}
            />
            <Input
              label="Altura (cm)"
              placeholder="Ej: 175"
              value={altura}
              onChange={setAltura}
            />
            <Input
              label="Edad"
              placeholder="Ej: 25"
              value={edad}
              onChange={setEdad}
            />

            <Select
              label="Sexo"
              value={sexo}
              onChange={setSexo}
              options={["Mujer", "Hombre"]}
            />

            <Select
              label="Actividad"
              value={actividad}
              onChange={setActividad}
              options={[
                "Sedentario",
                "Ligero",
                "Moderado",
                "Activo",
                "Muy Activo",
              ]}
              full
            />
          </div>

          {/* ---- BOTONES ---- */}
          <div className="flex mt-8 gap-3">
            <button
              onClick={calcular}
              className="flex-1 py-3 rounded-xl bg-pink-600 hover:bg-pink-500 transition font-semibold shadow-lg shadow-pink-600/30"
            >
              Calcular
            </button>

            <button
              onClick={resetear}
              className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition font-semibold"
            >
              Resetear
            </button>
          </div>
        </div>

        {/* ---- GUIA SUAVE PARA EL USUARIO ---- */}
        <div className="flex items-center justify-center gap-2 mt-6 text-xs text-pink-400/80 animate-pulse">
          <MousePointerClick size={14} />
          Tocá un objetivo para ver tu plan de comidas personalizado
          <span className="text-pink-400"> 👇</span>
        </div>

        {/* ---- RESULTADOS ---- */}
        <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-xl mt-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-200">
            <Flame className="text-pink-500" />
            Resultados estimados
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/*<ResultCard title="TMB" value={resultados.tmb} color="pink" />*/}

            <ResultCard
              title="Mantenimiento"
              value={resultados.mantenimiento}
              color="pink"
              onClick={() => elegirPlan("maintain", resultados.mantenimiento)}
            />

            <ResultCard
              title="Déficit"
              value={resultados.deficit}
              icon={<ArrowDown />}
              color="red"
              onClick={() => elegirPlan("deficit", resultados.deficit)}
            />

            <ResultCard
              title="Aumento"
              value={resultados.aumento}
              icon={<ArrowUp />}
              color="green"
              onClick={() => elegirPlan("bulk", resultados.aumento)}
            />
          </div>

          <p className="text-xs text-gray-400 mt-4 text-center">
            * Los valores son aproximados.
          </p>
        </div>
      </div>
    </section>
  );
};

/* ---------------- COMPONENTES UI ---------------- */

const Input = ({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) => (
  <label className="flex flex-col text-gray-300 text-sm">
    {label}
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mt-2 bg-white/5 border border-white/10 p-3 rounded-xl outline-none focus:border-pink-500 transition placeholder-gray-500 text-white"
      placeholder={placeholder}
      type="number"
    />
  </label>
);

const Select = ({
  label,
  options,
  full,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  full?: boolean;
  value: string;
  onChange: (v: string) => void;
}) => (
  <label
    className={`flex flex-col text-gray-300 text-sm ${
      full ? "sm:col-span-2" : ""
    }`}
  >
    {label}
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mt-2 bg-white/5 text-white border border-white/10 p-3 rounded-xl outline-none focus:border-pink-500 transition"
    >
      <option value="" className="bg-black text-gray-400">
        Seleccionar…
      </option>
      {options.map((op) => (
        <option key={op} value={op} className="bg-black text-white">
          {op}
        </option>
      ))}
    </select>
  </label>
);

const ResultCard = ({
  title,
  value,
  icon,
  color,
  onClick,
}: {
  title: string;
  value: string;
  icon?: any;
  color: "pink" | "red" | "green";
  onClick?: () => void;
}) => {
  const colors = {
    pink: "text-pink-400",
    red: "text-red-400",
    green: "text-green-400",
  };

  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-xl bg-white/5 border border-white/10 shadow-inner
        ${onClick ? "cursor-pointer hover:border-pink-500 transition" : ""}`}
    >
      <div className="flex items-center gap-2 mb-1 text-gray-300 text-sm">
        {icon && <span className={colors[color]}>{icon}</span>}
        {title}
      </div>
      <p className={`text-3xl font-bold ${colors[color]}`}>{value}</p>
    </div>
  );
};

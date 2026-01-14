// features/dashboard/Dashboard.tsx
import { useState } from "react";
import { useDashboard } from "./hooks/useDashboardData";
import { addSteps, addWorkout } from "../../../services/activity.actions";
import { auth } from "../../../firebase/firebase";

export default function Dashboard() {
  const { data, loading } = useDashboard();
  const today = new Date().toISOString().split("T")[0];
  const [manualSteps, setManualSteps] = useState(0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-zinc-400">
        Cargando tu actividad...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-zinc-400">
        No hay datos disponibles
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-black text-white px-6 pt-15 md:pt-10 pb-24 relative">
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-pink-600/10 blur-[180px] rounded-full" />

      <div className="relative z-10 max-w-3xl mx-auto space-y-10">
        {/* HEADER */}
        <div>
          <h1 className="text-center text-4xl font-bold  mb-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400">
            Tu Actividad
          </h1>
          <p className="text-zinc-400 text-sm mt-1 text-center">
            Resumen diario de tu movimiento
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 gap-4">
          <Stat title="🔥 Calorías" value={data.calories} />
          <Stat title="👣 Pasos" value={data.steps} />
          <Stat title="⏱ Min. activos" value={data.activeMinutes} />
          <Stat title="💪 Entrenamientos" value={data.workouts} />
        </div>

        {/* INPUT MANUAL */}
        <div
          className="
            bg-white/5 backdrop-blur-xl 
            border border-white/10 
            rounded-2xl p-5 space-y-4
            shadow-lg
          "
        >
          <p className="text-zinc-300 font-semibold">
            Agregar pasos manualmente
          </p>

          <div className="flex gap-3">
            <input
              type="number"
              value={manualSteps}
              onChange={(e) => setManualSteps(Number(e.target.value))}
              placeholder="Ej: 1200"
              className="
                flex-1 bg-black/60 
                border border-white/10 
                rounded-xl px-4 py-2 
                outline-none 
                text-sm
                focus:border-pink-500/40
                transition
              "
            />

            <button
              onClick={() => {
                addSteps(auth.currentUser!.uid, today, manualSteps);
                setManualSteps(0);
              }}
              className="
                bg-pink-600/90 
                hover:bg-pink-500 
                transition
                px-5 rounded-xl 
                font-bold text-sm
              "
            >
              Agregar
            </button>
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => addSteps(auth.currentUser!.uid, today, 500)}
            className="
              bg-white/5 backdrop-blur-xl
              border border-white/10
              hover:border-pink-500/40
              transition
              py-4 rounded-2xl 
              font-bold
            "
          >
            +500 pasos
          </button>

          <button
            onClick={() => addWorkout(auth.currentUser!.uid, today)}
            className="
              bg-purple-600/90 
              hover:bg-purple-500 
              transition
              py-4 rounded-2xl 
              font-bold
            "
          >
            + Entrenamiento
          </button>
        </div>
      </div>
    </section>
  );
}

const Stat = ({ title, value }: any) => (
  <div
    className="
      bg-white/5 backdrop-blur-xl
      border border-white/10
      rounded-2xl p-5 
      shadow-lg
      hover:border-pink-500/30
      transition
    "
  >
    <p className="text-zinc-400 text-sm">{title}</p>
    <h2 className="text-3xl font-bold mt-1">{value}</h2>
  </div>
);

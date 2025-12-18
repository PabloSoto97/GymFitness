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
      <div className="min-h-screen flex items-center justify-center bg-black text-gray-400">
        Cargando tu actividad...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-gray-400">
        No hay datos disponibles
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">🏋️ Tu Actividad</h1>
        <p className="text-zinc-400 text-sm">Resumen diario</p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 gap-4">
        <Stat title="🔥 Calorías" value={data.calories} />
        <Stat title="👣 Pasos" value={data.steps} />
        <Stat title="⏱ Min. activos" value={data.activeMinutes} />
        <Stat title="💪 Entrenamientos" value={data.workouts} />
      </div>

      {/* INPUT MANUAL */}
      <div className="bg-zinc-900 rounded-2xl p-4 space-y-3">
        <p className="text-zinc-300 font-semibold">Agregar pasos manualmente</p>

        <div className="flex gap-3">
          <input
            type="number"
            value={manualSteps}
            onChange={(e) => setManualSteps(Number(e.target.value))}
            placeholder="Ej: 1200"
            className="flex-1 bg-black border border-zinc-700 rounded-xl px-4 py-2 outline-none"
          />

          <button
            onClick={() => {
              addSteps(auth.currentUser!.uid, today, manualSteps);
              setManualSteps(0);
            }}
            className="bg-pink-600 px-5 rounded-xl font-bold"
          >
            Agregar
          </button>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => addSteps(auth.currentUser!.uid, today, 500)}
          className="bg-zinc-800 hover:bg-zinc-700 transition py-4 rounded-2xl font-bold"
        >
          +500 pasos
        </button>

        <button
          onClick={() => addWorkout(auth.currentUser!.uid, today)}
          className="bg-purple-600 hover:bg-purple-500 transition py-4 rounded-2xl font-bold"
        >
          + Entrenamiento
        </button>
      </div>
    </div>
  );
}

const Stat = ({ title, value }: any) => (
  <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl p-5 shadow-lg">
    <p className="text-zinc-400 text-sm">{title}</p>
    <h2 className="text-3xl font-bold mt-1">{value}</h2>
  </div>
);

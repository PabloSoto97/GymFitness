import { useParams } from "react-router-dom";
import { useMealRecommendations } from "./features/meals/hooks/useMealRecommendations";
import type { MealType } from "../data/recipes";

export default function MealAlternatives() {
  const { meal } = useParams<{ meal: MealType }>();

  if (!meal) return null;

  const data = useMealRecommendations(meal);

  if (!data.ready) {
    return (
      <div className="min-h-screen bg-black text-zinc-400 flex items-center justify-center">
        Calculá tus calorías primero
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-black text-white px-6 pt-15 pb-24 relative">
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-pink-600/10 blur-[180px] rounded-full" />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-center text-4xl font-bold tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400">
            Más opciones de {meal}
          </h1>
          <p className="text-sm text-zinc-300 mt-2">
            Aproximadamente {data.targetCalories} kcal
          </p>
        </div>

        {/* LIST */}
        <div className="space-y-4">
          {data.recipes.map((r) => (
            <div
              key={r.id}
              className="
                bg-white/5 backdrop-blur-xl
                border border-white/10
                rounded-2xl p-5
                shadow-lg
                hover:border-pink-500/40
                transition
              "
            >
              <div className="flex justify-between items-start gap-4 mb-1">
                <h3 className="font-semibold leading-tight">{r.title}</h3>
                <span className="text-xs text-pink-500 whitespace-nowrap">
                  {r.calories} kcal
                </span>
              </div>

              <p className="text-sm text-zinc-400">{r.portion}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

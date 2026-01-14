import { useMealRecommendations } from "./features/meals/hooks/useMealRecommendations";
import { Link } from "react-router-dom";
import type { Recipe, MealType } from "../data/recipes";

interface MealData {
  ready: boolean;
  targetCalories?: number;
  recipes: Recipe[];
}

export default function MealPlan() {
  const desayuno = useMealRecommendations("desayuno");
  const almuerzo = useMealRecommendations("almuerzo");
  const merienda = useMealRecommendations("merienda");
  const cena = useMealRecommendations("cena");

  if (!desayuno.ready) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center text-zinc-400">
        Primero calculá tus calorías
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-black text-white px-6 pt-15 pb-24 relative">
      {/* Glow general */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-pink-600/10 blur-[180px] rounded-full" />

      <div className="relative z-10 max-w-3xl mx-auto space-y-14">
        <MealSection title="🍳 Desayuno" meal="desayuno" data={desayuno} />
        <MealSection title="🍽️ Almuerzo" meal="almuerzo" data={almuerzo} />
        <MealSection title="☕ Merienda" meal="merienda" data={merienda} />
        <MealSection title="🌙 Cena" meal="cena" data={cena} />
      </div>
    </section>
  );
}

interface MealSectionProps {
  title: string;
  meal: MealType;
  data: MealData;
}

const MealSection = ({ title, meal, data }: MealSectionProps) => (
  <section className="space-y-4">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
        <span>{title.split(" ")[0]}</span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400">
          {title.split(" ").slice(1).join(" ")}
        </span>
      </h2>

      {data.targetCalories && (
        <span className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-400">
          ≈ {data.targetCalories} kcal
        </span>
      )}
    </div>

    <div className="space-y-3">
      {data.recipes.slice(0, 1).map((r) => (
        <div
          key={r.id}
          className="
            bg-white/5 backdrop-blur-xl 
            border border-white/10 
            p-5 rounded-2xl 
            shadow-lg
            hover:border-pink-500/40 
            transition
          "
        >
          <p className="font-semibold text-lg">{r.title}</p>
          <p className="text-sm text-zinc-400 mt-1">{r.portion}</p>

          <div className="flex justify-between items-center mt-3">
            <span className="text-xs text-pink-400 font-medium">
              {r.calories} kcal
            </span>

            <span className="text-xs text-zinc-500">receta sugerida</span>
          </div>
        </div>
      ))}
    </div>

    <Link
      to={`/meal-alternatives/${meal}`}
      className="
        inline-flex items-center gap-1 
        text-pink-500 text-sm 
        hover:text-pink-400 hover:underline
        transition
      "
    >
      Ver más opciones →
    </Link>
  </section>
);

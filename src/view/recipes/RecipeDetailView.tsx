import { useParams } from "react-router-dom";
import { Flame } from "lucide-react";
import { RECIPES } from "../../data/recipes";

export const RecipeDetailView = () => {
  const { id } = useParams();

  const recipe = RECIPES.find((r) => r.id === id);

  if (!recipe) {
    return (
      <div className="min-h-screen bg-black text-zinc-400 flex items-center justify-center">
        Receta no encontrada
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-black text-white px-6 pt-16 pb-28 relative">
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-pink-600/10 blur-[170px] rounded-full" />

      <div className="relative z-10 max-w-xl mx-auto space-y-6">
        {/* CARD */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-6 shadow-xl">
          {/* TITLE */}
          <div>
            <h1 className="text-center text-4xl font-bold tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400">
              {recipe.title}
            </h1>

            <div className="flex items-center gap-2 text-pink-400 mt-2">
              <Flame className="w-5 h-5" />
              <span className="text-sm font-medium">
                {recipe.calories} kcal
              </span>
            </div>
          </div>

          {/* PORTION */}
          <p className="text-sm text-zinc-300">
            <span className="text-zinc-400">Porción:</span> {recipe.portion}
          </p>

          {/* MACROS */}
          <div className="grid grid-cols-3 gap-3 text-center text-sm">
            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <p className="text-zinc-400 text-xs mb-1">Proteína</p>
              <p className="font-semibold text-pink-400">
                🍗 {recipe.macros.protein}g
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <p className="text-zinc-400 text-xs mb-1">Carbs</p>
              <p className="font-semibold">🍞 {recipe.macros.carbs}g</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <p className="text-zinc-400 text-xs mb-1">Grasas</p>
              <p className="font-semibold">🥑 {recipe.macros.fats}g</p>
            </div>
          </div>

          {/* INGREDIENTES */}
          <div>
            <h3 className="font-semibold mb-2">Ingredientes</h3>
            <ul className="list-disc list-inside text-zinc-400 text-sm space-y-1">
              {recipe.ingredients.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>

          {/* PASOS */}
          <div>
            <h3 className="font-semibold mb-2">Preparación</h3>
            <ol className="list-decimal list-inside text-zinc-400 text-sm space-y-2">
              {recipe.steps.map((s, idx) => (
                <li key={idx}>{s}</li>
              ))}
            </ol>
          </div>

          {/* DISCLAIMER */}
          <p className="text-xs text-zinc-500 pt-2">
            * Los valores son estimativos y pueden ajustarse según tus
            necesidades.
          </p>
        </div>
      </div>
    </section>
  );
};

import { Utensils } from "lucide-react";
import { type Goal, RECIPES, type MealType } from "../../data/recipes";
import { RecipeCard } from "./RecipeCard";
import { useState } from "react";
const MEAL_LABELS: Record<MealType, string> = {
  desayuno: "🍳 Desayunos",
  almuerzo: "🍽️ Almuerzos",
  merienda: "☕ Meriendas",
  cena: "🌙 Cenas",
};

export const RecipesView = () => {
  const [goalFilter, setGoalFilter] = useState<Goal | "all">("all");
  const [mealFilter, setMealFilter] = useState<MealType | "all">("all");

  const meals: MealType[] = ["desayuno", "almuerzo", "merienda", "cena"];

  return (
    <section className="min-h-screen w-full bg-black text-white px-6 pt-15 pb-20 relative overflow-hidden">
      {/* Glow fondo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-pink-600/10 blur-[180px] rounded-full" />

      <div className="max-w-5xl mx-auto relative z-10 space-y-14">
        {/* Header */}
        <header className="text-center">
          <h1 className="text-center text-4xl font-bold tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400">
            Recetas
          </h1>
          <p className="text-gray-300 text-sm mt-2 tracking-tight">
            Explorá todas las comidas disponibles con porciones y calorías.
          </p>
        </header>
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          {/* Filtro por objetivo */}
          {["all", "deficit", "maintain", "bulk"].map((g) => (
            <button
              key={g}
              onClick={() => setGoalFilter(g as any)}
              className={`px-4 py-2 rounded-full text-sm border transition
        ${
          goalFilter === g
            ? "bg-pink-600/30 border-pink-500 text-pink-400"
            : "bg-white/5 border-white/10 text-gray-400 hover:border-pink-500/40"
        }`}
            >
              {g === "all"
                ? "Todos"
                : g === "deficit"
                ? "Déficit"
                : g === "maintain"
                ? "Mantener"
                : "Aumento"}
            </button>
          ))}
        </div>

        {/* Secciones */}
        {meals.map((meal) => {
          const recipesByMeal = RECIPES.filter((r) => {
            const goalMatch =
              goalFilter === "all" || r.goals.includes(goalFilter);
            const mealMatch = mealFilter === "all" || r.meal === meal;

            return r.meal === meal && goalMatch && mealMatch;
          });

          if (recipesByMeal.length === 0) return null;

          return (
            <section key={meal} className="space-y-4">
              <h2 className="text-2xl font-semibold text-pink-400">
                {MEAL_LABELS[meal]}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {recipesByMeal.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
};

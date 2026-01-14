import { Flame, ChevronRight } from "lucide-react";
import { type Recipe } from "../../data/recipes";
import { useNavigate } from "react-router-dom";

interface Props {
  recipe: Recipe;
}

export const RecipeCard = ({ recipe }: Props) => {
  const goalColors: Record<string, string> = {
    deficit: "bg-red-500/20 text-red-400 border-red-500/30",
    maintain: "bg-pink-500/20 text-pink-400 border-pink-500/30",
    bulk: "bg-green-500/20 text-green-400 border-green-500/30",
  };
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/recipes/${recipe.id}`)}
      className="cursor-pointer"
    >
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 hover:border-pink-500/40 transition shadow-lg">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-white">{recipe.title}</h3>
          <div className="flex items-center gap-1 text-pink-400 text-sm">
            <Flame className="w-4 h-4" />
            {recipe.calories} kcal
          </div>
        </div>

        <p className="text-sm text-zinc-400 mt-1">{recipe.portion}</p>

        <div className="flex gap-2 mt-3 flex-wrap">
          {recipe.goals.map((g) => (
            <span
              key={g}
              className={`text-xs px-2 py-1 rounded-full border ${goalColors[g]}`}
            >
              {g === "deficit"
                ? "Déficit"
                : g === "maintain"
                ? "Mantener"
                : "Aumento"}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-end mt-4 text-pink-400/70 text-xs group-hover:text-pink-400 transition">
          Ver detalle
          <ChevronRight className="w-3 h-3 ml-1" />
        </div>
      </div>
    </div>
  );
};

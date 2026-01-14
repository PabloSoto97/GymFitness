import { RECIPES } from "../../../../data/recipes";
import { useNutrition } from "../../../../context/NutritionContext";
import { type MealType } from "../../../../data/recipes";

export function useMealRecommendations(meal: MealType) {
  const { calories, goal } = useNutrition();

  if (!calories || !goal) {
    return { recipes: [], ready: false, targetCalories: 0 };
  }

  const distribution: Record<MealType, number> = {
    desayuno: 0.25,
    almuerzo: 0.35,
    merienda: 0.15,
    cena: 0.25,
  };

  const targetCalories = Math.round(calories * distribution[meal]);

  const recipes = RECIPES.filter(
    (r) =>
      r.meal === meal &&
      r.goals.includes(goal) &&
      Math.abs(r.calories - targetCalories) <= 250 // MÁS FLEXIBLE
  );

  return {
    recipes,
    ready: true,
    targetCalories,
  };
}

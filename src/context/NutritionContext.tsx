import { createContext, useContext, useState } from "react";

export type Goal = "deficit" | "maintain" | "bulk";

interface NutritionData {
  calories: number | null;
  goal: Goal | null;
  setNutrition: (data: { calories: number; goal: Goal }) => void;
}

const NutritionContext = createContext<NutritionData>({
  calories: null,
  goal: null,
  setNutrition: () => {},
});

export const NutritionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [calories, setCalories] = useState<number | null>(null);
  const [goal, setGoal] = useState<Goal | null>(null);

  const setNutrition = ({
    calories,
    goal,
  }: {
    calories: number;
    goal: Goal;
  }) => {
    setCalories(calories);
    setGoal(goal);
  };

  return (
    <NutritionContext.Provider value={{ calories, goal, setNutrition }}>
      {children}
    </NutritionContext.Provider>
  );
};

export const useNutrition = () => useContext(NutritionContext);

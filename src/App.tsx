import { AuthProvider } from "./context/AuthContext";
import { NutritionProvider } from "./context/NutritionContext";
import { AppRouter } from "./AppRouter";

function App() {
  return (
    <AuthProvider>
      <NutritionProvider>
        <AppRouter />
      </NutritionProvider>
    </AuthProvider>
  );
}

export default App;

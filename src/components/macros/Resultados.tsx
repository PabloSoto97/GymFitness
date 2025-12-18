import { Activity, TrendingUp, TrendingDown, Scale } from "lucide-react";

export const Resultados = ({ results }: any) => {
  if (!results) return null;

  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
      {/* TMB */}
      <div className="card-result">
        <Scale size={30} className="text-pink-400 mb-2" />
        <h3 className="text-lg text-gray-300">TMB</h3>
        <p className="number-pink">{results.tmb}</p>
      </div>

      {/* Mantenimiento */}
      <div className="card-result">
        <Activity size={30} className="text-blue-300 mb-2" />
        <h3 className="text-lg text-gray-300">Mantenimiento</h3>
        <p className="number-blue">{results.get}</p>
      </div>

      {/* Déficit */}
      <div className="card-result border-red-400/40">
        <TrendingDown size={30} className="text-red-400 mb-2" />
        <h3 className="text-lg text-gray-300">Déficit</h3>
        <p className="number-red">{results.deficit}</p>
      </div>

      {/* Aumento */}
      <div className="card-result border-green-400/40">
        <TrendingUp size={30} className="text-green-400 mb-2" />
        <h3 className="text-lg text-gray-300">Aumento</h3>
        <p className="number-green">{results.aumento}</p>
      </div>
    </div>
  );
};

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Zap, HeartHandshake, Dumbbell } from "lucide-react";

export const Inicio = () => {
  const [userName, setUserName] = useState("Atleta");
  const [loading, setLoading] = useState(true);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const nombreGuardado = localStorage.getItem("nombre");
    setUserName(nombreGuardado || "Atleta");
    setLoading(false);
  }, []);

  useEffect(() => {
    const rol = localStorage.getItem("rol");
    setShowButton(rol === "ADMIN");
  }, []);

  if (loading) {
    return (
      <section className="flex flex-col items-center justify-center min-h-screen text-center bg-black">
        <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-400">Cargando perfil...</p>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Background */}
      <div className="absolute inset-0 bg-[url('/bg.jpeg')] bg-cover bg-center opacity-40"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black"></div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-3xl w-full px-6 py-16 text-center">
        {/* Welcome */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 leading-tight drop-shadow-[0_0_20px_rgba(236,72,153,0.4)]">
          Hola, <span className="text-pink-400">{userName}</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 flex items-center justify-center gap-2">
          <Zap className="w-6 h-6 text-pink-500" />
          Tu transformación empieza ahora.
        </p>

        {/* CARDS */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card: Progreso */}
          <div className="bg-black/60 p-6 rounded-2xl border border-pink-500/20 backdrop-blur-md shadow-[0_0_20px_rgba(236,72,153,0.15)] hover:shadow-[0_0_35px_rgba(236,72,153,0.35)] transition-all duration-300">
            <HeartHandshake className="w-10 h-10 mx-auto mb-3 text-pink-400" />
            <h3 className="text-lg font-semibold text-white">Tu progreso</h3>
            <p className="text-gray-400 text-sm mt-1">
              Metas, hábitos y evolución.
            </p>
          </div>

          {/* Card: Rutinas */}
          <Link to="/rutinas">
            <div className="bg-black/60 p-6 rounded-2xl border border-pink-500/20 backdrop-blur-md shadow-[0_0_20px_rgba(236,72,153,0.15)] hover:shadow-[0_0_35px_rgba(236,72,153,0.35)] hover:bg-black/70 transition-all duration-300 cursor-pointer">
              <Dumbbell className="w-10 h-10 mx-auto mb-3 text-pink-400" />
              <h3 className="text-lg font-semibold text-white">
                Rutinas activas
              </h3>
              <p className="text-gray-400 text-sm mt-1">
                Entrenamientos listos para hoy.
              </p>
            </div>
          </Link>

          {/* Card: Admin (solo si ADMIN) */}
          {showButton && (
            <Link to="/admin">
              <div className="bg-black/60 p-6 rounded-2xl border border-pink-500/20 backdrop-blur-md shadow-[0_0_20px_rgba(236,72,153,0.15)] hover:shadow-[0_0_35px_rgba(236,72,153,0.35)] hover:bg-black/70 transition-all duration-300 cursor-pointer">
                <Zap className="w-10 h-10 mx-auto mb-3 text-pink-400" />
                <h3 className="text-lg font-semibold text-white">
                  Panel Admin
                </h3>
                <p className="text-gray-400 text-sm mt-1">
                  Gestión del sistema.
                </p>
              </div>
            </Link>
          )}
        </div>

        {/* Divider */}
        <div className="mt-16 h-[2px] w-full bg-pink-500/30 rounded-full shadow-[0_0_15px_#ec4899]"></div>
      </div>
    </section>
  );
};

export default Inicio;

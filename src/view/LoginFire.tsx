// src/view/LoginFire.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dumbbell } from "lucide-react";
import { signInWithGoogle } from "../services/authService";
import { auth } from "../firebase/firebase";

const LoginFire: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleGoogle = async () => {
    setError("");
    setLoading(true);
    try {
      await signInWithGoogle();
      navigate("/");
    } catch (err: any) {
      console.error("Google sign in error:", err);
      setError("No se pudo iniciar sesión con Google");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative flex items-center justify-center min-h-screen bg-gradient-to-b from-black to-gray-950 overflow-hidden">
      {/* Fondo */}
      <div className="absolute inset-0 bg-[url('/bg.jpeg')] bg-cover bg-center opacity-40 animate-pulse"></div>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      {/* Contenedor */}
      <div className="relative z-10 bg-black/60 border border-pink-600/30 rounded-2xl p-10 w-full max-w-md shadow-[0_0_35px_rgba(236,72,153,0.25)] backdrop-blur-xl transform transition-all duration-300 scale-100 hover:scale-[1.01]">
        <div className="flex flex-col items-center mb-6">
          <div className="p-3 rounded-full bg-pink-600/30 shadow-[0_0_20px_#ec4899] animate-pulse">
            <Dumbbell className="w-10 h-10 text-pink-400 drop-shadow-[0_0_15px_#ec4899]" />
          </div>

          <h2 className="text-4xl font-extrabold text-white mt-4 tracking-wider drop-shadow-[0_0_5px_#ec4899]">
            Fitness<span className="text-pink-400">Girl</span>
          </h2>

          <p className="text-gray-300 text-sm mt-1 tracking-wide">
            Entrá a tu mundo fitness
          </p>
        </div>

        {error && (
          <p className="text-red-500 text-center mb-4 font-semibold bg-red-500/10 py-2 rounded-md border border-red-500/40">
            {error}
          </p>
        )}

        <div className="space-y-5">
          {/* Botón Google premium */}
          <button
            onClick={handleGoogle}
            disabled={loading}
            className="
              w-full flex items-center justify-center gap-4 
              bg-white/90 hover:bg-white transition 
              text-black font-semibold py-3 
              rounded-lg shadow-[0_0_15px_rgba(255,255,255,0.2)]
              hover:shadow-[0_0_25px_rgba(255,255,255,0.35)]
              active:scale-95
            "
          >
            <img src="/google-icon.svg" alt="Google" className="w-6 h-6" />
            {loading ? "Cargando..." : "Iniciar sesión con Google"}
          </button>

          {/* Divider */}
          <div className="relative text-center text-gray-400 text-sm">
            <span className="px-4 bg-black/60">o</span>
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-600/50 -z-10"></div>
          </div>

          {/* Mensaje inferior */}
          <p className="text-center text-gray-300 text-sm leading-relaxed">
            Accedé a tus rutinas, progreso y contenido exclusivo con un solo
            clic usando tu cuenta de Google.
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginFire;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dumbbell } from "lucide-react";

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // 👈 nuevo estado

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true); // 👈 activar loading

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Credenciales inválidas");
      const data = await res.json();

      localStorage.setItem("token", data.token);
      localStorage.setItem("rol", data.usuario.rol);
      localStorage.setItem("nombre", data.usuario.nombre);

      if (data.usuario.rol === "ADMIN") {
        navigate("/admin");
      } else if (data.usuario.rol === "CLIENTE") {
        navigate("/inicio");
      } else {
        navigate("/");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false); // 👈 desactivar loading
    }
  };

  return (
    <section className="relative flex items-center justify-center min-h-screen bg-gradient-to-b from-black to-gray-950 overflow-hidden">
      {/* Fondo con imagen y efecto */}
      <div className="absolute inset-0 bg-[url('/bg.jpeg')] bg-cover bg-center opacity-50"></div>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]"></div>

      {/* Contenedor del login */}
      <div className="relative z-10 bg-black/70 border border-pink-600/40 rounded-2xl p-8 w-full max-w-md shadow-[0_0_25px_rgba(236,72,153,0.3)]">
        <div className="flex flex-col items-center mb-6">
          <Dumbbell className="w-12 h-12 text-pink-500 animate-pulse drop-shadow-[0_0_10px_#ec4899]" />
          <h2 className="text-3xl font-extrabold text-white mt-3 tracking-wide">
            Fitness<span className="text-pink-400">Girl</span>
          </h2>
          <p className="text-gray-400 text-sm mt-1">Acceso exclusivo</p>
        </div>

        {error && (
          <p className="text-red-500 text-center mb-4 font-semibold">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              type="email"
              className="w-full bg-black/40 border border-pink-500/30 rounded-md p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-pink-500 outline-none"
              placeholder="admin@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              className="w-full bg-black/40 border border-pink-500/30 rounded-md p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-pink-500 outline-none"
              placeholder="••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 rounded-md transition shadow-[0_0_15px_rgba(236,72,153,0.4)] ${
              loading ? "opacity-80 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                Cargando...
              </div>
            ) : (
              "Iniciar sesión"
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;

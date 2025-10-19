import { useState, useEffect } from "react";
import { HeartHandshake, Zap, Smile } from "lucide-react";
import { Link } from "react-router-dom";

export const Inicio = () => {
  const [userName, setUserName] = useState("Atleta");
  const [loading, setLoading] = useState(true);
  const [showButton, setShowButton] = useState(false);

  // 1. EFECTO DE CARGA (Simulación de carga/fetch inicial)
  useEffect(() => {
    // Obtiene el nombre guardado en localStorage
    const nombreGuardado = localStorage.getItem("nombre");

    if (nombreGuardado) {
      setUserName(nombreGuardado);
    } else {
      setUserName("Atleta");
    }

    setLoading(false);
  }, []);

  // 2. EFECTO DE VERIFICACIÓN DE ROL (Verifica si el usuario es ADMIN)
  useEffect(() => {
    // ⚠️ CORRECCIÓN: Eliminamos el uso de 'data' y solo leemos del localStorage
    const rol = localStorage.getItem("rol");

    // El token es irrelevante aquí, solo se usa el rol para mostrar el botón
    if (rol === "ADMIN") {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, []); // Se ejecuta una sola vez al cargar el componente.

  // MUESTRA EL SPINNER MIENTRAS loading ES TRUE
  if (loading) {
    return (
      <section className="flex flex-col items-center justify-center min-h-screen text-center">
        <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-400">Cargando perfil...</p>
      </section>
    );
  }

  // CONTENIDO PRINCIPAL (Una vez que loading es false)
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen w-full text-center overflow-hidden bg-gradient-to-b from-gray-950 to-black">
      {/* ... todo el resto del JSX permanece igual ... */}
      <div className="absolute inset-0 bg-[url('/bg.jpeg')] bg-cover bg-center opacity-60 brightness-75 contrast-125"></div>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

      <div className="relative z-10 max-w-3xl px-6 py-12">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 animate-pulse drop-shadow-[0_0_20px_rgba(236,72,153,0.7)]">
          ¡Bienvenida, <span className="text-pink-400">{userName}</span>!
        </h1>

        <p className="text-lg md:text-2xl text-gray-300 font-light mb-10 flex items-center justify-center gap-2">
          <Zap className="w-6 h-6 text-pink-500 drop-shadow-[0_0_8px_#f472b6]" />
          Tu desafío empieza aquí. Transformación y fuerza en un solo lugar.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-8 mt-8">
          <div className="p-6 bg-black/60 rounded-xl border border-pink-700/50 shadow-lg hover:shadow-pink-500/40 transition duration-300">
            <HeartHandshake className="w-8 h-8 mx-auto mb-3 text-pink-400" />
            <p className="text-sm font-semibold text-gray-100">
              <span className="text-pink-300">Tu Progreso</span> te espera
            </p>
            <p className="text-xs text-gray-400 mt-1">Visualiza tus metas.</p>
          </div>

          <Link to={"/rutinas"}>
            <div className="p-6 bg-black/60 rounded-xl border border-pink-700/50 shadow-lg hover:shadow-pink-500/40 transition duration-300">
              <Smile className="w-8 h-8 mx-auto mb-3 text-pink-400" />
              <p className="text-sm font-semibold text-gray-100">
                <span className="text-pink-300">6 Rutinas</span> activas
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Lista para empezar la semana.
              </p>
            </div>
          </Link>

          {/* ESTE BOTÓN AHORA DEBERÍA FUNCIONAR CORRECTAMENTE */}
          {showButton && (
            <Link to={"/admin"}>
              <div className="p-6 bg-black/60 rounded-xl border border-pink-700/50 shadow-lg hover:shadow-pink-500/40 transition duration-300">
                <Smile className="w-8 h-8 mx-auto mb-3 text-pink-400" />
                <p className="text-sm font-semibold text-gray-100">
                  Panel de <span className="text-pink-300">Administración</span>
                </p>
              </div>
            </Link>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-pink-500/50 blur-sm opacity-50 shadow-[0_0_10px_#ec4899]"></div>
    </section>
  );
};

export default Inicio;

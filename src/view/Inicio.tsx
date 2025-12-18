import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Zap, HeartHandshake, Dumbbell, Shield, Activity } from "lucide-react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";

export const Inicio = () => {
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("Atleta");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName?.split(" ")[0] || "Atleta");

        // 👉 simple ahora, escalable después
        setIsAdmin(user.email === "admin@gmail.com");
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <section className="flex flex-col items-center justify-center min-h-screen bg-black">
        <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
        <p className="mt-4 text-gray-400 text-sm tracking-wide">
          Preparando tu experiencia...
        </p>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center bg-black overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[url('/bg.jpeg')] bg-cover bg-center opacity-35" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/85 to-black" />

      {/* Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-pink-600/20 blur-[180px] rounded-full" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl w-full px-6 py-20 text-center">
        {/* Welcome */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
          Hola,{" "}
          <span className="text-pink-400 drop-shadow-[0_0_20px_#ec4899]">
            {userName}
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-300 flex items-center justify-center gap-2">
          <Zap className="w-6 h-6 text-pink-500" />
          Hoy es un buen día para entrenar.
        </p>

        {/* Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <DashboardCard
            icon={<HeartHandshake />}
            title="Tu progreso"
            description="Seguimiento, metas y hábitos"
          />

          <Link to="/rutinas">
            <DashboardCard
              icon={<Dumbbell />}
              title="Rutinas activas"
              description="Entrenamientos listos para hoy"
              highlight
            />
          </Link>

          <Link to="/dashboard">
            <DashboardCard
              icon={<Activity />}
              title="Dashboard"
              description="Tu actividad y progreso diario"
              highlight
            />
          </Link>

          {isAdmin && (
            <Link to="/admin">
              <DashboardCard
                icon={<Shield />}
                title="Panel Admin"
                description="Gestión del sistema"
              />
            </Link>
          )}
        </div>

        {/* Divider */}
        <div className="mt-20 h-[2px] w-full bg-gradient-to-r from-transparent via-pink-500/50 to-transparent shadow-[0_0_15px_#ec4899]" />
      </div>
    </section>
  );
};

export default Inicio;

/* ---------- UI COMPONENT ---------- */

const DashboardCard = ({
  icon,
  title,
  description,
  highlight = false,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight?: boolean;
}) => (
  <div
    className={`
      group relative bg-black/60 backdrop-blur-md p-6 rounded-2xl
      border border-pink-500/20
      shadow-[0_0_20px_rgba(236,72,153,0.15)]
      hover:shadow-[0_0_40px_rgba(236,72,153,0.45)]
      transition-all duration-300 cursor-pointer
      ${highlight ? "scale-[1.02]" : ""}
    `}
  >
    <div className="flex justify-center mb-4 text-pink-400 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-white">{title}</h3>
    <p className="text-gray-400 text-sm mt-1">{description}</p>
  </div>
);

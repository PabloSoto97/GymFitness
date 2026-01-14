// Rutinas.jsx

import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

import principianteImg from "@/assets/principiante.webp";
import intermedioImg from "@/assets/intermedio.webp";
import avanzadoImg from "@/assets/avanzado.webp";
import fullBodyImg from "@/assets/3.webp";
import gluteo from "@/assets/gluteo.webp";
import funcional from "@/assets/funcional.webp";

const rutinas = [
  {
    to: "/rutinas/principiante",
    title: "Principiante",
    description:
      "Movimientos básicos, técnica correcta y una base sólida para comenzar.",
    image: principianteImg,
  },
  {
    to: "/rutinas/intermedio",
    title: "Intermedio",
    description:
      "Más intensidad, nuevos estímulos y una progresividad controlada.",
    image: intermedioImg,
  },
  {
    to: "/rutinas/avanzado",
    title: "Avanzado",
    description:
      "Desafíos complejos para atletas con experiencia y grandes objetivos.",
    image: avanzadoImg,
  },
  {
    to: "/rutinas/gluteos-femorales",
    title: "Glúteos & Femorales",
    description:
      "Especialización de 5 días para volumen, fuerza y desarrollo del tren inferior.",
    image: gluteo,
  },
  {
    to: "/rutinas/full-body-3dias",
    title: "Full Body 3 Días",
    description:
      "Entrenamiento total eficiente, equilibrado y adaptable a tus tiempos.",
    image: fullBodyImg,
  },
  {
    to: "/rutinas/activo-funcional",
    title: "Activo & Funcional",
    description:
      "Movilidad, estabilidad y fuerza global. Ideal para bajo impacto.",
    image: funcional,
  },
];

export const Rutinas: React.FC = () => {
  return (
    <div className="pb-20 pt-15 md:pt-6">
      {/* TÍTULO */}
      <h1 className="text-center text-4xl font-bold tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400">
        Planes de Rutinas
      </h1>

      <p className="text-center font-semibold text-gray-300 text-sm mb-12 max-w-xl mx-auto tracking-tight">
        Elegí el programa que acompañará tu progreso. Diseñados para distintos
        niveles y objetivos.
      </p>

      {/* GRID */}
      <div className="grid gap-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto px-4">
        {rutinas.map((rutina, i) => (
          <Link key={rutina.title} to={rutina.to} className="group block">
            <div
              className="
              bg-[#0b0b0b]/80 backdrop-blur-sm rounded-3xl overflow-hidden
              border border-pink-500/20 
              hover:border-pink-500/70 
              shadow-lg hover:shadow-[0_0_30px_#ff2b7b50]
              transition-all duration-500 flex flex-col h-full
              hover:-translate-y-1
              "
            >
              {/* Imagen */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={rutina.image}
                  alt={rutina.title}
                  className="w-full h-full object-cover transition-all duration-700 
                  group-hover:scale-110 group-hover:brightness-110"
                />

                <div
                  className="absolute inset-0 bg-gradient-to-t 
                from-black/70 via-black/20 to-transparent"
                />
              </div>

              {/* CONTENIDO */}
              <div className="p-7 flex flex-col flex-1 justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2 tracking-wide">
                    <span className="text-pink-400 drop-shadow-[0_0_10px_#ff2b7b]">
                      {rutina.title}
                    </span>
                  </h2>

                  <p className="text-gray-300 text-sm leading-relaxed">
                    {rutina.description}
                  </p>
                </div>

                {/* BOTÓN */}
                <div className="mt-6 flex justify-end">
                  <button
                    className="
                    flex items-center gap-2 px-5 py-2.5 rounded-xl 
                    bg-pink-600/80 text-white font-semibold 
                    hover:bg-pink-500 transition-all duration-300
                    shadow-md hover:shadow-lg shadow-pink-900/50
                    group-hover:translate-x-1
                    "
                  >
                    Ver Rutinas
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Glow */}
              <div className="h-[2px] bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-50 group-hover:opacity-100 transition-all"></div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

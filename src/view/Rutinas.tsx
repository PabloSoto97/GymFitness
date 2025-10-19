// Rutinas.jsx

import React from "react";
import { Link } from "react-router-dom";
// Asumiendo que estas rutas de importación son correctas para tus imágenes
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
      "Planes diseñados para quienes comienzan su viaje en el fitness. Se enfocan en movimientos fundamentales y en construir una base sólida.",
    image: principianteImg,
  },
  {
    to: "/rutinas/intermedio",
    title: "Intermedio",
    description:
      "Lleva tu estado físico al siguiente nivel. Estos planes introducen ejercicios más complejos y aumentan la intensidad.",
    image: intermedioImg,
  },
  {
    to: "/rutinas/avanzado",
    title: "Avanzado",
    description:
      "Para atletas experimentados que buscan superar sus límites. Alta intensidad y técnicas avanzadas para máximos resultados.",
    image: avanzadoImg,
  },
  {
    to: "/rutinas/gluteos-femorales",
    title: "Glúteos y Femorales",
    description:
      "Plan especializado de 5 días con doble foco semanal en tren inferior para la máxima hipertrofia y desarrollo de volumen.",
    image: gluteo,
  },
  {
    to: "/rutinas/full-body-3dias",
    title: "Full Body 3 Días",
    description:
      "Rutina de cuerpo completo para 3 días a la semana, ideal para quienes buscan eficiencia y resultados equilibrados.",
    image: fullBodyImg,
  },
  {
    to: "/rutinas/activo-funcional",
    title: "Activo y Funcional",
    description:
      "Plan de 3 días enfocado en movilidad, equilibrio y fuerza funcional. Ideal para adultos mayores o de bajo impacto.",
    image: funcional,
  },
];

export const Rutinas: React.FC = () => {
  return (
    <div className="pb-16 pt-4">
      {/* Título Principal - CLAVE: Aseguramos text-center y eliminamos md:text-left */}
      <h1 className="text-5xl font-extrabold mb-4 text-center text-pink-500 drop-shadow-[0_0_15px_#ff2b7b] tracking-wider animate-pulse">
        Planes de Rutinas
      </h1>

      {/* Subtítulo - CLAVE: Aseguramos text-center y eliminamos md:text-left */}
      <h2 className="text-xl font-medium mb-12 text-center text-gray-400">
        Selecciona un nivel para comenzar tu camino y alcanzar tus objetivos.
      </h2>

      {/* Contenedor de las Tarjetas (Similar al grid de Ejercicios) */}
      <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {rutinas.map((rutina) => (
          <Link key={rutina.title} to={rutina.to} className="group block">
            <div
              className="bg-[#0a0a0a]/70 backdrop-blur-sm rounded-3xl overflow-hidden 
              border border-pink-500/20 hover:border-pink-500/60 shadow-lg 
              hover:shadow-[0_0_25px_#ff2b7b80] transition-all duration-500 
              flex flex-col min-h-full"
            >
              {/* Imagen */}
              <div className="relative overflow-hidden h-64">
                <img
                  src={rutina.image}
                  alt={`Imagen de rutina ${rutina.title}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Overlay de Sombra */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              </div>

              {/* Texto y Botón */}
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2 text-pink-400 tracking-wide drop-shadow-[0_0_10px_#ff2b7b]">
                    {rutina.title}
                  </h2>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {rutina.description}
                  </p>
                </div>

                {/* Botón */}
                <button
                  className="mt-auto w-full py-3 rounded-xl 
                  bg-pink-600/70 text-white font-semibold 
                  hover:bg-pink-500 transition-colors duration-300 
                  shadow-md hover:shadow-lg shadow-pink-900/50"
                >
                  Ver Rutinas
                </button>
              </div>

              {/* Glow inferior */}
              <div className="h-[3px] bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

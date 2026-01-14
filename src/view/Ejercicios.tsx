// Ejercicios.tsx

import React from "react";
import { ejercicios } from "../data/ejercicios"; // Ajustá la ruta según dónde lo guardaste

export const Ejercicios: React.FC = () => {
  return (
    <div className="pb-16 pt-16">
      <h1 className="text-center pb-5 text-4xl font-bold tracking-tight  text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400">
        Ejercicios Destacados
      </h1>

      <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {ejercicios.map((ejer) => (
          <div
            key={ejer.id}
            className="group bg-[#0a0a0a]/70 backdrop-blur-md rounded-3xl overflow-hidden border border-pink-500/20 hover:border-pink-500/60 shadow-lg hover:shadow-[0_0_25px_#ff2b7b80] transition-all duration-500"
          >
            {/* Video */}
            <div className="relative overflow-hidden">
              <video
                src={ejer.video}
                className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                autoPlay
                loop
                muted
                playsInline
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Contenido */}
            <div className="p-6 text-center">
              {/* Nombre */}
              <h2 className="text-2xl font-bold mb-3 text-pink-400 tracking-wide drop-shadow-[0_0_10px_#ff2b7b]">
                {ejer.nombre}
              </h2>

              {/* Nivel • Categoría */}
              <div className="flex justify-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full text-xs uppercase font-semibold bg-pink-600/20 text-pink-400 border border-pink-500/40">
                  {ejer.nivel}
                </span>

                <span className="px-3 py-1 rounded-full text-xs uppercase font-semibold bg-purple-600/20 text-purple-300 border border-purple-500/40">
                  {ejer.categoria}
                </span>
              </div>

              {/* Descripción */}
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                {ejer.descripcion}
              </p>

              {/* Músculos trabajados */}
              <div className="flex flex-wrap justify-center gap-2">
                {ejer.musculos.map((m, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 text-[11px] bg-[#111]/60 border border-gray-700 rounded-full text-gray-300"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>

            {/* Glow inferior */}
            <div className="h-[3px] bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        ))}
      </div>
    </div>
  );
};

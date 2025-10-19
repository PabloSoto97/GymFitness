// Ejercicios.jsx

import React from "react";

interface Ejercicio {
  id: number;
  nombre: string;
  descripcion: string;
  video: string;
}

const ejercicios: Ejercicio[] = [
  {
    id: 1,
    nombre: "Hip Thrust",
    descripcion:
      "Sentate en el suelo con la parte superior de la espalda apoyada en un banco y la barra colocada sobre la cadera. Elevá la cadera contrayendo los glúteos hasta que el cuerpo forme una línea recta desde los hombros hasta las rodillas.",
    video: "/videos/Hip Thrust.mp4",
  },
  {
    id: 2,
    nombre: "Sentadillas",
    descripcion:
      "De pie, con los pies a la altura de los hombros, mantené el pecho erguido. Bajá la cadera hacia atrás y abajo manteniendo las rodillas alineadas con los pies, luego subí controlando el movimiento.",
    video: "/videos/Sentadilla.mp4",
  },
  {
    id: 3,
    nombre: "Plancha",
    descripcion:
      "Apoyá los antebrazos y puntas de los pies en el suelo, manteniendo el cuerpo recto y firme. Activá el abdomen y glúteos para sostener la postura sin elevar ni hundir la cadera.",
    video: "/videos/plancha.mp4",
  },
  {
    id: 4,
    nombre: "Peso Muerto",
    descripcion:
      "Con la barra frente a vos, flexioná caderas y rodillas manteniendo la espalda recta. Elevá la barra extendiendo caderas y rodillas al mismo tiempo, siempre cerca del cuerpo.",
    video: "/videos/PesoMuerto.mp4",
  },
  {
    id: 5,
    nombre: "Press Militar",
    descripcion:
      "Sentate o quedate de pie con una mancuerna en cada mano a la altura de los hombros. Empujá hacia arriba hasta extender los brazos sin bloquear los codos, y bajá de forma controlada.",
    video: "/videos/PressM.mp4",
  },
  {
    id: 6,
    nombre: "Extensión de Cadera en Polea",
    descripcion:
      "Parate frente a una polea baja, enganchá una tobillera y extendé la pierna hacia atrás sin mover el torso. Concentrá la fuerza en el glúteo y mantené el control del movimiento.",
    video: "/videos/Ext.mp4",
  },
];

export const Ejercicios: React.FC = () => {
  return (
    // Se elimina el 'min-h-screen bg-gradient-to-br...' ya que eso lo maneja AppLayout.
    <div className="pb-16 pt-4">
      {" "}
      {/* Añadimos un poco de padding vertical, ya que AppLayout agrega padding general. */}
      <h1 className="text-5xl font-extrabold mb-12 text-center text-pink-500 drop-shadow-[0_0_15px_#ff2b7b] tracking-wider animate-pulse">
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

            {/* Texto */}
            <div className="p-6 text-center">
              <h2 className="text-2xl font-bold mb-3 text-pink-400 tracking-wide drop-shadow-[0_0_10px_#ff2b7b]">
                {ejer.nombre}
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed">
                {ejer.descripcion}
              </p>
            </div>

            {/* Glow inferior */}
            <div className="h-[3px] bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        ))}
      </div>
    </div>
  );
};

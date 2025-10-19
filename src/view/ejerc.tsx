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
      "Sentate en el suelo con la parte superior de la espalda apoyada en un banco y la barra colocada sobre la cadera. Con los pies firmes en el suelo y las rodillas flexionadas, elevá la cadera hacia arriba contrayendo los glúteos hasta que el cuerpo forme una línea recta desde los hombros hasta las rodillas. Bajá lentamente y repetí manteniendo el control del movimiento.",
    video: "/videos/Hip Thrust.mp4",
  },
  {
    id: 2,
    nombre: "Sentadillas",
    descripcion:
      "De pie, con los pies a la altura de los hombros, mantené el pecho erguido y el abdomen firme. Iniciá el movimiento llevando la cadera hacia atrás como si fueras a sentarte, manteniendo las rodillas alineadas con los pies. Bajá hasta que las piernas formen un ángulo de 90°, o un poco más si tu movilidad lo permite, y luego empujá con fuerza hacia arriba para volver a la posición inicial.",
    video: "/videos/Sentadilla.mp4",
  },
  {
    id: 3,
    nombre: "Plancha",
    descripcion:
      "Apoyá los antebrazos y las puntas de los pies en el suelo, manteniendo el cuerpo en línea recta desde la cabeza hasta los talones. Activá el abdomen, los glúteos y las piernas para mantener una postura firme y estable. Evitá que la cadera se eleve o se hunda. Mantené esta posición durante el tiempo indicado, respirando de manera controlada.",
    video: "/videos/plancha.mp4",
  },
  {
    id: 4,
    nombre: "Peso Muerto",
    descripcion:
      "Colocate de pie con los pies a la altura de los hombros y la barra frente a vos, cerca de las espinillas. Flexioná caderas y rodillas manteniendo la espalda recta y el pecho abierto. Tomá la barra con agarre firme (mixto o pronado), activá el core y elevá la barra extendiendo las caderas y rodillas al mismo tiempo, manteniéndola siempre cerca del cuerpo. Bajá controlando el movimiento hasta volver a la posición inicial.",
    video: "/videos/PesoMuerto.mp4",
  },
  {
    id: 5,
    nombre: "Press Militar",
    descripcion:
      "Sentate en un banco con respaldo o de pie, sosteniendo una mancuerna en cada mano a la altura de los hombros, con las palmas mirando hacia adelante. Activá el core y mantené la espalda recta. Desde esa posición, empujá las mancuernas hacia arriba hasta extender completamente los brazos sin bloquear los codos. Luego bajalas lentamente hasta la posición inicial.",
    video: "/videos/PressM.mp4",
  },
  {
    id: 6,
    nombre: "Extensión de Cadera en Polea",
    descripcion:
      "Colocate frente a una polea baja y enganchá una tobillera al cable. Apoyate en la máquina con ambas manos para mantener el equilibrio. Con la pierna atada, realizá una extensión de cadera hacia atrás, manteniendo la rodilla levemente flexionada y concentrando la contracción en el glúteo. Volvé lentamente a la posición inicial sin dejar que el peso toque el stack.",
    video: "/videos/Ext.mp4",
  },
];

export const Ejercicios: React.FC = () => {
  return (
    <div className="min-h-screen text-white py-10 px-6">
      <h1 className="text-3xl font-bold mb-8 text-center text-red-500">
        Ejercicios
      </h1>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {ejercicios.map((ejer) => (
          <div
            key={ejer.id}
            className="bg-gray-900 rounded-2xl shadow-lg overflow-hidden transition-transform transform hover:scale-[1.02]"
          >
            <div className="relative">
              <video
                src={ejer.video}
                className="w-full h-56 object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>

            <div className="p-5">
              <h2 className="text-xl font-semibold mb-2 text-white">
                {ejer.nombre}
              </h2>
              <p className="text-gray-300 text-sm">{ejer.descripcion}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

import React, { useState } from "react";
import { ChevronDown, ChevronUp, Dumbbell } from "lucide-react";

interface Ejercicio {
  nombre: string;
  series: string;
  repeticiones: string;
}

interface DiaRutina {
  nombre: string;
  musculos: string;
  ejercicios: Ejercicio[];
}

const rutina: DiaRutina[] = [
  {
    nombre: "Lunes",
    musculos: "Tren Inferior y Equilibrio (Fuerza Funcional)",
    ejercicios: [
      {
        nombre: "Calentamiento: Marcha en el sitio con elevación de rodillas",
        series: "1",
        repeticiones: "5 minutos",
      },
      {
        nombre: "Sentadillas en Silla (o banco)",
        series: "3",
        repeticiones: "12-15 (controlado)",
      },
      {
        nombre: "Prensa de Piernas (poco peso) o Extensiones de rodilla",
        series: "3",
        repeticiones: "15",
      },
      {
        nombre: "Levantamiento de talones (Pantorrilla)",
        series: "3",
        repeticiones: "20",
      },
      {
        nombre:
          "Ejercicio de Equilibrio: Postura de Árbol (con apoyo en pared)",
        series: "3",
        repeticiones: "30 segundos por pierna",
      },
    ],
  },
  {
    nombre: "Miércoles",
    musculos: "Tren Superior y Postura (Hombros, Espalda, Pecho)",
    ejercicios: [
      {
        nombre: "Calentamiento: Círculos de brazos suaves",
        series: "1",
        repeticiones: "3 minutos",
      },
      {
        nombre: "Remo Sentado con Banda o Máquina",
        series: "3",
        repeticiones: "12 (enfocado en omóplatos)",
      },
      {
        nombre: "Press de Hombros con Mancuernas (sentado)",
        series: "3",
        repeticiones: "10-12 (peso ligero)",
      },
      {
        nombre: "Aperturas de Pecho con Banda o Máquina Pec Deck",
        series: "3",
        repeticiones: "15",
      },
      {
        nombre: "Rotación Externa de Hombros con banda",
        series: "3",
        repeticiones: "15 (por brazo)",
      },
      {
        nombre: "Caminata Rápida o Elíptica",
        series: "-",
        repeticiones: "20 minutos",
      },
    ],
  },
  {
    nombre: "Viernes",
    musculos: "Flexibilidad, Core y Fuerza General",
    ejercicios: [
      {
        nombre: "Activación: Estiramientos dinámicos (muñecas, tobillos)",
        series: "1",
        repeticiones: "5 minutos",
      },
      {
        nombre: "Elevación de Cadera (Puente de Glúteo) en suelo",
        series: "3",
        repeticiones: "15-20 (pausa de 2s arriba)",
      },
      {
        nombre: "Plancha con rodillas apoyadas (o plancha normal)",
        series: "3",
        repeticiones: "30-45 segundos",
      },
      {
        nombre: "Curl de Bíceps con Mancuernas",
        series: "3",
        repeticiones: "12",
      },
      {
        nombre: "Extensión de Tríceps por encima de la cabeza",
        series: "3",
        repeticiones: "12",
      },
      {
        nombre: "Enfriamiento: Estiramientos estáticos (Piernas y Espalda)",
        series: "1",
        repeticiones: "5 minutos",
      },
    ],
  },
];

const ACCENT_COLOR = "pink";

export const RutinaActivoFuncional: React.FC = () => {
  const [abierto, setAbierto] = useState<string | null>("Lunes");

  const toggleDia = (nombre: string) => {
    setAbierto((prev) => (prev === nombre ? null : nombre));
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      {/* Título */}
      <h1
        className="text-4xl md:text-5xl font-black mb-4 text-center tracking-wider 
        text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-pink-300 drop-shadow-[0_0_12px_#ff2b7b]"
      >
        Activo Funcional
      </h1>

      <p className="text-center text-gray-300 mb-12 text-lg max-w-2xl mx-auto leading-relaxed">
        Un plan enfocado en movilidad, equilibrio y fuerza funcional. Ideal para
        mejorar energía, postura y salud general.
      </p>

      {/* Acordeón */}
      {rutina.map((dia) => (
        <div
          key={dia.nombre}
          className={`
            mb-6 rounded-2xl overflow-hidden border backdrop-blur-md 
            bg-black/40 border-${ACCENT_COLOR}-500/20 
            shadow-[0_0_25px_rgba(255,105,180,0.15)] 
            transition-all duration-300
          `}
        >
          {/* Botón */}
          <button
            onClick={() => toggleDia(dia.nombre)}
            className={`
              w-full flex justify-between items-center px-6 py-5 text-left 
              font-semibold text-lg transition-all duration-300
              ${
                abierto === dia.nombre
                  ? `bg-${ACCENT_COLOR}-600/30 text-white shadow-inner`
                  : `text-${ACCENT_COLOR}-400 hover:bg-white/5`
              }
            `}
          >
            <span className="flex flex-col">
              {dia.nombre}
              <span className="text-sm font-normal text-gray-300">
                {dia.musculos}
              </span>
            </span>

            {abierto === dia.nombre ? (
              <ChevronUp className={`w-6 h-6 text-${ACCENT_COLOR}-300`} />
            ) : (
              <ChevronDown className={`w-6 h-6 text-${ACCENT_COLOR}-400`} />
            )}
          </button>

          {/* Contenido */}
          <div
            className={`transition-all duration-500 ease-in-out ${
              abierto === dia.nombre
                ? "max-h-[1200px] opacity-100"
                : "max-h-0 opacity-0"
            } overflow-hidden`}
          >
            <div className="p-6 bg-black/20">
              {/* Cabecera desktop */}
              <div
                className={`hidden md:grid grid-cols-5 text-${ACCENT_COLOR}-300 text-sm font-semibold border-b border-${ACCENT_COLOR}-500/30 pb-2 mb-4`}
              >
                <span className="col-span-3">Ejercicio</span>
                <span className="text-center">Series</span>
                <span className="text-center">Reps</span>
              </div>

              {/* Lista de ejercicios */}
              <div className="flex flex-col gap-4">
                {dia.ejercicios.map((ej, index) => (
                  <div
                    key={index}
                    className="
                      grid grid-cols-5 md:items-center bg-[#111]/70 
                      p-4 rounded-xl border border-gray-700/30 
                      shadow-inner shadow-black/40 hover:border-pink-500/40 
                      transition-all
                    "
                  >
                    {/* Nombre */}
                    <div className="col-span-5 md:col-span-3 flex items-center gap-3 font-medium text-gray-200 leading-snug">
                      <Dumbbell
                        className={`w-5 h-5 text-${ACCENT_COLOR}-400`}
                      />
                      {ej.nombre}
                    </div>

                    {/* Series */}
                    <div className="col-span-2 md:col-span-1 text-center mt-2 md:mt-0 text-gray-300">
                      <span className="md:hidden text-xs text-pink-400/70 mr-1">
                        Series:
                      </span>
                      <span className={`font-bold text-${ACCENT_COLOR}-300`}>
                        {ej.series}
                      </span>
                    </div>

                    {/* Reps */}
                    <div className="col-span-3 md:col-span-1 text-center mt-2 md:mt-0 text-gray-300">
                      <span className="md:hidden text-xs text-pink-400/70 mr-1">
                        Reps:
                      </span>
                      <span className={`font-bold text-${ACCENT_COLOR}-300`}>
                        {ej.repeticiones}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

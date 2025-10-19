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
      {/* Título Principal */}
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-center text-white drop-shadow-[0_0_10px_#f97316] tracking-wider">
        Rutina{" "}
        <span className={`text-${ACCENT_COLOR}-400`}>Activo y Funcional</span>
      </h1>

      {/* Subtítulo */}
      <p className="text-lg text-center text-gray-300 mb-10">
        Plan de 3 días enfocado en **movilidad**, **equilibrio** y **fuerza
        funcional** para mantener la autonomía y la salud ósea.
      </p>

      {/* Contenedor de Acordeón */}
      {rutina.map((dia) => (
        <div
          key={dia.nombre}
          className={`mb-4 bg-[#0a0a0a]/70 backdrop-blur-sm rounded-xl overflow-hidden 
                     border border-${ACCENT_COLOR}-500/20 hover:border-${ACCENT_COLOR}-500/60 shadow-lg 
                     hover:shadow-[0_0_15px_#fb923c80] transition-all duration-300`}
        >
          {/* Botón/Encabezado del Día */}
          <button
            onClick={() => toggleDia(dia.nombre)}
            className={`w-full flex justify-between items-center px-6 py-4 text-left font-bold transition-colors duration-300 ${
              abierto === dia.nombre
                ? `bg-${ACCENT_COLOR}-600/50 text-white shadow-inner shadow-${ACCENT_COLOR}-900/50`
                : `text-${ACCENT_COLOR}-400 hover:bg-[#1a1a1a]`
            }`}
          >
            <span>
              {dia.nombre}:{" "}
              <span className="font-medium text-gray-300">{dia.musculos}</span>
            </span>
            {abierto === dia.nombre ? (
              <ChevronUp className="w-6 h-6 text-white" />
            ) : (
              <ChevronDown className={`w-6 h-6 text-${ACCENT_COLOR}-500`} />
            )}
          </button>

          {/* Contenido (Ejercicios) */}
          <div
            className={`transition-all duration-500 ease-in-out ${
              abierto === dia.nombre
                ? "max-h-[1000px] opacity-100"
                : "max-h-0 opacity-0"
            } overflow-hidden`}
          >
            <div className="p-4 md:p-6 bg-black/30">
              {/* Encabezados de la tabla */}
              <div
                className={`hidden md:grid grid-cols-5 font-semibold text-sm text-${ACCENT_COLOR}-400 border-b border-${ACCENT_COLOR}-700/50 pb-2 mb-3`}
              >
                <span className="col-span-3">EJERCICIO</span>
                <span className="text-center">SERIES</span>
                <span className="text-center">REPETICIONES</span>
              </div>

              {/* Lista de Ejercicios */}
              <div className="flex flex-col gap-3">
                {dia.ejercicios.map((ej, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-5 items-center bg-[#1a1a1a] p-3 rounded-lg border border-orange-700/30 text-gray-200 shadow-inner shadow-black/50"
                  >
                    {/* Nombre del Ejercicio */}
                    <div className="col-span-5 md:col-span-3 flex items-center gap-3 font-medium">
                      <Dumbbell
                        className={`w-5 h-5 text-${ACCENT_COLOR}-500 flex-shrink-0`}
                      />
                      <span>{ej.nombre}</span>
                    </div>

                    {/* Series */}
                    <div className="col-span-2 md:col-span-1 text-center mt-2 md:mt-0 flex md:block justify-between items-center border-t border-gray-700 md:border-none pt-2 md:pt-0">
                      <span
                        className={`md:hidden text-xs text-${ACCENT_COLOR}-400/80 mr-2`}
                      >
                        Series:
                      </span>
                      <span className={`font-bold text-${ACCENT_COLOR}-300`}>
                        {ej.series}
                      </span>
                    </div>

                    {/* Repeticiones */}
                    <div className="col-span-3 md:col-span-1 text-center mt-2 md:mt-0 flex md:block justify-between items-center border-t border-gray-700 md:border-none pt-2 md:pt-0">
                      <span
                        className={`md:hidden text-xs text-${ACCENT_COLOR}-400/80 mr-2`}
                      >
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
          {/* Glow inferior para el acordeón cerrado */}
          <div
            className={`h-[2px] bg-gradient-to-r from-transparent via-${ACCENT_COLOR}-500 to-transparent ${
              abierto === dia.nombre ? "opacity-0" : "opacity-30"
            } transition-opacity duration-300`}
          />
        </div>
      ))}
    </div>
  );
};

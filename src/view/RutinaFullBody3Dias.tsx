// RutinaFullBody3Dias.jsx

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
    musculos: "Full Body A (Énfasis en Empuje)",
    ejercicios: [
      {
        nombre: "Sentadilla (Goblet o Barra)",
        series: "4",
        repeticiones: "12",
      },
      {
        nombre: "Press de banca o Press con Mancuernas (Pecho)",
        series: "3",
        repeticiones: "12",
      },
      { nombre: "Remo con Barra o Máquina", series: "4", repeticiones: "10" },
      { nombre: "Press Militar (Hombros)", series: "3", repeticiones: "10" },
      {
        nombre: "Biserie: Extensiones de Tríceps + Curl de Bíceps",
        series: "3",
        repeticiones: "15",
      },
      { nombre: "Plancha Abdominal", series: "3", repeticiones: "45-60s" },
    ],
  },
  {
    nombre: "Miércoles",
    musculos: "Full Body B (Énfasis en Tracción)",
    ejercicios: [
      {
        nombre: "Peso Muerto Rumano (Femorales/Glúteos)",
        series: "4",
        repeticiones: "10",
      },
      { nombre: "Jalón al Pecho (Espalda)", series: "4", repeticiones: "12" },
      {
        nombre: "Zancadas o Sentadilla Búlgara",
        series: "3",
        repeticiones: "10 por pierna",
      },
      {
        nombre: "Vuelos Laterales con Mancuernas (Hombros)",
        series: "3",
        repeticiones: "15",
      },
      {
        nombre: "Elevación de Gemelos (Pantorrillas)",
        series: "4",
        repeticiones: "20",
      },
      {
        nombre: "Crunch en Máquina o Elevación de Piernas",
        series: "3",
        repeticiones: "20",
      },
    ],
  },
  {
    nombre: "Viernes",
    musculos: "Full Body C (Movimientos Compuestos y Glúteo)",
    ejercicios: [
      { nombre: "Hip Thrust (Glúteo)", series: "4", repeticiones: "12-15" },
      { nombre: "Prensa de Piernas", series: "3", repeticiones: "15" },
      {
        nombre: "Remo Unilateral con Mancuerna",
        series: "3",
        repeticiones: "12 por brazo",
      },
      {
        nombre: "Press de Hombros en Máquina o Lateral",
        series: "3",
        repeticiones: "12",
      },
      {
        nombre: "Circuito de Aislamiento de Brazos (Bícep/Trícep)",
        series: "3",
        repeticiones: "15",
      },
      {
        nombre: "Cardio HIIT (20 minutos)",
        series: "-",
        repeticiones: "Intervalos",
      },
    ],
  },
];

// Color de acento para Full Body (Lima/Verde)

export const RutinaFullBody3Dias: React.FC = () => {
  const [abierto, setAbierto] = useState<string | null>("Lunes");

  const toggleDia = (nombre: string) => {
    setAbierto((prev) => (prev === nombre ? null : nombre));
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      {/* Título Principal */}
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-center text-pink-500 drop-shadow-[0_0_10px_#ff2b7b] tracking-wider">
        Rutina <span className="text-white">Full Body (3dias)</span>
      </h1>

      {/* Subtítulo */}
      <p className="text-lg text-center text-gray-300 mb-10">
        Entrenamiento de cuerpo completo de alta eficiencia para construir
        músculo y quemar grasa con solo 3 sesiones semanales.
      </p>

      {/* Contenedor de Acordeón */}
      {rutina.map((dia) => (
        <div
          key={dia.nombre}
          className="mb-4 bg-[#0a0a0a]/70 backdrop-blur-sm rounded-xl overflow-hidden 
                     border border-pink-500/20 hover:border-pink-500/60 shadow-lg 
                     hover:shadow-[0_0_15px_#ff2b7b80] transition-all duration-300"
        >
          {/* Botón/Encabezado del Día */}
          <button
            onClick={() => toggleDia(dia.nombre)}
            className={`w-full flex justify-between items-center px-6 py-4 text-left font-bold transition-colors duration-300 ${
              abierto === dia.nombre
                ? "bg-pink-600/50 text-white shadow-inner shadow-pink-900/50"
                : "text-pink-400 hover:bg-[#1a1a1a]"
            }`}
          >
            <span>
              {dia.nombre}:{" "}
              <span className="font-medium text-gray-300">{dia.musculos}</span>
            </span>
            {abierto === dia.nombre ? (
              <ChevronUp className="w-6 h-6 text-white" />
            ) : (
              <ChevronDown className="w-6 h-6 text-pink-500" />
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
              <div className="hidden md:grid grid-cols-5 font-semibold text-sm text-pink-400 border-b border-pink-700/50 pb-2 mb-3">
                <span className="col-span-3">EJERCICIO</span>
                <span className="text-center">SERIES</span>
                <span className="text-center">REPETICIONES</span>
              </div>

              {/* Lista de Ejercicios */}
              <div className="flex flex-col gap-3">
                {dia.ejercicios.map((ej, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-5 items-center bg-[#1a1a1a] p-3 rounded-lg border border-pink-700/30 text-gray-200 shadow-inner shadow-black/50"
                  >
                    {/* Nombre del Ejercicio */}
                    <div className="col-span-5 md:col-span-3 flex items-center gap-3 font-medium">
                      <Dumbbell className="w-5 h-5 text-pink-500 flex-shrink-0" />
                      <span>{ej.nombre}</span>
                    </div>

                    {/* Series */}
                    <div className="col-span-2 md:col-span-1 text-center mt-2 md:mt-0 flex md:block justify-between items-center border-t border-gray-700 md:border-none pt-2 md:pt-0">
                      <span className="md:hidden text-xs text-pink-400/80 mr-2">
                        Series:
                      </span>
                      <span className="font-bold text-pink-300">
                        {ej.series}
                      </span>
                    </div>

                    {/* Repeticiones */}
                    <div className="col-span-3 md:col-span-1 text-center mt-2 md:mt-0 flex md:block justify-between items-center border-t border-gray-700 md:border-none pt-2 md:pt-0">
                      <span className="md:hidden text-xs text-pink-400/80 mr-2">
                        Reps:
                      </span>
                      <span className="font-bold text-pink-300">
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
            className={`h-[2px] bg-gradient-to-r from-transparent via-pink-500 to-transparent ${
              abierto === dia.nombre ? "opacity-0" : "opacity-30"
            } transition-opacity duration-300`}
          />
        </div>
      ))}
    </div>
  );
};

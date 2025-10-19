// RutinaPrincipiante.jsx

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
    musculos: "Piernas (Cuádriceps, Aductores, Pantorrillas)",
    ejercicios: [
      {
        nombre: "Activación: Camilla de extensiones",
        series: "2",
        repeticiones: "20",
      },
      {
        nombre: "Circuito: Sentadilla (sin peso) + Desplantes",
        series: "3",
        repeticiones: "12 c/u",
      },
      { nombre: "Prensa a 45°", series: "3", repeticiones: "15" },
      { nombre: "Sillón de aducción", series: "3", repeticiones: "15" },
      { nombre: "Elevación de Pantorrillas", series: "3", repeticiones: "15" },
    ],
  },
  {
    nombre: "Martes",
    musculos: "Pecho, Hombros y Tríceps",
    ejercicios: [
      {
        nombre: "Activación: Vuelos laterales con poco peso",
        series: "2",
        repeticiones: "15",
      },
      {
        nombre: "Press de banca con mancuernas",
        series: "3",
        repeticiones: "12",
      },
      {
        nombre: "Press militar con mancuernas",
        series: "3",
        repeticiones: "12",
      },
      {
        nombre: "Extensión de tríceps en polea alta",
        series: "3",
        repeticiones: "15",
      },
    ],
  },
  {
    nombre: "Miércoles",
    musculos: "Glúteos e Isquiotibiales",
    ejercicios: [
      {
        nombre: "Activación: Hip thrust (sin peso)",
        series: "2",
        repeticiones: "20",
      },
      { nombre: "Hip thrust con barra", series: "3", repeticiones: "15" },
      {
        nombre: "Peso muerto rumano con mancuernas",
        series: "3",
        repeticiones: "15",
      },
      {
        nombre: "Curl en camilla para isquiotibiales",
        series: "3",
        repeticiones: "15",
      },
    ],
  },
  {
    nombre: "Jueves",
    musculos: "Espalda y Bíceps",
    ejercicios: [
      {
        nombre: "Activación: Jalón al pecho agarre abierto (poco peso)",
        series: "2",
        repeticiones: "12",
      },
      {
        nombre: "Jalón al pecho agarre abierto",
        series: "3",
        repeticiones: "12",
      },
      {
        nombre: "Remo con mancuerna unilateral",
        series: "3",
        repeticiones: "12",
      },
      {
        nombre: "Curl de bíceps con mancuernas",
        series: "3",
        repeticiones: "15",
      },
    ],
  },
  {
    nombre: "Viernes",
    musculos: "Full Body + Core",
    ejercicios: [
      {
        nombre:
          "Sentadilla profunda , Sentadilla con salto, Sentadilla con pulso",
        series: "3",
        repeticiones: "15 15 20",
      },
      { nombre: "Plancha abdominal", series: "3", repeticiones: "30 - 60 seg" },
      { nombre: "Burpees suaves", series: "3", repeticiones: "10" },
      { nombre: "Crunches", series: "3", repeticiones: "20" },
    ],
  },
];

export const RutinaPrincipiante: React.FC = () => {
  // Mantengo el estado del acordeón
  const [abierto, setAbierto] = useState<string | null>("Lunes");

  const toggleDia = (nombre: string) => {
    setAbierto((prev) => (prev === nombre ? null : nombre));
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      {/* Título Principal */}
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-center text-pink-500 drop-shadow-[0_0_10px_#ff2b7b] tracking-wider">
        Rutina Nivel <span className="text-white">Principiante</span>
      </h1>

      {/* Subtítulo */}
      <p className="text-lg text-center text-gray-300 mb-10">
        Una introducción perfecta al entrenamiento de fuerza, cubriendo todos
        los grupos musculares principales.
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
                ? "max-h-screen opacity-100"
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

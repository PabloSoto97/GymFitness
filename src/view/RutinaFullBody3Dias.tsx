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
      { nombre: "Press banca o Mancuernas", series: "3", repeticiones: "12" },
      { nombre: "Remo con Barra o Máquina", series: "4", repeticiones: "10" },
      { nombre: "Press Militar", series: "3", repeticiones: "10" },
      {
        nombre: "Biserie: Ext Tríceps + Curl Bíceps",
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
      { nombre: "Peso Muerto Rumano", series: "4", repeticiones: "10" },
      { nombre: "Jalón al Pecho", series: "4", repeticiones: "12" },
      {
        nombre: "Zancadas / Búlgara",
        series: "3",
        repeticiones: "10 por pierna",
      },
      { nombre: "Vuelos Laterales", series: "3", repeticiones: "15" },
      { nombre: "Elevación de Gemelos", series: "4", repeticiones: "20" },
      { nombre: "Crunch / Elevación Piernas", series: "3", repeticiones: "20" },
    ],
  },
  {
    nombre: "Viernes",
    musculos: "Full Body C (Compuestos y Glúteo)",
    ejercicios: [
      { nombre: "Hip Thrust", series: "4", repeticiones: "12-15" },
      { nombre: "Prensa de Piernas", series: "3", repeticiones: "15" },
      {
        nombre: "Remo Unilateral Mancuerna",
        series: "3",
        repeticiones: "12 por brazo",
      },
      {
        nombre: "Press Hombros Máquina / Lateral",
        series: "3",
        repeticiones: "12",
      },
      { nombre: "Circuito Brazos", series: "3", repeticiones: "15" },
      {
        nombre: "Cardio HIIT (20min)",
        series: "-",
        repeticiones: "Intervalos",
      },
    ],
  },
];

export const RutinaFullBody3Dias: React.FC = () => {
  const [abierto, setAbierto] = useState<string | null>("Lunes");

  const toggleDia = (nombre: string) => {
    setAbierto((prev) => (prev === nombre ? null : nombre));
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      {/* TÍTULO */}
      <h1
        className="text-4xl md:text-5xl font-black mb-4 text-center tracking-wider 
        text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-pink-300 drop-shadow-[0_0_12px_#ff2b7b]"
      >
        Full Body 3 Días
      </h1>

      <p className="text-lg text-center text-gray-300 mb-12 max-w-2xl mx-auto">
        Rutina eficiente y equilibrada, ideal para construir músculo y mantener
        un físico fuerte con solo 3 sesiones semanales.
      </p>

      {/* ACORDEÓN */}
      {rutina.map((dia) => (
        <div
          key={dia.nombre}
          className="mb-6 bg-[#0d0d0d]/80 backdrop-blur-md rounded-2xl overflow-hidden border 
          border-pink-500/20 hover:border-pink-500/40 hover:shadow-[0_0_25px_#ff2b7b55] transition-all duration-300"
        >
          {/* HEADER */}
          <button
            onClick={() => toggleDia(dia.nombre)}
            className={`w-full flex justify-between items-center px-6 py-5 text-left font-semibold 
              transition-all duration-300 ${
                abierto === dia.nombre
                  ? "bg-pink-600/40 text-white shadow-inner shadow-pink-900/60"
                  : "text-pink-400 hover:bg-[#1a1a1a]"
              }`}
          >
            <span className="text-lg">
              {dia.nombre} ·{" "}
              <span className="text-gray-300 font-normal">{dia.musculos}</span>
            </span>

            {abierto === dia.nombre ? (
              <ChevronUp className="w-6 h-6 text-white" />
            ) : (
              <ChevronDown className="w-6 h-6 text-pink-400" />
            )}
          </button>

          {/* CONTENIDO */}
          <div
            className={`transition-all duration-500 ease-in-out ${
              abierto === dia.nombre
                ? "max-h-[1200px] opacity-100"
                : "max-h-0 opacity-0"
            } overflow-hidden`}
          >
            <div className="p-6 bg-black/20">
              {/* HEADER TABLA */}
              <div
                className="hidden md:grid grid-cols-5 font-semibold text-sm text-pink-300/90 
                border-b border-pink-700/40 pb-2 mb-4"
              >
                <span className="col-span-3">Ejercicio</span>
                <span className="text-center">Series</span>
                <span className="text-center">Reps</span>
              </div>

              {/* EJERCICIOS */}
              <div className="flex flex-col gap-3">
                {dia.ejercicios.map((ej, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-5 items-center bg-[#131313] p-4 rounded-xl border 
                    border-pink-700/30 text-gray-200 shadow-inner hover:shadow-pink-900/30 hover:scale-[1.01] 
                    transition-all duration-300"
                  >
                    {/* EJERCICIO */}
                    <div className="col-span-5 md:col-span-3 flex items-center gap-3 font-medium">
                      <Dumbbell className="w-5 h-5 text-pink-400" />
                      <span>{ej.nombre}</span>
                    </div>

                    {/* SERIES */}
                    <div className="col-span-2 md:col-span-1 text-center mt-2 md:mt-0">
                      <span className="font-bold text-pink-300">
                        {ej.series}
                      </span>
                    </div>

                    {/* REPS */}
                    <div className="col-span-3 md:col-span-1 text-center mt-2 md:mt-0">
                      <span className="font-bold text-pink-300">
                        {ej.repeticiones}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* LINEA GLOW */}
          <div
            className={`h-[2px] bg-gradient-to-r from-transparent via-pink-500 to-transparent ${
              abierto === dia.nombre ? "opacity-0" : "opacity-40"
            } transition-opacity duration-300`}
          />
        </div>
      ))}
    </div>
  );
};

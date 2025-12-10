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
    musculos: "Pecho + Hombros",
    ejercicios: [
      { nombre: "Press banca con barra", series: "4", repeticiones: "8 - 10" },
      {
        nombre: "Press inclinado con mancuernas",
        series: "4",
        repeticiones: "10",
      },
      {
        nombre: "Aperturas en banco inclinado",
        series: "3",
        repeticiones: "12",
      },
      { nombre: "Press militar con barra", series: "4", repeticiones: "8" },
      { nombre: "Elevaciones laterales", series: "3", repeticiones: "15" },
    ],
  },
  {
    nombre: "Martes",
    musculos: "Espalda + Bíceps",
    ejercicios: [
      { nombre: "Dominadas asistidas", series: "4", repeticiones: "6 - 8" },
      { nombre: "Jalón al pecho", series: "4", repeticiones: "10" },
      { nombre: "Remo con barra", series: "4", repeticiones: "8 - 10" },
      { nombre: "Curl bíceps barra Z", series: "3", repeticiones: "12" },
      { nombre: "Curl martillo", series: "3", repeticiones: "12" },
    ],
  },
  {
    nombre: "Miércoles",
    musculos: "Piernas (Fuerza)",
    ejercicios: [
      { nombre: "Sentadilla con barra", series: "4", repeticiones: "6 - 8" },
      { nombre: "Prensa pesada", series: "4", repeticiones: "10" },
      { nombre: "Peso muerto rumano", series: "4", repeticiones: "10" },
      { nombre: "Extensiones de cuadriceps", series: "3", repeticiones: "15" },
      { nombre: "Curl femoral sentado", series: "3", repeticiones: "15" },
    ],
  },
  {
    nombre: "Jueves",
    musculos: "Glúteos + Posterior",
    ejercicios: [
      { nombre: "Hip thrust con barra", series: "4", repeticiones: "8 - 12" },
      { nombre: "Peso muerto sumo", series: "4", repeticiones: "8" },
      {
        nombre: "Elevación de glúteo en banco",
        series: "3",
        repeticiones: "15",
      },
      { nombre: "Curl femoral acostado", series: "3", repeticiones: "12 - 15" },
      {
        nombre: "Abducciones en polea o banda",
        series: "3",
        repeticiones: "20",
      },
    ],
  },
  {
    nombre: "Viernes",
    musculos: "Full Body + Core",
    ejercicios: [
      {
        nombre: "Sentadilla frontal con barra",
        series: "3",
        repeticiones: "8 - 10",
      },
      { nombre: "Press militar mancuernas", series: "3", repeticiones: "10" },
      { nombre: "Remo con mancuerna", series: "3", repeticiones: "12" },
      {
        nombre: "Plancha + bird dog",
        series: "3",
        repeticiones: "30 - 40 seg",
      },
      { nombre: "Crunches en máquina", series: "3", repeticiones: "15" },
    ],
  },
];

export const RutinaIntermedio: React.FC = () => {
  const [abierto, setAbierto] = useState<string | null>("Lunes");

  const toggleDia = (nombre: string) => {
    setAbierto((prev) => (prev === nombre ? null : nombre));
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      {/* Título */}
      <h1 className="text-center text-5xl font-extrabold mb-3 tracking-wider">
        <span className="text-pink-500 drop-shadow-[0_0_18px_#ff2b7b]">
          Intermedio
        </span>
      </h1>

      <p className="text-center text-gray-300 text-lg mb-10 max-w-xl mx-auto">
        Más volumen, más intensidad y progresión continua. Ideal para quienes ya
        dominan la técnica.
      </p>

      {/* Días */}
      {rutina.map((dia) => (
        <div
          key={dia.nombre}
          className="mb-6 bg-[#0b0b0b]/70 backdrop-blur-xl rounded-2xl overflow-hidden
          border border-pink-500/20 hover:border-pink-500/50
          shadow-lg hover:shadow-[0_0_20px_#ff2b7b60] 
          transition-all duration-300"
        >
          {/* Header */}
          <button
            onClick={() => toggleDia(dia.nombre)}
            className={`w-full flex justify-between items-center px-6 py-5 text-left text-lg font-semibold tracking-wide transition-all
              ${
                abierto === dia.nombre
                  ? "bg-pink-600/40 text-white"
                  : "text-pink-400 hover:bg-black/40"
              }`}
          >
            <span>
              {dia.nombre} —{" "}
              <span className="font-medium text-gray-300">{dia.musculos}</span>
            </span>

            {abierto === dia.nombre ? (
              <ChevronUp className="w-6 h-6 text-white" />
            ) : (
              <ChevronDown className="w-6 h-6 text-pink-400" />
            )}
          </button>

          {/* Contenido */}
          <div
            className={`transition-all duration-500 overflow-hidden 
            ${
              abierto === dia.nombre
                ? "max-h-screen opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="p-6 bg-black/40">
              {/* Cabecera tabla */}
              <div className="hidden md:grid grid-cols-5 text-sm font-semibold text-pink-400 border-b border-pink-700/40 pb-2 mb-4">
                <span className="col-span-3">Ejercicio</span>
                <span className="text-center">Series</span>
                <span className="text-center">Reps</span>
              </div>

              {/* Ejercicios */}
              <div className="flex flex-col gap-4">
                {dia.ejercicios.map((ej, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-5 items-center bg-[#141414] border border-pink-500/20 
                    rounded-xl p-4 shadow-inner shadow-black/50 text-gray-200"
                  >
                    {/* Nombre */}
                    <div className="col-span-5 md:col-span-3 flex items-center gap-3 font-medium">
                      <Dumbbell className="w-5 h-5 text-pink-500" />
                      <span>{ej.nombre}</span>
                    </div>

                    {/* Series */}
                    <div className="col-span-2 md:col-span-1 text-center mt-2 md:mt-0">
                      <span className="text-pink-300 font-bold">
                        {ej.series}
                      </span>
                    </div>

                    {/* Reps */}
                    <div className="col-span-3 md:col-span-1 text-center mt-2 md:mt-0">
                      <span className="text-pink-300 font-bold">
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

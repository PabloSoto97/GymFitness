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
    musculos: "Glúteos (Fuerza) y Cuádriceps",
    ejercicios: [
      {
        nombre: "Activación: Extensión de Cadera en Polea",
        series: "2",
        repeticiones: "20 (poco peso)",
      },
      {
        nombre: "Hip Thrust Pesado (Máxima Carga)",
        series: "5",
        repeticiones: "5-8 (subida explosiva, pausa 2s arriba)",
      },
      {
        nombre:
          "Triserie: Sentadilla Búlgara + Zancada Reversa + Sentadilla Profunda",
        series: "4",
        repeticiones: "10-12 por pierna (cada ejercicio)",
      },
      {
        nombre:
          "Biserie: Prensa Horizontal (pies altos) + Desplantes con mancuernas",
        series: "3",
        repeticiones: "15",
      },
    ],
  },
  {
    nombre: "Martes",
    musculos: "Espalda, Hombros y Abdomen",
    ejercicios: [
      {
        nombre: "Dominadas Asistidas o Jalón al Pecho",
        series: "4",
        repeticiones: "10-12",
      },
      { nombre: "Remo en Máquina o Barra", series: "4", repeticiones: "10" },
      {
        nombre:
          "Triserie de Hombros: Press Frontal + Vuelos Laterales + Face Pull",
        series: "3",
        repeticiones: "12",
      },
      {
        nombre: "Circuito Abdominal de 5 minutos",
        series: "1",
        repeticiones: "Al fallo",
      },
    ],
  },
  {
    nombre: "Miércoles",
    musculos: "Femorales (Isquiotibiales) y Glúteos (Aislamiento)",
    ejercicios: [
      {
        nombre: "Activación: Curl de Pierna Sentado o Acostado",
        series: "2",
        repeticiones: "20",
      },
      {
        nombre: "Peso Muerto Rumano con Mancuernas o Barra",
        series: "5",
        repeticiones: "8-10 (fase excéntrica lenta)",
      },
      {
        nombre: "Hiperextensión de Glúteo (45°), enfoque glúteo",
        series: "4",
        repeticiones: "15",
      },
      {
        nombre:
          "Biserie: Patada de Burro en Máquina + Abducción en Máquina o Banda",
        series: "4",
        repeticiones: "15-20",
      },
      {
        nombre: "Curl Nórdico o Glute Ham Raise Asistido",
        series: "3",
        repeticiones: "Al fallo",
      },
    ],
  },
  {
    nombre: "Jueves",
    musculos: "Brazos y Descanso Activo",
    ejercicios: [
      {
        nombre: "Biserie de Bíceps: Curl Barra Z + Curl Martillo",
        series: "4",
        repeticiones: "12",
      },
      {
        nombre:
          "Biserie de Tríceps: Extensión Polea + Fondos en Paralelas Asistidos",
        series: "4",
        repeticiones: "12",
      },
      {
        nombre: "Caminata o Cardio LISS",
        series: "-",
        repeticiones: "30-45 minutos",
      },
    ],
  },
  {
    nombre: "Viernes",
    musculos: "Glúteos (Volumen), Femorales y Pantorrillas",
    ejercicios: [
      {
        nombre:
          "Circuito (Sin Peso): Sentadilla Sumo (Pulso) + Sentadilla con Salto",
        series: "3",
        repeticiones: "20 de cada",
      },
      {
        nombre: "Biserie: Cable Pull-Through + Good Morning con Pesa Rusa",
        series: "4",
        repeticiones: "15",
      },
      {
        nombre: "Sentadilla Goblet (High Reps)",
        series: "3",
        repeticiones: "20-25",
      },
      {
        nombre: "Triserie de Pantorrillas",
        series: "4",
        repeticiones: "15 (por variante)",
      },
    ],
  },
];

export const RutinaGluteosFemorales: React.FC = () => {
  const [abierto, setAbierto] = useState<string | null>("Lunes");

  const toggleDia = (nombre: string) => {
    setAbierto((prev) => (prev === nombre ? null : nombre));
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      {/* Título */}
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-center text-white tracking-wide">
        Rutina{" "}
        <span className="text-pink-500 drop-shadow-[0_0_12px_#ff2b7b]">
          Glúteos & Femorales
        </span>
      </h1>

      <p className="text-lg text-center text-gray-300 mb-10 leading-relaxed">
        Plan especializado para máxima hipertrofia del tren inferior:
        intensidad, volumen y técnica controlada.
      </p>

      {/* Días */}
      {rutina.map((dia) => (
        <div
          key={dia.nombre}
          className="mb-5 rounded-2xl bg-[#0f0f0f]/70 border border-pink-500/20 
                     shadow-[0_0_25px_#00000080] backdrop-blur-lg overflow-hidden
                     hover:border-pink-500/40 transition-all duration-300"
        >
          {/* Header del día */}
          <button
            onClick={() => toggleDia(dia.nombre)}
            className={`w-full flex justify-between items-center px-6 py-5 text-left font-semibold text-lg transition-all duration-300
              ${
                abierto === dia.nombre
                  ? "bg-pink-600/40 text-white shadow-inner shadow-pink-900/40"
                  : "text-pink-300 hover:bg-[#1b1b1b]"
              }`}
          >
            <span>
              {dia.nombre} ·{" "}
              <span className="text-gray-300 font-medium">{dia.musculos}</span>
            </span>

            {abierto === dia.nombre ? (
              <ChevronUp className="w-7 h-7 text-white" />
            ) : (
              <ChevronDown className="w-7 h-7 text-pink-400" />
            )}
          </button>

          {/* Contenido */}
          <div
            className={`transition-all duration-500 ${
              abierto === dia.nombre
                ? "max-h-screen opacity-100"
                : "max-h-0 opacity-0"
            } overflow-hidden`}
          >
            <div className="p-6 bg-black/40">
              {/* Encabezados Desktop */}
              <div className="hidden md:grid grid-cols-5 font-semibold text-sm text-pink-400 border-b border-pink-600/40 pb-2 mb-4 tracking-wide">
                <span className="col-span-3">EJERCICIO</span>
                <span className="text-center">SERIES</span>
                <span className="text-center">REPS</span>
              </div>

              {/* Ejercicios */}
              <div className="flex flex-col gap-4">
                {dia.ejercicios.map((ej, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-5 items-center bg-[#181818] p-4 rounded-xl border border-pink-700/30 
                               shadow-inner shadow-black/40 hover:bg-[#1f1f1f] transition-all"
                  >
                    <div className="col-span-5 md:col-span-3 flex items-center gap-3 font-medium text-gray-200">
                      <Dumbbell className="w-6 h-6 text-pink-500 flex-shrink-0 drop-shadow-[0_0_6px_#ff2b7b]" />
                      {ej.nombre}
                    </div>

                    {/* SERIES */}
                    <div
                      className="col-span-2 md:col-span-1 text-center mt-3 md:mt-0 flex md:block justify-between items-center 
                                    border-t border-gray-700 md:border-none pt-2 md:pt-0"
                    >
                      <span className="md:hidden text-xs text-pink-400/80">
                        Series:
                      </span>
                      <span className="font-bold text-pink-300">
                        {ej.series}
                      </span>
                    </div>

                    {/* REPS */}
                    <div
                      className="col-span-3 md:col-span-1 text-center mt-3 md:mt-0 flex md:block justify-between items-center 
                                    border-t border-gray-700 md:border-none pt-2 md:pt-0"
                    >
                      <span className="md:hidden text-xs text-pink-400/80">
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
        </div>
      ))}
    </div>
  );
};

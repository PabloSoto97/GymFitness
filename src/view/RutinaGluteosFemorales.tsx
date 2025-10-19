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
      {
        nombre: "Remo en Máquina o Barra",
        series: "4",
        repeticiones: "10",
      },
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
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-center text-pink-500 drop-shadow-[0_0_10px_#ff2b7b] tracking-wider">
        Rutina <span className="text-white">Glúteos & Femorales</span>
      </h1>

      <p className="text-lg text-center text-gray-300 mb-10">
        Plan especializado de alto volumen y frecuencia para la máxima
        hipertrofia del tren inferior.
      </p>

      {rutina.map((dia) => (
        <div
          key={dia.nombre}
          className="mb-4 bg-[#0a0a0a]/70 backdrop-blur-sm rounded-xl overflow-hidden 
                     border border-pink-500/20 hover:border-pink-500/60 shadow-lg 
                     hover:shadow-[0_0_15px_#ff2b7b80] transition-all duration-300"
        >
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

          <div
            className={`transition-all duration-500 ease-in-out ${
              abierto === dia.nombre
                ? "max-h-screen opacity-100"
                : "max-h-0 opacity-0"
            } overflow-hidden`}
          >
            <div className="p-4 md:p-6 bg-black/30">
              <div className="hidden md:grid grid-cols-5 font-semibold text-sm text-pink-400 border-b border-pink-700/50 pb-2 mb-3">
                <span className="col-span-3">EJERCICIO</span>
                <span className="text-center">SERIES</span>
                <span className="text-center">REPETICIONES</span>
              </div>

              <div className="flex flex-col gap-3">
                {dia.ejercicios.map((ej, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-5 items-center bg-[#1a1a1a] p-3 rounded-lg border border-pink-700/30 text-gray-200 shadow-inner shadow-black/50"
                  >
                    <div className="col-span-5 md:col-span-3 flex items-center gap-3 font-medium">
                      <Dumbbell className="w-5 h-5 text-pink-500 flex-shrink-0" />
                      <span>{ej.nombre}</span>
                    </div>

                    <div className="col-span-2 md:col-span-1 text-center mt-2 md:mt-0 flex md:block justify-between items-center border-t border-gray-700 md:border-none pt-2 md:pt-0">
                      <span className="md:hidden text-xs text-pink-400/80 mr-2">
                        Series:
                      </span>
                      <span className="font-bold text-pink-300">
                        {ej.series}
                      </span>
                    </div>

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

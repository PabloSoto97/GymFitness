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
    musculos: "Cuádriceps, Aductores, Pantorrillas",
    ejercicios: [
      {
        nombre: "Activación: Camilla de extensiones",
        series: "2",
        repeticiones: "20",
      },
      {
        nombre:
          "Circuito: Sentadilla frontal + Desplantes + Sentadilla profunda",
        series: "4",
        repeticiones: "ida y vuelta",
      },
      {
        nombre: "Biserie: Prensa a 45° (pies separados) + Hack (pies en medio)",
        series: "4",
        repeticiones: "12-15",
      },
      {
        nombre:
          "Biserie Combinada: Sillón de aducción + Zancada lateral unilateral",
        series: "4",
        repeticiones: "12",
      },
      {
        nombre:
          "Biserie: Camilla de extensiones unilateral + Triserie de Pantorrillas",
        series: "4",
        repeticiones: "15 (extensiones) y 10 (pantorrillas)",
      },
    ],
  },
  {
    nombre: "Martes",
    musculos: "Hombros, Pectorales, Tríceps",
    ejercicios: [
      {
        nombre: "Activación: Vuelos laterales + vuelos frontales",
        series: "2",
        repeticiones: "20",
      },
      {
        nombre: "Circuito: Vuelos laterales + Press militar + Vuelo a 45°",
        series: "4",
        repeticiones: "12",
      },
      {
        nombre: "Biserie: Press de banca + Apertura de pecho",
        series: "4",
        repeticiones: "12",
      },
      {
        nombre:
          "Triserie: Extensión polea alta + Tras nuca + Extensión unilateral",
        series: "4",
        repeticiones: "15",
      },
    ],
  },
  {
    nombre: "Miércoles",
    musculos: "Glúteos e Isquiotibiales",
    ejercicios: [
      {
        nombre: "Activación: Hip thrust con pulso",
        series: "1",
        repeticiones: "20",
      },
      { nombre: "Hip thrust", series: "4", repeticiones: "12-15" },
      {
        nombre:
          "Triserie: Sentadilla profunda + Peso muerto rumano + Subida a banco",
        series: "4",
        repeticiones: "10-12",
      },
      {
        nombre: "Biserie: Patada de burro + Abducción con disco",
        series: "4",
        repeticiones: "12",
      },
    ],
  },
  {
    nombre: "Jueves",
    musculos: "Espalda y Bíceps",
    ejercicios: [
      {
        nombre: "Activación: Jalón al pecho abierto + cerrado",
        series: "2",
        repeticiones: "20",
      },
      {
        nombre:
          "Circuito: Jalón abierto + cerrado + estrecho + Remo + Remo unilateral",
        series: "4",
        repeticiones: "según carga",
      },
      {
        nombre:
          "Triserie: Curl banco Scott + Curl mancuernas + Curl isométrico",
        series: "4",
        repeticiones: "12-15",
      },
    ],
  },
  {
    nombre: "Viernes",
    musculos: "Sentadillas y Abdominales",
    ejercicios: [
      {
        nombre: "Activación: Sentadilla profunda",
        series: "1",
        repeticiones: "20",
      },
      {
        nombre:
          "Circuito: Profunda (5x15) + Con salto (5x15) + Con pulso (5x20) + Estocadas (5x10 c/pierna)",
        series: "5",
        repeticiones: "según variante",
      },
      {
        nombre: "Abdominales + salto de cuerda",
        series: "4",
        repeticiones: "final del entrenamiento",
      },
    ],
  },
];

export const RutinaIntermedio: React.FC = () => {
  const [abierto, setAbierto] = useState<string | null>("Lunes");

  const toggleDia = (nombre: string) => {
    setAbierto((prev) => (prev === nombre ? null : nombre));
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-center text-pink-500 drop-shadow-[0_0_10px_#ff2b7b] tracking-wider">
        Rutina Nivel <span className="text-white">Intermedio</span>
      </h1>

      <p className="text-lg text-center text-gray-300 mb-10">
        Un plan desafiante para desarrollar fuerza, control y resistencia
        muscular con técnicas combinadas.
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

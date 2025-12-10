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
          "Circuito: Sentadilla frontal (con peso) + Desplantes 'patito' + Sentadilla profunda",
        series: "4",
        repeticiones: "Ida y vuelta = 1 serie",
      },
      {
        nombre: "Biserie: Prensa 45° (pies separados) + Hack (pies al medio)",
        series: "4",
        repeticiones: "Según carga",
      },
      {
        nombre: "Biserie: Aducción + Zancada lateral unilateral",
        series: "4",
        repeticiones: "12",
      },
      {
        nombre: "Biserie: Extensión unilateral + Triserie de pantorrillas",
        series: "4",
        repeticiones: "15 / 10",
      },
    ],
  },
  {
    nombre: "Martes",
    musculos: "Hombros, Pectorales, Tríceps",
    ejercicios: [
      {
        nombre: "Activación: Vuelos laterales + frontales",
        series: "2",
        repeticiones: "20",
      },
      {
        nombre: "Circuito: Laterales + Frontales + Press militar + Vuelo a 45°",
        series: "4",
        repeticiones: "12",
      },
      {
        nombre:
          "Biserie gigante: Press banca + Apertura + Press 45° + Apertura",
        series: "4",
        repeticiones: "12",
      },
      {
        nombre:
          "Triserie: Extensión en polea + Tras nuca + Extensión unilateral",
        series: "4",
        repeticiones: "15",
      },
    ],
  },
  {
    nombre: "Miércoles",
    musculos: "Glúteos e Isquios",
    ejercicios: [
      {
        nombre: "Activación: Hip thrust con pulso",
        series: "1",
        repeticiones: "20",
      },
      { nombre: "Hip thrust", series: "4", repeticiones: "12-15" },
      {
        nombre: "Triserie: Sentadilla profunda + Rumano + Subida al banco",
        series: "4",
        repeticiones: "10-12",
      },
      {
        nombre: "Biserie: Patada de burro + Abducción",
        series: "4",
        repeticiones: "12",
      },
      {
        nombre: "Biserie: Camilla ventral + Swing con pesa rusa",
        series: "4",
        repeticiones: "15",
      },
    ],
  },
  {
    nombre: "Jueves",
    musculos: "Espalda y Bíceps",
    ejercicios: [
      {
        nombre: "Activación: Jalón abierto + cerrado",
        series: "2",
        repeticiones: "20",
      },
      {
        nombre:
          "Circuito: Jalón abierto + cerrado + estrecho + Remo + Unilateral",
        series: "4",
        repeticiones: "Según carga",
      },
      {
        nombre: "Triserie: Scott + Mancuernas + Curl isométrico",
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
          "Circuito Sentadillas: Profunda + Salto + Pulso + Estocada isométrica",
        series: "-",
        repeticiones: "Con pesa rusa si es posible",
      },
      {
        nombre: "Circuito de Abs + Saltos en el lugar/cuerda",
        series: "4",
        repeticiones: "Al finalizar",
      },
    ],
  },
];

export const RutinaAvanzado: React.FC = () => {
  const [abierto, setAbierto] = useState<string | null>("Lunes");

  const toggleDia = (nombre: string) => {
    setAbierto((prev) => (prev === nombre ? null : nombre));
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      {/* Título */}
      <h1 className="text-center text-5xl font-extrabold mb-3 tracking-wider">
        <span className="text-pink-500 drop-shadow-[0_0_18px_#ff2b7b]">
          Avanzado
        </span>
      </h1>

      <p className="text-center text-gray-300 text-lg mb-10 max-w-xl mx-auto">
        Rutina intensa para mejorar fuerza, volumen y definición muscular.
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

export interface Ejercicio {
  id: number;
  nombre: string;
  descripcion: string;
  video: string;
  categoria:
    | "inferior"
    | "superior"
    | "core"
    | "gluteos"
    | "funcional"
    | "fullbody";
  musculos: string[];
  nivel: "principiante" | "intermedio" | "avanzado";
}

export const ejercicios: Ejercicio[] = [
  {
    id: 1,
    nombre: "Hip Thrust",
    descripcion:
      "El Hip Thrust es uno de los mejores ejercicios para activar y desarrollar los glúteos. Sentate con la parte superior de la espalda apoyada en un banco y la barra (o peso) sobre la cadera. Elevá la cadera contrayendo fuertemente los glúteos hasta formar una línea recta desde hombros a rodillas. Mantené el abdomen firme y evitá arquear la espalda. Bajá de forma controlada manteniendo tensión constante.",
    video: "/videos/Hip Thrust.mp4",
    categoria: "gluteos",
    musculos: ["glúteo mayor", "glúteo medio", "isquiotibiales", "core"],
    nivel: "intermedio",
  },
  {
    id: 2,
    nombre: "Sentadillas",
    descripcion:
      "Las sentadillas son un ejercicio fundamental para fuerza y estabilidad. De pie, con los pies a la altura de los hombros, bajá la cadera hacia atrás y abajo como si te fueras a sentar. Mantené el pecho erguido, rodillas alineadas con los pies y el core firme. Descendé controlando el movimiento y empujá desde los talones para volver a subir.",
    video: "/videos/Sentadilla.mp4",
    categoria: "inferior",
    musculos: ["cuádriceps", "glúteos", "isquiotibiales", "core"],
    nivel: "principiante",
  },
  {
    id: 3,
    nombre: "Plancha",
    descripcion:
      "La plancha es un ejercicio isométrico para fortalecer el core. Apoyá antebrazos y puntas de los pies en el suelo formando una línea recta desde cabeza a talones. Activá abdomen, glúteos y piernas para sostener la posición. Evitá elevar la cadera o hundir la zona lumbar.",
    video: "/videos/plancha.mp4",
    categoria: "core",
    musculos: ["abdomen", "transverso", "oblicuos", "glúteos"],
    nivel: "principiante",
  },
  {
    id: 4,
    nombre: "Peso Muerto",
    descripcion:
      "El Peso Muerto es clave para fuerza y estabilidad. Con la barra frente a vos, flexioná caderas y rodillas manteniendo la espalda recta. Tomá la barra y elevála extendiendo cadera y rodillas al mismo tiempo. La barra debe rozar las piernas durante todo el recorrido. Mantené el core activo y evitá redondear la espalda.",
    video: "/videos/PesoMuerto.mp4",
    categoria: "fullbody",
    musculos: [
      "glúteos",
      "isquiotibiales",
      "espalda baja",
      "antebrazos",
      "core",
    ],
    nivel: "intermedio",
  },
  {
    id: 5,
    nombre: "Press Militar",
    descripcion:
      "Sentate o de pie, sostené una mancuerna en cada mano a la altura de los hombros. Empujá hacia arriba hasta extender completamente los brazos sin bloquear los codos. Mantené el abdomen firme y evitá arquear la espalda baja. Bajá las mancuernas de forma controlada.",
    video: "/videos/PressM.mp4",
    categoria: "superior",
    musculos: ["deltoides", "tríceps", "trapecio superior"],
    nivel: "intermedio",
  },
  {
    id: 6,
    nombre: "Extensión de Cadera en Polea",
    descripcion:
      "Parate frente a una polea baja con una tobillera sujeta al tobillo. Llevá la pierna hacia atrás manteniendo el torso firme y evitando arquear la espalda. El movimiento debe ser lento y controlado, enfocándote en la contracción del glúteo.",
    video: "/videos/Ext.mp4",
    categoria: "gluteos",
    musculos: ["glúteo mayor", "glúteo medio", "isquiotibiales"],
    nivel: "principiante",
  },
];

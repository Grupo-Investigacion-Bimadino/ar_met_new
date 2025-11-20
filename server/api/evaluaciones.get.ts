export default defineEventHandler((event) => {
  const evaluaciones = [
    {
      id: 1,
      titulo: "Examen sobre Conceptos del Metaverso",
      tipo: "Cuestionario",
      preguntas: 10,
      dificultad: "Fácil"
    },
    {
      id: 2,
      titulo: "Evaluación de Realidad Aumentada",
      tipo: "Práctica",
      preguntas: 5,
      dificultad: "Media"
    },
    {
      id: 3,
      titulo: "Proyecto Final: Entorno Virtual",
      tipo: "Proyecto",
      preguntas: 0,
      dificultad: "Avanzada"
    }
  ];

  return evaluaciones;
});
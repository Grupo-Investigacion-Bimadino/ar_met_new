export default defineEventHandler((event) => {
  const actividades = [
    {
      id: 1,
      titulo: "Quiz: Conceptos del Metaverso",
      descripcion: "Pon a prueba tus conocimientos sobre metaverso, realidad aumentada y tecnologías inmersivas.",
      duracion: "15 minutos",
      nivel: "Básico",
      tipo: "quiz"
    },
    {
      id: 2,
      titulo: "Empareja Conceptos y Definiciones",
      descripcion: "Arrastra y conecta cada concepto del metaverso con su definición correcta.",
      duracion: "10 minutos",
      nivel: "Básico",
      tipo: "emparejar"
    },
    {
      id: 3,
      titulo: "Construye tu Avatar Virtual",
      descripcion: "Personaliza tu avatar eligiendo características físicas, ropa y accesorios.",
      duracion: "15 minutos",
      nivel: "Básico",
      tipo: "avatar-builder"
    }
  ];

  return actividades;
});
export default defineEventHandler((event) => {
  const actividades = [
    {
      id: 1,
      titulo: "Exploración del Metaverso",
      descripcion: "Los estudiantes ingresan a un entorno virtual y exploran diferentes escenarios digitales.",
      duracion: "30 minutos",
      nivel: "Intermedio"
    },
    {
      id: 2,
      titulo: "Realidad Aumentada con Dispositivos Móviles",
      descripcion: "Actividad práctica donde los alumnos utilizan sus celulares para visualizar modelos 3D en el entorno real.",
      duracion: "20 minutos",
      nivel: "Básico"
    },
    {
      id: 3,
      titulo: "Creación de un Avatar Propio",
      descripcion: "Los participantes diseñan y personalizan su propio avatar para interactuar en el metaverso.",
      duracion: "25 minutos",
      nivel: "Básico"
    }
  ];

  return actividades;
});
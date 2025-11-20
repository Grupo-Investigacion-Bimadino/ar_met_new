export default defineEventHandler((event) => {
  const noticias = [
    {
      id: 1,
      titulo: "Meta lanza nuevas gafas de Realidad Virtual",
      descripcion: "La compañía presentó su modelo Meta Quest 3 con mejoras en resolución, comodidad y realidad mixta.",
      categoria: "Realidad Virtual",
      autor: "Redacción OVA Tech",
      fecha: "2025-10-15",
      imagen: "/img/metaquest3.jpg"
    },
    {
      id: 2,
      titulo: "La Inteligencia Artificial revoluciona la educación",
      descripcion: "Nuevas plataformas de aprendizaje adaptativo utilizan IA para personalizar la enseñanza según las habilidades del estudiante.",
      categoria: "Inteligencia Artificial",
      autor: "Redacción OVA Tech",
      fecha: "2025-10-12",
      imagen: "/img/iaeducacion.jpg"
    },
    {
      id: 3,
      titulo: "Avances en Robótica Humanoide",
      descripcion: "Los robots con expresiones faciales realistas y comprensión del lenguaje natural ya están siendo probados en hospitales y universidades.",
      categoria: "Robótica",
      autor: "Redacción OVA Tech",
      fecha: "2025-10-10",
      imagen: "/img/robotica.jpg"
    },
    {
      id: 4,
      titulo: "Google presenta su nuevo chip cuántico",
      descripcion: "El nuevo procesador promete multiplicar la capacidad de cálculo y reducir el consumo energético.",
      categoria: "Computación Cuántica",
      autor: "Redacción OVA Tech",
      fecha: "2025-10-05",
      imagen: "/img/chipcuantico.jpg"
    }
  ]

  return noticias
})

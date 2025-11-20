export default defineEventHandler((event) => {
  const conceptos = [
    {
      id: 1,
      nombre: "Metaverso",
      descripcion: "Entorno virtual compartido donde los usuarios pueden interactuar entre sí y con objetos digitales.",
      categoria: "Realidad Virtual"
    },
    {
      id: 2,
      nombre: "Realidad Aumentada",
      descripcion: "Tecnología que combina el mundo real con elementos digitales superpuestos en tiempo real.",
      categoria: "Interacción Digital"
    },
    {
      id: 3,
      nombre: "Avatar Digital",
      descripcion: "Representación virtual del usuario en entornos inmersivos o plataformas del metaverso.",
      categoria: "Identidad Virtual"
    }
  ];

  return conceptos;
});
export default defineEventHandler((event) => {
  const conceptos = [
    {
      id: 1,
      nombre: "Metaverso",
      descripcion: "Entorno virtual compartido donde los usuarios pueden interactuar entre sí y con objetos digitales en tiempo real.",
      categoria: "Realidad Virtual",
      detalles: "El metaverso representa la convergencia de realidad física, aumentada y virtual en un espacio en línea compartido. Permite experiencias inmersivas donde los usuarios pueden trabajar, jugar, socializar y crear contenido.",
      ejemplos: ["Roblox", "Decentraland", "Meta Horizon Worlds"],
      imagen: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800"
    },
    {
      id: 2,
      nombre: "Realidad Aumentada",
      descripcion: "Tecnología que combina el mundo real con elementos digitales superpuestos en tiempo real.",
      categoria: "Interacción Digital",
      detalles: "La RA superpone información digital (imágenes, sonidos, textos) sobre el mundo real a través de dispositivos como smartphones, tablets o gafas especiales. Enriquece la percepción de la realidad sin reemplazarla completamente.",
      ejemplos: ["Pokémon GO", "Snapchat Filters", "IKEA Place"],
      imagen: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=800"
    },
    {
      id: 3,
      nombre: "Avatar Digital",
      descripcion: "Representación virtual del usuario en entornos inmersivos o plataformas del metaverso.",
      categoria: "Identidad Virtual",
      detalles: "Un avatar es la representación gráfica personalizable que permite a los usuarios interactuar en mundos virtuales. Puede ser realista o estilizado, y refleja la identidad digital del usuario en espacios virtuales.",
      ejemplos: ["Ready Player Me", "VRChat Avatars", "Bitmoji"],
      imagen: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=800"
    },
    {
      id: 4,
      nombre: "Tecnologías",
      descripcion: "Conoce las tecnologías detrás del metaverso: VR, AR, blockchain y más.",
      categoria: "Infraestructura",
      detalles: "El metaverso se construye sobre un ecosistema tecnológico complejo que incluye Realidad Virtual (VR), Realidad Aumentada (AR), Blockchain para activos digitales, 5G para conectividad, IA para experiencias personalizadas, y motores gráficos avanzados.",
      ejemplos: ["Oculus VR", "Ethereum Blockchain", "Unreal Engine", "Unity"],
      imagen: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800"
    }
  ];

  return conceptos;
});
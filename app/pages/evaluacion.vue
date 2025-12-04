<template>
  <v-app>
    <Sidebar />
    <v-main>
      <v-container>
        <!-- Encabezado -->
        <div class="text-center mb-6">
          <h1 class="text-h3 mb-2">Evaluación Final</h1>
          <p class="text-h6 text-grey-darken-1">
            Demuestra todo lo que has aprendido sobre el Metaverso y Realidad Aumentada
          </p>
        </div>

        <!-- Vista inicial - Antes de comenzar -->
        <v-row v-if="!evaluacionIniciada && !evaluacionCompletada" justify="center">
          <v-col cols="12" md="8">
            <v-card elevation="3" class="pa-6">
              <v-card-title class="text-h4 text-center mb-4">
                <v-icon size="80" color="primary">mdi-clipboard-text</v-icon>
              </v-card-title>

              <v-card-text>
                <h3 class="text-h5 mb-4">Información de la Evaluación</h3>

                <v-alert type="info" variant="tonal" class="mb-4">
                  <strong>📋 Instrucciones importantes:</strong>
                  <ul class="mt-2">
                    <li>La evaluación consta de {{ preguntas.length }} preguntas</li>
                    <li>Algunas preguntas incluyen imágenes para identificar</li>
                    <li>Cada pregunta tiene solo UNA respuesta correcta</li>
                    <li>Debes obtener al menos {{ notaMinima }}% para aprobar</li>
                    <li>Una vez iniciada, no puedes pausar la evaluación</li>
                    <li>Al finalizar recibirás tu certificado si apruebas</li>
                  </ul>
                </v-alert>

                <v-row class="mb-4">
                  <v-col cols="6" md="3">
                    <v-card color="primary" dark class="pa-4 text-center">
                      <v-icon size="40" class="mb-2">mdi-help-circle</v-icon>
                      <div class="text-h6">{{ preguntas.length }}</div>
                      <div class="text-caption">Preguntas</div>
                    </v-card>
                  </v-col>
                  <v-col cols="6" md="3">
                    <v-card color="secondary" dark class="pa-4 text-center">
                      <v-icon size="40" class="mb-2">mdi-clock-outline</v-icon>
                      <div class="text-h6">30 min</div>
                      <div class="text-caption">Duración</div>
                    </v-card>
                  </v-col>
                  <v-col cols="6" md="3">
                    <v-card color="success" dark class="pa-4 text-center">
                      <v-icon size="40" class="mb-2">mdi-check-circle</v-icon>
                      <div class="text-h6">{{ notaMinima }}%</div>
                      <div class="text-caption">Aprobación</div>
                    </v-card>
                  </v-col>
                  <v-col cols="6" md="3">
                    <v-card color="warning" dark class="pa-4 text-center">
                      <v-icon size="40" class="mb-2">mdi-certificate</v-icon>
                      <div class="text-h6">Sí</div>
                      <div class="text-caption">Certificado</div>
                    </v-card>
                  </v-col>
                </v-row>

                <v-alert type="warning" variant="tonal" class="mb-4">
                  <strong>⚠️ Importante:</strong> Asegúrate de haber completado todas las actividades antes de iniciar la evaluación.
                </v-alert>

                <div class="text-center">
                  <v-btn
                    color="primary"
                    size="x-large"
                    @click="iniciarEvaluacion"
                  >
                    <v-icon start>mdi-play</v-icon>
                    Iniciar Evaluación
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Evaluación en progreso -->
        <v-row v-if="evaluacionIniciada && !evaluacionCompletada" justify="center">
          <v-col cols="12" md="10">
            <!-- Barra de progreso -->
            <v-card class="mb-4 pa-4" elevation="2">
              <div class="d-flex justify-space-between mb-2">
                <span class="text-body-1 font-weight-bold">
                  Pregunta {{ preguntaActual + 1 }} de {{ preguntas.length }}
                </span>
                <span class="text-body-1">
                  Respondidas: {{ respuestasUsuario.filter(r => r !== null).length }}/{{ preguntas.length }}
                </span>
              </div>
              <v-progress-linear
                :model-value="((preguntaActual + 1) / preguntas.length) * 100"
                color="primary"
                height="10"
                rounded
              ></v-progress-linear>
            </v-card>

            <!-- Pregunta actual -->
            <v-card elevation="3" class="pa-6">
              <div class="mb-4">
                <v-chip color="primary" class="mb-2">
                  Pregunta {{ preguntaActual + 1 }}
                </v-chip>
                <v-chip :color="preguntas[preguntaActual].conImagen ? 'secondary' : 'grey'" class="mb-2 ml-2">
                  <v-icon start>{{ preguntas[preguntaActual].conImagen ? 'mdi-image' : 'mdi-text' }}</v-icon>
                  {{ preguntas[preguntaActual].conImagen ? 'Con imagen' : 'Texto' }}
                </v-chip>
              </div>

              <h2 class="text-h5 mb-4">{{ preguntas[preguntaActual].pregunta }}</h2>

              <!-- Imagen si la pregunta la incluye -->
              <div v-if="preguntas[preguntaActual].imagen" class="mb-6 text-center">
                <v-img
                  :src="preguntas[preguntaActual].imagen"
                  :alt="preguntas[preguntaActual].altImagen"
                  max-height="300"
                  contain
                  class="mx-auto rounded-lg elevation-4"
                ></v-img>
                <p class="text-caption text-grey mt-2">{{ preguntas[preguntaActual].altImagen }}</p>
              </div>

              <!-- Opciones de respuesta -->
              <v-radio-group v-model="respuestasUsuario[preguntaActual]">
                <v-card
                  v-for="(opcion, index) in preguntas[preguntaActual].opciones"
                  :key="index"
                  class="mb-3 pa-4 cursor-pointer"
                  :class="{ 'bg-blue-lighten-5': respuestasUsuario[preguntaActual] === index }"
                  elevation="1"
                  @click="respuestasUsuario[preguntaActual] = index"
                >
                  <v-radio :value="index" color="primary">
                    <template v-slot:label>
                      <span class="text-body-1">{{ opcion }}</span>
                    </template>
                  </v-radio>
                </v-card>
              </v-radio-group>

              <!-- Botones de navegación -->
              <v-divider class="my-4"></v-divider>
              <div class="d-flex justify-space-between">
                <v-btn
                  variant="outlined"
                  :disabled="preguntaActual === 0"
                  @click="preguntaAnterior"
                >
                  <v-icon start>mdi-chevron-left</v-icon>
                  Anterior
                </v-btn>

                <v-btn
                  v-if="preguntaActual < preguntas.length - 1"
                  color="primary"
                  @click="siguientePregunta"
                >
                  Siguiente
                  <v-icon end>mdi-chevron-right</v-icon>
                </v-btn>

                <v-btn
                  v-else
                  color="success"
                  size="large"
                  @click="finalizarEvaluacion"
                  :disabled="respuestasUsuario.some(r => r === null)"
                >
                  Finalizar Evaluación
                  <v-icon end>mdi-check-circle</v-icon>
                </v-btn>
              </div>

              <!-- Advertencia si faltan respuestas -->
              <v-alert
                v-if="preguntaActual === preguntas.length - 1 && respuestasUsuario.some(r => r === null)"
                type="warning"
                variant="tonal"
                class="mt-4"
              >
                Aún tienes preguntas sin responder. Revisa todas antes de finalizar.
              </v-alert>
            </v-card>

            <!-- Navegador rápido -->
            <v-card class="mt-4 pa-4" elevation="2">
              <h4 class="text-subtitle-1 mb-3">Navegación Rápida</h4>
              <div class="d-flex flex-wrap gap-2">
                <v-btn
                  v-for="(pregunta, index) in preguntas"
                  :key="index"
                  :color="respuestasUsuario[index] !== null ? 'success' : 'grey'"
                  :variant="preguntaActual === index ? 'elevated' : 'outlined'"
                  size="small"
                  @click="irAPregunta(index)"
                >
                  {{ index + 1 }}
                </v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>

        <!-- Resultados -->
        <v-row v-if="evaluacionCompletada" justify="center">
          <v-col cols="12" md="8">
            <!-- Resultado general -->
            <v-card elevation="3" class="pa-6 mb-4 text-center">
              <v-icon
                :color="aprobado ? 'success' : 'error'"
                size="120"
              >
                {{ aprobado ? 'mdi-trophy' : 'mdi-alert-circle' }}
              </v-icon>

              <h2 class="text-h3 mt-4 mb-2">
                {{ aprobado ? '¡Felicidades!' : 'No Aprobaste' }}
              </h2>

              <p class="text-h5 text-grey-darken-1 mb-4">
                Tu calificación: {{ notaFinal }}%
              </p>

              <v-chip
                :color="aprobado ? 'success' : 'error'"
                size="large"
                class="px-6"
              >
                {{ respuestasCorrectas }} de {{ preguntas.length }} correctas
              </v-chip>

              <v-divider class="my-6"></v-divider>

              <v-alert
                :type="aprobado ? 'success' : 'error'"
                variant="tonal"
              >
                <div v-if="aprobado">
                  <strong>🎉 ¡Excelente trabajo!</strong>
                  <p class="mt-2">Has demostrado un dominio sólido de los conceptos del metaverso y realidad aumentada. ¡Descarga tu certificado!</p>
                </div>
                <div v-else>
                  <strong>📚 Sigue practicando</strong>
                  <p class="mt-2">Necesitas al menos {{ notaMinima }}% para aprobar. Revisa los conceptos y las actividades, luego intenta nuevamente.</p>
                </div>
              </v-alert>

              <div class="mt-6">
                <v-btn
                  v-if="aprobado"
                  color="success"
                  size="large"
                  class="mr-2"
                  @click="descargarCertificado"
                >
                  <v-icon start>mdi-download</v-icon>
                  Descargar Certificado
                </v-btn>
                <v-btn
                  color="primary"
                  size="large"
                  variant="outlined"
                  @click="verResultadosDetallados = !verResultadosDetallados"
                >
                  <v-icon start>mdi-eye</v-icon>
                  {{ verResultadosDetallados ? 'Ocultar' : 'Ver' }} Respuestas
                </v-btn>
              </div>
            </v-card>

            <!-- Resultados detallados -->
            <v-expand-transition>
              <v-card v-show="verResultadosDetallados" elevation="3" class="pa-6">
                <h3 class="text-h5 mb-4">Revisión de Respuestas</h3>

                <div
                  v-for="(pregunta, index) in preguntas"
                  :key="index"
                  class="mb-6"
                >
                  <v-card
                    :color="esCorrecta(index) ? 'success-lighten-5' : 'error-lighten-5'"
                    class="pa-4"
                  >
                    <div class="d-flex align-start">
                      <v-icon
                        :color="esCorrecta(index) ? 'success' : 'error'"
                        size="30"
                        class="mr-3"
                      >
                        {{ esCorrecta(index) ? 'mdi-check-circle' : 'mdi-close-circle' }}
                      </v-icon>

                      <div class="flex-grow-1">
                        <h4 class="text-h6 mb-2">Pregunta {{ index + 1 }}</h4>
                        <p class="mb-3">{{ pregunta.pregunta }}</p>

                        <v-img
                          v-if="pregunta.imagen"
                          :src="pregunta.imagen"
                          max-height="150"
                          contain
                          class="mb-3 rounded"
                        ></v-img>

                        <div class="mb-2">
                          <strong>Tu respuesta:</strong>
                          <span :class="esCorrecta(index) ? 'text-success' : 'text-error'">
                            {{ pregunta.opciones[respuestasUsuario[index]] }}
                          </span>
                        </div>

                        <div v-if="!esCorrecta(index)" class="mb-2">
                          <strong>Respuesta correcta:</strong>
                          <span class="text-success">
                            {{ pregunta.opciones[pregunta.correcta] }}
                          </span>
                        </div>

                        <v-alert
                          type="info"
                          variant="tonal"
                          density="compact"
                          class="mt-2"
                        >
                          {{ pregunta.explicacion }}
                        </v-alert>
                      </div>
                    </div>
                  </v-card>
                </div>
              </v-card>
            </v-expand-transition>

            <!-- Botones finales -->
            <div class="text-center mt-6">
              <v-btn
                v-if="!aprobado"
                color="primary"
                size="large"
                @click="reintentar"
              >
                <v-icon start>mdi-refresh</v-icon>
                Intentar Nuevamente
              </v-btn>
              <v-btn
                color="grey"
                size="large"
                variant="outlined"
                class="ml-2"
                to="/actividades"
              >
                <v-icon start>mdi-arrow-left</v-icon>
                Volver a Actividades
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
const evaluacionIniciada = ref(false)
const evaluacionCompletada = ref(false)
const preguntaActual = ref(0)
const respuestasUsuario = ref([])
const verResultadosDetallados = ref(false)
const notaMinima = 70

// Preguntas de la evaluación (algunas con imágenes)
const preguntas = ref([
  {
    pregunta: "¿Qué es el Metaverso?",
    opciones: [
      "Una aplicación de mensajería instantánea",
      "Un entorno virtual compartido donde los usuarios pueden interactuar en tiempo real",
      "Un sistema operativo para computadoras",
      "Una red social tradicional"
    ],
    correcta: 1,
    explicacion: "El metaverso es un espacio virtual compartido y persistente donde usuarios interactúan con objetos digitales y entre sí en tiempo real.",
    conImagen: false,
    imagen: null,
    altImagen: ""
  },
  {
    pregunta: "¿Cuál de las siguientes opciones describe mejor lo que ocurre en la imagen de ejemplo sobre Realidad Aumentada?",
    opciones: [
      "Una persona usando un casco VR completamente cerrado",
      "Una persona mirando su teléfono con elementos digitales superpuestos en el mundo real",
      "Una computadora de escritorio tradicional",
      "Un videojuego de consola"
    ],
    correcta: 1,
    explicacion: "La Realidad Aumentada superpone elementos digitales sobre el mundo real visible, típicamente a través de dispositivos como smartphones o tablets.",
    conImagen: true,
    imagen: "https://badpress.cl/wp-content/uploads/2025/09/como-hacer-perisimo-en-discover-de-google-sin-vender-el-alma.png",
    altImagen: "Ejemplo de Realidad Aumentada con smartphone"
  },
  {
    pregunta: "¿Qué tecnología permite la propiedad verificable de activos digitales en el metaverso?",
    opciones: [
      "Inteligencia Artificial",
      "Blockchain y NFTs",
      "5G",
      "Cloud Computing"
    ],
    correcta: 1,
    explicacion: "Blockchain permite crear registros inmutables de propiedad digital, y los NFTs (tokens no fungibles) representan la propiedad única de activos digitales.",
    conImagen: false,
    imagen: null,
    altImagen: ""
  },
  {
    pregunta: "¿Cuál de estos dispositivos es específico para Realidad Virtual?",
    opciones: [
      "Smartphone con cámara",
      "Google Glass",
      "Oculus Quest / Meta Quest",
      "Tablet con pantalla táctil"
    ],
    correcta: 2,
    explicacion: "Los cascos como Oculus/Meta Quest son dispositivos de VR que crean inmersión total al bloquear el mundo real y mostrar entornos virtuales completos.",
    conImagen: true,
    imagen: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=500&q=80",
    altImagen: "Casco de Realidad Virtual"
  },
  {
    pregunta: "¿Qué es un Avatar Digital?",
    opciones: [
      "Un tipo de criptomoneda",
      "Un programa antivirus",
      "La representación virtual personalizable del usuario en espacios digitales",
      "Una plataforma de redes sociales"
    ],
    correcta: 2,
    explicacion: "Un avatar digital es la representación gráfica que identifica y representa a un usuario en entornos virtuales del metaverso.",
    conImagen: false,
    imagen: null,
    altImagen: ""
  },
  {
    pregunta: "¿Cuál de estas plataformas NO es parte del metaverso?",
    opciones: [
      "Decentraland",
      "Roblox",
      "Microsoft Excel",
      "Meta Horizon Worlds"
    ],
    correcta: 2,
    explicacion: "Microsoft Excel es una hoja de cálculo tradicional. Las otras opciones son plataformas de metaverso donde usuarios pueden interactuar en espacios virtuales.",
    conImagen: false,
    imagen: null,
    altImagen: ""
  },
  {
    pregunta: "¿Qué aplicación popular demostró el potencial masivo de la Realidad Aumentada en dispositivos móviles?",
    opciones: [
      "WhatsApp",
      "Pokémon GO",
      "Spotify",
      "Gmail"
    ],
    correcta: 1,
    explicacion: "Pokémon GO (2016) fue revolucionario al llevar la AR a millones de usuarios, permitiéndoles 'capturar' criaturas virtuales en el mundo real.",
    conImagen: true,
    imagen: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&q=80",
    altImagen: "Juego de Realidad Aumentada en smartphone"
  },
  {
    pregunta: "¿Por qué es importante el 5G para el metaverso?",
    opciones: [
      "Para tener más almacenamiento en el teléfono",
      "Para mejorar la calidad de las fotos",
      "Para permitir experiencias inmersivas sin latencia con múltiples usuarios simultáneos",
      "Para ahorrar batería"
    ],
    correcta: 2,
    explicacion: "El 5G proporciona velocidades ultra rápidas y baja latencia, esenciales para que millones de usuarios interactúen simultáneamente en tiempo real en el metaverso.",
    conImagen: false,
    imagen: null,
    altImagen: ""
  },
  {
    pregunta: "¿Cuál es la diferencia principal entre VR y AR?",
    opciones: [
      "VR es más cara que AR",
      "VR sumerge completamente al usuario en un mundo virtual, AR superpone elementos digitales sobre el mundo real",
      "VR solo funciona en computadoras, AR solo en celulares",
      "No hay diferencia, son lo mismo"
    ],
    correcta: 1,
    explicacion: "La diferencia clave es que VR reemplaza completamente tu visión del mundo real con uno virtual, mientras que AR añade capas digitales sobre lo que ves del mundo real.",
    conImagen: false,
    imagen: null,
    altImagen: ""
  },
  {
    pregunta: "¿Qué motores gráficos se utilizan principalmente para crear experiencias en el metaverso?",
    opciones: [
      "Microsoft Word y PowerPoint",
      "Unity y Unreal Engine",
      "Photoshop y Illustrator",
      "Chrome y Firefox"
    ],
    correcta: 1,
    explicacion: "Unity y Unreal Engine son los motores gráficos más populares para crear mundos 3D interactivos, videojuegos y experiencias del metaverso.",
    conImagen: false,
    imagen: null,
    altImagen: ""
  }
])

const respuestasCorrectas = computed(() => {
  return respuestasUsuario.value.filter((respuesta, index) => {
    return respuesta === preguntas.value[index].correcta
  }).length
})

const notaFinal = computed(() => {
  return Math.round((respuestasCorrectas.value / preguntas.value.length) * 100)
})

const aprobado = computed(() => {
  return notaFinal.value >= notaMinima
})

const iniciarEvaluacion = () => {
  evaluacionIniciada.value = true
  respuestasUsuario.value = new Array(preguntas.value.length).fill(null)
}

const siguientePregunta = () => {
  if (preguntaActual.value < preguntas.value.length - 1) {
    preguntaActual.value++
  }
}

const preguntaAnterior = () => {
  if (preguntaActual.value > 0) {
    preguntaActual.value--
  }
}

const irAPregunta = (index) => {
  preguntaActual.value = index
}

const finalizarEvaluacion = () => {
  if (respuestasUsuario.value.some(r => r === null)) {
    alert('Por favor responde todas las preguntas antes de finalizar')
    return
  }
  evaluacionCompletada.value = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const esCorrecta = (index) => {
  return respuestasUsuario.value[index] === preguntas.value[index].correcta
}

const reintentar = () => {
  evaluacionIniciada.value = false
  evaluacionCompletada.value = false
  preguntaActual.value = 0
  respuestasUsuario.value = []
  verResultadosDetallados.value = false
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const descargarCertificado = () => {
  alert('Función de descarga de certificado - Aquí podrías generar un PDF con la certificación')
  // Aquí puedes implementar la generación de un certificado PDF
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
  transition: all 0.2s ease;
}

.cursor-pointer:hover {
  transform: translateY(-2px);
}

.gap-2 {
  gap: 8px;
}
</style>
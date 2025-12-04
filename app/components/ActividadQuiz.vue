<template>
  <v-dialog v-model="dialog" max-width="800px" scrollable persistent>
    <v-card>
      <v-card-title class="bg-primary text-white d-flex justify-space-between align-center">
        <span>{{ actividad.titulo }}</span>
        <v-btn 
          icon="mdi-close" 
          variant="text" 
          @click="confirmarCerrar"
          :disabled="!quizIniciado || quizCompletado"
        ></v-btn>
      </v-card-title>

      <v-card-text class="pt-6">
        <!-- Info de la actividad -->
        <div class="mb-4" v-if="!quizIniciado">
          <v-chip color="secondary" class="mr-2">
            <v-icon start>mdi-clock-outline</v-icon>
            {{ actividad.duracion }}
          </v-chip>
          <v-chip color="success">
            {{ actividad.nivel }}
          </v-chip>
        </div>

        <!-- Instrucciones iniciales -->
        <div v-if="!quizIniciado">
          <h3 class="text-h6 mb-3">Instrucciones:</h3>
          <v-list density="compact">
            <v-list-item prepend-icon="mdi-check-circle">
              Responde {{ preguntas.length }} preguntas sobre los conceptos aprendidos
            </v-list-item>
            <v-list-item prepend-icon="mdi-check-circle">
              Cada pregunta tiene 4 opciones, solo una es correcta
            </v-list-item>
            <v-list-item prepend-icon="mdi-check-circle">
              Al finalizar verás tu puntuación y las respuestas correctas
            </v-list-item>
            <v-list-item prepend-icon="mdi-check-circle">
              Necesitas al menos 60% para aprobar
            </v-list-item>
          </v-list>

          <v-alert type="info" class="mt-4" variant="tonal">
            <strong>💡 Consejo:</strong> Repasa los conceptos antes de iniciar el quiz
          </v-alert>
        </div>

        <!-- Quiz en progreso -->
        <div v-else-if="!quizCompletado">
          <!-- Progreso -->
          <div class="mb-4">
            <div class="d-flex justify-space-between mb-2">
              <span class="text-body-2">Pregunta {{ preguntaActual + 1 }} de {{ preguntas.length }}</span>
              <span class="text-body-2 font-weight-bold">Puntuación: {{ puntaje }}/{{ preguntas.length }}</span>
            </div>
            <v-progress-linear
              :model-value="((preguntaActual + 1) / preguntas.length) * 100"
              color="primary"
              height="8"
              rounded
            ></v-progress-linear>
          </div>

          <!-- Pregunta actual -->
          <v-card class="mb-4" elevation="0" color="grey-lighten-4">
            <v-card-text>
              <h3 class="text-h6 mb-4">{{ preguntas[preguntaActual].pregunta }}</h3>
              
              <v-radio-group v-model="respuestaSeleccionada" :disabled="respuestaEnviada">
                <v-radio
                  v-for="(opcion, index) in preguntas[preguntaActual].opciones"
                  :key="index"
                  :value="index"
                  :color="getColorOpcion(index)"
                >
                  <template v-slot:label>
                    <div class="d-flex align-center justify-space-between" style="width: 100%;">
                      <span>{{ opcion }}</span>
                      <v-icon 
                        v-if="respuestaEnviada && index === preguntas[preguntaActual].correcta"
                        color="success"
                        size="small"
                      >
                        mdi-check-circle
                      </v-icon>
                      <v-icon 
                        v-if="respuestaEnviada && index === respuestaSeleccionada && index !== preguntas[preguntaActual].correcta"
                        color="error"
                        size="small"
                      >
                        mdi-close-circle
                      </v-icon>
                    </div>
                  </template>
                </v-radio>
              </v-radio-group>

              <v-alert
                v-if="respuestaEnviada"
                :type="esRespuestaCorrecta ? 'success' : 'error'"
                class="mt-4"
                variant="tonal"
              >
                <div v-if="esRespuestaCorrecta">
                  <strong>¡Correcto!</strong> {{ preguntas[preguntaActual].explicacion }}
                </div>
                <div v-else>
                  <strong>Incorrecto.</strong> La respuesta correcta es: 
                  <strong>{{ preguntas[preguntaActual].opciones[preguntas[preguntaActual].correcta] }}</strong>
                  <br><br>
                  {{ preguntas[preguntaActual].explicacion }}
                </div>
              </v-alert>
            </v-card-text>
          </v-card>

          <!-- Botones de navegación -->
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
              v-if="!respuestaEnviada"
              color="primary"
              :disabled="respuestaSeleccionada === null"
              @click="verificarRespuesta"
            >
              Verificar
            </v-btn>
            
            <v-btn
              v-else-if="preguntaActual < preguntas.length - 1"
              color="primary"
              @click="siguientePregunta"
            >
              Siguiente
              <v-icon end>mdi-chevron-right</v-icon>
            </v-btn>

            <v-btn
              v-else
              color="success"
              @click="finalizarQuiz"
            >
              Finalizar Quiz
              <v-icon end>mdi-check</v-icon>
            </v-btn>
          </div>
        </div>

        <!-- Resultados finales -->
        <div v-else>
          <div class="text-center mb-6">
            <v-icon 
              :color="aprobado ? 'success' : 'error'" 
              size="80"
            >
              {{ aprobado ? 'mdi-trophy' : 'mdi-emoticon-sad' }}
            </v-icon>
            <h2 class="text-h4 mt-4 mb-2">
              {{ aprobado ? '¡Felicidades!' : 'No aprobaste' }}
            </h2>
            <p class="text-h6 text-grey-darken-1">
              Tu puntuación: {{ puntaje }}/{{ preguntas.length }} ({{ porcentaje }}%)
            </p>
          </div>

          <v-alert 
            :type="aprobado ? 'success' : 'warning'" 
            class="mb-4"
            variant="tonal"
          >
            <div v-if="aprobado">
              ¡Excelente trabajo! Has demostrado un buen entendimiento de los conceptos del metaverso.
            </div>
            <div v-else>
              Necesitas repasar los conceptos. Revisa el material y vuelve a intentarlo.
            </div>
          </v-alert>

          <!-- Resumen de respuestas -->
          <h3 class="text-h6 mb-3">Resumen de respuestas:</h3>
          <v-list>
            <v-list-item
              v-for="(pregunta, index) in preguntas"
              :key="index"
              :prepend-icon="respuestas[index] === pregunta.correcta ? 'mdi-check-circle' : 'mdi-close-circle'"
              :class="respuestas[index] === pregunta.correcta ? 'text-success' : 'text-error'"
            >
              <v-list-item-title>Pregunta {{ index + 1 }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ respuestas[index] === pregunta.correcta ? 'Correcta' : 'Incorrecta' }}
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </div>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn 
          v-if="!quizIniciado" 
          color="primary" 
          size="large"
          @click="iniciarQuiz"
        >
          <v-icon start>mdi-play</v-icon>
          Iniciar Quiz
        </v-btn>
        <template v-else-if="quizCompletado">
          <v-btn color="grey" variant="text" @click="cerrarQuiz">
            Cerrar
          </v-btn>
          <v-btn color="primary" @click="reiniciarQuiz">
            <v-icon start>mdi-refresh</v-icon>
            Intentar nuevamente
          </v-btn>
        </template>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
const props = defineProps({
  actividad: {
    type: Object,
    required: true
  },
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'completada'])

const dialog = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

// Preguntas del quiz
const preguntas = ref([
  {
    pregunta: "¿Qué es el Metaverso?",
    opciones: [
      "Una red social tradicional",
      "Un entorno virtual compartido donde los usuarios pueden interactuar en tiempo real",
      "Un tipo de videojuego",
      "Una aplicación de mensajería"
    ],
    correcta: 1,
    explicacion: "El metaverso es un espacio virtual compartido donde usuarios interactúan con objetos digitales y entre sí en tiempo real."
  },
  {
    pregunta: "¿Qué tecnología combina el mundo real con elementos digitales superpuestos?",
    opciones: [
      "Realidad Virtual",
      "Inteligencia Artificial",
      "Realidad Aumentada",
      "Blockchain"
    ],
    correcta: 2,
    explicacion: "La Realidad Aumentada (AR) superpone información digital sobre el mundo real a través de dispositivos como smartphones o gafas especiales."
  },
  {
    pregunta: "¿Qué es un Avatar Digital?",
    opciones: [
      "Un tipo de criptomoneda",
      "Una red social",
      "La representación virtual del usuario en entornos inmersivos",
      "Un dispositivo de realidad virtual"
    ],
    correcta: 2,
    explicacion: "Un avatar digital es la representación gráfica personalizable que permite a los usuarios interactuar en mundos virtuales."
  },
  {
    pregunta: "¿Cuál de estos NO es un ejemplo de plataforma de metaverso?",
    opciones: [
      "Decentraland",
      "Roblox",
      "Microsoft Word",
      "Meta Horizon Worlds"
    ],
    correcta: 2,
    explicacion: "Microsoft Word es un procesador de textos, no una plataforma de metaverso. Las otras opciones son plataformas virtuales inmersivas."
  },
  {
    pregunta: "¿Qué tecnologías están detrás del metaverso?",
    opciones: [
      "Solo Realidad Virtual",
      "VR, AR, Blockchain, 5G e IA",
      "Solo Blockchain",
      "Solo videojuegos"
    ],
    correcta: 1,
    explicacion: "El metaverso se construye sobre múltiples tecnologías: VR, AR, Blockchain para activos digitales, 5G para conectividad, e IA para experiencias personalizadas."
  }
])

const quizIniciado = ref(false)
const quizCompletado = ref(false)
const preguntaActual = ref(0)
const respuestaSeleccionada = ref(null)
const respuestaEnviada = ref(false)
const respuestas = ref([])
const puntaje = ref(0)

const esRespuestaCorrecta = computed(() => {
  return respuestaSeleccionada.value === preguntas.value[preguntaActual.value].correcta
})

const porcentaje = computed(() => {
  return Math.round((puntaje.value / preguntas.value.length) * 100)
})

const aprobado = computed(() => {
  return porcentaje.value >= 60
})

const getColorOpcion = (index) => {
  if (!respuestaEnviada.value) return 'primary'
  
  const pregunta = preguntas.value[preguntaActual.value]
  if (index === pregunta.correcta) return 'success'
  if (index === respuestaSeleccionada.value && index !== pregunta.correcta) return 'error'
  
  return 'grey'
}

const iniciarQuiz = () => {
  quizIniciado.value = true
  resetQuiz()
}

const resetQuiz = () => {
  preguntaActual.value = 0
  respuestaSeleccionada.value = null
  respuestaEnviada.value = false
  respuestas.value = []
  puntaje.value = 0
  quizCompletado.value = false
}

const verificarRespuesta = () => {
  respuestaEnviada.value = true
  respuestas.value[preguntaActual.value] = respuestaSeleccionada.value
  
  if (esRespuestaCorrecta.value) {
    puntaje.value++
  }
}

const siguientePregunta = () => {
  preguntaActual.value++
  respuestaSeleccionada.value = null
  respuestaEnviada.value = false
}

const preguntaAnterior = () => {
  if (preguntaActual.value > 0) {
    preguntaActual.value--
    respuestaSeleccionada.value = respuestas.value[preguntaActual.value]
    respuestaEnviada.value = true
  }
}

const finalizarQuiz = () => {
  quizCompletado.value = true
  if (aprobado.value) {
    emit('completada', props.actividad.id)
  }
}

const reiniciarQuiz = () => {
  resetQuiz()
}

const cerrarQuiz = () => {
  dialog.value = false
}

const confirmarCerrar = () => {
  if (confirm('¿Estás seguro de que quieres salir? Perderás tu progreso.')) {
    cerrarQuiz()
  }
}

watch(dialog, (newVal) => {
  if (newVal) {
    quizIniciado.value = false
    quizCompletado.value = false
    resetQuiz()
  }
})
</script>
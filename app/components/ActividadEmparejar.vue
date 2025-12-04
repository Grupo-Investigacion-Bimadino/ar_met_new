<template>
  <v-dialog v-model="dialog" max-width="900px" scrollable persistent>
    <v-card>
      <v-card-title class="bg-primary text-white d-flex justify-space-between align-center">
        <span>{{ actividad.titulo }}</span>
        <v-btn 
          icon="mdi-close" 
          variant="text" 
          @click="cerrarActividad"
        ></v-btn>
      </v-card-title>

      <v-card-text class="pt-6">
        <!-- Instrucciones iniciales -->
        <div v-if="!actividadIniciada">
          <v-alert type="info" class="mb-4" variant="tonal">
            <strong>📋 Instrucciones:</strong>
            <ul class="mt-2">
              <li>Conecta cada concepto con su definición correcta</li>
              <li>Haz clic en un concepto y luego en su definición</li>
              <li>Las parejas correctas se marcarán en verde</li>
              <li>Completa todas las parejas para terminar</li>
            </ul>
          </v-alert>

          <v-chip color="secondary" class="mr-2">
            <v-icon start>mdi-puzzle</v-icon>
            {{ parejas.length }} parejas por emparejar
          </v-chip>
        </div>

        <!-- Actividad en progreso -->
        <div v-else-if="!actividadCompletada">
          <!-- Progreso -->
          <div class="mb-4">
            <div class="d-flex justify-space-between mb-2">
              <span class="text-body-2">Progreso: {{ parejasCorrectas }}/{{ parejas.length }}</span>
              <span class="text-body-2 font-weight-bold">Intentos: {{ intentos }}</span>
            </div>
            <v-progress-linear
              :model-value="(parejasCorrectas / parejas.length) * 100"
              color="success"
              height="8"
              rounded
            ></v-progress-linear>
          </div>

          <v-alert v-if="mensaje" :type="mensajeTipo" class="mb-4" variant="tonal">
            {{ mensaje }}
          </v-alert>

          <!-- Grid de emparejamiento -->
          <v-row>
            <!-- Columna de conceptos -->
            <v-col cols="12" md="6">
              <h3 class="text-h6 mb-3 text-center">Conceptos</h3>
              <v-card
                v-for="item in parejasBarajadas"
                :key="item.id"
                class="mb-3 pa-4 cursor-pointer"
                :class="{
                  'bg-blue-lighten-4': seleccionadoConcepto === item.id,
                  'bg-green-lighten-4': parejasEncontradas.includes(item.id),
                  'elevation-2': seleccionadoConcepto !== item.id && !parejasEncontradas.includes(item.id)
                }"
                :elevation="seleccionadoConcepto === item.id ? 8 : 2"
                @click="seleccionarConcepto(item.id)"
                :disabled="parejasEncontradas.includes(item.id)"
              >
                <div class="d-flex align-center justify-space-between">
                  <div>
                    <v-icon 
                      :icon="item.icono" 
                      color="primary" 
                      class="mr-2"
                      size="large"
                    ></v-icon>
                    <strong class="text-h6">{{ item.concepto }}</strong>
                  </div>
                  <v-icon 
                    v-if="parejasEncontradas.includes(item.id)"
                    color="success"
                    size="large"
                  >
                    mdi-check-circle
                  </v-icon>
                </div>
              </v-card>
            </v-col>

            <!-- Columna de definiciones -->
            <v-col cols="12" md="6">
              <h3 class="text-h6 mb-3 text-center">Definiciones</h3>
              <v-card
                v-for="item in definicionesBarajadas"
                :key="item.id"
                class="mb-3 pa-4 cursor-pointer"
                :class="{
                  'bg-blue-lighten-4': seleccionadoDefinicion === item.id,
                  'bg-green-lighten-4': parejasEncontradas.includes(item.id),
                  'elevation-2': seleccionadoDefinicion !== item.id && !parejasEncontradas.includes(item.id)
                }"
                :elevation="seleccionadoDefinicion === item.id ? 8 : 2"
                @click="seleccionarDefinicion(item.id)"
                :disabled="parejasEncontradas.includes(item.id)"
              >
                <div class="d-flex align-center justify-space-between">
                  <p class="mb-0 text-body-1">{{ item.definicion }}</p>
                  <v-icon 
                    v-if="parejasEncontradas.includes(item.id)"
                    color="success"
                    size="large"
                  >
                    mdi-check-circle
                  </v-icon>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </div>

        <!-- Resultados finales -->
        <div v-else>
          <div class="text-center mb-6">
            <v-icon color="success" size="80">mdi-trophy</v-icon>
            <h2 class="text-h4 mt-4 mb-2">¡Felicidades!</h2>
            <p class="text-h6 text-grey-darken-1">
              Completaste todas las parejas en {{ intentos }} intentos
            </p>
          </div>

          <v-alert type="success" class="mb-4" variant="tonal">
            <strong>🎯 Resultado:</strong>
            {{ obtenerMensajeFinal() }}
          </v-alert>

          <!-- Resumen de parejas -->
          <h3 class="text-h6 mb-3">Parejas completadas:</h3>
          <v-list>
            <v-list-item
              v-for="pareja in parejas"
              :key="pareja.id"
              prepend-icon="mdi-check-circle"
              class="text-success"
            >
              <v-list-item-title>
                <strong>{{ pareja.concepto }}:</strong> {{ pareja.definicion }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </div>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn 
          v-if="!actividadIniciada" 
          color="primary" 
          size="large"
          @click="iniciarActividad"
        >
          <v-icon start>mdi-play</v-icon>
          Comenzar
        </v-btn>
        <template v-else-if="actividadCompletada">
          <v-btn color="grey" variant="text" @click="cerrarActividad">
            Cerrar
          </v-btn>
          <v-btn color="primary" @click="reiniciarActividad">
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

// Datos de las parejas
const parejas = ref([
  {
    id: 1,
    concepto: "Metaverso",
    definicion: "Entorno virtual compartido donde los usuarios pueden interactuar en tiempo real",
    icono: "mdi-earth"
  },
  {
    id: 2,
    concepto: "Realidad Aumentada",
    definicion: "Tecnología que superpone elementos digitales sobre el mundo real",
    icono: "mdi-augmented-reality"
  },
  {
    id: 3,
    concepto: "Avatar Digital",
    definicion: "Representación virtual personalizable del usuario en espacios virtuales",
    icono: "mdi-account-circle"
  },
  {
    id: 4,
    concepto: "Blockchain",
    definicion: "Tecnología que permite la propiedad y comercio de activos digitales únicos",
    icono: "mdi-cube-outline"
  },
  {
    id: 5,
    concepto: "Realidad Virtual",
    definicion: "Tecnología que sumerge completamente al usuario en un entorno digital",
    icono: "mdi-virtual-reality"
  },
  {
    id: 6,
    concepto: "5G",
    definicion: "Red de alta velocidad necesaria para experiencias inmersivas sin latencia",
    icono: "mdi-wifi"
  }
])

const actividadIniciada = ref(false)
const actividadCompletada = ref(false)
const seleccionadoConcepto = ref(null)
const seleccionadoDefinicion = ref(null)
const parejasEncontradas = ref([])
const parejasCorrectas = ref(0)
const intentos = ref(0)
const mensaje = ref('')
const mensajeTipo = ref('info')

const parejasBarajadas = ref([])
const definicionesBarajadas = ref([])

const iniciarActividad = () => {
  actividadIniciada.value = true
  barajarParejas()
}

const barajarParejas = () => {
  // Barajar conceptos
  parejasBarajadas.value = [...parejas.value].sort(() => Math.random() - 0.5)
  
  // Barajar definiciones
  definicionesBarajadas.value = [...parejas.value].sort(() => Math.random() - 0.5)
}

const seleccionarConcepto = (id) => {
  if (parejasEncontradas.value.includes(id)) return
  
  seleccionadoConcepto.value = id
  mensaje.value = ''
  
  if (seleccionadoDefinicion.value !== null) {
    verificarPareja()
  }
}

const seleccionarDefinicion = (id) => {
  if (parejasEncontradas.value.includes(id)) return
  
  seleccionadoDefinicion.value = id
  mensaje.value = ''
  
  if (seleccionadoConcepto.value !== null) {
    verificarPareja()
  }
}

const verificarPareja = () => {
  intentos.value++
  
  if (seleccionadoConcepto.value === seleccionadoDefinicion.value) {
    // ¡Pareja correcta!
    parejasEncontradas.value.push(seleccionadoConcepto.value)
    parejasCorrectas.value++
    mensaje.value = '¡Correcto! Has encontrado una pareja'
    mensajeTipo.value = 'success'
    
    // Limpiar selección
    setTimeout(() => {
      seleccionadoConcepto.value = null
      seleccionadoDefinicion.value = null
      mensaje.value = ''
      
      // Verificar si completó todo
      if (parejasCorrectas.value === parejas.value.length) {
        actividadCompletada.value = true
        emit('completada', props.actividad.id)
      }
    }, 1000)
  } else {
    // Pareja incorrecta
    mensaje.value = 'Incorrecto. Intenta de nuevo'
    mensajeTipo.value = 'error'
    
    setTimeout(() => {
      seleccionadoConcepto.value = null
      seleccionadoDefinicion.value = null
      mensaje.value = ''
    }, 1500)
  }
}

const obtenerMensajeFinal = () => {
  if (intentos.value <= parejas.value.length) {
    return '¡Perfecto! Lo lograste con el mínimo de intentos'
  } else if (intentos.value <= parejas.value.length * 1.5) {
    return '¡Muy bien! Tienes un buen dominio de los conceptos'
  } else {
    return '¡Completado! Sigue practicando para mejorar'
  }
}

const reiniciarActividad = () => {
  actividadIniciada.value = true
  actividadCompletada.value = false
  seleccionadoConcepto.value = null
  seleccionadoDefinicion.value = null
  parejasEncontradas.value = []
  parejasCorrectas.value = 0
  intentos.value = 0
  mensaje.value = ''
  barajarParejas()
}

const cerrarActividad = () => {
  dialog.value = false
}

watch(dialog, (newVal) => {
  if (newVal) {
    actividadIniciada.value = false
    actividadCompletada.value = false
    seleccionadoConcepto.value = null
    seleccionadoDefinicion.value = null
    parejasEncontradas.value = []
    parejasCorrectas.value = 0
    intentos.value = 0
    mensaje.value = ''
  }
})
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
  transition: all 0.3s ease;
}

.cursor-pointer:hover:not([disabled]) {
  transform: translateY(-2px);
}

.cursor-pointer[disabled] {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>
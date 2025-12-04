<template>
  <v-dialog v-model="dialog" max-width="1000px" scrollable persistent>
    <v-card>
      <v-card-title class="bg-primary text-white d-flex justify-space-between align-center">
        <span>{{ actividad.titulo }}</span>
        <v-btn icon="mdi-close" variant="text" @click="cerrarActividad"></v-btn>
      </v-card-title>

      <v-card-text class="pt-6">
        <!-- Instrucciones iniciales -->
        <div v-if="!actividadIniciada">
          <v-alert type="info" class="mb-4" variant="tonal">
            <strong>🎨 Instrucciones:</strong>
            <ul class="mt-2">
              <li>Personaliza tu avatar digital seleccionando características</li>
              <li>Elige el género, color de piel, cabello, ojos, ropa y accesorios</li>
              <li>Tu avatar te representará en el metaverso</li>
              <li>Al finalizar podrás ver tu creación completa</li>
            </ul>
          </v-alert>

          <v-chip color="secondary" class="mr-2">
            <v-icon start>mdi-account-edit</v-icon>
            Personalización total
          </v-chip>
        </div>

        <!-- Constructor de avatar -->
        <div v-else-if="!actividadCompletada">
          <v-row>
            <!-- Panel de personalización -->
            <v-col cols="12" md="6">
              <h3 class="text-h6 mb-4">Personaliza tu Avatar</h3>

              <!-- Nombre -->
              <v-text-field
                v-model="avatar.nombre"
                label="Nombre del Avatar"
                prepend-icon="mdi-account"
                variant="outlined"
                class="mb-4"
              ></v-text-field>

              <!-- Género -->
              <div class="mb-6">
                <h4 class="text-subtitle-1 mb-3">
                  <v-icon>mdi-gender-male-female</v-icon> Género
                </h4>
                <v-btn-toggle v-model="avatar.genero" color="primary" mandatory class="d-flex">
                  <v-btn value="masculino" class="flex-grow-1">
                    <v-icon start>mdi-face-man</v-icon>
                    Masculino
                  </v-btn>
                  <v-btn value="femenino" class="flex-grow-1">
                    <v-icon start>mdi-face-woman</v-icon>
                    Femenino
                  </v-btn>
                  <v-btn value="neutro" class="flex-grow-1">
                    <v-icon start>mdi-account</v-icon>
                    Neutro
                  </v-btn>
                </v-btn-toggle>
              </div>

              <!-- Color de piel -->
              <div class="mb-6">
                <h4 class="text-subtitle-1 mb-3">
                  <v-icon>mdi-palette</v-icon> Color de Piel
                </h4>
                <v-btn-toggle v-model="avatar.piel" color="primary" mandatory>
                  <v-btn 
                    v-for="color in opcionesPiel" 
                    :key="color.valor"
                    :value="color.valor"
                  >
                    <v-avatar :color="color.color" size="30"></v-avatar>
                  </v-btn>
                </v-btn-toggle>
              </div>

              <!-- Cabello -->
              <div class="mb-6">
                <h4 class="text-subtitle-1 mb-3">
                  <v-icon>mdi-face-man-shimmer</v-icon> Estilo de Cabello
                </h4>
                <v-select
                  v-model="avatar.cabelloEstilo"
                  :items="estilosCabello"
                  label="Estilo"
                  variant="outlined"
                  density="compact"
                ></v-select>
                
                <h4 class="text-subtitle-2 mt-3 mb-2">Color de Cabello</h4>
                <v-btn-toggle v-model="avatar.cabelloColor" color="primary" mandatory>
                  <v-btn 
                    v-for="color in coloresCabello" 
                    :key="color.valor"
                    :value="color.valor"
                  >
                    <v-avatar :color="color.color" size="25"></v-avatar>
                  </v-btn>
                </v-btn-toggle>
              </div>

              <!-- Ojos -->
              <div class="mb-6">
                <h4 class="text-subtitle-1 mb-3">
                  <v-icon>mdi-eye</v-icon> Color de Ojos
                </h4>
                <v-btn-toggle v-model="avatar.ojos" color="primary" mandatory>
                  <v-btn 
                    v-for="color in coloresOjos" 
                    :key="color.valor"
                    :value="color.valor"
                  >
                    <v-avatar :color="color.color" size="25"></v-avatar>
                  </v-btn>
                </v-btn-toggle>
              </div>

              <!-- Ropa -->
              <div class="mb-6">
                <h4 class="text-subtitle-1 mb-3">
                  <v-icon>mdi-tshirt-crew</v-icon> Estilo de Ropa
                </h4>
                <v-select
                  v-model="avatar.ropa"
                  :items="estilosRopa"
                  label="Selecciona tu outfit"
                  variant="outlined"
                  density="compact"
                ></v-select>
              </div>

              <!-- Accesorios -->
              <div class="mb-6">
                <h4 class="text-subtitle-1 mb-3">
                  <v-icon>mdi-glasses</v-icon> Accesorios
                </h4>
                <v-select
                  v-model="avatar.accesorios"
                  :items="tiposAccesorios"
                  label="Selecciona accesorios"
                  variant="outlined"
                  density="compact"
                  multiple
                  chips
                ></v-select>
              </div>
            </v-col>

            <!-- Vista previa del avatar -->
            <v-col cols="12" md="6">
              <v-card class="pa-4 sticky-preview" elevation="3">
                <h3 class="text-h6 mb-4 text-center">Vista Previa</h3>
                
                <div class="avatar-preview">
                  <!-- Cabeza y cara -->
                  <div class="avatar-container" :style="getAvatarStyle()">
                    <!-- Cabello superior -->
                    <div class="cabello-superior" :style="getCabelloStyle()">
                      {{ getCabelloIcon() }}
                    </div>
                    
                    <!-- Cara -->
                    <div class="cara" :style="getCaraStyle()">
                      <!-- Ojos -->
                      <div class="ojos">
                        <div class="ojo" :style="getOjosStyle()"></div>
                        <div class="ojo" :style="getOjosStyle()"></div>
                      </div>
                      
                      <!-- Nariz y boca -->
                      <div class="nariz"></div>
                      <div class="boca"></div>
                    </div>

                    <!-- Cuerpo -->
                    <div class="cuerpo" :style="getRopaStyle()">
                      <v-icon size="80" :color="getRopaColor()">
                        {{ getRopaIcon() }}
                      </v-icon>
                    </div>

                    <!-- Accesorios -->
                    <div v-if="avatar.accesorios.length > 0" class="accesorios-container">
                      <v-chip
                        v-for="accesorio in avatar.accesorios"
                        :key="accesorio"
                        size="small"
                        class="ma-1"
                        color="primary"
                      >
                        {{ accesorio }}
                      </v-chip>
                    </div>
                  </div>
                </div>

                <!-- Info del avatar -->
                <v-divider class="my-4"></v-divider>
                <div class="text-center">
                  <h4 class="text-h6 mb-2">{{ avatar.nombre || 'Sin nombre' }}</h4>
                  <v-chip size="small" color="secondary" class="ma-1">
                    {{ avatar.genero }}
                  </v-chip>
                  <v-chip size="small" color="info" class="ma-1">
                    {{ avatar.ropa }}
                  </v-chip>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </div>

        <!-- Resultado final -->
        <div v-else>
          <div class="text-center mb-6">
            <v-icon color="success" size="80">mdi-check-circle</v-icon>
            <h2 class="text-h4 mt-4 mb-2">¡Avatar Creado!</h2>
            <p class="text-h6 text-grey-darken-1">
              {{ avatar.nombre }} está listo para el metaverso
            </p>
          </div>

          <v-row>
            <v-col cols="12" md="6" offset-md="3">
              <v-card class="pa-6" elevation="3">
                <h3 class="text-h6 mb-4 text-center">Características de tu Avatar</h3>
                
                <v-list density="compact">
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon>mdi-account</v-icon>
                    </template>
                    <v-list-item-title>Nombre</v-list-item-title>
                    <v-list-item-subtitle>{{ avatar.nombre }}</v-list-item-subtitle>
                  </v-list-item>

                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon>mdi-gender-male-female</v-icon>
                    </template>
                    <v-list-item-title>Género</v-list-item-title>
                    <v-list-item-subtitle>{{ avatar.genero }}</v-list-item-subtitle>
                  </v-list-item>

                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon>mdi-face-man-shimmer</v-icon>
                    </template>
                    <v-list-item-title>Cabello</v-list-item-title>
                    <v-list-item-subtitle>{{ avatar.cabelloEstilo }} - {{ avatar.cabelloColor }}</v-list-item-subtitle>
                  </v-list-item>

                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon>mdi-tshirt-crew</v-icon>
                    </template>
                    <v-list-item-title>Ropa</v-list-item-title>
                    <v-list-item-subtitle>{{ avatar.ropa }}</v-list-item-subtitle>
                  </v-list-item>

                  <v-list-item v-if="avatar.accesorios.length > 0">
                    <template v-slot:prepend>
                      <v-icon>mdi-glasses</v-icon>
                    </template>
                    <v-list-item-title>Accesorios</v-list-item-title>
                    <v-list-item-subtitle>{{ avatar.accesorios.join(', ') }}</v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
          </v-row>

          <v-alert type="success" class="mt-4" variant="tonal">
            <strong>🎉 ¡Excelente!</strong> Has aprendido cómo funcionan los avatares digitales en el metaverso. 
            Tu avatar es tu identidad virtual y te representa en espacios virtuales como Decentraland, VRChat y más.
          </v-alert>
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
        <template v-else-if="!actividadCompletada">
          <v-btn color="grey" variant="text" @click="cerrarActividad">
            Cancelar
          </v-btn>
          <v-btn 
            color="primary"
            @click="finalizarActividad"
            :disabled="!avatar.nombre"
          >
            <v-icon start>mdi-check</v-icon>
            Finalizar Avatar
          </v-btn>
        </template>
        <template v-else>
          <v-btn color="grey" variant="text" @click="cerrarActividad">
            Cerrar
          </v-btn>
          <v-btn color="primary" @click="reiniciarActividad">
            <v-icon start>mdi-refresh</v-icon>
            Crear otro Avatar
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

const actividadIniciada = ref(false)
const actividadCompletada = ref(false)

// Datos del avatar
const avatar = ref({
  nombre: '',
  genero: 'neutro',
  piel: 'clara',
  cabelloEstilo: 'Corto',
  cabelloColor: 'negro',
  ojos: 'marron',
  ropa: 'Casual',
  accesorios: []
})

// Opciones de personalización
const opcionesPiel = [
  { valor: 'muy-clara', color: '#FFE0BD' },
  { valor: 'clara', color: '#FFCD94' },
  { valor: 'media', color: '#D4A574' },
  { valor: 'morena', color: '#BA8A5C' },
  { valor: 'oscura', color: '#8D5524' }
]

const estilosCabello = [
  'Corto',
  'Largo',
  'Rizado',
  'Liso',
  'Rapado',
  'Mohawk',
  'Coleta',
  'Trenzas'
]

const coloresCabello = [
  { valor: 'negro', color: '#000000' },
  { valor: 'castaño', color: '#4A2C2A' },
  { valor: 'rubio', color: '#F0E68C' },
  { valor: 'pelirrojo', color: '#C84C09' },
  { valor: 'blanco', color: '#F5F5F5' },
  { valor: 'azul', color: '#1E90FF' },
  { valor: 'rosa', color: '#FF69B4' }
]

const coloresOjos = [
  { valor: 'marron', color: '#8B4513' },
  { valor: 'azul', color: '#4169E1' },
  { valor: 'verde', color: '#228B22' },
  { valor: 'gris', color: '#708090' },
  { valor: 'avellana', color: '#CD853F' }
]

const estilosRopa = [
  'Casual',
  'Formal',
  'Deportivo',
  'Futurista',
  'Elegante',
  'Streetwear',
  'Vintage',
  'Cyberpunk'
]

const tiposAccesorios = [
  'Gafas',
  'Sombrero',
  'Auriculares',
  'Collar',
  'Reloj',
  'Guantes',
  'Máscara',
  'Pendientes'
]

// Métodos de estilo
const getAvatarStyle = () => {
  return {
    minHeight: '400px'
  }
}

const getCaraStyle = () => {
  const color = opcionesPiel.find(p => p.valor === avatar.value.piel)?.color || '#FFCD94'
  return {
    backgroundColor: color
  }
}

const getCabelloStyle = () => {
  const color = coloresCabello.find(c => c.valor === avatar.value.cabelloColor)?.color || '#000000'
  return {
    backgroundColor: color
  }
}

const getCabelloIcon = () => {
  const iconos = {
    'Corto': '▀▀▀',
    'Largo': '▀▀▀▀',
    'Rizado': '◠◠◠',
    'Liso': '▬▬▬',
    'Rapado': '▬',
    'Mohawk': '╱▀╲',
    'Coleta': '▀◉',
    'Trenzas': '▀≋▀'
  }
  return iconos[avatar.value.cabelloEstilo] || '▀▀▀'
}

const getOjosStyle = () => {
  const color = coloresOjos.find(o => o.valor === avatar.value.ojos)?.color || '#8B4513'
  return {
    backgroundColor: color
  }
}

const getRopaIcon = () => {
  const iconos = {
    'Casual': 'mdi-tshirt-crew',
    'Formal': 'mdi-tie',
    'Deportivo': 'mdi-run',
    'Futurista': 'mdi-robot',
    'Elegante': 'mdi-tuxedo',
    'Streetwear': 'mdi-hanger',
    'Vintage': 'mdi-dresser',
    'Cyberpunk': 'mdi-cpu-64-bit'
  }
  return iconos[avatar.value.ropa] || 'mdi-tshirt-crew'
}

const getRopaColor = () => {
  const colores = {
    'Casual': 'blue',
    'Formal': 'grey-darken-2',
    'Deportivo': 'red',
    'Futurista': 'cyan',
    'Elegante': 'black',
    'Streetwear': 'orange',
    'Vintage': 'brown',
    'Cyberpunk': 'purple'
  }
  return colores[avatar.value.ropa] || 'blue'
}

const getRopaStyle = () => {
  return {}
}

const iniciarActividad = () => {
  actividadIniciada.value = true
}

const finalizarActividad = () => {
  actividadCompletada.value = true
  emit('completada', props.actividad.id)
}

const reiniciarActividad = () => {
  avatar.value = {
    nombre: '',
    genero: 'neutro',
    piel: 'clara',
    cabelloEstilo: 'Corto',
    cabelloColor: 'negro',
    ojos: 'marron',
    ropa: 'Casual',
    accesorios: []
  }
  actividadIniciada.value = true
  actividadCompletada.value = false
}

const cerrarActividad = () => {
  dialog.value = false
}

watch(dialog, (newVal) => {
  if (newVal) {
    actividadIniciada.value = false
    actividadCompletada.value = false
    avatar.value = {
      nombre: '',
      genero: 'neutro',
      piel: 'clara',
      cabelloEstilo: 'Corto',
      cabelloColor: 'negro',
      ojos: 'marron',
      ropa: 'Casual',
      accesorios: []
    }
  }
})
</script>

<style scoped>
.sticky-preview {
  position: sticky;
  top: 20px;
}

.avatar-preview {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 350px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 20px;
}

.avatar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.cabello-superior {
  width: 120px;
  height: 40px;
  border-radius: 60px 60px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: rgba(0,0,0,0.3);
  font-weight: bold;
}

.cara {
  width: 120px;
  height: 140px;
  border-radius: 50% 50% 45% 45%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  position: relative;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.ojos {
  display: flex;
  gap: 30px;
  margin-top: 30px;
}

.ojo {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid rgba(0,0,0,0.3);
}

.nariz {
  width: 8px;
  height: 12px;
  background-color: rgba(0,0,0,0.1);
  border-radius: 50%;
}

.boca {
  width: 30px;
  height: 8px;
  border: 2px solid rgba(0,0,0,0.3);
  border-top: none;
  border-radius: 0 0 15px 15px;
}

.cuerpo {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.accesorios-container {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 200px;
}
</style>
<template>
  <div class="carousel-mejorado">
    <v-card elevation="6" class="carousel-card">
      <!-- Indicadores superiores -->
      <div class="indicators-top">
        <v-chip
          v-for="(concepto, index) in conceptos"
          :key="concepto.id"
          :color="currentIndex === index ? 'success' : 'grey-lighten-3'"
          size="small"
          class="mx-1"
          @click="goToSlide(index)"
          :variant="currentIndex === index ? 'flat' : 'outlined'"
        >
          {{ index + 1 }}
        </v-chip>
      </div>

      <!-- Contenido con imagen y texto -->
      <transition name="slide-fade" mode="out-in">
        <div :key="currentConcepto.id" class="concept-content">
          <v-row>
            <!-- Imagen -->
            <v-col cols="12" md="5">
              <v-img
                :src="currentConcepto.imagen"
                height="400"
                cover
                class="rounded-lg"
              >
                <div class="image-overlay">
                  <v-chip
                    color="info"
                    prepend-icon="mdi-tag"
                    class="ma-3"
                  >
                    {{ currentConcepto.categoria }}
                  </v-chip>
                </div>
              </v-img>
            </v-col>

            <!-- Información -->
            <v-col cols="12" md="7">
              <div class="pa-6">
                <h2 class="text-h3 mb-3 text-success">
                  {{ currentConcepto.nombre }}
                </h2>
                
                <p class="text-h6 text-grey-darken-1 mb-4">
                  {{ currentConcepto.descripcion }}
                </p>

                <v-divider class="my-4"></v-divider>

                <h3 class="text-h6 mb-2">Detalles:</h3>
                <p class="text-body-1 mb-4">
                  {{ currentConcepto.detalles }}
                </p>

                <h3 class="text-h6 mb-2">Ejemplos:</h3>
                <div class="d-flex flex-wrap ga-2 mb-4">
                  <v-chip
                    v-for="ejemplo in currentConcepto.ejemplos"
                    :key="ejemplo"
                    color="success"
                    variant="outlined"
                    prepend-icon="mdi-check-circle"
                  >
                    {{ ejemplo }}
                  </v-chip>
                </div>

                <!-- Contador -->
                <v-chip color="success" variant="tonal" prepend-icon="mdi-information">
                  Concepto {{ currentIndex + 1 }} de {{ conceptos.length }}
                </v-chip>
              </div>
            </v-col>
          </v-row>
        </div>
      </transition>

      <!-- Controles de navegación -->
      <v-card-actions class="px-6 pb-6 pt-0">
        <v-btn
          color="success"
          prepend-icon="mdi-chevron-left"
          @click="prevSlide"
          :disabled="currentIndex === 0"
          variant="tonal"
        >
          Anterior
        </v-btn>
        
        <v-spacer></v-spacer>
        
        <v-btn
          color="success"
          :prepend-icon="autoPlayPaused ? 'mdi-play' : 'mdi-pause'"
          @click="toggleAutoPlay"
          variant="outlined"
        >
          {{ autoPlayPaused ? 'Reproducir' : 'Pausar' }}
        </v-btn>
        
        <v-spacer></v-spacer>
        
        <v-btn
          color="success"
          append-icon="mdi-chevron-right"
          @click="nextSlide"
          :disabled="currentIndex === conceptos.length - 1"
          variant="tonal"
        >
          Siguiente
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  conceptos: {
    type: Array,
    required: true,
    default: () => []
  },
  autoPlayDelay: {
    type: Number,
    default: 7000
  }
})

const currentIndex = ref(0)
const autoPlayPaused = ref(false)
let autoPlayInterval = null

const currentConcepto = computed(() => {
  return props.conceptos[currentIndex.value] || {}
})

const nextSlide = () => {
  if (currentIndex.value < props.conceptos.length - 1) {
    currentIndex.value++
  } else {
    currentIndex.value = 0
  }
}

const prevSlide = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

const goToSlide = (index) => {
  currentIndex.value = index
  resetAutoPlay()
}

const toggleAutoPlay = () => {
  autoPlayPaused.value = !autoPlayPaused.value
  if (autoPlayPaused.value) {
    clearInterval(autoPlayInterval)
  } else {
    startAutoPlay()
  }
}

const startAutoPlay = () => {
  autoPlayInterval = setInterval(() => {
    nextSlide()
  }, props.autoPlayDelay)
}

const resetAutoPlay = () => {
  if (!autoPlayPaused.value) {
    clearInterval(autoPlayInterval)
    startAutoPlay()
  }
}

onMounted(() => {
  startAutoPlay()
})

onUnmounted(() => {
  clearInterval(autoPlayInterval)
})
</script>

<style scoped>
.carousel-mejorado {
  width: 100%;
  margin: 0 auto;
}

.carousel-card {
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5e9 100%);
  overflow: hidden;
}

.indicators-top {
  display: flex;
  justify-content: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.95);
  border-bottom: 2px solid #e0e0e0;
}

.concept-content {
  min-height: 450px;
  padding: 20px;
}

.image-overlay {
  background: linear-gradient(to bottom, rgba(0,0,0,0.3), transparent);
  height: 100%;
  display: flex;
  align-items: flex-start;
}

.rounded-lg {
  border-radius: 12px;
}

.slide-fade-enter-active {
  transition: all 0.6s ease;
}

.slide-fade-leave-active {
  transition: all 0.4s ease;
}

.slide-fade-enter-from {
  transform: translateX(50px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(-50px);
  opacity: 0;
}

@media (max-width: 960px) {
  .concept-content {
    min-height: auto;
  }
}
</style>
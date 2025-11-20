<template>
    <div class="carousel-container">
      <v-card elevation="4" class="carousel-card">
        <!-- Navegación superior con indicadores -->
        <div class="carousel-indicators">
          <v-chip
            v-for="(concepto, index) in conceptos"
            :key="concepto.id"
            :color="currentIndex === index ? 'success' : 'grey-lighten-2'"
            size="small"
            class="mx-1"
            @click="goToSlide(index)"
          >
            {{ index + 1 }}
          </v-chip>
        </div>
  
        <!-- Contenido del concepto actual -->
        <v-card-text class="carousel-content pa-8">
          <transition name="slide-fade" mode="out-in">
            <div :key="currentConcepto.id" class="concept-slide">
              <v-chip
                color="info"
                prepend-icon="mdi-tag"
                class="mb-4"
              >
                {{ currentConcepto.categoria }}
              </v-chip>
              
              <h2 class="text-h3 mb-4 text-success">
                {{ currentConcepto.nombre }}
              </h2>
              
              <p class="text-h6 text-grey-darken-1">
                {{ currentConcepto.descripcion }}
              </p>
              
              <!-- Contador -->
              <div class="mt-6 text-center">
                <v-chip color="success" variant="outlined">
                  Concepto {{ currentIndex + 1 }} de {{ conceptos.length }}
                </v-chip>
              </div>
            </div>
          </transition>
        </v-card-text>
  
        <!-- Botones de navegación -->
        <v-card-actions class="justify-space-between pa-4">
          <v-btn
            color="success"
            prepend-icon="mdi-chevron-left"
            @click="prevSlide"
            :disabled="currentIndex === 0"
          >
            Anterior
          </v-btn>
          
          <v-btn
            color="success"
            variant="outlined"
            prepend-icon="mdi-pause"
            @click="toggleAutoPlay"
            v-if="!autoPlayPaused"
          >
            Pausar
          </v-btn>
          <v-btn
            color="success"
            variant="outlined"
            prepend-icon="mdi-play"
            @click="toggleAutoPlay"
            v-else
          >
            Reproducir
          </v-btn>
          
          <v-btn
            color="success"
            append-icon="mdi-chevron-right"
            @click="nextSlide"
            :disabled="currentIndex === conceptos.length - 1"
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
      default: 5000 // 5 segundos
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
      currentIndex.value = 0 // Volver al inicio
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
  
  // Iniciar autoplay al montar
  onMounted(() => {
    startAutoPlay()
  })
  
  // Limpiar interval al desmontar
  onUnmounted(() => {
    clearInterval(autoPlayInterval)
  })
  </script>
  
  <style scoped>
  .carousel-container {
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
  }
  
  .carousel-card {
    min-height: 400px;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  }
  
  .carousel-indicators {
    display: flex;
    justify-content: center;
    padding: 16px;
    background-color: rgba(255, 255, 255, 0.9);
  }
  
  .carousel-content {
    min-height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .concept-slide {
    text-align: center;
    max-width: 700px;
  }
  
  /* Animaciones de transición */
  .slide-fade-enter-active {
    transition: all 0.5s ease;
  }
  
  .slide-fade-leave-active {
    transition: all 0.3s ease;
  }
  
  .slide-fade-enter-from {
    transform: translateX(30px);
    opacity: 0;
  }
  
  .slide-fade-leave-to {
    transform: translateX(-30px);
    opacity: 0;
  }
  </style>
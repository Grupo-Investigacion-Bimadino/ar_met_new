<template>
    <v-container fluid class="content-container">
       <div class="welcome-interactive" @mousemove="handleMouseMove" ref="container">
    <!-- Partículas de fondo -->
    <div class="particles">
      <div 
        v-for="i in 50" 
        :key="i" 
        class="particle"
        :style="getParticleStyle(i)"
      ></div>
    </div>

    <!-- Formas geométricas flotantes -->
    <div class="floating-shapes">
      <div class="shape shape-1" :style="shapeTransform"></div>
      <div class="shape shape-2" :style="shapeTransform"></div>
      <div class="shape shape-3" :style="shapeTransform"></div>
    </div>
      <v-row class="fill-height" align="center" justify="center">
        <v-col cols="12" md="10" lg="8" class="text-center">
          
          <!-- Card principal con efecto glass -->
          <v-card
            class="welcome-card glass-effect"
            :style="cardTransform"
            elevation="24"
          >
            <!-- Imagen/GIF con efecto hover -->
            <div class="image-wrapper" @mouseenter="imageHovered = true" @mouseleave="imageHovered = false">
              <v-img
                src="https://www.iexe.edu.mx/wp-content/uploads/2022/05/2.gif"
                alt="Metaverso VR"
                height="350"
                cover
                :class="{ 'image-zoomed': imageHovered }"
              >
                <div class="image-overlay">
                  <v-icon size="80" class="pulse-icon" v-if="imageHovered">
                    mdi-virtual-reality
                  </v-icon>
                </div>
              </v-img>
            </div>

            <v-card-text class="pa-8">
                
    <!-- Título simple y estable -->
<div class="title-container mb-6">
  <h1 class="welcome-title">EL METAVERSO</h1>
  <h2 class="welcome-subtitle mt-2">Y LA REALIDAD AUMENTADA</h2>
</div>

              <!-- Descripción con efecto typewriter -->
              <p class="description-text mb-8">
                <span class="typewriter">{{ displayedText }}</span>
                <span class="cursor">|</span>
              </p>

              <!-- Características interactivas -->
              <v-row class="features mb-6">
                <v-col 
                  v-for="(feature, index) in features" 
                  :key="index"
                  cols="12" 
                  sm="4"
                  class="feature-col"
                >
                  <div 
                    class="feature-card"
                    @mouseenter="hoveredFeature = index"
                    @mouseleave="hoveredFeature = null"
                  >
                    <v-icon 
                      :size="hoveredFeature === index ? 60 : 50" 
                      :color="hoveredFeature === index ? 'primary' : 'white'"
                      class="feature-icon"
                    >
                      {{ feature.icon }}
                    </v-icon>
                    <p class="feature-text mt-2">{{ feature.text }}</p>
                  </div>
                </v-col>
              </v-row>

             <!-- Botón con efecto especial -->
<div class="button-container">
  <NuxtLink to="/principal" style="text-decoration: none;">
    <v-btn
      size="x-large"
      color="primary"
      elevation="12"
      rounded="pill"
      class="start-button"
    >
      <v-icon class="mr-2">
        mdi-rocket-launch
      </v-icon>
      Comenzar
      <v-icon class="ml-2">
        mdi-arrow-right
      </v-icon>
    </v-btn>
  </NuxtLink>

                
                <!-- Progress circular al hacer click -->
                <div v-if="loading" class="loading-overlay">
                  <v-progress-circular
                    indeterminate
                    color="white"
                    size="70"
                  ></v-progress-circular>
                  <p class="loading-text mt-4">Iniciando experiencia...</p>
                </div>
              </div>

              <!-- Contador interactivo -->
              <div class="stats-container mt-8">
                <div class="stat-item" v-for="stat in stats" :key="stat.label">
                  <div class="stat-number">{{ stat.value }}</div>
                  <div class="stat-label">{{ stat.label }}</div>
                </div>
              </div>

            </v-card-text>
          </v-card>

          <!-- Scroll indicator animado -->
          <div class="scroll-indicator">
            <v-icon size="50" class="scroll-icon">mdi-chevron-down</v-icon>
          </div>

        </v-col>
      </v-row> </div>
    </v-container>
 
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const router = useRouter()
const container = ref(null)
const mouseX = ref(0)
const mouseY = ref(0)
const imageHovered = ref(false)
const buttonHovered = ref(false)
const hoveredFeature = ref(null)
const loading = ref(false)

// Texto typewriter
const fullText = '¡Descubre el futuro digital! Explora mundos virtuales, realidad aumentada y las tecnologías que están transformando nuestra forma de interactuar.'
const displayedText = ref('')
const currentIndex = ref(0)

const buttonText = computed(() => {
  return buttonHovered.value ? '¡Vamos!' : 'Comenzar'
})

// Features
const features = [
  { icon: 'mdi-virtual-reality', text: 'Inmersión Total' },
  { icon: 'mdi-cube-scan', text: 'Realidad Aumentada' },
  { icon: 'mdi-earth', text: 'Mundos Virtuales' }
]

// Stats counter
const stats = ref([
  { value: '100%', label: 'Interactivo' },
  { value: '∞', label: 'Posibilidades' },
  { value: '3D', label: 'Experiencia' }
])

// Transformación de card según mouse
const cardTransform = computed(() => {
  if (!container.value) return {}
  const x = (mouseX.value - container.value.offsetWidth / 2) / 50
  const y = (mouseY.value - container.value.offsetHeight / 2) / 50
  return {
    transform: `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`,
  }
})

// Transformación de shapes
const shapeTransform = computed(() => {
  const x = mouseX.value / 20
  const y = mouseY.value / 20
  return {
    transform: `translate(${x}px, ${y}px)`,
  }
})

// Estilo de partículas
const getParticleStyle = (i) => {
  return {
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 5}s`,
    animationDuration: `${5 + Math.random() * 10}s`,
  }
}

// Mouse move handler
const handleMouseMove = (e) => {
  if (container.value) {
    mouseX.value = e.clientX
    mouseY.value = e.clientY
  }
}

// Typewriter effect
const typeWriter = () => {
  if (currentIndex.value < fullText.length) {
    displayedText.value = fullText.substring(0, currentIndex.value + 1)
    currentIndex.value++
    setTimeout(typeWriter, 30)
  }
}

// Animación de contadores
const animateCounters = () => {
  // Aquí podrías agregar lógica de animación de números
}



onMounted(() => {
  setTimeout(() => {
    typeWriter()
  }, 1000)
  animateCounters()
})
</script>

<style scoped>
.welcome-interactive {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  position: relative;
  overflow: hidden;
}

/* Partículas */
.particles {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  animation: float 10s infinite ease-in-out;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) translateX(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100vh) translateX(50px);
    opacity: 0;
  }
}

/* Formas flotantes */
.floating-shapes {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.shape {
  position: absolute;
  border-radius: 50%;
  transition: transform 0.1s ease-out;
}

.shape-1 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
  top: 10%;
  left: 10%;
  animation: pulse 4s ease-in-out infinite;
}

.shape-2 {
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%);
  bottom: 20%;
  right: 15%;
  animation: pulse 6s ease-in-out infinite;
}

.shape-3 {
  width: 250px;
  height: 250px;
  background: radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%);
  top: 50%;
  right: 5%;
  animation: pulse 5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.6;
  }
}

/* Container */
.content-container {
  min-height: 100vh;
  position: relative;
  z-index: 10;
}

/* Card principal */
.welcome-card {
  background: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: blur(20px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  transition: transform 0.1s ease-out, box-shadow 0.3s ease;
  transform-style: preserve-3d;
}

.welcome-card:hover {
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3) !important;
}

/* Imagen */
.image-wrapper {
  position: relative;
  overflow: hidden;
  border-radius: 12px 12px 0 0;
}

.image-wrapper img {
  transition: transform 0.5s ease;
}

.image-zoomed {
  transform: scale(1.1);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(102, 126, 234, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-wrapper:hover .image-overlay {
  opacity: 1;
}

.pulse-icon {
  animation: pulseScale 1s ease infinite;
  color: white;
}

@keyframes pulseScale {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}

/* Títulos animados */
.title-container {
  perspective: 1000px;
}

.welcome-title {
  font-size: 3.5rem;
  font-weight: 900;
  background: linear-gradient(120deg, #667eea, #764ba2, #f093fb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200% auto;
  margin-bottom: 0;
  /* Fallback por si el gradiente falla */
  color: #667eea;
}

.welcome-subtitle {
  font-size: 2rem;
  font-weight: 700;
  color: #764ba2;
}

.animated-char {
  display: inline-block;
  animation: bounceIn 0.6s ease both;
  opacity: 1;
}

.animated-char-sub {
  display: inline-block;
  animation: fadeInUp 0.6s ease both;
  opacity: 1;
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.3) translateY(-50px);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  70% {
    opacity: 1;
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Typewriter */
.description-text {
  font-size: 1.1rem;
  color: #555;
  min-height: 80px;
}

.typewriter {
  font-weight: 500;
}

.cursor {
  animation: blink 0.7s infinite;
  font-weight: bold;
  color: #667eea;
}

@keyframes blink {
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
}

/* Features */
.features {
  margin: 0 -8px;
}

.feature-card {
  padding: 20px;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  transition: all 0.3s ease;
  cursor: pointer;
  height: 100%;
}

.feature-card:hover {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%);
  transform: translateY(-10px);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
}

.feature-icon {
  transition: all 0.3s ease;
}

.feature-text {
  font-weight: 600;
  color: #667eea;
  margin: 0;
}

/* Botón */
.button-container {
  position: relative;
}

.start-button {
  font-size: 1.3rem;
  font-weight: 700;
  padding: 28px 48px !important;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  overflow: visible;
}

.start-button:hover {
  transform: translateY(-5px) scale(1.05);
  box-shadow: 0 15px 40px rgba(102, 126, 234, 0.4) !important;
}

.rotate-icon {
  animation: rotateRocket 0.5s ease;
}

@keyframes rotateRocket {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.slide-icon {
  animation: slideRight 0.5s ease;
}

@keyframes slideRight {
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(10px);
  }
}

/* Loading */
.loading-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(102, 126, 234, 0.95);
  padding: 40px;
  border-radius: 20px;
  text-align: center;
  animation: fadeIn 0.3s ease;
}

.loading-text {
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
}

/* Stats */
.stats-container {
  display: flex;
  justify-content: space-around;
  gap: 20px;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 900;
  background: linear-gradient(120deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-label {
  font-size: 0.9rem;
  color: #666;
  font-weight: 600;
  margin-top: 5px;
}

/* Scroll indicator */
.scroll-indicator {
  margin-top: 40px;
}

.scroll-icon {
  animation: bounce 2s infinite;
  color: rgba(255, 255, 255, 0.8);
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px);
  }
  60% {
    transform: translateY(-10px);
  }
}

/* Responsive */
@media (max-width: 960px) {
  .welcome-title {
    font-size: 2.5rem;
  }
  
  .welcome-subtitle {
    font-size: 1.5rem;
  }
  
  .stat-number {
    font-size: 2rem;
  }
}

@media (max-width: 600px) {
  .welcome-title {
    font-size: 2rem;
  }
  
  .welcome-subtitle {
    font-size: 1.2rem;
  }
  
  .description-text {
    font-size: 0.95rem;
  }
  
  .start-button {
    font-size: 1.1rem;
    padding: 20px 32px !important;
  }
  
  .stats-container {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
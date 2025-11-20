<template>
  <v-app>
    <!-- Sidebar Component -->
    <Sidebar />

    <!-- Main Content -->
    <v-main>
      <div class="home-page">
        <!-- Hero Section -->
        <section class="hero-section">
          <v-container>
            <v-row align="center" class="fill-height">
              <v-col cols="12" md="6">
                <h1 class="display-1 font-weight-bold mb-4">
                  Bienvenido al Futuro Digital
                </h1>
                <p class="text-h6 mb-6">
                  Explora el fascinante mundo del Metaverso y la Realidad Aumentada
                </p>
                <v-btn
                  color="primary"
                  size="large"
                  rounded
                  elevation="4"
                  to="/conceptos"
                >
                  Explorar Contenido
                  <v-icon right>mdi-arrow-right</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="12" md="6" class="text-center">
                <v-img
                  src="https://media.giphy.com/media/l0HlQXlQ3nHyLMvte/giphy.gif"
                  alt="Tecnología"
                  max-width="500"
                  class="mx-auto rounded-lg"
                ></v-img>
              </v-col>
            </v-row>
          </v-container>
        </section>

        <!-- Content Cards -->
        <section class="content-section py-16">
          <v-container>
            <h2 class="text-h3 text-center mb-12 font-weight-bold">
              ¿Qué aprenderás?
            </h2>
            
            <v-row>
              <v-col 
                v-for="(card, index) in contentCards" 
                :key="index"
                cols="12" 
                md="4"
              >
                <v-card
                  class="content-card"
                  elevation="8"
                  rounded="lg"
                  height="100%"
                >
                  <v-card-text class="text-center pa-8">
                    <v-avatar size="80" color="primary" class="mb-4">
                      <v-icon size="50" color="white">{{ card.icon }}</v-icon>
                    </v-avatar>
                    <h3 class="text-h5 mb-4">{{ card.title }}</h3>
                    <p class="text-body-1">{{ card.description }}</p>
                  </v-card-text>
                  <v-card-actions class="justify-center pb-6">
                    <v-btn
                      color="primary"
                      variant="outlined"
                      rounded
                      :to="card.route"
                    >
                      Aprender más
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </section>

        <!-- CTA Section -->
        <section class="cta-section py-16">
          <v-container>
            <v-card
              class="cta-card pa-12"
              color="primary"
              rounded="xl"
              elevation="12"
            >
              <v-row align="center">
                <v-col cols="12" md="8">
                  <h2 class="text-h4 text-white font-weight-bold mb-4">
                    ¿Listo para comenzar tu viaje?
                  </h2>
                  <p class="text-h6 text-white mb-0">
                    Descubre todo sobre el Metaverso y la Realidad Aumentada
                  </p>
                </v-col>
                <v-col cols="12" md="4" class="text-center">
                  <v-btn
                    color="white"
                    size="x-large"
                    rounded="pill"
                    elevation="8"
                    to="/conceptos"
                  >
                    Comenzar ahora
                    <v-icon right>mdi-rocket-launch</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-container>
        </section>
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
const contentCards = [
  {
    icon: 'mdi-virtual-reality',
    title: 'Metaverso',
    description: 'Aprende qué es el metaverso, sus aplicaciones y cómo está transformando nuestra realidad digital.',
    route: '/conceptos'
  },
  {
    icon: 'mdi-augmented-reality',
    title: 'Realidad Aumentada',
    description: 'Descubre cómo la RA está cambiando la forma en que interactuamos con el mundo físico.',
    route: '/conceptos'
  },
  {
    icon: 'mdi-cube-scan',
    title: 'Tecnologías',
    description: 'Conoce las tecnologías detrás del metaverso: VR, AR, blockchain y más.',
    route: '/conceptos'
  }
]
</script>

<style scoped>
.home-page {
  min-height: 100vh;
}

.hero-section {
  min-height: 80vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.content-section {
  background: #f5f5f5;
}

.content-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.content-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2) !important;
}

.cta-section {
  background: white;
}

.cta-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
}

@media (max-width: 960px) {
  .hero-section {
    min-height: auto;
    padding: 60px 0;
  }
  
  .display-1 {
    font-size: 2.5rem !important;
  }
}
</style>
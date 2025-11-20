<template>
  <v-app>
    <v-app-bar
      v-if="showNavigation"
      app
      color="primary"
      dark
      elevation="4"
    >
      <v-app-bar-title>
        <v-icon class="mr-2">mdi-virtual-reality</v-icon>
        OVA Metaverso
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn
        v-for="item in menuItems"
        :key="item.title"
        :to="item.route"
        text
        class="mx-1"
      >
        <v-icon left>{{ item.icon }}</v-icon>
        {{ item.title }}
      </v-btn>
    </v-app-bar>

    <v-main>
      <slot />
    </v-main>

    <v-footer
      v-if="showNavigation"
      app
      color="primary"
      dark
      class="pa-4"
    >
      <v-row align="center" justify="center">
        <v-col cols="12" class="text-center">
          <p class="mb-2">
            © 2025 OVA Metaverso y Realidad Aumentada
          </p>
          <p class="text-caption mb-0">
            Creado por Ale-Vane-Jaider-Luis para el aprendizaje
          </p>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router' // Asegúrate de importar useRoute

const route = useRoute()

// Ocultar navegación en la página de bienvenida
const showNavigation = computed(() => {
  return route.path !== '/principal'
})

const menuItems = [
  // *** CORRECCIÓN IMPORTANTE: Cambiado '/index' a '/' ***
  { title: 'Inicio', icon: 'mdi-home', route: '/' }, 
  { title: 'Acerca de', icon: 'mdi-information', route: '/about' },
]
</script>

<style scoped>
/* Estilos adicionales si los necesitas */
</style>
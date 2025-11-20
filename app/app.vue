<template>
  <NuxtLayout>
    <v-app>
      <NuxtPage />
    </v-app>
  </NuxtLayout>
</template>

<script setup>
// Configuración del head (título, meta tags, etc.)
useHead({
  titleTemplate: '%s - OVA Metaverso',
  meta: [
    { name: 'description', content: 'Aprende sobre el Metaverso y Realidad Aumentada' }
  ]
})
</script>

<style>
/* Estilos globales */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Roboto', sans-serif;
  overflow-x: hidden;
}

/* Transiciones entre páginas */
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>

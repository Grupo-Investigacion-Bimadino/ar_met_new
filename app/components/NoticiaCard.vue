<script setup>
// ✅ Props del servidor (requeridas)
// ✅ contador es opcional con default (estado del padre)
const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  titulo: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  categoria: {
    type: String,
    required: true
  },
  autor: {
    type: String,
    required: true
  },
  fecha: {
    type: String,
    required: true
  },
  imagen: String, // Opcional (puede no tener imagen)
  contador: {
    type: Number,
    default: 0 // Estado local del padre
  }
})
</script>

<template>
  <v-card class="mx-auto" elevation="10" rounded="lg">
    <!-- Imagen de la noticia -->
    <v-img
      v-if="imagen"
      :src="imagen"
      height="250"
      cover
      class="text-white"
    >
      <v-chip
        class="ma-2"
        color="primary"
        label
      >
        {{ categoria }}
      </v-chip>
    </v-img>

    <v-card-title class="text-h6 font-weight-bold">
      {{ titulo }}
    </v-card-title>

    <v-card-subtitle class="d-flex justify-space-between align-center">
      <span>Por {{ autor }}</span>
      <span class="text-caption">{{ fecha }}</span>
    </v-card-subtitle>

    <v-card-text class="text-body-1">
      {{ descripcion }}
    </v-card-text>

    <v-divider></v-divider>

    <v-card-text class="text-subtitle-2 d-flex justify-space-between">
      <span>🔹 Veces leída: {{ contador }}</span>
      <span class="text-caption text-grey">ID: {{ id }}</span>
    </v-card-text>
  </v-card>
</template>
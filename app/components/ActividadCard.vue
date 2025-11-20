<template>
    <v-card class="mb-4" elevation="2">
      <v-card-title class="bg-primary">
        {{ actividad.titulo }}
      </v-card-title>
      <v-card-text class="pt-4">
        <p class="mb-3">{{ actividad.descripcion }}</p>
        <div class="d-flex justify-space-between">
          <v-chip color="secondary" size="small">
            <v-icon start>mdi-clock-outline</v-icon>
            {{ actividad.duracion }}
          </v-chip>
          <v-chip :color="getNivelColor(actividad.nivel)" size="small">
            {{ actividad.nivel }}
          </v-chip>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" variant="text">
          Ver más
        </v-btn>
      </v-card-actions>
    </v-card>
  </template>
  
  <script setup>
  defineProps({
    actividad: {
      type: Object,
      required: true
    }
  })
  
  const getNivelColor = (nivel) => {
    const colores = {
      'Básico': 'success',
      'Intermedio': 'warning',
      'Avanzado': 'error'
    }
    return colores[nivel] || 'grey'
  }
  </script>
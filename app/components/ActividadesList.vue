<template>
    <div>
      <v-row>
        <v-col 
          v-for="actividad in actividades" 
          :key="actividad.id"
          cols="12"
          md="6"
          lg="4"
        >
          <ActividadCard :actividad="actividad" />
        </v-col>
      </v-row>
      
      <v-alert v-if="actividades.length === 0" type="info" class="mt-4">
        No hay actividades disponibles
      </v-alert>
    </div>
  </template>
  
  <script setup>
  defineProps({
    actividades: {
      type: Array,
      required: true,
      default: () => []
    }
  })
  </script>
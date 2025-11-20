<template>
    <div>
      <v-card elevation="3">
        <v-card-title class="bg-purple-darken-2 text-white">
          <v-icon start>mdi-clipboard-check</v-icon>
          Lista de Evaluaciones
        </v-card-title>
        
        <v-table hover>
          <thead>
            <tr>
              <th class="text-left">Título</th>
              <th class="text-left">Tipo</th>
              <th class="text-center">Preguntas</th>
              <th class="text-center">Dificultad</th>
              <th class="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="evaluacion in evaluaciones"
              :key="evaluacion.id"
              class="evaluacion-row"
            >
              <td class="font-weight-bold">{{ evaluacion.titulo }}</td>
              <td>
                <v-chip
                  :color="getTipoColor(evaluacion.tipo)"
                  size="small"
                  :prepend-icon="getTipoIcon(evaluacion.tipo)"
                >
                  {{ evaluacion.tipo }}
                </v-chip>
              </td>
              <td class="text-center">
                <v-chip
                  v-if="evaluacion.preguntas > 0"
                  color="info"
                  size="small"
                >
                  {{ evaluacion.preguntas }} preguntas
                </v-chip>
                <span v-else class="text-grey">—</span>
              </td>
              <td class="text-center">
                <v-chip
                  :color="getDificultadColor(evaluacion.dificultad)"
                  size="small"
                >
                  {{ evaluacion.dificultad }}
                </v-chip>
              </td>
              <td class="text-center">
                <v-btn
                  color="purple-darken-2"
                  variant="tonal"
                  size="small"
                  prepend-icon="mdi-play"
                >
                  Iniciar
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
  
        <v-card-text v-if="evaluaciones.length === 0" class="text-center">
          <v-icon size="64" color="grey">mdi-clipboard-alert</v-icon>
          <p class="text-grey mt-3">No hay evaluaciones disponibles</p>
        </v-card-text>
      </v-card>
    </div>
  </template>
  
  <script setup>
  defineProps({
    evaluaciones: {
      type: Array,
      required: true,
      default: () => []
    }
  })
  
  const getTipoColor = (tipo) => {
    const colores = {
      'Cuestionario': 'purple',
      'Práctica': 'orange',
      'Proyecto': 'pink',
      'Examen': 'red'
    }
    return colores[tipo] || 'grey'
  }
  
  const getTipoIcon = (tipo) => {
    const iconos = {
      'Cuestionario': 'mdi-comment-question',
      'Práctica': 'mdi-hammer-wrench',
      'Proyecto': 'mdi-briefcase',
      'Examen': 'mdi-school'
    }
    return iconos[tipo] || 'mdi-file'
  }
  
  const getDificultadColor = (dificultad) => {
    const colores = {
      'Fácil': 'success',
      'Media': 'warning',
      'Avanzada': 'error',
      'Difícil': 'error'
    }
    return colores[dificultad] || 'grey'
  }
  </script>
  
  <style scoped>
  .evaluacion-row {
    transition: background-color 0.2s;
  }
  
  .evaluacion-row:hover {
    background-color: rgba(156, 39, 176, 0.05);
  }
  
  th {
    background-color: #f5f5f5;
    font-weight: 600;
    color: #424242;
  }
  </style>
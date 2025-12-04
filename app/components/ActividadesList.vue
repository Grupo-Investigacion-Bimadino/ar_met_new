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
        <ActividadCard 
          :actividad="actividad" 
          @iniciar="abrirActividad"
        />
      </v-col>
    </v-row>
    
    <v-alert v-if="actividades.length === 0" type="info" class="mt-4">
      No hay actividades disponibles
    </v-alert>

    <!-- Modal de quiz -->
    <ActividadQuiz
      v-if="actividadSeleccionada && actividadSeleccionada.tipo === 'quiz'"
      v-model="mostrarQuiz"
      :actividad="actividadSeleccionada"
      @completada="onActividadCompletada"
    />

    <!-- Modal de emparejar -->
    <ActividadEmparejar
      v-if="actividadSeleccionada && actividadSeleccionada.tipo === 'emparejar'"
      v-model="mostrarEmparejar"
      :actividad="actividadSeleccionada"
      @completada="onActividadCompletada"
    />

    <!-- Modal de avatar builder -->
    <ActividadAvatarBuilder
      v-if="actividadSeleccionada && actividadSeleccionada.tipo === 'avatar-builder'"
      v-model="mostrarAvatar"
      :actividad="actividadSeleccionada"
      @completada="onActividadCompletada"
    />
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

const mostrarQuiz = ref(false)
const mostrarEmparejar = ref(false)
const mostrarAvatar = ref(false)
const actividadSeleccionada = ref(null)

const abrirActividad = (actividad) => {
  console.log('Abriendo actividad:', actividad)
  actividadSeleccionada.value = actividad
  
  if (actividad.tipo === 'quiz') {
    console.log('Abriendo quiz')
    mostrarQuiz.value = true
  } else if (actividad.tipo === 'emparejar') {
    console.log('Abriendo emparejar')
    mostrarEmparejar.value = true
  } else if (actividad.tipo === 'avatar-builder') {
    console.log('Abriendo avatar builder')
    mostrarAvatar.value = true
  } else {
    console.warn('Tipo de actividad no reconocido:', actividad.tipo)
  }
}

const onActividadCompletada = (actividadId) => {
  console.log(`Actividad ${actividadId} completada!`)
}
</script>
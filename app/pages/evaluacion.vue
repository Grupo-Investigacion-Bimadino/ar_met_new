<template>
  <v-app>
    <Sidebar />
    <v-main>
      <v-container>
        <h1 class="text-h3 mb-6">Evaluación</h1>
        
        <v-progress-circular
          v-if="loading"
          indeterminate
          color="purple-darken-2"
          class="mx-auto d-block"
        />
        
        <EvaluacionesTable 
          v-else
          :evaluaciones="storeEvaluaciones.evaluaciones" 
        />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { useStoreEvaluaciones } from '~~/stores/evaluacion'

const storeEvaluaciones = useStoreEvaluaciones()
const loading = ref(true)

onMounted(async () => {
  await storeEvaluaciones.fetchEvaluaciones()
  loading.value = false
})
</script>
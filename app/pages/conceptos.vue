<template>
  <v-app>
    <Sidebar />
    <v-main>
      <v-container>
        <h1 class="text-h3 mb-6">Conceptos</h1>
        
        <v-progress-circular
          v-if="loading"
          indeterminate
          color="success"
          class="mx-auto d-block"
        />
        
        <ConceptosCarouselMejorado 
          v-else
          :conceptos="storeConceptos.conceptos"
          :autoPlayDelay="7000"
        />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { useStoreConceptos } from '~~/stores/conceptos'

const storeConceptos = useStoreConceptos()
const loading = ref(true)

onMounted(async () => {
  await storeConceptos.fetchConceptos()
  loading.value = false
})
</script>
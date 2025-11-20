<template>
  <v-app>
    <Sidebar />
    <v-main>
      <v-container>
        <h1 class="text-h3 mb-6">Actividades</h1>
        
        <v-progress-circular
          v-if="loading"
          indeterminate
          color="primary"
          class="mx-auto d-block"
        />
        
        <ActividadesList 
          v-else
          :actividades="storeActividades.actividades" 
        />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { useStoreActividades } from '~~/stores/actividades'

const storeActividades = useStoreActividades()
const loading = ref(true)

onMounted(async () => {
  await storeActividades.fetchActividades()
  loading.value = false
})
</script>
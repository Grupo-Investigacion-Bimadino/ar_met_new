<script setup>
// ✅ defineModel con valor por defecto
const count = defineModel({
  type: Number,
  default: 0
})

function aumentar() {
  count.value++
}

function disminuir() {
  if (count.value > 0) count.value--
}

function reiniciar() {
  count.value = 0
}
</script>

<template>
  <v-card class="pa-4 text-center" elevation="4">
    <v-card-title class="text-h6 mb-4">
      📊 Contador de Lecturas
    </v-card-title>
    
    <v-card-text>
      <div class="text-h3 font-weight-bold mb-4" :class="count > 0 ? 'text-primary' : 'text-grey'">
        {{ count }}
      </div>
      
      <v-btn-group divided variant="outlined">
        <v-btn 
          color="error" 
          @click="disminuir"
          :disabled="count === 0"
        >
          <v-icon>mdi-minus</v-icon>
        </v-btn>
        
        <v-btn 
          color="warning" 
          @click="reiniciar"
          :disabled="count === 0"
        >
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
        
        <v-btn 
          color="success" 
          @click="aumentar"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-btn-group>
    </v-card-text>
  </v-card>
</template>
<script setup>
// ✅ PROPS explícitos (en lugar de defineModel)
const props = defineProps({
  titulo: {
    type: String,
    default: ''
  },
  descripcion: {
    type: String,
    default: ''
  },
  categoria: {
    type: String,
    default: ''
  },
  autor: {
    type: String,
    default: ''
  },
  fecha: {
    type: String,
    default: ''
  },
  imagen: {
    type: String,
    default: ''
  }
})


const emit = defineEmits([
  'update:titulo',
  'update:descripcion',
  'update:categoria',
  'update:autor',
  'update:fecha',
  'update:imagen'
])


const tituloLocal = ref(props.titulo)
const descripcionLocal = ref(props.descripcion)
const categoriaLocal = ref(props.categoria)
const autorLocal = ref(props.autor)
const fechaLocal = ref(props.fecha)
const imagenLocal = ref(props.imagen)


watch(tituloLocal, (newVal) => {
  emit('update:titulo', newVal)
})

watch(descripcionLocal, (newVal) => {
  emit('update:descripcion', newVal)
})

watch(categoriaLocal, (newVal) => {
  emit('update:categoria', newVal)
})

watch(autorLocal, (newVal) => {
  emit('update:autor', newVal)
})

watch(fechaLocal, (newVal) => {
  emit('update:fecha', newVal)
})

watch(imagenLocal, (newVal) => {
  emit('update:imagen', newVal)
})

// Sincronizar cuando cambian las props desde el padre
watch(() => props.titulo, (newVal) => {
  tituloLocal.value = newVal
})

watch(() => props.descripcion, (newVal) => {
  descripcionLocal.value = newVal
})

watch(() => props.categoria, (newVal) => {
  categoriaLocal.value = newVal
})

watch(() => props.autor, (newVal) => {
  autorLocal.value = newVal
})

watch(() => props.fecha, (newVal) => {
  fechaLocal.value = newVal
})

watch(() => props.imagen, (newVal) => {
  imagenLocal.value = newVal
})

// Validación básica
const isFormValid = computed(() => {
  return tituloLocal.value.trim() !== '' && 
         descripcionLocal.value.trim() !== '' &&
         autorLocal.value.trim() !== ''
})
</script>

<template>
  <v-card class="pa-6" elevation="6">
    <v-card-title class="text-h6 mb-4">
      ✏️ Editar Noticia
    </v-card-title>
    
    <v-form>
      <!-- ✅ V-MODEL vinculado a valores locales que emiten cambios -->
      <v-text-field 
        v-model="tituloLocal" 
        label="Título de la noticia"
        variant="outlined"
        class="mb-3"
        :rules="[v => !!v || 'El título es requerido']"
        counter
      ></v-text-field>
      
      <v-textarea 
        v-model="descripcionLocal" 
        label="Descripción"
        variant="outlined"
        rows="4"
        class="mb-3"
        :rules="[v => !!v || 'La descripción es requerida']"
        counter
      ></v-textarea>

      <v-text-field 
        v-model="categoriaLocal" 
        label="Categoría"
        variant="outlined"
        class="mb-3"
        placeholder="Ej: Realidad Virtual, IA, Robótica"
      ></v-text-field>
      
      <v-text-field 
        v-model="autorLocal" 
        label="Autor"
        variant="outlined"
        class="mb-3"
        :rules="[v => !!v || 'El autor es requerido']"
      ></v-text-field>

      <v-text-field 
        v-model="fechaLocal" 
        label="Fecha"
        type="date"
        variant="outlined"
        class="mb-3"
      ></v-text-field>

      <v-text-field 
        v-model="imagenLocal" 
        label="URL de la imagen"
        variant="outlined"
        placeholder="/img/ejemplo.jpg"
        hint="Ruta relativa o URL completa"
        persistent-hint
      ></v-text-field>

      <v-alert
        v-if="!isFormValid"
        type="warning"
        variant="tonal"
        class="mt-4"
        density="compact"
      >
        Completa los campos obligatorios: Título, Descripción y Autor
      </v-alert>
    </v-form>
  </v-card>
</template>

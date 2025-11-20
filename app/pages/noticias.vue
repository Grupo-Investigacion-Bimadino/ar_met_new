<script setup>
import NoticiaCard from '@/components/NoticiaCard.vue'
import NoticiasCount from '@/components/NoticiasCount.vue'
import NoticiasForm from '@/components/NoticiasForm.vue'

// Datos simulados (en lugar del store)
const noticias = ref([
  {
    id: 1,
    titulo: 'El futuro del metaverso en la educación',
    descripcion: 'Las aulas virtuales transforman la enseñanza tradicional.',
    autor: 'TechEdu News'
  },
  {
    id: 2,
    titulo: 'Meta lanza nuevas gafas de realidad mixta',
    descripcion: 'Combina el mundo físico y virtual con una experiencia inmersiva.',
    autor: 'VR Today'
  }
])

const noticiaSeleccionada = ref(noticias.value[0])
const contadorLecturas = ref(0)

// Variables del formulario
const formTitulo = ref('')
const formDescripcion = ref('')
const formAutor = ref('')

// Observa cambios en la noticia seleccionada
watch(noticiaSeleccionada, (nueva) => {
  if (nueva) {
    formTitulo.value = nueva.titulo
    formDescripcion.value = nueva.descripcion
    formAutor.value = nueva.autor
  }
}, { immediate: true })

// Actualiza los valores del formulario hacia la noticia
const updateNoticiaFromForm = () => {
  if (noticiaSeleccionada.value) {
    noticiaSeleccionada.value.titulo = formTitulo.value
    noticiaSeleccionada.value.descripcion = formDescripcion.value
    noticiaSeleccionada.value.autor = formAutor.value
  }
}
</script>

<template>
  <v-container class="py-12">
    <h1 class="text-h4 font-weight-bold mb-6 text-center">
      📰 Noticias Tecnológicas sobre Realidad Virtual
    </h1>

    <v-row>
      <!-- Tarjeta de noticia -->
      <v-col cols="12">
        <NoticiaCard
          :titulo="noticiaSeleccionada.titulo"
          :descripcion="noticiaSeleccionada.descripcion"
          :autor="noticiaSeleccionada.autor"
          :contador="contadorLecturas"
        />
      </v-col>

      <!-- Contador -->
      <v-col cols="6">
        <NoticiasCount v-model="contadorLecturas" />
      </v-col>

      <!-- Formulario -->
      <v-col cols="6">
        <NoticiasForm
          v-model:titulo="formTitulo"
          v-model:descripcion="formDescripcion"
          v-model:autor="formAutor"
          @update:titulo="updateNoticiaFromForm"
          @update:descripcion="updateNoticiaFromForm"
          @update:autor="updateNoticiaFromForm"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="rail"
    permanent
    @click="rail = false"
  >
    <!-- Header del Sidebar -->
    <v-list-item
      prepend-avatar="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
      title="Metaverso OVA"
      nav
    >
      <template v-slot:append>
        <v-btn
          variant="text"
          icon="mdi-chevron-left"
          @click.stop="rail = !rail"
        ></v-btn>
      </template>
    </v-list-item>

    <v-divider></v-divider>

    <!-- Menú de navegación -->
    <v-list density="compact" nav>
      <v-list-item
        v-for="item in menuItems"
        :key="item.value"
        :prepend-icon="item.icon"
        :title="item.title"
        :value="item.value"
        :to="item.route"
        rounded="xl"
        color="primary"
      >
      </v-list-item>
    </v-list>

    <!-- Sección inferior del menú -->
    <template v-slot:append>
      <v-divider></v-divider>
      <v-list density="compact" nav>
        <v-list-item
          prepend-icon="mdi-help-circle"
          title="Ayuda"
          value="ayuda"
          rounded="xl"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-cog"
          title="Configuración"
          value="config"
          rounded="xl"
        ></v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue'

const drawer = ref(true)
const rail = ref(false)

const menuItems = [
  {
    title: 'Inicio',
    icon: 'mdi-home',
    value: 'inicio',
    route: '/principal'
  },
  {
    title: 'Conceptos',
    icon: 'mdi-book-open-variant',
    value: 'conceptos',
    route: '/conceptos'
  },
  {
    title: 'Actividades',
    icon: 'mdi-puzzle',
    value: 'actividades',
    route: '/actividades'
  },
  {
    title: 'Evaluación',
    icon: 'mdi-clipboard-check',
    value: 'evaluacion',
    route: '/evaluacion'
  }
  
]
</script>

<style scoped>
.v-navigation-drawer {
  background: linear-gradient(180deg, #667eea 0%, #764ba2 100%) !important;
}

.v-list-item {
  margin: 4px 8px;
}

.v-list-item:hover {
  background: rgba(255, 255, 255, 0.1) !important;
}

.v-list-item--active {
  background: rgba(255, 255, 255, 0.2) !important;
}

:deep(.v-list-item__prepend) {
  color: white;
}

:deep(.v-list-item-title) {
  color: white !important;
  font-weight: 500;
}

:deep(.v-btn) {
  color: white;
}

:deep(.v-divider) {
  border-color: rgba(255, 255, 255, 0.2);
}
</style>
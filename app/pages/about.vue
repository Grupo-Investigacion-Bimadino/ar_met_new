<template>
  <v-app>
    <Sidebar />
    <v-main>
      <v-container>
        <!-- Header -->
        <div class="text-center mb-8">
          <v-icon size="80" color="primary" class="mb-4">mdi-information</v-icon>
          <h1 class="text-h3 mb-4">Acerca del Proyecto</h1>
          <p class="text-h6 text-grey-darken-1">
            OVA - Metaverso y Realidad Aumentada
          </p>
        </div>

        <!-- Descripción del Proyecto -->
        <v-card class="mb-6" elevation="3">
          <v-card-title class="bg-primary text-white">
            <v-icon start>mdi-lightbulb</v-icon>
            ¿Qué es este proyecto?
          </v-card-title>
          <v-card-text class="pa-6">
            <p class="text-body-1 mb-4">
              Este Objeto Virtual de Aprendizaje (OVA) está diseñado para enseñar conceptos fundamentales 
              sobre el <strong>Metaverso</strong> y la <strong>Realidad Aumentada</strong> de manera interactiva 
              y didáctica.
            </p>
            <p class="text-body-1">
              A través de actividades prácticas, conceptos teóricos y evaluaciones, los estudiantes podrán 
              comprender y aplicar los conocimientos sobre estas tecnologías emergentes que están transformando 
              la forma en que interactuamos con el mundo digital.
            </p>
          </v-card-text>
        </v-card>

        <!-- Objetivos -->
        <v-card class="mb-6" elevation="3">
          <v-card-title class="bg-success text-white">
            <v-icon start>mdi-target</v-icon>
            Objetivos de Aprendizaje
          </v-card-title>
          <v-card-text class="pa-6">
            <v-list>
              <v-list-item
                v-for="(objetivo, index) in objetivos"
                :key="index"
                :prepend-icon="objetivo.icon"
              >
                <v-list-item-title class="text-body-1">
                  {{ objetivo.texto }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>

        <!-- Tecnologías Utilizadas -->
        <v-card class="mb-6" elevation="3">
          <v-card-title class="bg-info text-white">
            <v-icon start>mdi-code-tags</v-icon>
            Tecnologías Utilizadas
          </v-card-title>
          <v-card-text class="pa-6">
            <v-row>
              <v-col
                v-for="tech in tecnologias"
                :key="tech.nombre"
                cols="12"
                sm="6"
                md="4"
              >
                <v-card color="grey-lighten-4" elevation="0">
                  <v-card-text class="text-center">
                    <v-icon :color="tech.color" size="48" class="mb-2">
                      {{ tech.icon }}
                    </v-icon>
                    <div class="text-h6">{{ tech.nombre }}</div>
                    <div class="text-caption text-grey">{{ tech.descripcion }}</div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <!-- Equipo de Desarrollo -->
        <v-card class="mb-6" elevation="3">
          <v-card-title class="bg-purple-darken-2 text-white">
            <v-icon start>mdi-account-group</v-icon>
            Equipo de Desarrollo
          </v-card-title>
          <v-card-text class="pa-6">
            <v-row>
              <v-col
                v-for="miembro in equipo"
                :key="miembro.nombre"
                cols="12"
                sm="6"
                md="3"
              >
                <v-card class="text-center" elevation="2">
                  <v-avatar
                    size="100"
                    class="mt-4"
                    :color="miembro.color"
                  >
                    <v-icon size="50" color="white">{{ miembro.icon }}</v-icon>
                  </v-avatar>
                  <v-card-title class="text-h6">{{ miembro.nombre }}</v-card-title>
                  <v-card-subtitle>{{ miembro.rol }}</v-card-subtitle>
                  <v-card-text>
                    <v-chip size="small" color="primary">
                      {{ miembro.especialidad }}
                    </v-chip>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <!-- Información Adicional -->
        <v-card elevation="3">
          <v-card-title class="bg-orange text-white">
            <v-icon start>mdi-information-outline</v-icon>
            Información del Proyecto
          </v-card-title>
          <v-card-text class="pa-6">
            <v-row>
              <v-col cols="12" md="6">
                <div class="mb-3">
                  <v-icon color="primary" start>mdi-calendar</v-icon>
                  <strong>Fecha de creación:</strong> AGOSTO 2025
                </div>
                <div class="mb-3">
                  <v-icon color="success" start>mdi-school</v-icon>
                  <strong>Institución:</strong> UNIVERSIDAD DE CÓRDOBA
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <div class="mb-3">
                  <v-icon color="info" start>mdi-book-open-variant</v-icon>
                  <strong>Curso:</strong> TECNICAS AVANZADAS DE PROGRAMACION
                </div>
                
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
const objetivos = [
  {
    icon: 'mdi-check-circle',
    texto: 'Comprender los conceptos básicos del Metaverso y la Realidad Aumentada'
  },
  {
    icon: 'mdi-check-circle',
    texto: 'Explorar aplicaciones prácticas de estas tecnologías en diferentes contextos'
  },
  {
    icon: 'mdi-check-circle',
    texto: 'Desarrollar habilidades para crear experiencias inmersivas básicas'
  },
  {
    icon: 'mdi-check-circle',
    texto: 'Evaluar el impacto de estas tecnologías en la educación y la sociedad'
  }
]

const tecnologias = [
  {
    nombre: 'Nuxt 3',
    descripcion: 'Framework Vue.js',
    icon: 'mdi-nuxt',
    color: 'green'
  },
  {
    nombre: 'Vuetify',
    descripcion: 'UI Components',
    icon: 'mdi-vuetify',
    color: 'blue'
  },
  
  {
    nombre: 'Pinia',
    descripcion: 'State Management',
    icon: 'mdi-store',
    color: 'yellow-darken-2'
  },
  {
    nombre: 'GitHub',
    descripcion: 'Control de versiones',
    icon: 'mdi-github',
    color: 'grey-darken-4'
  },
  {
    nombre: 'Visual Studio Code',
    descripcion: 'Editor de código',
    icon: 'mdi-microsoft-visual-studio-code',
    color: 'blue'
  }
]

const equipo = [
  {
    nombre: 'Alejandra Agamez',
    rol: 'Desarrollador',
    especialidad: 'Diseño',
    icon: 'mdi-account',
    color: 'blue'
  },
  {
    nombre: 'Vanessa Gulfo',
    rol: 'Desarrollador',
    especialidad: 'Diseño',
    icon: 'mdi-account',
    color: 'green'
  },
  {
    nombre: 'Jaider Carrascal',
    rol: 'Desarrollador',
    especialidad: 'Diseño',
    icon: 'mdi-account',
    color: 'purple'
  },
  {
    nombre: 'Luis Noriega',
    rol: 'Desarrollador',
    especialidad: 'Diseño',
    icon: 'mdi-account',
    color: 'orange'
  }
]
</script>
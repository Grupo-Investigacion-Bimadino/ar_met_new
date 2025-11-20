// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    // Configuración de tema personalizado para el OVA
    theme: {
      defaultTheme: 'metaversoTheme',
      themes: {
        metaversoTheme: {
          dark: false,
          colors: {
            primary: '#667eea',      // Morado principal
            secondary: '#764ba2',    // Morado oscuro
            accent: '#f093fb',       // Rosa/morado claro
            error: '#FF5252',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FFC107',
            background: '#FFFFFF',
            surface: '#FFFFFF',
          }
        },
        // Tema oscuro (opcional)
        darkTheme: {
          dark: true,
          colors: {
            primary: '#667eea',
            secondary: '#764ba2',
            accent: '#f093fb',
            error: '#FF5252',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FFC107',
            background: '#121212',
            surface: '#1E1E1E',
          }
        }
      }
    },
    
    // Valores por defecto de componentes
    defaults: {
      VBtn: {
        elevation: 2,
        rounded: 'lg',
      },
      VCard: {
        elevation: 3,
        rounded: 'lg',
      },
      VTextField: {
        variant: 'outlined',
        density: 'comfortable',
      },
    }
  })
  
  app.vueApp.use(vuetify)
})

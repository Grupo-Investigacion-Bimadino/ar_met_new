// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxt/icon', '@nuxt/image', '@nuxt/scripts', '@nuxt/eslint', '@nuxt/content', (_options, nuxt) => {
    nuxt.hooks.hook('vite:extendConfig', (config) => {
      // @ts-expect-error
      config.plugins.push(vuetify({ autoImport: true }))
    })
  }, '@pinia/nuxt'],

  build: {
    transpile: ['vuetify'],
  },

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },

  // Configuración de la app
  app: {
    head: {
      title: 'OVA - Metaverso y Realidad Aumentada',
      htmlAttrs: {
        lang: 'es'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 
          name: 'description', 
          content: 'Objeto Virtual de Aprendizaje sobre Metaverso y Realidad Aumentada' 
        },
      ],
      link: [
        { 
          rel: 'stylesheet', 
          href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap' 
        }
      ]
    },
    
    // Transiciones entre páginas
    pageTransition: { 
      name: 'page', 
      mode: 'out-in' 
    }
  },

  // CSS global
  css: [
    '@mdi/font/css/materialdesignicons.css',
  ],
})
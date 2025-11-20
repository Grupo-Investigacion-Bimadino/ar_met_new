import { defineStore } from 'pinia'

interface Noticia {
  id: number
  titulo: string
  descripcion: string
  categoria: string
  autor: string
  fecha: string
  imagen: string
}

export const useStoreNoticias = defineStore('noticias', {
  state: () => ({
    noticias: [] as Noticia[],  
    noticia: null as Noticia | null, 
  }),

  actions: {
    async fetchNoticias() {
      try {
        const response = await fetch('/api/noticias')
        this.noticias = response
        if (this.noticias.length > 0) {
          this.setCurrentNoticia(this.noticias[0])
        }
      } catch (error) {
        console.error('Error al obtener las noticias:', error)
      }
    }
  },

  /*persist: {
    storage: process.client ? localStorage : undefined 
  }*/
})

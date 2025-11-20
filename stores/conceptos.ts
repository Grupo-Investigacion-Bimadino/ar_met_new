import { defineStore } from 'pinia'

interface Concepto {
  id: number
  nombre: string
  descripcion: string
  categoria: string
}

export const useStoreConceptos = defineStore('conceptos', {
  state: () => ({
    conceptos: [] as Concepto[],     
    concepto: null as Concepto | null 
  }),

  actions: {
    async fetchConceptos() {
      try {
        const response = await fetch('/api/conceptos')
        const data: Concepto[] = await response.json()
        console.log(data)
        
        this.conceptos = data
        
        if (this.conceptos.length > 0) {
          this.setCurrentConcepto(this.conceptos[0] as Concepto)
        }
        console.log('Datos cargados:', this.conceptos)
      } catch (error) {
        console.error('Error al obtener los conceptos:', error)
      }
    },

    setCurrentConcepto(concepto: Concepto) {
      this.concepto = concepto
    }
  }
})


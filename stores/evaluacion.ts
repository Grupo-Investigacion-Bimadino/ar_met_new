import { defineStore } from 'pinia'

interface Evaluacion {
  id: number
  titulo: string
  tipo: string
  preguntas: number
  dificultad: string
}

export const useStoreEvaluaciones = defineStore('evaluaciones', {
  state: () => ({
    evaluaciones: [] as Evaluacion[],     
    evaluacion: null as Evaluacion | null 
  }),

  actions: {
    async fetchEvaluaciones() {
      try {
        const response = await fetch('/api/evaluaciones')
        const data: Evaluacion[] = await response.json()
        console.log(data)
        
        this.evaluaciones = data
        
        if (this.evaluaciones.length > 0) {
          this.setCurrentEvaluacion(this.evaluaciones[0] as Evaluacion)
        }
        console.log('Datos cargados:', this.evaluaciones)
      } catch (error) {
        console.error('Error al obtener las evaluaciones:', error)
      }
    },

    setCurrentEvaluacion(evaluacion: Evaluacion) {
      this.evaluacion = evaluacion
    }
  }
})

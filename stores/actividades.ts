import { defineStore } from 'pinia'

interface Actividad {
  id: number
  titulo: string
  descripcion: string
  duracion: string
  nivel: string
  tipo: string
}

export const useStoreActividades = defineStore('actividades', {
  state: () => ({
    actividades: [] as Actividad[],     
    actividad: null as Actividad | null 
  }),

  actions: {
    async fetchActividades() {
      try {
        const response = await fetch('/api/actividades')
        const data: Actividad[] = await response.json()
        console.log(data)
        
        this.actividades = data
        
        if (this.actividades.length > 0) {
          this.setCurrentActividad(this.actividades[0] as Actividad)
        }
        console.log('Datos cargados:', this.actividades)
      } catch (error) {
        console.error('Error al obtener las actividades:', error)
      }
    },

    setCurrentActividad(actividad: Actividad) {
      this.actividad = actividad
    }
  }
})
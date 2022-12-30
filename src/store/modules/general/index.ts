import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import type { GeneralWebSite } from '~/types/generalWebSite.type'

export const useGeneralStore = defineStore('generalStore', {
  state: () => ({
    generalWebSite: useStorage<Array<GeneralWebSite>>('generalWebSite', [])
  }),
  getters: {},
  actions: {
    addGeneralWebSite(website: GeneralWebSite) {
      this.generalWebSite.push(website)
    }
  }
})

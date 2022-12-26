import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useDefaultStore = defineStore('defaultStore', {
  state: () => ({
    searchEngine: useStorage<string>('defaultSearchEngines', 'Google')
  }),
  getters: {},
  actions: {
    updateDefaultSearchEngine(searchEngine: string) {
      this.searchEngine = searchEngine
    }
  }
})

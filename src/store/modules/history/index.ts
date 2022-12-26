import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import type { HistorySearch } from 'types/historySearch.type'

export const useHistoryStore = defineStore('historyStore', {
  state: () => ({
    searchHistory: useStorage<Array<HistorySearch>>('historySearch', [])
  }),
  getters: {},
  actions: {
    unShiftHistorySearch(keyword: string) {
      const isExist = this.searchHistory.findIndex((item) => item.keyword === keyword)

      if (isExist === -1) {
        this.searchHistory.unshift({
          keyword,
          count: 1
        })
      } else {
        this.searchHistory[isExist].count += 1
        this.searchHistory.unshift(this.searchHistory.splice(isExist, 1)[0])
      }
    },
    clearHistorySearch() {
      this.searchHistory = []
    }
  }
})

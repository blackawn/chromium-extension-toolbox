import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

export const generic = defineStore('genericStore', {
  state: () => ({
    searchEngine: useStorage<string>('defaultSearchEnginesStore', 'Google'),
    searchEnginePreflight: useStorage<boolean>('defaultSearchEnginePreflightStore', false)
  }),
  getters: {},
  actions: {
    reviseDefaultSearchEngine(searchEngine: string) {
      this.searchEngine = searchEngine;
    },
    reviseSearchEnginePreflight(status: boolean) {
      this.searchEnginePreflight = status;
    }
  }
});

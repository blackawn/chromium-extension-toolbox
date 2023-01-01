import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import type { GeneralWebSite } from '~/types/general-website.type';

export const useGeneralStore = defineStore('generalStore', {
  state: () => ({
    generalWebSite: useStorage<Array<GeneralWebSite>>('generalWebSite', [])
  }),
  getters: {
    findGeneralWebSite: (state) => (url: string) => {
      return state.generalWebSite.find((item) => item.url === url);
    }
  },
  actions: {
    addToGeneralWebSite(website: GeneralWebSite) {
      this.generalWebSite.push(website);
    },
    removeFromGeneralWebSite(url: string) {
      this.generalWebSite = this.generalWebSite.filter((item) => item.url !== url);
    }
  }
});

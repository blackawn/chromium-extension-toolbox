import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import type { GeneralWebSite, GeneralWebSiteSort } from '~/types/general-website.type';
import utils from '~/utils/utils';

export const useGeneralStore = defineStore('generalStore', {
  state: () => ({
    generalWebSite: useStorage<Array<GeneralWebSite>>('generalWebSite', []),
    sort: useStorage<GeneralWebSiteSort>('generalWebSiteSort', 'desc')
  }),
  getters: {
    findGeneralWebSite: (state) => (url: string) => {
      return state.generalWebSite.find((item) => item.url === url);
    }
  },
  actions: {

    addToGeneralWebSite(website: GeneralWebSite, index?: number) {
      if (utils.isObject(website)) {
        this.generalWebSite.push(website);
      }

      if (index && index >= 0) {
        this.generalWebSite[index].count += 1;
      }

      this.sortGeneralWebSiteByCount(this.sort);
    },
    sortGeneralWebSiteByCount(order: GeneralWebSiteSort) {
      this.generalWebSite.sort((a, b) => {
        if (a.count === b.count) {
          if (a.time === b.time) {
            return a.title?.localeCompare(b.title || '') || 0;
          }
          return a.time - b.time;
        }
        return (
          order === 'desc' ? b.count - a.count : a.count - b.count
        );
      });

      this.sort = order;
    },
    removeFromGeneralWebSite(url: string) {
      this.generalWebSite = this.generalWebSite.filter((item) => item.url !== url);
    },
    deleteGeneralWebSite(index: number) {
      this.generalWebSite.splice(index, 1);
    },
    emptyGeneralWebSite() {
      this.generalWebSite.length = 0;
    }
  }
});

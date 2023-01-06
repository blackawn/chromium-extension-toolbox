import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import type { fastWebSite, fastWebSiteSort } from '~/types/fast-website.type';
import utils from '~/utils/utils';

export const fast = defineStore('fastStore', {
  state: () => ({
    webSite: useStorage<Array<fastWebSite>>('fastWebSiteStore', []),
    webSiteSort: useStorage<fastWebSiteSort>('fastWebSiteSortStore', 'desc')
  }),
  getters: {
    findFastWebSite: (state) => (url: string) => {
      return state.webSite.find((item) => item.url === url);
    }
  },
  actions: {

    addToFastWebSite(website: fastWebSite, index?: number) {
      if (utils.isObject(website)) {
        this.webSite.push(website);
      }

      if (index && index >= 0) {
        this.webSite[index].count += 1;
      }

      this.sortFastWebSiteByCount(this.webSiteSort);
    },
    sortFastWebSiteByCount(order: fastWebSiteSort) {
      this.webSite.sort((a, b) => {
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

      this.webSiteSort = order;
    },
    removeFromFastWebSite(url: string) {
      this.webSite = this.webSite.filter((item) => item.url !== url);
    },
    deleteFastWebSite(index: number) {
      this.webSite.splice(index, 1);
    },
    emptyFastWebSite() {
      this.webSite.length = 0;
    }
  }
});

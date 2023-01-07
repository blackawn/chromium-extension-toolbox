import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import type { FastWebsite, FastWebsiteSort } from '~/types/fast-website.type';
import utils from '~/utils/utils';

export const fast = defineStore('fastStore', {
  state: () => ({
    webSite: useStorage<Array<FastWebsite>>('fastWebSiteStore', []),
    webSiteSort: useStorage<FastWebsiteSort>('fastWebSiteSortStore', 'desc')
  }),
  getters: {
    findFastWebsite: (state) => (url: string) => {
      return state.webSite.find((item) => item.url === url);
    }
  },
  actions: {

    addToFastWebsite(website: FastWebsite | null, index?: number) {
      if (utils.isObject(website)) {
        this.webSite.push(website);
      }

      if (index && index >= 0) {
        this.webSite[index].count += 1;
      }

      this.sortFastWebsiteByCount(this.webSiteSort);
    },
    sortFastWebsiteByCount(order: FastWebsiteSort) {
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
    removeFromFastWebsite(url: string) {
      this.webSite = this.webSite.filter((item) => item.url !== url);
    },
    deleteFastWebsite(index: number) {
      this.webSite.splice(index, 1);
    },
    emptyFastWebsite() {
      this.webSite.length = 0;
    }
  }
});

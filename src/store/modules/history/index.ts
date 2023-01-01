import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import type { SearchHistory, SearchHistorySort } from '~/types/search-history.type';
import utils from '~/utils/utils';

export const useHistoryStore = defineStore('historyStore', {
  state: () => ({
    searchHistory: useStorage<Array<SearchHistory>>('historySearch', []),
    sort: useStorage<SearchHistorySort>('historySearchSort', 'time')
  }),
  getters: {},
  actions: {
    unShiftHistorySearch(keyword: string) {
      const isExist = this.searchHistory.findIndex((item) => item.keyword === keyword);

      if (isExist === -1) {
        this.searchHistory.unshift({
          keyword,
          count: 1,
          time: Date.now()
        });
      } else {
        this.searchHistory[isExist].count += 1;
        this.searchHistory[isExist].time = Date.now();
        this.searchHistory.unshift(this.searchHistory.splice(isExist, 1)[0]);
      }
      if (this.sort === 'time') {
        this.orderHistorySearchByTime();
      } else {
        this.orderHistorySearchByCount();
      }
    },
    deleteHistorySearch(index: number) {
      this.searchHistory.splice(index, 1);
    },
    orderHistorySearchByTime() {

      this.searchHistory.sort((a, b) => {
        if (a.time === b.time) {
          if (a.count === b.count) {
            return a.keyword > b.keyword ? 1 : -1;
          }
          return b.count - a.count;
        }
        return b.time - a.time;
      });
      this.sort = 'time';
    },
    orderHistorySearchByCount() {

      this.searchHistory.sort((a, b) => {
        if (a.count === b.count) {
          if (a.time === b.time) {
            return a.keyword.localeCompare(b.keyword);
          }
          return a.time - b.time;
        }
        return b.count - a.count;
      });

      this.sort = 'count';
    },
    emptyHistorySearch() {
      this.searchHistory.length = 0;
    }
  }
});

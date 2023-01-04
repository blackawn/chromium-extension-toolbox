import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import type { SearchHistory, SearchHistorySort } from '~/types/search-history.type';

export const useHistoryStore = defineStore('historyStore', {
  state: () => ({
    searchHistory: useStorage<Array<SearchHistory>>('historySearch', []),
    sort: useStorage<SearchHistorySort>('historySearchSort', 'asc')
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
      this.sortHistorySearchByCount(this.sort);
    },
    deleteHistorySearch(index: number) {
      this.searchHistory.splice(index, 1);
    },
    sortHistorySearchByCount(order: SearchHistorySort) {
      this.searchHistory.sort((a, b) => {
        if (a.count === b.count) {
          if (a.time === b.time) {
            return a.keyword.localeCompare(b.keyword);
          }
          return b.time - a.time;
        }
        return (
          order === 'desc' ? b.count - a.count : a.count - b.count
        );
      });
      this.sort = order;
    },
    emptyHistorySearch() {
      this.searchHistory.length = 0;
    }
  }
});

import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import type { SearchHistory, SearchHistorySort } from '~/types/search-history.type';

export const history = defineStore('historyStore', {
  state: () => ({
    search: useStorage<Array<SearchHistory>>('historySearchStore', []),
    searchSort: useStorage<SearchHistorySort>('historySearchSortStore', 'asc')
  }),
  getters: {},
  actions: {
    unShiftHistorySearch(keyword: string) {
      const isExist = this.search.findIndex((item) => item.keyword === keyword);

      if (isExist === -1) {
        this.search.unshift({
          keyword,
          count: 1,
          time: Date.now()
        });
      } else {
        this.search[isExist].count += 1;
        this.search[isExist].time = Date.now();
        this.search.unshift(this.search.splice(isExist, 1)[0]);
      }
      this.sortHistorySearchByCount(this.searchSort);
    },
    deleteHistorySearch(index: number) {
      this.search.splice(index, 1);
    },
    sortHistorySearchByCount(order: SearchHistorySort) {
      this.search.sort((a, b) => {
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
      this.searchSort = order;
    },
    emptyHistorySearch() {
      this.search.length = 0;
    }
  }
});

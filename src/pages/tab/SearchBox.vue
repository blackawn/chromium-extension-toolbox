<script setup lang="ts">
import { ref, watchEffect } from 'vue';

import type { SearchEngine } from '~/types/search-engine.type';

import { useHistoryStore } from '~/store/modules/history';
import { useDefaultStore } from '~/store/modules/default';
import { XMLHttpRequestComputerDelay } from '~/utils/network';

import iconGoogle from '~/assets/images/search-engine-google.svg';
import iconBaidu from '~/assets/images/search-engine-baidu.svg';
import iconCnBing from '~/assets/images/search-engine-cn-bing.svg';
import iconBing from '~/assets/images/search-engine-bing.svg';
import iconSogou from '~/assets/images/search-engine-sogou.svg';

const defaultSearchEngine = ref<string>('');

const defaultSearchEngines = ref<Array<SearchEngine>>([
  {
    name: 'Google',
    icon: iconGoogle,
    networkProtocol: 'https',
    domain: 'www.google.com',
    mapping: 'search',
    params: [
      {
        key: 'q'
      }
    ]
  },
  {
    name: 'Baidu',
    icon: iconBaidu,
    networkProtocol: 'https',
    domain: 'www.baidu.com',
    mapping: 's',
    params: [
      {
        key: 'wd'
      }
    ]
  },
  {
    name: 'CnBing',
    icon: iconCnBing,
    networkProtocol: 'https',
    domain: 'cn.bing.com',
    mapping: 'search',
    params: [
      {
        key: 'q'
      }
    ]
  },
  {
    name: 'Bing',
    icon: iconBing,
    networkProtocol: 'https',
    domain: 'www.bing.com',
    mapping: 'search',
    params: [
      {
        key: 'q'
      }
    ]
  },
  {
    name: 'Sogou',
    icon: iconSogou,
    networkProtocol: 'https',
    domain: 'www.sogou.com',
    mapping: 'web',
    params: [
      {
        key: 'query'
      }
    ]
  }
]);

const refSearchInput = ref<HTMLInputElement | null>(null);

const searchKeyWork = ref<string>('');

const searchBoxPlaceholder = ref<string>('');

const isKeydownGroupKey = ref<boolean>(false);

const historySearchStore = useHistoryStore();

const defaultStore = useDefaultStore();

let xhr: null | XMLHttpRequest = null;


/**
 * @description: Get search engine nework delay
 */
function getSearchEngineNetworkDelay() {

  const currentSearchEngine = defaultSearchEngines.value.find(
    (item) => item.name === defaultStore.searchEngine
  );


  const networkProtocol = currentSearchEngine?.networkProtocol;
  const domain = currentSearchEngine?.domain;

  // is xhr request, is abort
  xhr?.abort();
  // new xhr request
  xhr = new XMLHttpRequest();

  XMLHttpRequestComputerDelay(`${networkProtocol}://${domain}`, xhr)
    .then((delay) => {
      searchBoxPlaceholder.value = delay + 'ms';
    })
    .catch((error) => {
      searchBoxPlaceholder.value = error;
    });
}


/**
 * @description: SearchBar keydown event
 * @param event
 */
function onSearchBoxKeydown(event: KeyboardEvent) {

  if (isKeydownGroupKey.value) return;

  // toggle search engine
  if ((event.ctrlKey && event.altKey)) {
    isKeydownGroupKey.value = true;

    const currentSearchEngine = defaultSearchEngines.value.find(
      (item) => item.name === defaultStore.searchEngine
    );

    defaultStore.updateDefaultSearchEngine((
      currentSearchEngine
        ? defaultSearchEngines.value[
          (defaultSearchEngines.value.indexOf(currentSearchEngine) + 1) %
            defaultSearchEngines.value.length
        ].name
        : defaultSearchEngines.value[0].name
    ));

  }

  // to search page
  if ((event.ctrlKey && event.key === 'Enter')) {
    onToSearchUrl(true); // in new tab
  } else if (event.key === 'Enter') {
    onToSearchUrl(false); // in current tab
  }
}

/**
 * @description: SearchBar keyup event
 * @param event
 */
function onSearchBarKeyup(event: KeyboardEvent) {
  if ((event.ctrlKey || event.altKey)) {
    isKeydownGroupKey.value = false;
  }
}


/**
 * @description: To search engine
 * @param newTab
 * @param historyKeyWork
 */
function onToSearchUrl(newTab?: boolean, historyKeyWork?: string) {

  if (historyKeyWork?.trim()) {
    searchKeyWork.value = historyKeyWork;
  }

  if (!searchKeyWork.value.trim() && !refSearchInput.value?.value.trim()) {
    return;
  }

  // get current search engine
  const currentSearchEngine = defaultSearchEngines.value.find(
    (item) => item.name === defaultStore.searchEngine
  );

  const networkProtocol = currentSearchEngine?.networkProtocol;
  const domain = currentSearchEngine?.domain;
  const mapping = currentSearchEngine?.mapping;
  const params = currentSearchEngine?.params?.map((item) => {
    return {
      key: item.key,
      value: searchKeyWork.value || refSearchInput.value?.value
    };
  });

  const finalUrl = `${networkProtocol}://${domain}/${mapping}?${params?.map((item) => `${item.key}=${item.value}`).join('&')}`;

  if (newTab) {
    window.open(finalUrl, '_blank');
  } else {
    window.location.href = finalUrl;
  }

  historySearchStore.unShiftHistorySearch(searchKeyWork.value || refSearchInput.value?.value || '');
}

watchEffect(() => {
  if (defaultStore.searchEngine && (!searchKeyWork.value.trim() || !refSearchInput.value?.value.trim())) {
    getSearchEngineNetworkDelay();
  }
});


defineExpose({ onToSearchUrl });
</script>

<template>
  <div class="relative flex items-center h-12 px-2.5 dark:bg-neutral-800 rounded-full">
    <div
      tabindex="0"
      class="group w-10 select-none cursor-pointer"
    >
      <transition-group
        tag="div"
        :duration="300"
        enter-active-class="absolute duration-300"
        leave-active-class="absolute duration-300"
        enter-from-class="opacity-0 translate-y-full"
        leave-to-class="opacity-0 -translate-y-full"
        class="flex items-center relative"
      >
        <div
          v-for="item in defaultSearchEngines"
          v-show="item.name === defaultStore.searchEngine"
          :key="item.name"
          class="w-10 h-10 p-2 rounded-full dark:hover:bg-neutral-700"
        >
          <img
            :src="item.icon"
            class="w-full h-full object-center object-contain"
            alt=""
          >
        </div>
      </transition-group>
      <div
        class="absolute top-12 flex mt-0.5 p-2 opacity-0 -z-30
        group-focus:opacity-100 group-focus:z-50 duration-300 dark:bg-neutral-800 rounded space-x-3"
      >
        <div
          v-for="({name,icon}) in defaultSearchEngines"
          :key="name"
          class="w-8 h-8 p-1.5 rounded-full dark:hover:bg-neutral-700"
          @click="(defaultSearchEngine = name);(defaultStore.updateDefaultSearchEngine(name))"
        >
          <img
            :src="icon"
            class="w-full h-full object-center object-contain"
            alt=""
          >
        </div>
      </div>
    </div>
    <input
      ref="refSearchInput"
      v-model="searchKeyWork"
      type="text"
      autofocus
      class="flex-1 h-full px-1 py-2.5 text-base dark:caret-neutral-400 dark:placeholder-neutral-700"
      :class="{'dark:placeholder-rose-800': ['Error','Timeout'].includes(searchBoxPlaceholder)}"
      :placeholder="searchBoxPlaceholder"
      @keydown="onSearchBoxKeydown"
      @keyup="onSearchBarKeyup"
    >
    <div class="flex items-center dark:text-neutral-400 space-x-2">
      <button
        type="button"
        class="p-1 text-lg rounded-full scale-0 duration-300 dark:hover:bg-neutral-700"
        :class="{'scale-100':searchKeyWork.trim()}"
        @click="(searchKeyWork = '')"
      >
        <span class="sr-only">clean</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 256 256"
        >
          <path
            fill="currentColor"
            d="M205.7 194.3a8.1 8.1 0 0 1 0 11.4a8.2 8.2 0 0 1-11.4 0L128 139.3l-66.3 66.4a8.2 8.2 0 0 1-11.4
            0a8.1 8.1 0 0 1 0-11.4l66.4-66.3l-66.4-66.3a8.1 8.1 0 0 1 11.4-11.4l66.3 66.4l66.3-66.4a8.1 8.1 0 0 1 11.4 11.4L139.3 128Z"
          />
        </svg>
      </button>
      <button
        type="button"
        class="p-1.5 text-2xl rounded-full dark:hover:bg-neutral-700"
        @click="onToSearchUrl(false)"
      >
        <span class="sr-only">search</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 32 32"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m28 27l-7.5-7.5M5 13a9 9 0 1 0 18 0a9 9 0 0 0-18 0Z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>

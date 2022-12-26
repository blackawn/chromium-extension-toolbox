<script setup lang="ts">
import { ref } from 'vue'
import {
  useChromeTabsQuery,
  useChromeTabsCreate,
  useChromeTabsUpdate
} from '~/uilts/chrome'

import type { SearchEngine } from 'types/searchEngine.type'

import { useHistoryStore } from '~/store/modules/history'
import { useDefaultStore } from '~/store/modules/default'

import iconGoogle from '~/assets/images/search-engine-google.svg'
import iconBaidu from '~/assets/images/search-engine-baidu.svg'
import iconCnBing from '~/assets/images/search-engine-cn-bing.svg'
import iconBing from '~/assets/images/search-engine-bing.svg'
import iconSogou from '~/assets/images/search-engine-sogou.svg'


const defaultSearchEngine = ref<string>('')

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
])

const refSearchInput = ref<HTMLInputElement | null>(null)

const searchKeyWork = ref<string>('')

const isKeydownGroupKey = ref<boolean>(false)

const historySearchStore = useHistoryStore()

const defaultStore = useDefaultStore()

/**
 * @description: SearchBar keydown event
 * @param event
 */
function onSearchBarKeydown(event: KeyboardEvent) {

  if (isKeydownGroupKey.value) return

  // toggle search engine
  if ((event.ctrlKey && event.altKey)) {
    isKeydownGroupKey.value = true

    const currentSearchEngine = defaultSearchEngines.value.find(
      (item) => item.name === defaultStore.searchEngine
    )

    defaultStore.updateDefaultSearchEngine((
      currentSearchEngine
        ? defaultSearchEngines.value[
          (defaultSearchEngines.value.indexOf(currentSearchEngine) + 1) %
            defaultSearchEngines.value.length
        ].name
        : defaultSearchEngines.value[0].name
    ))

  }

  // to search page
  if ((event.ctrlKey && event.key === 'Enter')) {
    onToSearchUrl(true) // in new tab
  } else if (event.key === 'Enter') {
    onToSearchUrl(false) // in current tab
  }
}

/**
 * @description: SearchBar keyup event
 * @param event
 */
function onSearchBarKeyup(event: KeyboardEvent) {
  if ((event.ctrlKey || event.altKey)) isKeydownGroupKey.value = false
}


/**
 * @description: to search engine
 * @param isCreate
 * @param historyKeyWork
 */
function onToSearchUrl(isCreate?: boolean, historyKeyWork?: string) {

  if (historyKeyWork?.trim()) {
    searchKeyWork.value = historyKeyWork
  }

  if (!searchKeyWork.value.trim() && !refSearchInput.value?.value.trim()) {
    return
  }

  // get current search engine
  const currentSearchEngine = defaultSearchEngines.value.find(
    (item) => item.name === defaultStore.searchEngine
  )

  const networkProtocol = currentSearchEngine?.networkProtocol
  const domain = currentSearchEngine?.domain
  const mapping = currentSearchEngine?.mapping
  const params = currentSearchEngine?.params?.map((item) => {
    return {
      key: item.key,
      value: searchKeyWork.value || refSearchInput.value?.value
    }
  })

  const finalUrl = `${networkProtocol}://${domain}/${mapping}?${params?.map((item) => `${item.key}=${item.value}`).join('&')}`

  isCreate ?
    useChromeTabsCreate(finalUrl).then(() =>
      historySearchStore.unShiftHistorySearch(searchKeyWork.value || refSearchInput.value?.value || '')) :
    useChromeTabsQuery().then((tab) => {
      const { id } = { ...tab[0] }
      useChromeTabsUpdate((id as number), finalUrl).then(() =>
        historySearchStore.unShiftHistorySearch(searchKeyWork.value || refSearchInput.value?.value || ''))
    })
}

defineExpose({ onToSearchUrl })

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
        class="absolute top-12 flex mt-0.5 p-2 opacity-0 -z-30 group-focus:opacity-100 group-focus:z-50 duration-300 dark:bg-neutral-800 rounded space-x-3"
      >
        <div
          v-for="item in defaultSearchEngines"
          :key="item.name"
          class="w-8 h-8 p-1.5 rounded-full dark:hover:bg-neutral-700"
          @click="(defaultSearchEngine = item.name);(defaultStore.updateDefaultSearchEngine(item.name))"
        >
          <img
            :src="item.icon"
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
      class="flex-1 h-full px-1 py-2.5 text-base dark:text-neutral-400 dark:caret-neutral-400"
      @keydown="onSearchBarKeydown"
      @keyup="onSearchBarKeyup"
    >
    <div class="flex items-center dark:text-neutral-400 space-x-2">
      <div
        class="p-1 text-lg rounded-full scale-0 duration-300 dark:hover:bg-neutral-700"
        :class="{'scale-100':searchKeyWork.trim()}"
        @click="(searchKeyWork = '')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 256 256"
        >
          <path
            fill="currentColor"
            d="M205.7 194.3a8.1 8.1 0 0 1 0 11.4a8.2 8.2 0 0 1-11.4 0L128 139.3l-66.3 66.4a8.2 8.2 0 0 1-11.4 0a8.1 8.1 0 0 1 0-11.4l66.4-66.3l-66.4-66.3a8.1 8.1 0 0 1 11.4-11.4l66.3 66.4l66.3-66.4a8.1 8.1 0 0 1 11.4 11.4L139.3 128Z"
          />
        </svg>
      </div>
      <div
        class="p-1.5 text-2xl rounded-full dark:hover:bg-neutral-700"
        @click="onToSearchUrl(false)"
      >
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
      </div>
      <div
        class="p-1.5 text-2xl rounded-full dark:hover:bg-neutral-700"
        @click="onToSearchUrl(true)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 20 20"
        >
          <path
            fill="currentColor"
            d="M17 5.5A2.5 2.5 0 0 0 14.5 3h-9A2.5 2.5 0 0 0 3 5.5v3.756c.318-.112.653-.19 1-.229V7h12v7.5a1.5 1.5 0 0 1-1.5 1.5H9.121l1 1H14.5a2.5 2.5 0 0 0 2.5-2.5v-9ZM5.5 4h9A1.5 1.5 0 0 1 16 5.5V6H4v-.5A1.5 1.5 0 0 1 5.5 4Zm1.096 12.303a3.5 3.5 0 1 1 .707-.707l2.55 2.55a.5.5 0 0 1-.707.708l-2.55-2.55ZM7 13.5a2.5 2.5 0 1 0-5 0a2.5 2.5 0 0 0 5 0Z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>

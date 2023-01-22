<script setup lang="ts">
import { ref, reactive, onBeforeMount } from 'vue';
import { history } from '~/store/modules/history';
import { generic } from '~/store/modules/generic';
import { fast } from '~/store/modules/website';
import Switch from '~/components/switch/index.vue';
import { getLocalStorage, setLocalStorage, removeLocalStorage } from '~/utils/local-storage';
import {
  Computer,
  Edit,
  Dark,
  Light,
  Gear,
  Delete,
  Asc,
  Desc
} from '~/components/icon';


const emits = defineEmits([
  'edit:general-website',
  'edit:search-history'
]);


type ThemeMode = '' | 'light' | 'dark';

const genericStore = generic();
const historyStore = history();
const fastStore = fast();

const is = reactive({
  visibleMenu: true,
  editFastWebsite: false,
  editSearchHistory: false
});

const themeMode = ref<ThemeMode>('');


const handleEditFastWebsite = () => {
  is.editFastWebsite = !is.editFastWebsite;
  emits('edit:general-website', is.editFastWebsite);
};

const handleEditSearchHistory = () => {
  is.editSearchHistory = !is.editSearchHistory;
  emits('edit:search-history', is.editSearchHistory);
};


const setThemeMode = async () => {
  themeMode.value = await getLocalStorage('themeMode') as ThemeMode;
  if (await getLocalStorage('themeMode') === 'dark' ||
      (!('themeMode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

const handleSystemToggleThemeMode = async () => {
  await removeLocalStorage('themeMode')
    .then(() => {
      setThemeMode();
    });
};

const handleManualToggleThemeMode = async (mode: string) => {
  await setLocalStorage('themeMode', mode).then(() => {
    setThemeMode();
  });
};

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', async () => {
  await handleSystemToggleThemeMode();
});

onBeforeMount(async () => {
  await setThemeMode();
});

</script>
<template>
  <div class="absolute top-4 right-4">
    <button
      type="button"
      class="p-1.5 rounded-full hover:bg-gray-300 dark:hover:bg-neutral-700 text-2xl"
      @click="(is.visibleMenu = !is.visibleMenu)"
    >
      <span class="sr-only">site</span>
      <Gear />
    </button>
    <div
      v-show="is.visibleMenu"
      class="absolute right-0 z-50 p-3 rounded-md bg-gray-100 dark:bg-neutral-800 space-y-2 select-none"
    >
      <div>
        <h6 class="mb-2.5 text-gray-400 dark:text-neutral-500 text-sm">
          General
        </h6>
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-base whitespace-nowrap">ThemeMode</span>
            <div class="flex items-center ml-6 py-1 px-1.5 space-x-2">
              <button
                type="button"
                class="text-xl hover:text-gray-600 dark:hover:text-neutral-400"
                :class="( !themeMode?'text-gray-600 dark:text-neutral-400':'text-gray-400 dark:text-neutral-600' )"
                @click="handleSystemToggleThemeMode"
              >
                <span class="sr-only">system</span>
                <Computer />
              </button>
              <button
                type="button"
                class="text-xl hover:text-gray-600 dark:hover:text-neutral-400"
                :class="( themeMode === 'light'?'text-gray-600 dark:text-neutral-400':'text-gray-400 dark:text-neutral-600' )"
                @click="handleManualToggleThemeMode('light')"
              >
                <span class="sr-only">light</span>
                <Light />
              </button>
              <button
                type="button"
                class="text-xl hover:text-gray-600 dark:hover:text-neutral-400"
                :class="( themeMode === 'dark'?'text-gray-600 dark:text-neutral-400':'text-gray-400 dark:text-neutral-600' )"
                @click="handleManualToggleThemeMode('dark')"
              >
                <span class="sr-only">dark</span>
                <Dark />
              </button>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-base whitespace-nowrap">Search Delay Preflight</span>
            <div class="flex items-center ml-6 py-1 px-1.5 space-x-2">
              <Switch
                v-model:status="genericStore.searchEnginePreflight"
                class="w-10 h-5"
                @update:switch-status="(status)=>{genericStore.reviseSearchEnginePreflight(status)}"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <h6 class="mb-2.5 text-gray-400 dark:text-neutral-500 text-sm">
          Fast Website
        </h6>
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-base whitespace-nowrap">Edit Fast Website</span>
            <div class="flex items-center ml-6 py-1 px-1.5 space-x-2">
              <button
                type="button"
                class="text-xl text-gray-400 dark:text-neutral-600 hover:text-gray-600 dark:hover:text-neutral-400"
                :class="{ 'text-gray-600 dark:text-neutral-400': is.editFastWebsite }"
                @click="handleEditFastWebsite"
              >
                <span class="sr-only">edit</span>
                <Edit />
              </button>
              <button
                v-long-press="{
                  time: 3000,
                  mousedownCallback: () => {
                    fastStore.emptyFastWebsite()
                  },
                }"
                type="button"
                class="text-xl text-gray-400 dark:text-neutral-600 hover:text-gray-600 dark:hover:text-neutral-400"
              >
                <span class="sr-only">empty</span>
                <Delete />
              </button>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-base whitespace-nowrap">Sort Fast Website</span>
            <div class="flex items-center ml-6 py-1 px-1.5 space-x-2">
              <button
                type="button"
                class="text-xl hover:text-gray-600 dark:hover:text-neutral-400"
                :class="( fastStore.webSiteSort === 'asc'?'text-gray-600 dark:text-neutral-400':'text-gray-400 dark:text-neutral-600' )"
                @click="fastStore.sortFastWebsiteByCount('asc')"
              >
                <span class="sr-only">asc</span>
                <Asc />
              </button>
              <button
                type="button"
                class="text-xl hover:text-gray-600 dark:hover:text-neutral-400"
                :class="( fastStore.webSiteSort === 'desc'?'text-gray-600 dark:text-neutral-400':'text-gray-400 dark:text-neutral-600' )"
                @click="fastStore.sortFastWebsiteByCount('desc')"
              >
                <span class="sr-only">desc</span>
                <Desc />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h6 class="mb-2.5 text-gray-400 dark:text-neutral-500 text-sm">
          Search History
        </h6>
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-base whitespace-nowrap">Edit Search History</span>
            <div class="flex items-center ml-6 py-1 px-1.5 space-x-2">
              <button
                type="button"
                class="text-xl text-gray-400 dark:text-neutral-600 hover:text-gray-600 dark:hover:text-neutral-400"
                :class="{ 'text-gray-600 dark:text-neutral-400': is.editSearchHistory }"
                @click="handleEditSearchHistory"
              >
                <span class="sr-only">edit</span>
                <Edit />
              </button>
              <button
                v-long-press="{
                  time: 3000,
                  mousedownCallback: () => {
                    historyStore.emptyHistorySearch()
                  },
                }"
                type="button"
                class="text-xl text-gray-400 dark:text-neutral-600 hover:text-gray-600 dark:hover:text-neutral-400"
              >
                <span class="sr-only">empty</span>
                <Delete />
              </button>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-base whitespace-nowrap">Sort Search History</span>
            <div class="flex items-center ml-6 py-1 px-1.5 space-x-2">
              <button
                type="button"
                class="text-xl hover:text-gray-600 dark:hover:text-neutral-400"
                :class="( historyStore.searchSort === 'asc'?'text-gray-600 dark:text-neutral-400':'text-gray-400 dark:text-neutral-600' )"
                @click="historyStore.sortHistorySearchByCount('asc')"
              >
                <span class="sr-only">asc</span>
                <Asc />
              </button>
              <button
                type="button"
                class="text-xl hover:text-gray-600 dark:hover:text-neutral-400"
                :class="( historyStore.searchSort === 'desc'?'text-gray-600 dark:text-neutral-400':'text-gray-400 dark:text-neutral-600' )"
                @click="historyStore.sortHistorySearchByCount('desc')"
              >
                <span class="sr-only">desc</span>
                <Desc />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>

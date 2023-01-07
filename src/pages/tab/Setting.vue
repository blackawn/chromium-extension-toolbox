<script setup lang="ts">
import { ref, reactive, onBeforeMount } from 'vue';
import { history } from '~/store/modules/history';
import { generic } from '~/store/modules/generic';
import { fast } from '~/store/modules/website';
import Switch from '~/components/switch/index.vue';
import { getLocalStorage, setLocalStorage, removeLocalStorage } from '~/utils/local-storage';

const emits = defineEmits([
  'emit-edit-general-website',
  'emit-edit-search-history'
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
  emits('emit-edit-general-website', is.editFastWebsite);
};

const handleEditSearchHistory = () => {
  is.editSearchHistory = !is.editSearchHistory;
  emits('emit-edit-search-history', is.editSearchHistory);
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
    <div
      class="p-1.5 rounded-full dark:hover:bg-neutral-700 text-2xl"
      @click="(is.visibleMenu = !is.visibleMenu)"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        fill="currentColor"
        viewBox="0 0 256 256"
      >
        <rect
          width="256"
          height="256"
          fill="none"
        />
        <circle
          cx="128"
          cy="128"
          r="48"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="16"
        />
        <path
          d="M197.4,80.7a73.6,73.6,0,0,1,6.3,10.9L229.6,106a102,102,0,0,1,.1,44l-26,14.4a73.6,73.6,0,0,1-6.3,10.9l.5,29.7a104,104,0,0,1-38.1,22.1l-25.5-15.3a88.3,88.3,0,0,1-12.6,0L96.3,227a102.6,102.6,0,0,1-38.2-22l.5-29.6a80.1,80.1,0,0,1-6.3-11L26.4,150a102,102,0,0,1-.1-44l26-14.4a73.6,73.6,0,0,1,6.3-10.9L58.1,51A104,104,0,0,1,96.2,28.9l25.5,15.3a88.3,88.3,0,0,1,12.6,0L159.7,29a102.6,102.6,0,0,1,38.2,22Z"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="16"
        />
      </svg>
    </div>
    <div
      v-show="is.visibleMenu"
      class="absolute right-0 z-50 p-3 rounded-md dark:bg-neutral-800 space-y-2 select-none"
    >
      <div>
        <h6 class="mb-2.5 dark:text-neutral-500 text-sm">
          General
        </h6>
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-base whitespace-nowrap">ThemeMode</span>
            <div class="flex items-center ml-6 py-1 px-1.5 space-x-2">
              <button
                type="button"
                class="text-xl dark:hover:text-neutral-400"
                :class="( !themeMode?'dark:text-neutral-400':'dark:text-neutral-600' )"
                @click="handleSystemToggleThemeMode"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <rect
                    width="256"
                    height="256"
                    fill="none"
                  />
                  <rect
                    x="32"
                    y="48"
                    width="192"
                    height="144"
                    rx="16"
                    transform="translate(256 240) rotate(180)"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="16"
                  />
                  <line
                    x1="160"
                    y1="224"
                    x2="96"
                    y2="224"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="16"
                  />
                  <line
                    x1="32"
                    y1="152"
                    x2="224"
                    y2="152"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="16"
                  />
                  <line
                    x1="128"
                    y1="192"
                    x2="128"
                    y2="224"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="16"
                  />
                </svg>
              </button>
              <button
                type="button"
                class="text-xl dark:hover:text-neutral-400"
                :class="( themeMode === 'light'?'dark:text-neutral-400':'dark:text-neutral-600' )"
                @click="handleManualToggleThemeMode('light')"
              >
                <span class="sr-only">light</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <rect
                    width="256"
                    height="256"
                    fill="none"
                  />
                  <circle
                    cx="128"
                    cy="128"
                    r="60"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="16"
                  />
                  <line
                    x1="128"
                    y1="36"
                    x2="128"
                    y2="16"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="16"
                  />
                  <line
                    x1="62.9"
                    y1="62.9"
                    x2="48.8"
                    y2="48.8"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="16"
                  />
                  <line
                    x1="36"
                    y1="128"
                    x2="16"
                    y2="128"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="16"
                  />
                  <line
                    x1="62.9"
                    y1="193.1"
                    x2="48.8"
                    y2="207.2"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="16"
                  />
                  <line
                    x1="128"
                    y1="220"
                    x2="128"
                    y2="240"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="16"
                  />
                  <line
                    x1="193.1"
                    y1="193.1"
                    x2="207.2"
                    y2="207.2"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="16"
                  />
                  <line
                    x1="220"
                    y1="128"
                    x2="240"
                    y2="128"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="16"
                  />
                  <line
                    x1="193.1"
                    y1="62.9"
                    x2="207.2"
                    y2="48.8"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="16"
                  />
                </svg>
              </button>
              <button
                type="button"
                class="text-xl dark:hover:text-neutral-400"
                :class="( themeMode === 'dark'?'dark:text-neutral-400':'dark:text-neutral-600' )"
                @click="handleManualToggleThemeMode('dark')"
              >
                <span class="sr-only">dark</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <rect
                    width="256"
                    height="256"
                    fill="none"
                  />
                  <path
                    d="M216.7,152.6A91.9,91.9,0,0,1,103.4,39.3h0A92,92,0,1,0,216.7,152.6Z"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="16"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-base whitespace-nowrap">Search Delay Preflight</span>
            <div class="flex items-center ml-6 py-1 px-1.5 space-x-2">
              <Switch
                :status="genericStore.searchEnginePreflight"
                @emit-switch-status="(status)=>genericStore.reviseSearchEnginePreflight(status)"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <h6 class="mb-2.5 dark:text-neutral-500 text-sm">
          Fast Website
        </h6>
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-base whitespace-nowrap">Edit Fast Website</span>
            <div class="flex items-center ml-6 py-1 px-1.5 space-x-2">
              <button
                type="button"
                class="text-xl dark:hover:text-neutral-400"
                :class="{ 'dark:text-neutral-600': !is.editFastWebsite }"
                @click="handleEditFastWebsite"
              >
                <span class="sr-only">edit</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <rect
                    width="256"
                    height="256"
                    fill="none"
                  />
                  <line
                    x1="91.5"
                    y1="99.5"
                    x2="159.4"
                    y2="167.4"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="16"
                  />
                  <path
                    d="M216,215.8H72.1L35,178.7a15.9,15.9,0,0,1,0-22.6L148.1,43a15.9,15.9,0,0,1,22.6,0L216,88.2a16.2,16.2,0,0,1,0,22.7L111,215.8"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="16"
                  />
                </svg>
              </button>
              <button
                type="button"
                class="text-xl dark:text-neutral-600 dark:hover:text-neutral-400 pointer-events-none"
                @click="fastStore.emptyFastWebsite()"
              >
                <span class="sr-only">empty</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <rect
                    width="256"
                    height="256"
                    fill="none"
                  />
                  <line
                    x1="216"
                    y1="56"
                    x2="40"
                    y2="56"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="16"
                  />
                  <line
                    x1="104"
                    y1="104"
                    x2="104"
                    y2="168"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="16"
                  />
                  <line
                    x1="152"
                    y1="104"
                    x2="152"
                    y2="168"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="16"
                  />
                  <path
                    d="M200,56V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V56"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="16"
                  />
                  <path
                    d="M168,56V40a16,16,0,0,0-16-16H104A16,16,0,0,0,88,40V56"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="16"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-base whitespace-nowrap">Sort Fast Website</span>
            <div class="flex items-center ml-6 py-1 px-1.5 space-x-2">
              <button
                type="button"
                class="text-xl dark:hover:text-neutral-400"
                :class="( fastStore.webSiteSort === 'asc'?'dark:text-neutral-400':'dark:text-neutral-600' )"
                @click="fastStore.sortFastWebsiteByCount('asc')"
              >
                <span class="sr-only">asc</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <rect
                    width="256"
                    height="256"
                    fill="none"
                  />
                  <polyline
                    points="144 88 184 48 224 88"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="16"
                  />
                  <line
                    x1="184"
                    y1="144"
                    x2="184"
                    y2="48"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="16"
                  />
                  <line
                    x1="48"
                    y1="128"
                    x2="120"
                    y2="128"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="16"
                  />
                  <line
                    x1="48"
                    y1="64"
                    x2="104"
                    y2="64"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="16"
                  />
                  <line
                    x1="48"
                    y1="192"
                    x2="184"
                    y2="192"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="16"
                  />
                </svg>
              </button>
              <button
                type="button"
                class="text-xl dark:hover:text-neutral-400"
                :class="( fastStore.webSiteSort === 'desc'?'dark:text-neutral-400':'dark:text-neutral-600' )"
                @click="fastStore.sortFastWebsiteByCount('desc')"
              >
                <span class="sr-only">desc</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <rect
                    width="256"
                    height="256"
                    fill="none"
                  />
                  <polyline
                    points="144 168 184 208 224 168"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="16"
                  />
                  <line
                    x1="184"
                    y1="112"
                    x2="184"
                    y2="208"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="16"
                  />
                  <line
                    x1="48"
                    y1="128"
                    x2="120"
                    y2="128"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="16"
                  />
                  <line
                    x1="48"
                    y1="64"
                    x2="184"
                    y2="64"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="16"
                  />
                  <line
                    x1="48"
                    y1="192"
                    x2="104"
                    y2="192"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h6 class="mb-2.5 dark:text-neutral-500 text-sm">
          Search History
        </h6>
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-base whitespace-nowrap">Edit Search History</span>
            <div class="flex items-center ml-6 py-1 px-1.5 space-x-2">
              <button
                type="button"
                class="text-xl dark:hover:text-neutral-400"
                :class="{ 'dark:text-neutral-600': !is.editSearchHistory }"
                @click="handleEditSearchHistory"
              >
                <span class="sr-only">edit</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <rect
                    width="256"
                    height="256"
                    fill="none"
                  />
                  <line
                    x1="91.5"
                    y1="99.5"
                    x2="159.4"
                    y2="167.4"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="16"
                  />
                  <path
                    d="M216,215.8H72.1L35,178.7a15.9,15.9,0,0,1,0-22.6L148.1,43a15.9,15.9,0,0,1,22.6,0L216,88.2a16.2,16.2,0,0,1,0,22.7L111,215.8"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="16"
                  />
                </svg>
              </button>
              <button
                type="button"
                class="text-xl dark:text-neutral-600 dark:hover:text-neutral-400 pointer-events-none"
                @click="historyStore.emptyHistorySearch()"
              >
                <span class="sr-only">empty</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <rect
                    width="256"
                    height="256"
                    fill="none"
                  />
                  <line
                    x1="216"
                    y1="56"
                    x2="40"
                    y2="56"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="16"
                  />
                  <line
                    x1="104"
                    y1="104"
                    x2="104"
                    y2="168"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="16"
                  />
                  <line
                    x1="152"
                    y1="104"
                    x2="152"
                    y2="168"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="16"
                  />
                  <path
                    d="M200,56V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V56"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="16"
                  />
                  <path
                    d="M168,56V40a16,16,0,0,0-16-16H104A16,16,0,0,0,88,40V56"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="16"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-base whitespace-nowrap">Sort Search History</span>
            <div class="flex items-center ml-6 py-1 px-1.5 space-x-2">
              <button
                type="button"
                class="text-xl dark:hover:text-neutral-400"
                :class="( historyStore.searchSort === 'asc'?'dark:text-neutral-400':'dark:text-neutral-600' )"
                @click="historyStore.sortHistorySearchByCount('asc')"
              >
                <span class="sr-only">asc</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <rect
                    width="256"
                    height="256"
                    fill="none"
                  />
                  <polyline
                    points="144 88 184 48 224 88"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="16"
                  />
                  <line
                    x1="184"
                    y1="144"
                    x2="184"
                    y2="48"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="16"
                  />
                  <line
                    x1="48"
                    y1="128"
                    x2="120"
                    y2="128"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="16"
                  />
                  <line
                    x1="48"
                    y1="64"
                    x2="104"
                    y2="64"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="16"
                  />
                  <line
                    x1="48"
                    y1="192"
                    x2="184"
                    y2="192"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="16"
                  />
                </svg>
              </button>
              <button
                type="button"
                class="text-xl dark:hover:text-neutral-400"
                :class="( historyStore.searchSort === 'desc'?'dark:text-neutral-400':'dark:text-neutral-600' )"
                @click="historyStore.sortHistorySearchByCount('desc')"
              >
                <span class="sr-only">desc</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <rect
                    width="256"
                    height="256"
                    fill="none"
                  />
                  <polyline
                    points="144 168 184 208 224 168"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="16"
                  />
                  <line
                    x1="184"
                    y1="112"
                    x2="184"
                    y2="208"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="16"
                  />
                  <line
                    x1="48"
                    y1="128"
                    x2="120"
                    y2="128"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="16"
                  />
                  <line
                    x1="48"
                    y1="64"
                    x2="184"
                    y2="64"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="16"
                  />
                  <line
                    x1="48"
                    y1="192"
                    x2="104"
                    y2="192"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="16"
                  />
                </svg>
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

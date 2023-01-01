<script setup lang="ts">
import { ref, reactive, onBeforeMount } from 'vue';
import { useHistoryStore } from '~/store/modules/history';
import { getLocalStorage, setLocalStorage } from '~/utils/local-storage';

const emits = defineEmits([
  'emit-edit-general-website',
  'emit-edit-search-history'
]);


type ThemeMode = '' | 'light' | 'dark';

const historyStore = useHistoryStore();

const is = reactive({
  visibleMenu: true,
  editGeneralWebsite: false,
  editSearchHistory: false
});

const themeMode = ref<ThemeMode>('');

const handleToggleThemeMode = async () => {
  const currentMode = await getLocalStorage('themeMode');

  if (currentMode === 'light') {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
    themeMode.value = 'dark';
  } else {
    document.documentElement.classList.add('light');
    document.documentElement.classList.remove('dark');
    themeMode.value = 'light';
  }
  await setLocalStorage('themeMode', themeMode.value);
};


const handleEditGeneralWebsite = () => {
  is.editGeneralWebsite = !is.editGeneralWebsite;
  emits('emit-edit-general-website', is.editGeneralWebsite);
};

const handleEditSearchHistory = () => {
  is.editSearchHistory = !is.editSearchHistory;
  emits('emit-edit-search-history', is.editSearchHistory);
};

const handleEmptySearchHistory = () => {
  historyStore.emptyHistorySearch();
};

async function initThemeMode() {
  const currentMode = await getLocalStorage('themeMode');
  if (!currentMode) {
    await setLocalStorage('themeMode', 'light');
    document.documentElement.classList.add('light');
  } else {
    document.documentElement.classList.add(currentMode);
  }

  themeMode.value = currentMode as ThemeMode;
}

onBeforeMount(() => {
  initThemeMode();
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
      class="absolute right-0 p-3 h-96 rounded-md dark:bg-neutral-800 space-y-1 select-none"
    >
      <div
        v-if="(themeMode !== 'dark')"
        class="flex items-center py-1 pl-2 pr-3 rounded dark:hover:bg-neutral-700 text-lg"
        @click="handleToggleThemeMode"
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
        <span class="ml-2.5 text-base whitespace-nowrap">Light Mode</span>
      </div>
      <div
        v-else
        class="flex items-center py-1 pl-2 pr-3 rounded dark:hover:bg-neutral-700 text-lg"
        @click="handleToggleThemeMode"
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
          <path
            d="M216.7,152.6A91.9,91.9,0,0,1,103.4,39.3h0A92,92,0,1,0,216.7,152.6Z"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="16"
          />
        </svg>
        <span class="ml-2.5 text-base whitespace-nowrap">Dark Mode</span>
      </div>
      <div
        class="flex items-center py-1 pl-2 pr-3 rounded dark:hover:bg-neutral-700 text-lg"
        :class="{ 'dark:text-neutral-200': is.editSearchHistory }"
        @click="handleEditSearchHistory"
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
        <span class="ml-2.5 text-base whitespace-nowrap">
          Edit Search History
        </span>
      </div>
      <div
        class="flex items-center py-1 pl-2 pr-3 rounded dark:hover:bg-neutral-700 text-lg"
        @click="handleEmptySearchHistory"
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
        <span class="ml-2.5 text-base whitespace-nowrap">
          Empty Search History
        </span>
      </div>
      <div
        class="flex items-center py-1 pl-2 pr-3 rounded dark:hover:bg-neutral-700 text-lg"
        :class="{'dark:text-neutral-200': historyStore.sort === 'time'}"
        @click="historyStore.orderHistorySearchByTime()"
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
          <path
            d="M42.1,48H213.9a8,8,0,0,1,5.9,13.4l-65.7,72.3a7.8,7.8,0,0,0-2.1,5.4v56.6a7.9,7.9,0,0,1-3.6,6.7l-32,21.3a8,8,0,0,1-12.4-6.6v-78a7.8,7.8,0,0,0-2.1-5.4L36.2,61.4A8,8,0,0,1,42.1,48Z"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="16"
          />
        </svg>
        <span class="ml-2.5 text-base whitespace-nowrap">
          Search History Order Of Time
        </span>
      </div>
      <div
        class="flex items-center py-1 pl-2 pr-3 rounded dark:hover:bg-neutral-700 text-lg"
        :class="{'dark:text-neutral-200': historyStore.sort === 'count'}"
        @click="historyStore.orderHistorySearchByCount()"
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
          <path
            d="M42.1,48H213.9a8,8,0,0,1,5.9,13.4l-65.7,72.3a7.8,7.8,0,0,0-2.1,5.4v56.6a7.9,7.9,0,0,1-3.6,6.7l-32,21.3a8,8,0,0,1-12.4-6.6v-78a7.8,7.8,0,0,0-2.1-5.4L36.2,61.4A8,8,0,0,1,42.1,48Z"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="16"
          />
        </svg>
        <span class="ml-2.5 text-base whitespace-nowrap">
          Search History Order Of Count
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>

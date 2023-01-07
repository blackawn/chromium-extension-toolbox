<script setup lang="ts">
import { ref,onMounted, reactive } from 'vue';
import {
  useChromeTabsQuery,
  useChromeTabsSendMessage,
  useChromeStorageLocalGet,
  useChromeStorageLocalSet,
  useChromeStorageLocalClear
} from '~/utils/chrome';
import { fast } from '~/store/modules/website';
import type { FastWebsite } from '~/types/fast-website.type';
import Switch from '~/components/switch/index.vue';
import utils from '~/utils/utils';

const fastStore = fast();

const fastWebsite = reactive<FastWebsite>({
  favIconUrl: 'string',
  url: '',
  title: '',
  count: 1,
  time: 0,
  id: 0
});

const isGlobalFilterInvert = ref<boolean>(false);



const handleAddToFastWebSite = () => {
  if (fastStore.findFastWebsite(fastWebsite.url)) return;
  fastStore.addToFastWebsite({
    ...fastWebsite,
    time: Date.now()
  });
};

const handleRemoveFromFastWebSite = () => {
  if (!fastStore.findFastWebsite(fastWebsite.url)) return;
  fastStore.removeFromFastWebsite(fastWebsite.url);
};


const handleGlobalFilterInvertSwitch = (status: boolean) => {
  isGlobalFilterInvert.value = status;
  useChromeStorageLocalSet('globalFilterInvert', isGlobalFilterInvert.value)
    .then(() => {
      useChromeTabsQuery({})
        .then((tabs) => {
          tabs.forEach((tab) => {
            useChromeTabsSendMessage(
              (tab.id || 0),
              {
                from: 'popup',
                content: {
                  globalFilterInvert: isGlobalFilterInvert.value
                }
              });
          });
        });
    });
};


onMounted(() => {
  useChromeStorageLocalGet('globalFilterInvert')
    .then((result) => {
      isGlobalFilterInvert.value = result.globalFilterInvert;
      console.log(isGlobalFilterInvert.value);
    });


  useChromeTabsQuery({
    active: true,
    currentWindow: true
  }).then((tab) => {
    const { favIconUrl, title, url, id } = tab[0];
    fastWebsite.favIconUrl = favIconUrl || '';
    fastWebsite.title = title || '';
    fastWebsite.url = url || '';
    fastWebsite.id = id || 0;
  });
});

</script>
<template>
  <div class="p-4">
    <div class="space-y-2">
      <div
        class="flex items-center justify-between"
      >
        <span class="text-base whitespace-nowrap">Is To Fast Website</span>
        <div class="flex items-center ml-6 py-1 px-1.5 space-x-2">
          <button
            type="button"
            class="text-xl"
            :class="{ 'dark:text-neutral-600 pointer-events-none': fastStore.findFastWebsite(fastWebsite.url) }"
            @click="handleAddToFastWebSite"
          >
            <span class="sr-only">add</span>
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
                r="96"
                fill="none"
                stroke="currentColor"
                stroke-miterlimit="10"
                stroke-width="16"
              />
              <line
                x1="88"
                y1="128"
                x2="168"
                y2="128"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="16"
              />
              <line
                x1="128"
                y1="88"
                x2="128"
                y2="168"
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
            class="text-xl"
            :class="{ 'dark:text-neutral-600 pointer-events-none': !fastStore.findFastWebsite(fastWebsite.url) }"
            @click="handleRemoveFromFastWebSite"
          >
            <span class="sr-only">remove</span>
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
                r="96"
                fill="none"
                stroke="currentColor"
                stroke-miterlimit="10"
                stroke-width="16"
              />
              <line
                x1="88"
                y1="128"
                x2="168"
                y2="128"
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
        <span class="text-base whitespace-nowrap">Global Filter Invert</span>
        <div class="flex items-center ml-6 py-1 px-1.5 space-x-2">
          <Switch
            :status="isGlobalFilterInvert"
            @emit-switch-status="(status)=>handleGlobalFilterInvertSwitch(status)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>

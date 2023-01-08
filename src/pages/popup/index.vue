<script setup lang="ts">
import { onMounted, reactive } from 'vue';
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

const fastStore = fast();

const fastWebsite = reactive<FastWebsite>({
  favIconUrl: 'string',
  url: '',
  title: '',
  count: 1,
  id: 0
});


const is = reactive({
  globalFilterInvert: false,
  scopeFilterInvert: false
});


const handleAddToFastWebSite = () => {
  if (fastStore.findFastWebsite(fastWebsite.url)) return;
  fastStore.addToFastWebsite(
    fastWebsite
  );
};

const handleRemoveFromFastWebSite = () => {
  if (!fastStore.findFastWebsite(fastWebsite.url)) return;
  fastStore.removeFromFastWebsite(fastWebsite.url);
};

const handleGlobalFilterInvertSwitch = async (status: boolean) => {
  is.globalFilterInvert = status;

  const { scopeFilterInvert } = await useChromeStorageLocalGet('scopeFilterInvert');

  if (!(scopeFilterInvert || []).includes(fastWebsite.url)) {
    is.scopeFilterInvert = status;
  }

  await useChromeStorageLocalSet('globalFilterInvert', status);
  const tabs = await useChromeTabsQuery({});

  tabs.forEach((tab) => {
    useChromeTabsSendMessage((tab.id || 0), {
      from: 'popup',
      content: {
        globalFilterInvert: status
      }
    });
  });
};

const handleScopeFilterInvertSwitch = async (status: boolean) => {
  is.scopeFilterInvert = status;

  const { scopeFilterInvert } = await useChromeStorageLocalGet('scopeFilterInvert');

  const scopeFilterInvertList = scopeFilterInvert || [];

  if (status) {
    scopeFilterInvertList.push(fastWebsite.url);
  } else {
    scopeFilterInvertList.splice(scopeFilterInvertList.indexOf(fastWebsite.url), 1);
  }

  await useChromeStorageLocalSet('scopeFilterInvert', scopeFilterInvertList);

  await useChromeTabsSendMessage(
    (fastWebsite.id || 0),
    {
      from: 'popup',
      content: {
        scopeFilterInvert: status
      }
    });
};

onMounted(async () => {

  const tabQuery = await useChromeTabsQuery({
    active: true,
    currentWindow: true
  });

  fastWebsite.favIconUrl = tabQuery[0].favIconUrl || '';
  fastWebsite.title = tabQuery[0].title || '';
  fastWebsite.url = tabQuery[0].url || '';
  fastWebsite.id = tabQuery[0].id || 0;

  const {
    globalFilterInvert,
    scopeFilterInvert
  } = await useChromeStorageLocalGet();

  is.globalFilterInvert = globalFilterInvert;

  is.scopeFilterInvert = (scopeFilterInvert || []).includes(tabQuery[0].url);

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
      <div
        v-if="false"
        class="flex items-center justify-between"
      >
        <span class="text-base whitespace-nowrap">Global Filter Invert</span>
        <div class="flex items-center ml-6 py-1 px-1.5 space-x-2">
          <Switch
            :status="is.globalFilterInvert"
            @emit-switch-status="(status)=>handleGlobalFilterInvertSwitch(status)"
          />
        </div>
      </div>
      <div class="flex items-center justify-between">
        <span class="text-base whitespace-nowrap">Scope Filter Invert</span>
        <div class="flex items-center ml-6 py-1 px-1.5 space-x-2">
          <Switch
            :status="is.scopeFilterInvert"
            @emit-switch-status="(status)=>handleScopeFilterInvertSwitch(status)"
          />
        </div>
      </div>
      <div
        class="p-4"
        @click="getLocal"
      >
        Get
      </div>
      <div
        class="p-4"
        @click="clearLocal"
      >
        clear
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>

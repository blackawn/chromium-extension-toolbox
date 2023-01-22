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
import { IncreaseRound, DecreaseRound } from '~/components/icon';

const fastStore = fast();

const fastWebsite = reactive<FastWebsite>({
  favIconUrl: 'string',
  url: '',
  title: '',
  count: 1,
  id: 0
});


const is = reactive({
  setFilterInvert: false,
  filterInvert: false
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

const handleSetFilterInvert = async (status: boolean) => {
  is.filterInvert = status;

  const { filterInvert } = await useChromeStorageLocalGet('filterInvert');

  const filterInvertList = filterInvert || [];

  if (status) {
    filterInvertList.push(fastWebsite.url);
  } else {
    filterInvertList.splice(filterInvertList.indexOf(fastWebsite.url), 1);
  }

  await useChromeStorageLocalSet('filterInvert', filterInvertList);

  await useChromeTabsSendMessage(
    (fastWebsite.id || 0),
    {
      from: 'popup',
      content: {
        filterInvert: status
      }
    });
};

onMounted(async () => {

  const tabQuery = await useChromeTabsQuery({
    active: true,
    currentWindow: true
  });

  is.setFilterInvert =
      !(['chrome', 'edge'].includes(tabQuery[0].url!.split(':')[0]));

  fastWebsite.favIconUrl = tabQuery[0].favIconUrl || '';
  fastWebsite.title = tabQuery[0].title || '';
  fastWebsite.url = tabQuery[0].url || '';
  fastWebsite.id = tabQuery[0].id || 0;

  const {
    scopeFilterInvert
  } = await useChromeStorageLocalGet();

  is.filterInvert = (scopeFilterInvert || []).includes(tabQuery[0].url);

});


</script>
<template>
  <div class="p-4">
    <div class="space-y-2">
      <div
        class="flex items-center justify-between"
      >
        <span class="text-base whitespace-nowrap">To Fast Website</span>
        <div class="flex items-center ml-6 py-1 px-1.5 space-x-2">
          <button
            type="button"
            class="text-xl"
            :class="{ 'dark:text-neutral-600 pointer-events-none': fastStore.findFastWebsite(fastWebsite.url) }"
            @click="handleAddToFastWebSite"
          >
            <span class="sr-only">add</span>
            <IncreaseRound />
          </button>
          <button
            type="button"
            class="text-xl"
            :class="{ 'dark:text-neutral-600 pointer-events-none': !fastStore.findFastWebsite(fastWebsite.url) }"
            @click="handleRemoveFromFastWebSite"
          >
            <span class="sr-only">remove</span>
            <DecreaseRound />
          </button>
        </div>
      </div>
      <div
        v-if="is.setFilterInvert"
        class="flex items-center justify-between"
      >
        <span class="text-base whitespace-nowrap">Filter Invert</span>
        <div class="flex items-center ml-6 py-1 px-1.5 space-x-2">
          <Switch
            v-model:status="is.filterInvert"
            class="w-10 h-5"
            @update:switch-status="(status)=>{handleSetFilterInvert(status)}"
          />
        </div>
      </div>
      <div>
        <span
          v-long-press="{
            time: 3000,
            mousedownCallback: () => {
              useChromeStorageLocalClear();
            },
          }"
          class="text-base whitespace-nowrap dark:hover:text-neutral-500"
        >Clear All Filter Invert</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>

<script setup lang="ts">
import { ref } from 'vue';
import { useChromeTabsQuery, useChromeTabsSendMessage } from '~/utils/chrome';
import { useGeneralStore } from '~/store/modules/general';
import { onMounted } from 'vue';

const generalStore = useGeneralStore();

const tabUrl = ref<string>('');
const tabTitle = ref<string>('');
const tabId = ref<number>(0);
const tabFavIconUrl = ref<string>('');

/*
    useChromeTabsSendMessage(
      (id as number),
      {
        from: 'popup',
        content: {
          filterInvert: true
        }
      });
*/

const handleAddToGeneralWebSite = () => {
  generalStore.addToGeneralWebSite({
    favIconUrl: tabFavIconUrl.value,
    title: tabTitle.value,
    url: tabUrl.value,
    count: 1,
    time: Date.now()
  });
};

const handleRemoveFromGeneralWebSite = () => {
  generalStore.removeFromGeneralWebSite(tabUrl.value);
};


onMounted(() => {
  useChromeTabsQuery().then((tab) => {
    const { favIconUrl, title, url, id } = tab[0];
    tabUrl.value = url as string;
    tabTitle.value = title as string;
    tabId.value = id as number;
    tabFavIconUrl.value = favIconUrl as string;
  });
});

</script>
<template>
  <div class="w-96 h-96 p-4">
    <button
      v-if="!generalStore.findGeneralWebSite(tabUrl)"
      type="button"
      class="flex items-center text-lg dark:text-neutral-400"
      @click="handleAddToGeneralWebSite"
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
      <span class="ml-2 text-sm">Add To General Website</span>
    </button>
    <button
      v-else
      type="button"
      class="flex items-center text-lg dark:text-neutral-400"
      @click="handleRemoveFromGeneralWebSite"
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
      <span class="ml-2 text-sm">Remove From General Website</span>
    </button>
  </div>
</template>

<style scoped>

</style>

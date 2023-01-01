<script setup lang="ts">
import { useGeneralStore } from '~/store/modules/general';

const generalStore = useGeneralStore();

</script>
<template>
  <div class="flex flex-wrap mb-4">
    <a
      v-for="({ favIconUrl, title, url },i) in generalStore.generalWebSite"
      :key="i"
      class="flex items-center m-1 py-1 px-1.5 rounded dark:bg-neutral-800 dark:hover:text-neutral-200 "
      :href="url"
    >
      <div class="mr-2 w-4 h-4 overflow-hidden rounded-full">
        <img
          :src="favIconUrl"
          class="w-full h-full object-center object-contain"
          alt=""
        >
      </div>
      <span class="line-clamp-1 max-w-32">{{ title }}</span>
    </a>
  </div>
</template>

<style scoped>

</style>

<script setup lang="ts">
import { useHistoryStore } from '~/store/modules/history'

const emits = defineEmits([
  'event-history-to-search'
])

const searchHistoryStore = useHistoryStore()

const handleHistoryKeywordToSearch = (event: MouseEvent | KeyboardEvent, keyword: string) => {
  if (event.ctrlKey) {
    emits('event-history-to-search', {
      newTab: true,
      keyword
    })
  } else {
    emits('event-history-to-search', {
      isCreate: false,
      keyword
    })
  }
}

</script>

<template>
  <div class="flex flex-wrap mt-4">
    <span
      v-for="({keyword}) in searchHistoryStore.searchHistory"
      :key="keyword"
      class="m-1 py-0.5 px-2 dark:bg-neutral-800 text-sm rounded dark:hover:text-neutral-200"
      @click="(event)=>handleHistoryKeywordToSearch(event,keyword)"
    >
      {{ keyword }}
    </span>
  </div>
</template>

<style scoped>

</style>

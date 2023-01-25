<script setup lang="ts">
import { history } from '~/store/modules/history';
import { Close } from '~/components/icon';

const props = defineProps({
  edit: {
    type: Boolean,
    default: false
  }
});

const emits = defineEmits([
  'handle:history-to-search'
]);

const historyStore = history();


const handleHistoryKeywordToSearch = (event: MouseEvent | KeyboardEvent, keyword: string) => {
  if (!props.edit) {
    if (event.ctrlKey) {
      emits('handle:history-to-search', {
        newTab: true,
        keyword
      });
    } else {
      emits('handle:history-to-search', {
        isCreate: false,
        keyword
      });
    }
  }
};
</script>

<template>
  <div
    class="flex flex-wrap content-start flex-1 my-2 py-2 overflow-x-hidden"
  >
    <TransitionGroup
      name="search-history"
    >
      <div
        v-for="({keyword},i) in historyStore.search"
        :key="keyword"
        class="relative"
      >
        <div
          class="m-1 py-0.5 px-2 bg-gray-100 dark:bg-neutral-800 text-sm rounded"
          :class="{'hover:text-neutral-600 dark:hover:text-neutral-200':(!props.edit)}"
          @click="(event)=>{handleHistoryKeywordToSearch(event,keyword)}"
        >
          <span>{{ keyword }}</span>
        </div>
        <button
          v-show="props.edit"
          type="button"
          class="absolute -top-0.5 -right-1 p-0.5 text-xs rounded-full bg-gray-100 dark:bg-neutral-700 hover:text-neutral-600 dark:hover:text-neutral-200"
          @click="historyStore.deleteHistorySearch(i)"
        >
          <span class="sr-only">x</span>
          <Close />
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.search-history-move,
.search-history-enter-active {
  @apply duration-500;
}

.search-history-enter-from {
  @apply opacity-0 translate-x-full;
}

.search-history-enter-to {
  @apply opacity-100 translate-x-0;
}

.search-history-leave-active {
  @apply absolute opacity-0
}
</style>

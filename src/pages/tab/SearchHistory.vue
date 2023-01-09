<script setup lang="ts">
import { ref } from 'vue';
import { history } from '~/store/modules/history';

const props = defineProps({
  edit: {
    type: Boolean,
    default: false
  }
});

const emits = defineEmits([
  'emit-history-to-search'
]);

const historyStore = history();


const handleHistoryKeywordToSearch = (event: MouseEvent | KeyboardEvent, keyword: string) => {
  if (!props.edit) {
    if (event.ctrlKey) {
      emits('emit-history-to-search', {
        newTab: true,
        keyword
      });
    } else {
      emits('emit-history-to-search', {
        isCreate: false,
        keyword
      });
    }
  }
};
</script>

<template>
  <div
    class="flex flex-wrap mt-4"
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
          @click="(event)=>handleHistoryKeywordToSearch(event,keyword)"
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 256 256"
          >
            <path
              fill="currentColor"
              d="M205.7 194.3a8.1 8.1 0 0 1 0 11.4a8.2 8.2 0 0 1-11.4 0L128 139.3l-66.3 66.4a8.2 8.2 0 0 1-11.4
            0a8.1 8.1 0 0 1 0-11.4l66.4-66.3l-66.4-66.3a8.1 8.1 0 0 1 11.4-11.4l66.3 66.4l66.3-66.4a8.1 8.1 0 0 1 11.4 11.4L139.3 128Z"
            />
          </svg>
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

`
<script setup lang="ts">
import { fast } from '~/store/modules/website';

const props = defineProps({
  edit: {
    type: Boolean,
    default: false
  }
});

const fastStore = fast();

</script>
<template>
  <div class="flex flex-wrap-reverse mb-4">
    <TransitionGroup
      name="general-web-site"
    >
      <div
        v-for="({ favIconUrl, title, url },i) in fastStore.webSite"
        :key="url"
        class="group relative"
        :class="{ 'cursor-text': props.edit }"
      >
        <a
          class="flex items-center m-1 py-1 px-1.5 rounded bg-gray-100 dark:bg-neutral-800 hover:text-neutral-600 dark:hover:text-neutral-200"
          :href="url"
          :class="{'pointer-events-none': props.edit }"
          @click="fastStore.addToFastWebsite(null,i)"
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
        <button
          v-show="props.edit"
          type="button"
          class="absolute -top-0.5 -right-1 p-0.5 text-xs rounded-full bg-gray-100 dark:bg-neutral-700 hover:text-neutral-600 dark:hover:text-neutral-200"
          @click="fastStore.deleteFastWebsite(i)"
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
        <button
            type="button"
          class="absolute -bottom-0.5 -right-1 p-0.5 opacity-0 rounded-full bg-gray-100 dark:bg-neutral-700 text-xs hover:text-neutral-600 dark:hover:text-neutral-200 duration-300"
          :class="{ 'group-hover:opacity-100': props.edit }"
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
            <path
              d="M92.7,216H48a8,8,0,0,1-8-8V163.3a7.9,7.9,0,0,1,2.3-5.6l120-120a8,8,0,0,1,11.4,0l44.6,44.6a8,8,0,0,1,0,11.4l-120,120A7.9,7.9,0,0,1,92.7,216Z"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="16"
            />
            <line
              x1="136"
              y1="64"
              x2="192"
              y2="120"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="16"
            />
          </svg>
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.general-web-site-move,
.general-web-site-enter-active {
  @apply duration-500;
}

.general-web-site-enter-from {
  @apply opacity-0 translate-x-full;
}

.general-web-site-enter-to {
  @apply opacity-100 translate-x-0;
}

.general-web-site-leave-active {
  @apply absolute opacity-0
}
</style>
`

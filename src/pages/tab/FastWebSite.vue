<script setup lang="ts">
import { fast } from '~/store/modules/website';
import { Close, Pen } from '~/components/icon';

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
          <Close />
        </button>
        <button
          type="button"
          class="absolute -bottom-0.5 -right-1 p-0.5 opacity-0 rounded-full bg-gray-100 dark:bg-neutral-700 text-xs hover:text-neutral-600 dark:hover:text-neutral-200 duration-300"
          :class="{ 'group-hover:opacity-100': props.edit }"
        >
          <span class="sr-only">edit</span>
          <Pen />
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

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useElementResizeObserver } from '~/composables/useElementResizeObserver';

const props = defineProps({
  status: {
    type: Boolean,
    default: true
  }
});

const emits = defineEmits(
  ['emit-switch-status']
);

const refSwitchBar = ref<HTMLElement | null>(null);
const refSwitchDot = ref<HTMLElement | null>(null);

const { width: refSwitchBarWidth } = useElementResizeObserver(refSwitchBar);
const { width: refSwitchWidth } = useElementResizeObserver(refSwitchDot);

const switchStatus = ref<boolean>(props.status);

const handleSwitchStatus = () => {
  switchStatus.value = !switchStatus.value;
  emits('emit-switch-status', switchStatus.value);
};

watchEffect(() => {
  switchStatus.value = props.status;
});

</script>
<template>
  <div
    ref="refSwitchBar"
    class="group flex p-0.75 w-10 h-5 border dark:border-neutral-600 rounded-full duration-300 cursor-pointer"
    :class="{ 'dark:bg-neutral-600': switchStatus }"
    @click="handleSwitchStatus"
  >
    <div
      ref="refSwitchDot"
      class="w-3 h-full dark:bg-neutral-500 dark:group-hover:bg-neutral-400 rounded-full duration-300"
      :class="[
        { 'dark:bg-neutral-400': switchStatus },
      ]"
      :style="{ transform:`translateX(${switchStatus?( (refSwitchBarWidth || 0) - (refSwitchWidth || 0) ):0}px)`}"
    />
  </div>
</template>

<style scoped>

</style>

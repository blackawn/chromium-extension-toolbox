<script lang="ts">
import {
  ref,
  reactive,
  computed,
  defineComponent,
  onUnmounted,
  onMounted,
  PropType
} from 'vue';
import type { status, position } from './popup-message.type';

export default defineComponent({
  props: {
    message: {
      type: String,
      default: ''
    },
    status: {
      type: String as PropType<status>,
      default: 'info'
    },
    position: {
      type: String as PropType<position>,
      default: 'top'
    },
    firstOffset: {
      type: Number,
      default: 20
    },
    offset: {
      type: Number,
      default: 16
    },
    duration: {
      type: Number,
      default: 3000
    },
    enterFromClass: {
      type: String,
      default: (props: any) => {
        return ['top', 'left-top', 'right-top'].includes(props.position) ?
          '-translate-y-full opacity-0' : 'translate-y-full opacity-0';
      }
    },
    enterToClass: {
      type: String,
      default: 'opacity-100 translate-y-0'
    },
    enterActiveClass: {
      type: String,
      default: 'duration-300'
    },
    leaveFromClass: {
      type: String,
      default: 'opacity-100 translate-y-0'
    },
    leaveToClass: {
      type: String,
      default: (props: any) => {
        return ['bottom', 'left-bottom', 'right-bottom'].includes(props.position) ?
          'translate-y-full opacity-0' : '-translate-y-full opacity-0';
      }
    },
    leaveActiveClass: {
      type: String,
      default: 'duration-300'
    },
    onDestroy: {
      type: Function as PropType<() => void>,
      default: () => {
      }
    },
    onClose: {
      type: Function as PropType<() => void>,
      default: () => {
      }
    }
  },
  setup(props) {

    const visible = ref<boolean>(false);
    let timer: NodeJS.Timeout | null = null;

    const diffOffset = computed(() => {
      return `${props.firstOffset + props.offset}px`;
    });

    //const state = reactive<PopupMessageState>({})

    function setTimer() {
      clearTimer();
      timer = setTimeout(() => {
        destroyMessage();
      }, props.duration);
    }

    function clearTimer() {
      if (timer) {
        clearTimeout(timer);
      }
    }

    function destroyMessage() {
      visible.value = false;
    }


    onMounted(() => {
      visible.value = true;
      setTimer();
    });

    onUnmounted(() => {
      clearTimer();
    });


    return {
      // ...toRefs(state),
      visible,
      diffOffset,
      setTimer,
      clearTimer
    };
  }
});
</script>

<template>
  <transition
    :duration="duration"
    :enter-from-class="enterFromClass"
    :enter-to-class="enterToClass"
    :enter-active-class="enterActiveClass"
    :leave-from-class="leaveFromClass"
    :leave-to-class="leaveToClass"
    :leave-active-class="leaveActiveClass"
    @before-leave="onClose"
    @after-leave="onDestroy"
  >
    <div
      v-show="visible"
      class="fixed p-2 rounded w-20"
      :class="{
        'top-0 left-1/2 -translate-x-1/2': position === 'top',
        'bottom-0 left-1/2 -translate-x-1/2': position === 'bottom',
        'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2': position === 'center',
        'top-0 left-4': position === 'left-top',
        'top-0 right-4': position === 'right-top',
        'bottom-0 left-4': position === 'left-bottom',
        'bottom-0 right-4': position === 'right-bottom',
        'bg-green-500': status === 'success',
        'bg-red-500': status === 'error',
        'bg-yellow-500': status === 'warning',
        'bg-blue-500': status === 'info',
      } "
      :style="{
        'top': ['top','left','right','left-top','right-top'].includes(position) ?
          diffOffset:
          'unset',
        'bottom': ['bottom','left-bottom','right-bottom'].includes(position) ?
          diffOffset :
          'unset'
      }"
      @mouseover="clearTimer"
      @mouseleave="setTimer"
    >
      {{ message }}
    </div>
  </transition>
</template>

<style scoped>

</style>

<script setup lang="ts">
import { ref } from 'vue'
import SearchBox from '~/pages/index/SearchBox.vue'
import SearchHistory from '~/pages/index/SearchHistory.vue'
import PopupMessage from '~/components/PopupMessage'

const refSearchBox = ref<InstanceType<typeof SearchBox>>()

function historyToSearch(param: any) {
  refSearchBox.value!.onToSearchUrl(param.isCreate, param.keyword)
}


const randomStatus = () => {
  const status = ['success', 'warning', 'info', 'error']
  return status[Math.floor(Math.random() * status.length)]
}

const handleVisiblePopupMessage = () => {
  PopupMessage({
    message: 'hello world!',
    status: randomStatus()
  })
}


</script>

<template>
  <div class="w-96">
    <button
      class="text-neutral-500"
      @click="handleVisiblePopupMessage"
    >
      message
    </button>
    <search-box ref="refSearchBox" />
    <search-history @event-history-to-search="historyToSearch" />
  </div>
</template>

<style scoped>

</style>

<script setup lang="ts">
import { useChromeTabsQuery } from '~/uilts/chrome'
import { useGeneralStore } from '~/store/modules/general'

const generalStore = useGeneralStore()


const handleGetCurrentTabInfo = () => {
  useChromeTabsQuery().then((tab) => {
    const { favIconUrl, title, url } = tab[0]
    generalStore.addGeneralWebSite({
      favIconUrl,
      title,
      url
    })
  })
}

</script>
<template>
  <div class="p-4">
    <button
      type="button"
      class="dark:text-neutral-400"
      @click="handleGetCurrentTabInfo"
    >
      Add to General
    </button>
  </div>
</template>

<style scoped>

</style>

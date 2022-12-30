<script setup lang="ts">
import { ref } from 'vue';
import SearchBox from '~/pages/home/SearchBox.vue';
import SearchHistory from '~/pages/home/SearchHistory.vue';
import GeneralWebSite from '~/pages/home/GeneralWebSite.vue';

const refSearchBox = ref<InstanceType<typeof SearchBox>>();

function historyToSearch(param: any) {
  refSearchBox.value!.onToSearchUrl(param.newTab, param.keyword);
}

</script>

<template>
  <div class="w-128">
    <general-web-site />
    <search-box ref="refSearchBox" />
    <search-history @event-history-to-search="historyToSearch" />
  </div>
</template>

<style scoped>

</style>

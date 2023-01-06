<script setup lang="ts">
import { reactive, ref } from 'vue';
import SearchBox from './SearchBox.vue';
import SearchHistory from './SearchHistory.vue';
import FastWebSite from './FastWebSite.vue';
import Siting from './Setting.vue';

const is = reactive({
  editFastWebsite: false,
  editSearchHistory: false
});

const refSearchBox = ref<InstanceType<typeof SearchBox>>();

function emitHistoryToSearch(param: any) {
  refSearchBox.value!.onToSearchUrl(param.newTab, param.keyword);
}

function emitEditGeneralWebSite(value: any) {
  is.editFastWebsite = value;
}

function emitEditSearchHistory(value: any) {
  is.editSearchHistory = value;
}

</script>

<template>
  <Siting
    @emit-edit-general-website="emitEditGeneralWebSite"
    @emit-edit-search-history="emitEditSearchHistory"
  />
  <div class="flex flex-col justify-center w-128 h-full">
    <FastWebSite
      :edit="is.editFastWebsite"
    />
    <SearchBox ref="refSearchBox" />
    <SearchHistory
      :edit="is.editSearchHistory"
      @emit-history-to-search="emitHistoryToSearch"
    />
  </div>
</template>

<style scoped>

</style>

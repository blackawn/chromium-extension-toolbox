<script setup lang="ts">
import { reactive, ref } from 'vue';
import SearchBox from './SearchBox.vue';
import SearchHistory from './SearchHistory.vue';
import GeneralWebSite from './GeneralWebSite.vue';
import Siting from './Setting.vue';

const is = reactive({
  editGeneralWebsite: false,
  editSearchHistory: false
});

const refSearchBox = ref<InstanceType<typeof SearchBox>>();

function emitHistoryToSearch(param: any) {
  refSearchBox.value!.onToSearchUrl(param.newTab, param.keyword);
}

function emitEditGeneralWebSite(value: any) {
  is.editGeneralWebsite = value;
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
    <GeneralWebSite
      :edit="is.editGeneralWebsite"
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

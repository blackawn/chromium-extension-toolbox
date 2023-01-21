<script setup lang="ts">
import { reactive, ref } from 'vue';
import SearchBox from './SearchBox.vue';
import SearchHistory from './SearchHistory.vue';
import FastWebSite from './FastWebSite.vue';
import Site from './Site.vue';

import PopupMessage from '~/components/popup-message';

const is = reactive({
  editFastWebsite: false,
  editSearchHistory: false
});

const refSearchBox = ref<InstanceType<typeof SearchBox>>();

function emitHistoryToSearch(param: any) {
  refSearchBox.value!.onToSearchUrl(param.newTab, param.keyword);
}

function oc (){
  console.log('关闭');
}

function show() {
  PopupMessage({
    message: 'test',
    onInvisible: oc
  });
}
</script>

<template>
  <Site
    @edit:general-website="(value)=>{ is.editFastWebsite = value }"
    @edit:search-history="(value)=>{ is.editSearchHistory = value }"
  />
  <button @click="show">
    show
  </button>
  <div class="flex flex-col justify-center w-128 h-full">
    <FastWebSite
      v-model:edit="is.editFastWebsite"
    />
    <SearchBox ref="refSearchBox" />
    <SearchHistory
      v-model:edit="is.editSearchHistory"
      @handle:history-to-search="emitHistoryToSearch"
    />
  </div>
</template>

<style scoped>

</style>

<template>
  <div class="department">
    <page-search
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <page-content ref="contentRef" @new-click="handleNewClick" @edit-click="handleEditClick" />
    <page-modal ref="modalRef" />
  </div>
</template>

<script setup lang="ts" name="department">
import { ref } from 'vue'
import PageSearch from '@/components/pageSearch/PageSearch.vue'

import searchConfig from './config/search.config'
import PageModal from '@/views/main/system/department/cpns/PageModal.vue'
import PageContent from '@/views/main/system/department/cpns/PageContent.vue'

// 点击search, content的操作
const contentRef = ref<InstanceType<typeof PageContent>>()
function handleQueryClick(queryInfo: any) {
  contentRef.value?.fetchPageListData(queryInfo)
}
function handleResetClick() {
  contentRef.value?.fetchPageListData()
}

// 点击content, modal的操作
const modalRef = ref<InstanceType<typeof PageModal>>()
function handleNewClick() {
  modalRef.value?.setModalVisible()
}
function handleEditClick(itemData: any) {
  modalRef.value?.setModalVisible(false, itemData)
}
</script>

<style scoped></style>

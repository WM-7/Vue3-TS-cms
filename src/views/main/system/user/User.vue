<template>
  <div class="user">
    <UserSearch @queryClick="handleQueryClick" @resetClick="handleResetClick" />
    <UserContent ref="contentRef" @newClick="handleNewClick" @editClick="handleEditClick" />
    <UserModal ref="modalRef" />
  </div>
</template>

<script setup lang="ts">
import UserContent from '@/views/main/system/user/cpns/UserContent.vue'
import UserSearch from '@/views/main/system/user/cpns/UserSearch.vue'
import { ref } from 'vue'
import UserModal from '@/views/main/system/user/cpns/UserModal.vue'

//对content组件的操作
const contentRef = ref<InstanceType<typeof UserContent>>()

const handleQueryClick = (formData: any) => {
  contentRef.value?.fetchUserListData(formData)
}
function handleResetClick() {
  contentRef.value?.fetchUserListData()
}

//是否显示新建用户的框
const modalRef = ref<InstanceType<typeof UserModal>>()
const handleNewClick = () => {
  modalRef.value?.setModalVisible()
}
const handleEditClick = (itemData: any) => {
  modalRef.value?.setModalVisible(false, itemData)
}
</script>

<style lang="less" scoped>
.user {
  border-radius: 10px;
  overflow: hidden;
}
</style>

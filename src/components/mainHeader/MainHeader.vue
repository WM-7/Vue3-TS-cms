<template>
  <div class="MainHeader">
    <div class="menu-icon" @click="handleMenuIconClick">
      <el-icon size="28px">
        <component :is="isFold ? 'Expand' : 'Fold'" />
      </el-icon>
    </div>
    <div class="content">
      <div class="breadcrumb">
        <HeaderCrumb />
      </div>
      <HeaderInfo />
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderInfo from '@/components/mainHeader/cpns/HeaderInfo.vue'
import HeaderCrumb from '@/components/mainHeader/cpns/HeaderCrumb.vue'
import { ref } from 'vue'

//自定义事件
const emit = defineEmits(['foldChange'])

const isFold = ref(false)
const handleMenuIconClick = () => {
  //1.内部改变状态
  isFold.value = !isFold.value

  //2.将事件和状态传递给父组件（自定义事件 父组件拿到状态改变aside的宽度）
  emit('foldChange', isFold.value)
}
</script>

<style lang="less" scoped>
.MainHeader {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;

  .menu-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }
}
</style>

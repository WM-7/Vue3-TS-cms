<template>
  <div class="main">
    <el-container class="main-container">
      <el-aside :width="isCollapse ? '60px' : ' 210px'">
        <MainMenu :isCollapse="isCollapse" />
      </el-aside>
      <el-container>
        <el-header>
          <MainHeader @fold-change="handleFoldChange" />
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import MainMenu from '@/components/mainMenu/MainMenu.vue'
import MainHeader from '@/components/mainHeader/MainHeader.vue'
import { ref } from 'vue'

//定义函数来处理main-header中折叠的变化
const isCollapse = ref(false)
const handleFoldChange = (isFold: boolean) => {
  isCollapse.value = isFold
}
</script>

<style lang="less" scoped>
.main {
  height: 100%;
}
.main-container {
  height: 100%;

  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    background-color: #001529;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */

    transition: width 0.3s ease;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .el-main {
    background-color: #f0f2f5;
  }
}
</style>

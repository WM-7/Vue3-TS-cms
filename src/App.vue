<template>
  <div class="app">
    <!--    <router-link to="main">首页</router-link>-->
    <!--    <router-link to="login">登录</router-link>-->
    <el-config-provider :locale="zhCn">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>

<style scoped>
.app {
  width: 100vw;
  height: 100vh;
}
</style>

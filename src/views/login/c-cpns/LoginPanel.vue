<template>
  <div class="loginPanel">
    <!--标题-->
    <h1 class="title">后台管理系统</h1>

    <!--tabs切换-->
    <el-tabs type="border-card" stretch v-model="activeName">
      <el-tab-pane label="账号登录" name="account">
        <template #label>
          <div class="label">
            <el-icon><UserFilled /></el-icon>
            <span class="text">账号登录</span>
          </div>
        </template>
        <PaneAccount ref="accountRef" />
      </el-tab-pane>

      <el-tab-pane label="手机号登录" name="phone">
        <template #label>
          <div class="label">
            <el-icon><Iphone /></el-icon>
            <span class="text">手机号登录</span>
          </div>
        </template>
        <PanePhone />
      </el-tab-pane>
    </el-tabs>

    <!--checkbox-->
    <div class="checkbox">
      <el-checkbox v-model="isRememberPwd" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>

    <!--login-btn-->
    <el-button
      class="login-btn"
      type="primary"
      size="large"
      @click="loginBtnClick"
    >
      立即登录
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import PaneAccount from '@/views/login/c-cpns/PaneAccount.vue'
import PanePhone from '@/views/login/c-cpns/PanePhone.vue'
import { localCache } from '@/utils/cache'

const activeName = ref<string>('account')
const isRememberPwd = ref<boolean>(
  localCache.getCache('isRememberPwd') ?? false
)
watch(isRememberPwd, (newValue) => {
  localCache.setCache('isRememberPwd', newValue)
})

//获取子组件的实例
const accountRef = ref<InstanceType<typeof PaneAccount>>()

const loginBtnClick = () => {
  if (activeName.value == 'account') {
    // console.log('账号登录')
    // 父组件中执行子组件中方法
    //1. 获取子组件的实例
    //2. 调用方法
    accountRef.value?.loginAction(isRememberPwd.value)
  } else {
    console.log('手机登录')
  }
}
</script>

<style lang="less" scoped>
.loginPanel {
  width: 330px;

  .title {
    text-align: center;
  }

  .label {
    display: flex;
    justify-content: center;
    align-items: center;

    .text {
      margin-left: 5px;
    }
  }

  .checkbox {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .login-btn {
    width: 100%;
  }
}
</style>

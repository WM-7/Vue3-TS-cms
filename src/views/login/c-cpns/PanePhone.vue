<template>
  <div class="PanePhone">
    <el-form label-width="60px" size="large">
      <el-form-item label="手机号">
        <el-input />
      </el-form-item>
      <el-form-item label="验证码">
        <div class="verify-code">
          <el-input />
          <el-button type="primary" class="get-btn">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
.verify-code {
  display: flex;

  .get-btn {
    margin-left: 8px;
  }
}
</style>

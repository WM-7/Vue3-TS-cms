<template>
  <div class="userSearch">
    <!--1.输入搜索关键字的表单-->
    <el-form size="large" label-width="80px" :model="searchFrom" ref="formRef">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="searchFrom.name" placeholder="请输入查询的用户名" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名" prop="realname">
            <el-input v-model="searchFrom.realname" placeholder="请输入查询的真实姓名" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="电话号码" prop="cellphone">
            <el-input v-model="searchFrom.cellphone" placeholder="请输入查询的电话号码" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态" prop="enable">
            <el-select v-model="searchFrom.enable" placeholder="请选择查询状态" style="width: 100%">
              <el-option label="启用" :value="1" />
              <el-option label="禁用" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间" prop="createAt">
            <el-date-picker
              v-model="searchFrom.createAt"
              type="daterange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!--重置和搜索的按钮-->
    <div class="btns">
      <el-button icon="Refresh" @click="handleResetClick">重置</el-button>
      <el-button icon="Search" type="primary" @click="handleQueryClick">查询</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { ElForm } from 'element-plus'

//定义自定义事件
const emit = defineEmits(['queryClick', 'resetClick'])

//定义form数据
const searchFrom = reactive({
  name: '',
  realname: '',
  cellphone: '',
  enable: 1,
  createAt: ''
})

//重置
const formRef = ref<InstanceType<typeof ElForm>>()
const handleResetClick = () => {
  // searchFrom.name = ''
  // 1.form中的数据全部重置
  formRef.value?.resetFields()

  // 2.将事件出去, content内部重新发送网络请求
  emit('resetClick')
}
//查询
const handleQueryClick = () => {
  emit('queryClick', searchFrom)
}
</script>

<style lang="less" scoped>
.userSearch {
  background-color: white;
  padding: 20px;

  .el-form-item {
    padding: 20px 30px;
    margin-bottom: 0;
  }

  .btns {
    text-align: right;
    padding: 0 50px 10px 0;

    .el-button {
      height: 36px;
    }
  }
}
</style>

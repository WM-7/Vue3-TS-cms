<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? modalConfig.header.newTitle : modalConfig.header.editTitle"
      width="30%"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="80px" size="large">
          <template v-for="item in modalConfig.formItems" :key="item.prop">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input v-model="formData[item.prop]" :placeholder="item.placeholder" />
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="formData[item.prop]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  v-model="formData[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select>
              </template>
              <template v-if="item.type === 'custom'">
                <slot :name="item.slotName"></slot>
              </template>
            </el-form-item>
          </template>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import useSystemStore from '@/stores/main/system/system'

// import type { IModalProps } from './type'

// interface IModalConfig

interface IModalProps {
  modalConfig: {
    pageName: string
    header: {
      newTitle: string
      editTitle: string
    }
    formItems: any[]
  }
  otherInfo?: any
}

// 0.定义props
const props = defineProps<IModalProps>()

// 1.定义内部的属性
const dialogVisible = ref(false)
const initialData: any = {}
for (const item of props.modalConfig.formItems) {
  initialData[item.prop] = item.initialValue ?? ''
}
const formData = reactive<any>(initialData)
const isNewRef = ref(true)
const editData = ref()

// 2.获取roles/departments数据
const systemStore = useSystemStore()

// 2.定义设置dialogVisible方法
function setModalVisible(isNew: boolean = true, itemData?: any) {
  dialogVisible.value = true
  isNewRef.value = isNew
  if (!isNew && itemData) {
    // 编辑数据
    for (const key in formData) {
      formData[key] = itemData[key]
    }
    editData.value = itemData
  } else {
    // 新建数据
    for (const key in formData) {
      const item = props.modalConfig.formItems.find((item) => item.prop === key)
      formData[key] = item ? item.initialValue : ''
    }
    editData.value = null
  }
}

// 3.点击了确定的逻辑
function handleConfirmClick() {
  dialogVisible.value = false

  let infoData = formData
  if (props.otherInfo) {
    infoData = { ...infoData, ...props.otherInfo }
  }

  if (!isNewRef.value && editData.value) {
    // 编辑用户的数据
    systemStore.editPageDataAction(props.modalConfig.pageName, editData.value.id, infoData)
  } else {
    // 创建新的部门
    systemStore.newPageDataAction(props.modalConfig.pageName, infoData)
  }
}

// 暴露的属性和方法
defineExpose({ setModalVisible })
</script>

<style lang="less" scoped>
.form {
  padding: 0 20px;
}
</style>

<template>
  <div class="userContent">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button type="primary" @click="handleNewUserClick" v-if="isCreate">新建用户</el-button>
    </div>

    <div class="table">
      <el-table :data="usersList" border style="width: 100%">
        <el-table-column align="center" type="selection" width="50px" />
        <el-table-column align="center" type="index" label="序号" width="60px" />

        <el-table-column align="center" label="用户名" prop="name" width="150px" />
        <el-table-column align="center" label="真实姓名" prop="realname" width="150px" />
        <el-table-column align="center" label="手机号码" prop="cellphone" width="150px" />

        <el-table-column align="center" label="状态" prop="enable" width="100px">
          <!--作用域插槽-->
          <template #default="scope">
            <el-button size="small" :type="scope.row.enable ? 'primary' : 'danger'" plain>
              {{ scope.row.enable ? '启用' : '禁用' }}
            </el-button>
          </template>
        </el-table-column>

        <el-table-column align="center" label="创建时间" prop="createAt">
          <template #default="scope">
            {{ formatUTC(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="更新时间" prop="updateAt">
          <template #default="scope">
            {{ formatUTC(scope.row.updateAt) }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" width="150px">
          <template #default="scope">
            <el-button
              v-if="isUpdate"
              size="small"
              icon="Edit"
              type="primary"
              text
              @click="handleEditBtnClick(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              v-if="isDelete"
              size="small"
              icon="Delete"
              type="danger"
              text
              @click="handleDeleteBtnClick(scope.row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total,sizes, prev, pager, next, jumper"
        :total="usersTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import useSystemStore from '@/stores/main/system/system'
import { storeToRefs } from 'pinia'
import { formatUTC } from '@/utils/format'
import { ref } from 'vue'
import usePermissions from '@/hooks/usePermissions'

// 定义事件
const emit = defineEmits(['newClick', 'editClick'])

// 用户的权限判断
const isCreate = usePermissions('users:create')
const isDelete = usePermissions('users:delete')
const isUpdate = usePermissions('users:delete')
const isQuery = usePermissions('users:query')

//1.发起action，请求usersList数据
const systemStore = useSystemStore()
const currentPage = ref(1)
const pageSize = ref(10)
fetchUserListData()

//2.获取usersList数据，进行展示
const { usersList, usersTotalCount } = storeToRefs(systemStore)

//3.页码相关逻辑
const handleSizeChange = () => {
  fetchUserListData()
}
const handleCurrentChange = () => {
  fetchUserListData()
}

//4.定义函数，用于发送网络请求
function fetchUserListData(formData: any = {}) {
  if (!isQuery) return
  // 1.获取offset/size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageInfo = { size, offset }

  // 2.发起网络请求
  const queryInfo = { ...pageInfo, ...formData }
  systemStore.postUsersListAction(queryInfo)
}

//5.编辑和删除的操作
const handleDeleteBtnClick = (id: number) => {
  systemStore.deleteUserByIdAction(id)
}
const handleEditBtnClick = (itemData: any) => {
  emit('editClick', itemData)
}

//6.新建用户的操作
const handleNewUserClick = () => {
  emit('newClick')
}

//把网络请求暴露出去
defineExpose({ fetchUserListData })
</script>

<style lang="less" scoped>
.userContent {
  background-color: white;
  margin-top: 20px;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 10px;

  .title {
    font-size: 22px;
  }
}

.table {
  :deep(.el-table__cell) {
    padding: 12px 0;
  }

  .el-button {
    margin-left: 0;
    padding: 5px 8px;
  }
}
.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>

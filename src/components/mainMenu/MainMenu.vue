<template>
  <div class="MainMenu">
    <div class="logo">
      <img src="@/assets/img/logo.svg" alt="" />
      <h2 class="title" v-show="!isCollapse">管理系统</h2>
    </div>
    <div class="menu">
      <el-menu
        :default-active="defaultActive"
        :collapse="isCollapse"
        text-color="#b7bdc3"
        active-text-color="#fff"
        background-color="#001529"
      >
        <!--遍历数据 显示侧边栏-->
        <template v-for="item in userMenus" :key="item.id">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <!-- 字符串: el-icon-monitor => 组件 component动态组件 -->
              <el-icon>
                <component :is="item.icon.split('-icon-')[1]" />
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item :index="subitem.id + ''" @click="handleItemClick(subitem)">
                {{ subitem.name }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from '@/stores/login/login'
import { useRoute, useRouter } from 'vue-router'
import { computed, ref } from 'vue'
import { mapPathToMenu } from '@/utils/mapMenus'

//1.获取动态的菜单
const LoginStore = useLoginStore()
const userMenus = LoginStore.userMenus

const props = defineProps({
  isCollapse: {
    type: Boolean,
    default: false
  }
})

//2.监听item点击
const router = useRouter()
const handleItemClick = (item: any) => {
  const url = item.url
  router.push(url)
}

// 3.ElMenu的默认菜单
const route = useRoute()
const defaultActive = computed(() => {
  const pathMenu = mapPathToMenu(route.path, userMenus)
  return pathMenu.id + ''
})
</script>

<style lang="less" scoped>
.MainMenu {
  height: 100%;
  background-color: #001529;
}
.logo {
  display: flex;
  height: 28px;
  padding: 12px 10px 8px 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;

  img {
    height: 100%;
    margin: 0 10px;
  }

  .title {
    font-size: 16px;
    font-weight: 700;
    color: white;
    white-space: nowrap;
  }
}

.el-menu {
  border-right: none;
  user-select: none;
}

.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135;
  }

  .el-menu-item:hover {
    color: #fff;
  }

  .el-menu-item.is-active {
    background-color: #0a60bd;
  }
}
</style>

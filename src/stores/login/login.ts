import { defineStore } from 'pinia'
import { getUserInfoById, getUserMenusByRoleId, loginAccountRequest } from '@/service/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import router from '@/router'

import { LOGIN_TOKEN } from '@/global/constants'
import { mapMenusToPermissions, mapMenusToRoutes } from '@/utils/mapMenus'
import useMainStore from '@/stores/main/main'

interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
  permissions: string[]
}

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: '',
    userInfo: {},
    userMenus: [],
    permissions: []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      //1.账号登录，获取token等信息
      const loginResult = await loginAccountRequest(account)
      // console.log(loginResult)
      const id = loginResult.data.id
      this.token = loginResult.data.token

      //4. 进行本地缓存
      localCache.setCache(LOGIN_TOKEN, this.token)

      //2. 获取登录用户详细身份信息（角色信息）
      const userInfoResult = await getUserInfoById(id)
      const userInfo = userInfoResult.data
      this.userInfo = userInfo

      //3.根据角色请求用户的权限（菜单menus）
      const userMenusResult = await getUserMenusByRoleId(this.userInfo.role.id)
      const userMenus = userMenusResult.data
      this.userMenus = userMenus

      //4. 进行本地缓存
      localCache.setCache('userInfo', userInfo)
      localCache.setCache('userMenus', userMenus)

      //5.请求所用的roles/departments
      const mainStore = useMainStore()
      await mainStore.fetchEntireDataAction()

      //重要：获取登录用户的所有按钮权限
      const permissions = mapMenusToPermissions(userMenus)
      this.permissions = permissions

      //重要步骤：动态添加路由
      const routes = mapMenusToRoutes(userMenus)
      routes.forEach((route) => router.addRoute('main', route))

      //3. 页面跳转（main页面）
      await router.push('/main')
    },

    loadLocalCacheAction() {
      // 1.用户进行刷新默认加载数据
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache('userInfo')
      const userMenus = localCache.getCache('userMenus')
      if (token && userInfo && userMenus) {
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus

        //5.请求所用的roles/departments
        const mainStore = useMainStore()
        mainStore.fetchEntireDataAction()

        //重要：获取登录用户的所有按钮权限
        const permissions = mapMenusToPermissions(userMenus)
        this.permissions = permissions

        // 2.动态添加路由
        const routes = mapMenusToRoutes(userMenus)
        routes.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})

export default useLoginStore

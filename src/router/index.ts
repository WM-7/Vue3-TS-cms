import { createRouter, createWebHashHistory } from 'vue-router'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'
import { firstMenu } from '@/utils/mapMenus'

const router = createRouter({
  history: createWebHashHistory(),
  //配置映射关系
  routes: [
    {
      path: '/',
      redirect: '/main' //重定向
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('@/views/main/Main.vue')
      // children: [
      //   {
      //     path: '/main/analysis/overview',
      //     component: () => import('@/views/main/analysis/overview/Overview.vue')
      //   },
      //   {
      //     path: '/main/analysis/dashboard',
      //     component: () => import('@/views/main/analysis/dashboard/Dashboard.vue')
      //   },
      //   {
      //     path: '/main/system/user',
      //     component: () => import('@/views/main/system/user/User.vue')
      //   },
      //   {
      //     path: '/main/system/role',
      //     component: () => import('@/views/main/system/role/Role.vue')
      //   }
      // ]
    },
    {
      path: '/login',
      component: () => import('@/views/login/Login.vue')
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('@/views/notFound/NotFound.vue')
    }
  ]
})

//导航守卫
router.beforeEach((to, from) => {
  const token = localCache.getCache(LOGIN_TOKEN)
  if (to.path.startsWith('/main') && !token) {
    //只有登录成功（token），才能真正的进入main页面
    return '/login'
  }
  // 如果是进入到main
  if (to.path === '/main') {
    return firstMenu?.url
  }
})

export default router

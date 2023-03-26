import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './assets/css/index.less'
import 'normalize.css'

import App from './App.vue'
import router from '@/router'

// 引入全局图标（Element-Plus）
import registerIcons from '@/global/register-icons'
import registerStore from '@/stores'
import useLoginStore from '@/stores/login/login'

// 引入组件样式Element-Plus script引入中的组件样式
// 1. 全局引入样式（所有样式全部引入）
// import 'element-plus/dist/index.css'
// 2. 组件样式引入
// import 'element-plus/theme-chalk/el-message.css'
// 3. 使用插件 vite-plugin-style-import
/*
 *  * npm install vite-plugin-style-import consola -D
 *  *在vite.config.ts中配置
 *
 * */
const app = createApp(App)

app.use(registerIcons)
app.use(registerStore)

app.use(router)

app.mount('#app')

import { BASE_URL, TIME_OUT } from './config'
import HYRequest from './request'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'

const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,

  //拦截器
  interceptors: {
    requestSuccessFn: (config) => {
      // 每一个请求都自动携带token
      const token = localCache.getCache(LOGIN_TOKEN)
      if (config.headers && token) {
        // 类型缩小
        config.headers.Authorization = 'Bearer ' + token
      }
      return config
    }
  }
})

export default hyRequest

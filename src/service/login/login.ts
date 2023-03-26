import hyRequest from '@/service'
import type { IAccount } from '@/types'

//根据账号进行登录
export function loginAccountRequest(account: IAccount) {
  return hyRequest.post({
    url: '/login',
    data: account
  })
}

//根据id获取用户详细信息
export function getUserInfoById(id: number) {
  return hyRequest.get({
    url: `/users/${id}`
    // headers: {
    //   Authorization: 'Bearer ' + localCache.getCache(LOGIN_TOKEN)
    // }
  })
}

//根据用户id查询角色菜单树
export function getUserMenusByRoleId(id: number) {
  return hyRequest.get({
    url: `/role/${id}/menu`
  })
}

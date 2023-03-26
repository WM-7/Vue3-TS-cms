import hyRequest from '@/service'

//获取所有的角色
export function getEntireRoles() {
  return hyRequest.post({
    url: '/role/list'
  })
}

//获取所有的部门
export function getEntireDepartments() {
  return hyRequest.post({
    url: '/department/list'
  })
}

//获取完整菜单
export function getEntireMenus() {
  return hyRequest.post({
    url: '/menu/list'
  })
}

import { defineStore } from 'pinia'
import {
  deletePageById,
  deleteUserById,
  editPageData,
  editUserData,
  newPageData,
  newUserData,
  postPageListData,
  postUsersListData
} from '@/service/main/system/system'
import type { ISystemState } from '@/stores/main/system/type'
import useMainStore from '@/stores/main/main'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0,

    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    //获取用户列表数据
    async postUsersListAction(queryInfo: any) {
      const usersListResult = await postUsersListData(queryInfo)
      const { totalCount, list } = usersListResult.data
      this.usersTotalCount = totalCount
      this.usersList = list
    },

    //根据id删除数据
    async deleteUserByIdAction(id: number) {
      //1.删除数据的操作
      const deleteResult = await deleteUserById(id)
      console.log(deleteResult)

      //2.重新请求信的数据
      await this.postUsersListAction({ offset: 0, size: 10 })
    },

    //创建新用户
    async newUserDataAction(userInfo: any) {
      // 1.创建新的用户
      const newResult = await newUserData(userInfo)
      // 2.重新请求新的数据
      await this.postUsersListAction({ offset: 0, size: 10 })
    },

    //编辑用户
    async editUserDataAction(id: number, userInfo: any) {
      // 1.更新用户的数据
      const editResult = await editUserData(id, userInfo)
      console.log(editResult)

      // 2.重新请求新的数据
      await this.postUsersListAction({ offset: 0, size: 10 })
    },

    /** 针对页面的数据: 增删改查 */
    async postPageListAction(pageName: string, queryInfo: any) {
      const pageListResult = await postPageListData(pageName, queryInfo)
      const { totalCount, list } = pageListResult.data

      this.pageList = list
      this.pageTotalCount = totalCount
    },
    async deletePageByIdAction(pageName: string, id: number) {
      const deleteResult = await deletePageById(pageName, id)
      console.log(deleteResult)
      await this.postPageListAction(pageName, { offset: 0, size: 10 })

      //3.获取完整的数据
      const mainStore = useMainStore()
      await mainStore.fetchEntireDataAction()
    },
    async newPageDataAction(pageName: string, pageInfo: any) {
      const newResult = await newPageData(pageName, pageInfo)
      console.log(newResult)
      await this.postPageListAction(pageName, { offset: 0, size: 10 })

      //3.获取完整的数据
      const mainStore = useMainStore()
      await mainStore.fetchEntireDataAction()
    },
    async editPageDataAction(pageName: string, id: number, pageInfo: any) {
      const editResult = await editPageData(pageName, id, pageInfo)
      console.log(editResult)
      await this.postPageListAction(pageName, { offset: 0, size: 10 })

      //3.获取完整的数据
      const mainStore = useMainStore()
      await mainStore.fetchEntireDataAction()
    }
  }
})

export default useSystemStore

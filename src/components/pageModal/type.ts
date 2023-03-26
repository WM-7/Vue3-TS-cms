export interface IModalConfig {
  pageName: string
  header: {
    newTitle: string
    editTitle: string
  }
  formItems: any[]
}

export interface IModalProps {
  modalConfig: {
    header: {
      newTitle: string
      editTitle: string
    }
    formItems: any[]
  }
}

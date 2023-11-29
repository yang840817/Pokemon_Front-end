import { defineStore } from 'pinia'


export const useSnackbarStore = defineStore('snackbar', () => {
    const isShow = ref(false)
    const message =ref('')
    const timeout = ref(0)
    const color =ref('success')
    function noticeType(boolean) {
      color.value = boolean ? 'success' : "error"
    }

  return { isShow, message, timeout, color, noticeType }
})

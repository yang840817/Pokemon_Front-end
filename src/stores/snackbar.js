import { defineStore } from 'pinia'


export const useSnackbarStore = defineStore('snackbar', () => {
    const isShow = ref(false)
    const message =ref('')

  return { isShow,message }
})

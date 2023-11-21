import { defineStore } from 'pinia'
import { API } from '../axios/api'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

export const useOauthStore = defineStore('oauth', () => {

  async function login(jsonData) {
  try {
    await API.post('/Auth/login', jsonData)
  } catch (error) {
    return  Promise.reject(error)
  }
}
 async function logout() {
  try {
    await API.post('/Auth/logout')
    userStore.user = {}
    console.log('logout user',userStore.user);


  } catch (error) {
    return Promise.reject(error)
  }
}
 async function register(jsonData) {
  try {
    const { data } = await API.post('/register', jsonData)
    return data.message
  } catch (error) {
    return Promise.reject(error)
  }
}


  return {login,logout,register }
})

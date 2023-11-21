import axios from 'axios'
import { defineStore } from 'pinia'
import { API } from '../axios/api'

export const useUserStore = defineStore('user', () => {
  const user = ref({})
    
  async function getInfo() {
    try {
      const {data} = await API.get(`/user`)
      user.value = data
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async function updateInfo(formData) {
    try {
      const {data} = await API.post('/user', formData)
      await uploadPhoto2S3(data.presignedUrl, formData.getAll('userPhoto')[0])
      
    } catch (error) {
    }
  }
  async function uploadPhoto2S3(s3Url, file)
  {
    // console.log(s3Url, file)
    try {
      await axios.put(s3Url, file )
    } catch (error) {
    }
  }


  return { user, getInfo, updateInfo }
})

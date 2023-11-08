import axios from '@axios'
import { defineStore } from 'pinia'
import { API } from '../axios/api'

export const useUserStore = defineStore('user', () => {
  const user = ref({})
    
  async function getInfo() {
    user.value = await API.get(`/user`).then(res => {
      if (res.status === 200) return res.data
    })
  }
  async function updateInfo(formData) {
    try {
      return await API.post('/user', formData).then(async res => {
        if (res.data.presignedUrl) {
          await uploadPhoto2S3(res.data.presignedUrl, formData.getAll('userPhoto')[0])
        } 
      })
    } catch (error) {
      return { type: 'negative', message: 'failed' }
    }
  }
  async function uploadPhoto2S3(s3Url, file)
  {
    console.log(s3Url, file)
    try {
      await axios.put(s3Url, file ).then(res =>  res )
    } catch (error) {
        
    }
  }


  return { user, getInfo, updateInfo }
})

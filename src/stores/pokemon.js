import { defineStore } from 'pinia'
import { API } from '../axios/api'

export const useRaceStore = defineStore('race', () => {
  const race = ref({})
  const raceList = ref({})

  async function fetchRaceList(page=1) {
    raceList.value = await API.get(`/races/?page=${page}`).then(res => {
      if (res.status === 200)
        return res.data
    })
  }
  async function createData(jsonData) {
    try {
      return await API.post('/races', jsonData).then(res => {
        if (res.status === 200) return { type: 'positive', message: 'Success' }
        else return { type: 'negative', message: 'failed' }
      })
    } catch (error) {
      return { type: 'negative', message: 'failed' }
    }
  }
  async function updateData(jsonData) {
    try {
      return await API.patch('/races', jsonData).then(res => {
        if (res.status === 200) return { type: 'positive', message: 'Success' }
        else return { type: 'negative', message: 'failed' }
      })
    } catch (error) {
      return { type: 'negative', message: 'failed' }
    }
  }

  return { race, raceList, fetchRaceList, createData, updateData }
})

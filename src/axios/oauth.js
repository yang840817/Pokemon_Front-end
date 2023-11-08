import { API } from './api'


export async function login(jsonData) {
  try {
    return await API.post('/Auth/login', jsonData).then(res => {
      if (res.status === 200) return { type: 'positive', message: 'Success' }
      else return { type: 'negative', message: 'failed' }
    })
  } catch (error) {
    return { type: 'negative', message: 'failed' }
  }
}
export async function logout() {
  try {
    return await API.post('/Auth/logout').then(res => {
      if (res.status === 200) return { type: 'positive', message: 'Success' }
      else return { type: 'negative', message: 'failed' }
    })
  } catch (error) {
    return { type: 'negative', message: 'failed' }
  }
}




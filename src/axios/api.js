import axios from '@axios'

const baseURL = import.meta.env.VITE_BASE_URL

export const API = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
  },
})

API.interceptors.request.use(
  config => {    
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

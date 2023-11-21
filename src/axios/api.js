import axios from 'axios'

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
API.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {    
    if (error.response) {
      // switch (error.response.status) {
      //   case 401:
      //     alert("token 無效");
      //     console.log(error.message);
      //     break;
      //   case 404:
      //     alert("頁面不存在");
      //     console.log(error.message);
      //     break;
      //   case 500:
      //     alert("程式發生問題");
      //     console.log(error.message);
      //     break;
      //   default:
      //     alert("程式發生問題");
      //     console.log(error.message);
      // }
    }
    return Promise.reject(error);
  }
);

import { defineStore } from 'pinia'
import { API } from '../axios/api'

export const useCartStore = defineStore('cart', () => {
  const cartItemList = ref({})


  async function getCart() {
    cartItemList.value = await API.get(`/cart_items`).then(res => {
      if (res.status === 200) return res.data
    })
  }
  async function addItem(jsonData) {
    try {
      return await API.post('/cart_items', jsonData).then(res => {
        if (res.status === 200) return { type: 'positive', message: 'Success' }
        else return { type: 'negative', message: 'failed' }
      })
    } catch (error) {
      return { type: 'negative', message: 'failed' }
    }
  }
  async function deleteItem(cart_item_id) {
    try {
      return await API.delete(`/cart_items/${cart_item_id}`).then(res => {
        if (res.status === 200) return { type: 'positive', message: 'Success' }
        else return { type: 'negative', message: 'failed' }
      })
    } catch (error) {
      return { type: 'negative', message: 'failed' }
    }
  }

  return { cartItemList, getCart, addItem }
})

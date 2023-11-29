import { defineStore } from "pinia";
import { API } from "../axios/api";

export const useCartStore = defineStore("cart", () => {
  const cartItemList = ref({});

  async function getCart() {
    try {
      const { data } = await API.get(`/cart_items`);
      cartItemList.value = data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async function addItem(id, quantity) {
    try {
      await API.post(`/cart_items/${id}`, { quantity });
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async function updateItem(id, quantity) {
    try {
      await API.put(`/cart_items/${id}`, { quantity });
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async function deleteItem(cart_item_id) {
    try {
      await API.delete(`/cart_items/${cart_item_id}`);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  return { cartItemList, getCart, addItem, updateItem, deleteItem };
});

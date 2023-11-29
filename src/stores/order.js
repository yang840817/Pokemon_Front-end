import { defineStore } from "pinia";
import { API } from "../axios/api";

export const useOrderStore = defineStore("order", () => {
  const orderList = ref({});
  const orderDetail = ref({});

  async function getOrder() {
    try {
      const { data } = await API.get(`/orders`);
      orderList.value = data.data.sort((a, b) => b.id - a.id);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async function getOrderDetail(order_id) {
    try {
      const { data } = await API.get(`/orders/${order_id}/order_details`);
      orderDetail.value = data.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  return { orderList, orderDetail, getOrder, getOrderDetail };
});

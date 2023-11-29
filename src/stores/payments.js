import axios from "axios";
import { defineStore } from "pinia";
import { API } from "../axios/api";

export const usePaymentsStore = defineStore("payments", () => {
  const payment_url = ref("");
  const mid = ref("");
  const hash = ref("");
  const edata1 = ref("");

  async function getNewebpayPayments() {
    try {
      const { data } = await API.post("/payments");
      payment_url.value = data.original.payment_url;
      mid.value = data.original.mid;
      hash.value = data.original.hash;
      edata1.value = data.original.edata1;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  return { payment_url, mid, hash, edata1, getNewebpayPayments };
});

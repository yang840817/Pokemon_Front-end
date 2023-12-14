import { defineStore } from "pinia";
import { API } from "../axios/api";

export const useRaceStore = defineStore("race", () => {
  const race = ref({});
  const raceList = ref({});

  async function fetchRaceList(page = 1) {
    try {
      const { data } = await API.get(`/races/?page=${page}`);
      raceList.value = data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  return { race, raceList, fetchRaceList };
});

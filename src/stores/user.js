import axios from "axios";
import { defineStore } from "pinia";
import { API } from "../axios/api";

export const useUserStore = defineStore("user", () => {
  const user = ref({});

  async function getInfo() {
    try {
      const { data } = await API.get(`/user`);
      user.value = data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async function updateInfo(formData) {
    try {
      const { data } = await API.post("/user", formData);
      if (data.presignedUrl)
        await uploadPhoto2S3(
          data.presignedUrl,
          formData.getAll("userPhoto")[0]
        );
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }
  async function uploadPhoto2S3(s3Url, file) {
    try {
      await axios.put(s3Url, file);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  return { user, getInfo, updateInfo };
});

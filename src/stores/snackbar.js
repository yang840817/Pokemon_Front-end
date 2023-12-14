import { defineStore } from "pinia";

export const useSnackbarStore = defineStore("snackbar", () => {
  const isShow = ref(false);
  const message = ref("");
  const timeout = ref(0);
  const color = ref("success");
  function noticeType(boolean) {
    color.value = boolean ? "success" : "error";
  }
  function noticeSetting(config) {
    message.value = config.message;
    isShow.value = config.isShow;
    timeout.value = config.timeout;
    noticeType(config.noticeType);
  }

  return { isShow, message, timeout, color, noticeType, noticeSetting };
});

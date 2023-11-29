<script setup>
import { onBeforeMount } from "vue";
import { useOrderStore } from "@/stores/order";
import { useSnackbarStore } from "@/stores/snackbar";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";

const orderStore = useOrderStore();
const snackbarStore = useSnackbarStore();
const router = useRouter();
const route = useRoute();
const isOrderDetailDialogVisible = ref(false);
const targerOrder = ref({});

onBeforeMount(async () => {
  try {
    const { status, order } = route.query;
    if (status && order) {
      snackbarStore.message = `Order_No: ${order} Status:${status}`;
      snackbarStore.isShow = true;
      snackbarStore.timeout = 10000;
      snackbarStore.noticeType(status === "SUCCESS");
    }
    router.replace("/order");
    await orderStore.getOrder();
  } catch (error) {
    router.replace("/login");
  }
});

async function readOrderDetail(order) {
  try {
    await orderStore.getOrderDetail(order.id);
    targerOrder.value = order;
    isOrderDetailDialogVisible.value = true;
  } catch (error) {}
}
</script>

<template>
  <div>
    <v-card class="mx-auto">
      <v-toolbar color="primary">
        <v-toolbar-title>Order History</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <VList>
        <v-list-item
          v-for="order in orderStore.orderList"
          :key="order.id"
          :title="`Order No : ${order.order_no}`"
          :subtitle="`Status : ${order.payment_status}`"
        >
          <template v-slot:prepend>
            <v-avatar>
              <v-icon v-if="order.payment_status === 'paid'" color="success">{{
                "mdi-clipboard-text"
              }}</v-icon>
              <v-icon v-else color="error">{{ "mdi-error" }}</v-icon>
            </v-avatar>
          </template>

          <template v-slot:append>
            <VBtn
              @click="readOrderDetail(order)"
              color="grey-lighten-1"
              icon="mdi-receipt-text-check-outline"
              variant="text"
            ></VBtn>
          </template>
        </v-list-item>
      </VList>
    </v-card>
    <orderDetailDialog
      v-model:isDialogVisible="isOrderDetailDialogVisible"
      :targerOrder="targerOrder"
    />
  </div>
</template>

<style scoped lang="scss"></style>

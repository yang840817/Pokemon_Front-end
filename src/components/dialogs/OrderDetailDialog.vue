<script setup>
import { useOrderStore } from "@/stores/order";

const orderStore = useOrderStore();
const props = defineProps({
  targerOrder: {
    type: Object,
    required: true,
  },
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["submit", "update:isDialogVisible"]);

const dialogModelValueUpdate = (val) => {
  emit("update:isDialogVisible", val);
};
const isPaymentSuccess = computed(() =>
  props.targerOrder.payment_status === "paid" ? "success" : "error"
);
const paymentIcon = computed(() => {
  if (props.targerOrder.payment_method === "credit_card")
    return "mdi-credit-card";
  if (props.targerOrder.payment_method === "bank-transfer")
    return "mdi-bank-transfer";
  if (props.targerOrder.payment_method === "cash_on_delivery")
    return "mdi-cash";
});
</script>

<template>
  <VDialog
    :width="500"
    :model-value="props.isDialogVisible"
    @update:model-value="dialogModelValueUpdate"
  >
    <!-- Dialog close btn -->
    <DialogCloseBtn @click="dialogModelValueUpdate(false)" />
    <VCard class="pa-5">
      <VCardTitle> Order: {{ props.targerOrder.order_no }} </VCardTitle>
      <VCardSubtitle> Detail </VCardSubtitle>
      <VList>
        <template v-for="item in orderStore.orderDetail" :key="item.id">
          <v-list-item :title="item.race_name" :subtitle="`x ${item.quantity}`">
            <template v-slot:append>
              <div>{{ `$${item.subtotal_price}` }}</div>
            </template>
          </v-list-item>
          <VDivider />
        </template>
        <!-- order information -->
        <v-list-item>
          <template v-slot:default>
            <VRow>
              <VCol cols="4">
                <div>Date</div>
                <div>
                  {{
                    new Date(props.targerOrder.created_at).toLocaleDateString()
                  }}
                </div>
              </VCol>
              <VCol cols="4" class="text-center">
                <div>Method</div>
                <v-icon :color="isPaymentSuccess">{{ paymentIcon }}</v-icon>
              </VCol>
              <VCol cols="4" class="d-flex align-center justify-end">
                <div>Total : ${{ props.targerOrder.total_price }}</div>
              </VCol>
            </VRow>
          </template>
        </v-list-item>
      </VList>
    </VCard>
  </VDialog>
</template>
<style scoped lang="scss">
:deep(.v-list-item-title) {
  text-transform: capitalize;
}
</style>

<script setup>
import { onBeforeMount } from "vue";
import { useCartStore } from "@/stores/cart";
import { usePaymentsStore } from "@/stores/payments";
import { useSnackbarStore } from "@/stores/snackbar";
import { useRouter } from "vue-router";

const cartStore = useCartStore();
const snackbarStore = useSnackbarStore();
const paymentsStore = usePaymentsStore();
const router = useRouter();
const newebpayForm = ref(null);
const isCartEmpty = computed(() => cartStore.cartItemList.totalPrice === 0);

onBeforeMount(async () => {
  try {
    await cartStore.getCart();
  } catch (error) {
    router.replace("/login");
  }
});

async function onQuinityChange(id, quantity) {
  try {
    await cartStore.updateItem(id, quantity);
    snackbarStore.message = "Update Successfully";
    snackbarStore.isShow = true;
    snackbarStore.timeout = 1500;
    snackbarStore.noticeType(true);
    cartStore.getCart();
  } catch (error) {
    cartStore.getCart();
    snackbarStore.message = error.response.data.error;
    snackbarStore.isShow = true;
    snackbarStore.timeout = 5000;
    snackbarStore.noticeType(false);
  }
}
async function onDeleteItem(id) {
  try {
    await cartStore.deleteItem(id);
    snackbarStore.message = "Already remove from your cart!";
    snackbarStore.isShow = true;
    snackbarStore.timeout = 1500;
    snackbarStore.noticeType(true);
    cartStore.getCart();
  } catch (error) {}
}
async function onPurchase() {
  try {
    await paymentsStore.getNewebpayPayments();
    newebpayForm.value.submit();
  } catch (error) {}
}
</script>

<template>
  <VRow v-if="!isCartEmpty" class="justify-center">
    <VCol cols="12">
      <VCard>
        <VList>
          <VToolbar color="rgba(100, 0, 0, 0)">
            <VToolbarTitle>Cart List</VToolbarTitle>
          </VToolbar>
          <VListItem
            v-for="item in cartStore.cartItemList.data"
            :key="item.id"
            :title="item.race_name"
            :prepend-avatar="item.race_photo"
            height="80"
          >
            <template #append>
              <div class="d-flex align-center">
                <span class="mr-5"
                  >${{ Number(item.current_price) * item.amount }}</span
                >
                <VCombobox
                  class="flex-grow-0"
                  @update:modelValue="onQuinityChange(item.race_id, $event)"
                  :model-value="item.amount"
                  :items="[1, 2, 3, 4, 5, 6, 7, 8, 8, 9, 10]"
                  variant="outlined"
                />
                <VBtn
                  class="ml-2"
                  icon="mdi-trash-can"
                  color="#FF384D"
                  @click="onDeleteItem(item.id)"
                />
              </div>
            </template>
          </VListItem>
        </VList>

        <div class="d-flex">
          <VCardText
            >Total Price: $ {{ cartStore.cartItemList.totalPrice }}</VCardText
          >
          <VCardActions>
            <VBtn @click="onPurchase">Purchase</VBtn>
          </VCardActions>
        </div>
      </VCard>
      <form
        ref="newebpayForm"
        class="d-none"
        name="Spgateway"
        :action="paymentsStore.payment_url"
        method="POST"
      >
        MerchantID:
        <input type="text" name="MerchantID" :value="paymentsStore.mid" /><br />
        TradeInfo:
        <input
          type="text"
          name="TradeInfo"
          :value="paymentsStore.edata1"
        /><br />
        TradeSha:
        <input type="text" name="TradeSha" :value="paymentsStore.hash" /><br />
        Version:
        <input type="text" name="Version" value="2.0" /><br />
      </form>
    </VCol>
  </VRow>
  <VRow v-else>
    <div class="w-100 text-center">
      <VBtn to="/shop" class="my-12"> Go to Shop </VBtn>
      <VImg alt="Coming Soon" :max-height="500" />
      <p>Your shopping cart is empty, go to add items</p>
    </div>
  </VRow>
</template>

<style scoped lang="scss">
:deep(.v-list-item-title) {
  text-transform: capitalize;
}
</style>

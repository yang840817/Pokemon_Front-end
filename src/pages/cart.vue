<script setup>
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()

cartStore.getCart()
</script>

<template>
  <VRow class="justify-center">
    <VCol
      cols="12"
      sm="8"
      md="6"
      loading
      title="Card title"
      subtitle="Subtitle"
      text="..."
      variant="outlined"
    >
      <VCard>
        <!--
          <div class="d-flex">
          <VCardTitle class="text-h6  ">
          {{ item.race_name }}
          </VCardTitle>
          <VImg
          class="align-end text-white"
          :src="item.race_photo"
          />
          <VCardText>${{ item.current_price }}</VCardText>
          <VCombobox
          class="flex-grow-0"
          :model-value="item.amount"
          :items="[1,2,3,4,5,6,7,8,8,9,10]"
          variant="outlined"
          />
          </div> 
        -->
        <VList>
          <VToolbar color="rgba(100, 0, 0, 0)">
            <VToolbarTitle>購物清單</VToolbarTitle>
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
                <p>${{ Number(item.current_price).toFixed(0) }}</p>
                <VCombobox
                  class="flex-grow-0"
                  :model-value="item.amount"
                  :items="[1,2,3,4,5,6,7,8,8,9,10]"
                  variant="outlined"
                />
              </div>
            </template>
          </VListItem>
        </VList> 
        <VCardActions>
          <VBtn>Click me</VBtn>
        </VCardActions>
      </VCard>

      <pre>  {
    "id": 27,
    "amount": 1,
    "current_price": "778.00",
    "race_name": "bulbasaur",
    "race_photo": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    "race_id": 1
  }</pre>
    </VCol>
  </VRow>
</template>

<style scoped lang="scss"></style>

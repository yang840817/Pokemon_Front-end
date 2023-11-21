<script setup>
import { onBeforeMount } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const router =useRouter()

onBeforeMount(async()=>{
  try {
  await cartStore.getCart()
  } catch (error) {
    router.push('/login')
  }
}) 
</script>

<template>
  <VRow class="justify-center">
    <VCol
      cols="12"
      loading
      title="Card title"
      subtitle="Subtitle"
      text="..."
      variant="outlined"
    >
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
                <span class="mr-5">${{ Number(item.current_price)* item.amount }}</span>
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

      <!-- <pre>  {
    "id": 27,
    "amount": 1,
    "current_price": "778.00",
    "race_name": "bulbasaur",
    "race_photo": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    "race_id": 1
  }</pre> -->
    </VCol>
  </VRow>
</template>

<style scoped lang="scss"></style>

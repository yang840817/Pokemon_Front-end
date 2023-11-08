<script setup>
import { useCartStore } from '@/stores/cart'
import { useRaceStore } from '@/stores/pokemon'


const raceStore = useRaceStore()
const cartStore = useCartStore()

async function changPage(e) {
  raceStore.fetchRaceList(e)
}

raceStore.fetchRaceList()

const pokemons = computed(() => { return raceStore.raceList.data })
</script>

<template>
  <div>
    <section>
      <VRow>
        <VCol
          v-for="pokemon in pokemons"
          :key="pokemon.name"
          cols="12"
          sm="6"
          md="3"
        >
          <VCard>
            <VToolbar color="rgba(100, 0, 0, 0)">
              <VToolbarTitle class="text-h6 pokemon-name ">
                {{ pokemon.name }}
              </VToolbarTitle>
              <VBtn
                icon="mdi-cart-plus"
                @click="cartStore.addItem(({
                  race_id:pokemon.id,quantity:1
                }))"
              />
            </VToolbar>

            <VImg
              class="align-end text-white mb-3"
              height="96"
              :src="pokemon.photo"
            />
          </VCard>
        </VCol>
      </VRow>
    </section>
    <section class="d-flex align-center justify-sm-space-between justify-center flex-wrap gap-3 pt-3">
      <VDivider />
      <p class="text-sm text-disabled mb-0">
        total:{{ raceStore.raceList.total }}
      </p>
      <div class="text-center">
        <VPagination
          v-model="raceStore.raceList.current_page"
          :total-visible="5"
          :length="raceStore.raceList.last_page"
          rounded="circle"
          @update:model-value="changPage"
        />
      </div>
    </section>
  </div>
</template>

<style  lang="scss" scoped>
:deep(.v-toolbar-title__placeholder) {
  text-transform: capitalize;
}
</style>

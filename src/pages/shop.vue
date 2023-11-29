<script setup>
import { onBeforeMount, watchEffect } from "vue";
import { useCartStore } from "@/stores/cart";
import { useRaceStore } from "@/stores/pokemon";
import { useSnackbarStore } from "@/stores/snackbar";
import { useRouter, useRoute } from "vue-router";

const cartStore = useCartStore();
const raceStore = useRaceStore();
const snackbarStore = useSnackbarStore();
const router = useRouter();
const route = useRoute();

onBeforeMount(async () => {
  try {
    const { page } = route.query;
    if (page) {
      raceStore.fetchRaceList(page);
    } else {
      raceStore.fetchRaceList();
    }
  } catch (error) {}
});
watchEffect(() => {
  const { page } = router.currentRoute.value.query;
  if (page) {
    raceStore.fetchRaceList(page);
  }
});
async function changPage(e) {
  raceStore.fetchRaceList(e);
  router.push({ query: { page: e } });
}

const pokemons = computed(() => {
  return raceStore.raceList.data;
});
async function onAddItem(id) {
  try {
    await cartStore.addItem(id, 1);
    snackbarStore.message = "Added Successfully";
    snackbarStore.isShow = true;
    snackbarStore.timeout = 1500;
    snackbarStore.noticeType(true);
  } catch (error) {
    console.log(error);
    if (error.response.status === 401) return router.push("/login");
    snackbarStore.message = error.response.data.message;
    snackbarStore.isShow = true;
    snackbarStore.timeout = 10000;
    snackbarStore.noticeType(false);
  }
}
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
              <VToolbarTitle class="text-h6 pokemon-name">
                {{ pokemon.name }}
              </VToolbarTitle>
              <VBtn
                v-if="pokemon.stock"
                icon="mdi-cart-plus"
                color="#00F3FF"
                @click="onAddItem(pokemon.id)"
              />
              <VCardText v-else class="flex-grow-0">Sold Out</VCardText>
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
    <section
      class="d-flex align-center justify-sm-space-between justify-center flex-wrap gap-3 pt-3"
    >
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

<style lang="scss" scoped>
:deep(.v-toolbar-title__placeholder) {
  text-transform: capitalize;
}
</style>

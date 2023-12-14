<script setup>
import { onBeforeMount } from "vue";
import { avatarText } from "@core/utils/formatters";
import { useUserStore } from "@/stores/user";
import { usePokemonStore } from "@/stores/userPokemon";
import { useSnackbarStore } from "@/stores/snackbar";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const pokemonStore = usePokemonStore();
const snackbarStore = useSnackbarStore();
const router = useRouter();
const isUserInfoEditDialogVisible = ref(false);
const expand = ref(false);
const isConfirmDialogVisible = ref(false);
const confirmationQuestion = ref("");
const targetPokemonID = ref(0);

onBeforeMount(async () => {
  try {
    await userStore.getInfo();
    await pokemonStore.getPokemon();
  } catch (error) {
    router.replace("/login");
  }
});

async function updateUserData(formData) {
  try {
    await userStore.updateInfo(formData);
    snackbarStore.noticeSetting({
      message: "Profile update success",
      isShow: true,
      timeout: 5000,
      noticeType: true,
    });
    userStore.getInfo();
  } catch (error) {
    snackbarStore.noticeSetting({
      message: error,
      isShow: true,
      timeout: 5000,
      noticeType: false,
    });
  }
}

function onRelease(pokemon) {
  const pokemonName =
    (pokemon.name || pokemon.race).charAt(0).toUpperCase() +
    (pokemon.name || pokemon.race).slice(1);
  confirmationQuestion.value = `Please make sure to release 【${pokemonName}】`;
  targetPokemonID.value = pokemon.id;
  isConfirmDialogVisible.value = true;
}
async function onConfirm(boolean) {
  if (boolean) {
    try {
      await pokemonStore.deletePokemon(targetPokemonID.value);
      snackbarStore.noticeSetting({
        message: "Release Success",
        isShow: true,
        timeout: 5000,
        noticeType: true,
      });
      pokemonStore.getPokemon();
    } catch (error) {}
  }
}
</script>

<template>
  <div>
    <VRow>
      <!-- SECTION User Details -->
      <VCol cols="12" md="3">
        <div class="pa-4">User Profile</div>
        <VCard v-if="userStore.user">
          <VCardText class="text-center pt-15">
            <!-- 👉 Avatar -->
            <VAvatar
              rounded
              :size="100"
              :color="!userStore.user.avatar ? 'primary' : undefined"
              :variant="!userStore.user.avatar ? 'tonal' : undefined"
            >
              <VImg v-if="userStore.user.photo" :src="userStore.user.photo" />
              <span v-else class="text-5xl font-weight-medium">
                {{ avatarText(userStore.user.name) }}
              </span>
            </VAvatar>

            <!-- 👉 User name -->
            <h6 class="text-h4 mt-4">
              {{ userStore.user.name }}
            </h6>
          </VCardText>

          <VDivider />

          <!-- 👉 Details -->
          <VCardText>
            <span class="text-sm text-uppercase text-disabled">Details</span>

            <!-- 👉 User Details list -->
            <VList class="card-list mt-2">
              <VListItem>
                <VListItemTitle>
                  <h6 class="text-h6">
                    Username:
                    <span class="text-body-1">
                      {{ userStore.user.name }}
                    </span>
                  </h6>
                </VListItemTitle>
              </VListItem>

              <VListItem>
                <VListItemTitle>
                  <h6 class="text-h6">
                    Email:
                    <span class="text-body-1">{{ userStore.user.email }}</span>
                  </h6>
                </VListItemTitle>
              </VListItem>
            </VList>
          </VCardText>

          <!-- 👉 Edit and Suspend button -->
          <VCardText class="d-flex justify-center">
            <VBtn
              variant="elevated"
              class="me-4"
              @click="isUserInfoEditDialogVisible = true"
            >
              Edit
            </VBtn>
          </VCardText>
        </VCard>
      </VCol>
      <VCol cols="12" md="9">
        <div class="d-flex justify-space-between align-center">
          <div class="pa-4">Pokémon you own</div>
          <v-btn @click="expand = !expand">
            {{ !expand ? "Details" : "Hide" }}
          </v-btn>
        </div>
        <VRow v-if="pokemonStore.pokemonList.length">
          <VCol
            v-for="pokemon in pokemonStore.pokemonList"
            :key="pokemon.id"
            cols="12"
            sm="6"
            lg="4"
          >
            <v-card class="mx-auto">
              <v-card-item
                class="pb-0"
                :subtitle="pokemon.name ? pokemon.name : pokemon.race"
              >
              </v-card-item>

              <v-card-text class="py-0">
                <v-row align="center" no-gutters>
                  <v-col class="text-h3" cols="8">LV.{{ pokemon.level }}</v-col>

                  <v-col cols="4" class="text-right">
                    <VImg :src="pokemon.photo"></VImg>
                  </v-col>
                </v-row>
              </v-card-text>

              <div class="d-flex py-3 justify-space-between">
                <v-list-item density="compact" prepend-icon="mdi-fire">
                  <v-list-item-subtitle>{{
                    pokemon.ability
                  }}</v-list-item-subtitle>
                </v-list-item>

                <v-list-item
                  density="compact"
                  prepend-icon="mdi-head-snowflake-outline"
                >
                  <v-list-item-subtitle>{{
                    pokemon.nature
                  }}</v-list-item-subtitle>
                </v-list-item>
              </div>
              <v-expand-transition>
                <div v-if="expand">
                  <v-divider></v-divider>
                  <v-list class="bg-transparent">
                    <v-list-subheader>Skills</v-list-subheader>
                    <v-list-item
                      v-for="skill in pokemon.skills"
                      :key="skill"
                      :title="skill"
                      prepend-icon="mdi-circle-medium"
                    >
                    </v-list-item>
                  </v-list>
                </div>
              </v-expand-transition>

              <v-divider></v-divider>

              <v-card-actions class="pa-2 d-flex align-center justify-center">
                <v-btn @click="onRelease(pokemon)" color="error"
                  >Release
                </v-btn>
              </v-card-actions>
            </v-card>
          </VCol>
        </VRow>
        <VRow v-else>
          <VCol>
            <VCard>
              <VCardText class="text-center">
                <VBtn to="/shop" class="my-12"> Go to Shop </VBtn>
                <p>You don't have any Pokémon.</p>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </VCol>
    </VRow>

    <!-- 👉 Edit user info dialog -->
    <ConfirmDialog
      v-model:isDialogVisible="isConfirmDialogVisible"
      :confirmationQuestion="confirmationQuestion"
      @confirm="onConfirm"
    />

    <UserInfoEditDialog
      v-model:isDialogVisible="isUserInfoEditDialogVisible"
      :user-data="userStore.user"
      @submit="updateUserData"
    />
  </div>
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 0.75rem;
}
.profile {
  position: fixed;
}
</style>

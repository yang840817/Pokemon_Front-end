<script setup>
import {
  avatarText,
} from '@core/utils/formatters'


import { useUserStore } from '@/stores/user'
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'


const userStore = useUserStore()
const router =useRouter()
const isUserInfoEditDialogVisible = ref(false)

onBeforeMount(async()=>{
  try {
    await userStore.getInfo()
  } catch (error) {
    router.push('/login')
  }
}) 




async function updateUserData(formData) {
  await userStore.updateInfo(formData)
  userStore.getInfo()
}

</script>

<template>
<div>
  <div v-if="userStore.user.name">
  <VRow>
    <!-- SECTION User Details -->
    <VCol
      cols="12"
      md="4"
    >
      <VCard v-if="userStore.user">
        <VCardText class="text-center pt-15">
          <!-- 👉 Avatar -->
          <VAvatar
            rounded
            :size="100"
            :color="!userStore.user.avatar ? 'primary' : undefined"
            :variant="!userStore.user.avatar ? 'tonal' : undefined"
          >
            <VImg
              v-if="userStore.user.photo"
              :src="userStore.user.photo"
            />
            <span
              v-else
              class="text-5xl font-weight-medium"
            >
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
          <p class="text-sm text-uppercase text-disabled">
            Details
          </p>

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
  </VRow>

  <!-- 👉 Edit user info dialog -->
  <UserInfoEditDialog
    v-model:isDialogVisible="isUserInfoEditDialogVisible"
    :user-data="userStore.user"
    @submit="updateUserData"
  />
  </div> 
</div>
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 0.75rem;
}

.text-capitalize {
  text-transform: capitalize !important;
}
</style>

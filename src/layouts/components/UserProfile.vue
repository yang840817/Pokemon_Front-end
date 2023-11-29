<script setup>
import { avatarText } from '@core/utils/formatters'
import { useUserStore } from '@/stores/user'
import { useOauthStore } from '@/stores/oauth'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const oauthStore = useOauthStore()
const router = useRouter()


async function onLogout() {
try {
  await oauthStore.logout()
  router.push({ path: '/' })
} catch (error) {
  
}
}
</script>

<template>
  <VBadge
    v-if="userStore.user.name"
    dot
    location="bottom right"
    offset-x="3"
    offset-y="3"
    bordered
    color="success"
  > 
    <VAvatar
      class="cursor-pointer"
      color="primary"
      variant="tonal"
    >
      <VImg 
        v-if="userStore.user.photo" 
        :src="userStore.user.photo" 
      />
      <span
        v-else
        class="font-weight-medium"
      >
        {{ avatarText(userStore.user.name) }}
      </span>

      <!-- SECTION Menu -->
      <VMenu
        activator="parent"
        width="230"
        location="bottom end"
        offset="14px"
      >
        <VList>
          <!-- 👉 User Avatar & Name -->
          <VListItem>
            <template #prepend>
              <VListItemAction start>
                <VBadge
                  dot
                  location="bottom right"
                  offset-x="3"
                  offset-y="3"
                  color="success"
                >
                  <VAvatar
                    color="primary"
                    variant="tonal"
                  >
                    <VImg 
                      v-if="userStore.user.photo"
                      :src="userStore.user.photo" 
                    />
                    <span 
                      v-else
                      class="font-weight-medium"
                    >
                      {{ avatarText(userStore.user.name) }}
                    </span>
                  </VAvatar>
                </VBadge>
              </VListItemAction>
            </template>

            <VListItemTitle class="font-weight-semibold">
              {{ userStore.user.name }}
            </VListItemTitle>
          </VListItem>

          <VDivider class="my-2" />

          <!-- 👉 Profile -->
          <VListItem to="/user">
            <template #prepend>
              <VIcon
                class="me-2"
                icon="tabler-user"
                size="22"
              />
            </template>

            <VListItemTitle>Profile</VListItemTitle>
          </VListItem>

          <!-- 👉 Order List -->
          <VListItem to="/order">
            <template #prepend>
              <VIcon
                class="me-2"
                icon="tabler-list"
                size="22"
              />
            </template>

            <VListItemTitle>Order List</VListItemTitle>
          </VListItem>

          <!-- 👉 Pricing -->
          <!--
            <VListItem link>
            <template #prepend>
            <VIcon
            class="me-2"
            icon="tabler-currency-dollar"
            size="22"
            />
            </template>

            <VListItemTitle>Pricing</VListItemTitle>
            </VListItem> 
          -->

          <!-- 👉 FAQ -->
          <!--
            <VListItem link>
            <template #prepend>
            <VIcon
            class="me-2"
            icon="tabler-help"
            size="22"
            />
            </template>

            <VListItemTitle>FAQ</VListItemTitle>
            </VListItem> 
          -->

          <!-- Divider -->
          <VDivider class="my-2" />

          <!-- 👉 Logout -->
          <VListItem @click="onLogout">
            <template #prepend>
              <VIcon
                class="me-2"
                icon="tabler-logout"
                size="22"
              />
            </template>

            <VListItemTitle>Logout</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
      <!-- !SECTION -->
    </VAvatar>
  </VBadge>
  <VBtn
    v-else
    text="Login"
    to="/login"
  />
</template>

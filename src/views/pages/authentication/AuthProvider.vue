<script setup>
import { useTheme } from 'vuetify'
const baseURL = import.meta.env.VITE_BASE_URL

const { global } = useTheme()

const authProviders = [
  {
    icon: 'fa-google',
    color: '#dd4b39',
    to: `${baseURL}/login/google`,
  },
]
</script>

<template>
  <div class="d-flex justify-center flex-wrap gap-3">
    <VBtn
      v-for="link in authProviders"
      :key="link.icon"
      icon
      variant="tonal"
      size="38"
      min-width="100%"
      :color="global.name.value === 'dark' ? link.colorInDark : link.color"
      class="rounded"
      :href="link.to"
    >
      <VIcon
        size="18"
        :icon="link.icon"
      />
    </VBtn>
  </div>
</template>

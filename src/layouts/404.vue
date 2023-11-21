<script setup>
import misc404 from '@images/pages/404.png'
</script>

<template>
  <div class="misc-wrapper">
    <ErrorHeader
      error-title="404 Page Not Found :("
    />
    <div class="misc-avatar w-100 text-center">
    <VBtn
      to="/"
      class="mb-12"
    >
      Back to Home
    </VBtn>
      <VImg
        :src="misc404"
        alt="Coming Soon"
        :max-height="500"
      />
      <p>Image from : 
        <a href="https://www.instagram.com/p/CSb_B9urJXg/?utm_medium=share_sheet">instagram.com</a>
      </p>
    </div>
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/misc.scss";
</style>


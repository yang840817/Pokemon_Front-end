<script setup>
import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'
import picka from '@images/pages/picka.png'
import { themeConfig } from '@themeConfig'
import { VForm } from 'vuetify/components/VForm'
import { useUserStore } from '@/stores/user'
import { useOauthStore } from '@/stores/oauth'
import { useRouter } from 'vue-router'
import {
  emailValidator,
  requiredValidator,
} from '@validators'
import { nextTick } from 'vue'

const userStore = useUserStore()
const oauthStore = useOauthStore()
const router = useRouter()
    
async function onLogin() {
try {
  if (email.value && password.value) {
    await oauthStore.login({ email: email.value, password: password.value })
    router.push('/')
    await userStore.getInfo()
  }
} catch (error) {
  password.value = ""
  errorMessage.value = error.response.data.error
  await nextTick()
  refVForm.value.resetValidation()
}


}

const isPasswordVisible = ref(false)
const refVForm = ref(null)
const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const errorMessage = ref('')
</script>

<template>
  <VRow
    no-gutters
    class="auth-wrapper bg-surface justify-center"
  >
    <VCol
      lg="8"
      class="d-none d-lg-flex"
    >
      <div class="position-relative bg-background rounded-lg w-100 ma-8 me-0">
        <div class="d-flex align-center justify-center w-100 h-100">
          <VImg
            max-width="800"
            :src="picka"
            class="auth-illustration mt-16 mb-2"
          />
        </div>
        <p>Image from : <a href="https://www.pokemongoplusplus.com">https://www.pokemongoplusplus.com</a></p>
      </div>
    </VCol>

    <VCol
      cols="12"
      lg="4"
      class="auth-card-v2 d-flex align-center justify-center"
    >
      <VCard
        flat
        :max-width="500"
        class="mt-12 mt-sm-0 pa-4"
      >
        <VCardText>
          <h5 class="text-h5 mb-1">
            <themeConfig.app.logo class="d-inline"/>
            Welcome to <span class="text-capitalize"> {{ themeConfig.app.title }} </span>!
          </h5>

          <p class="mb-0">
            Please sign-in to your account and start the adventure
          </p>
        </VCardText>
        <VCardText>
          <p class="mb-0 text-center  text-error error-message" >
            {{ errorMessage }}
          </p>
          <VForm
            ref="refVForm"
            @submit.prevent="onLogin"
          >
            <VRow>
              <!-- email -->
              <VCol cols="12">
                <AppTextField
                  v-model="email"
                  autofocus
                  :rules="[requiredValidator, emailValidator]"
                  label="Email"
                  type="email"
                />
              </VCol>

              <!-- password -->
              <VCol cols="12">
                <AppTextField
                  v-model="password"
                  :rules="[requiredValidator]"
                  label="Password"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />

                <div class="d-flex align-center flex-wrap justify-space-between mt-2 mb-4">
                  <VCheckbox
                    v-model="rememberMe"
                    label="Remember me"
                  />
                  <!-- <a
                    class="text-primary ms-2 mb-1"
                    href="#"
                  >
                    Forgot Password?
                  </a> -->
                </div>

                <VBtn
                  block
                  type="submit"
                >
                  Login
                </VBtn>
              </VCol>

              <!-- create account -->
              <VCol
                cols="12"
                class="text-center"
              >
                <span>New on our platform?</span>

                <RouterLink
                  class="text-primary ms-2"
                  :to="{ name: 'register' }"
                >
                  Create an account
                </RouterLink>
              </VCol>

              <VCol
                cols="12"
                class="d-flex align-center"
              >
                <VDivider />

                <span class="mx-4">or</span>

                <VDivider />
              </VCol>

              <!-- auth providers -->
              <VCol
                cols="12"
                class="text-center"
              >
                <AuthProvider />
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";

.error-message{
text-transform: capitalize;
}
</style>
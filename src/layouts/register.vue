<script setup>
import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'
import picka from '@images/pages/picka.png'
import { themeConfig } from '@themeConfig'
import { VForm } from 'vuetify/components/VForm'
import {
  usernameValidator,
  emailValidator,
  requiredValidator,
  confirmedValidator,
} from '@validators'
import { useRouter } from 'vue-router'
import { useOauthStore } from '@/stores/oauth'
import { useSnackbarStore } from '@/stores/snackbar'

const router = useRouter()
const oauthStore = useOauthStore()
const snackbarStore = useSnackbarStore()
const isPasswordVisible = ref(false)
const refVForm = ref()
const email = ref('')
const username = ref('')
const password = ref('')
const password_confirmation = ref('')
const privacyPolicies = ref(false)
const errorMessage = ref('')




async function onSubmit() {
try {
if (
  email.value &&
  username.value &&
  /^[\u4e00-\u9fa5_a-zA-Z0-9 _-]*$/i.test(username.value) &&
  password.value &&
  password_confirmation.value &&
  privacyPolicies.value &&
  password.value === password_confirmation.value 
) {
    const result = await oauthStore.register({
      name: username.value,
      email: email.value,
      password: password.value,
      password_confirmation: password_confirmation.value,
    })
    router.push('/')
    snackbarStore.isShow = true
    snackbarStore.message = result
    snackbarStore.timeout = 20000
    
  }
} catch (error) {
  console.log(error);
  errorMessage.value = error.response.data.error
  await nextTick()
  refVForm.value.resetValidation()
}
}
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
      class="d-flex align-center justify-center"
    >
      <VCard
        flat
        :max-width="500"
        class="mt-12 mt-sm-0 pa-4"
      >
        <VCardText>
          <h5 class="text-h5 mb-1">
            <themeConfig.app.logo class="d-inline"/>Adventure starts here
          </h5>
          
          <p class="mb-0">
            Register for our services
          </p>
        </VCardText>

        <VCardText>
          <p class="mb-0 text-center  text-error error-message" >
            {{ errorMessage }}
          </p>
          <VForm
            ref="refVForm"
            @submit.prevent="onSubmit"
          >
            <VRow>
              <!-- Username -->
              <VCol cols="12">
                <AppTextField
                  v-model="username"
                  autofocus
                  :rules="[requiredValidator, usernameValidator]"
                  label="Username"
                />
              </VCol>

              <!-- email -->
              <VCol cols="12">
                <AppTextField
                  v-model="email"
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
                <AppTextField
                  v-model="password_confirmation"
                  :rules="[requiredValidator,confirmedValidator(password_confirmation,password)]"
                  label="Password_confirmation"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />
                <div class="d-flex align-center mt-2 mb-4">
                  <VCheckbox
                    id="privacy-policy"
                    v-model="privacyPolicies"
                    :rules="[requiredValidator]"
                    inline
                  >
                    <template #label>
                      <span class="me-1">
                        I agree to
                        <a
                          href="javascript:void(0)"
                          class="text-primary"
                        >privacy policy & terms</a>
                      </span>
                    </template>
                  </VCheckbox>
                </div>

                <VBtn
                  block
                  type="submit"
                >
                  Sign up
                </VBtn>
              </VCol>

              <!-- create account -->
              <VCol
                cols="12"
                class="text-center text-base"
              >
                <span>Already have an account?</span>
                <RouterLink
                  class="text-primary ms-2"
                  :to="{ name: 'login' }"
                >
                  Sign in instead
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
</style>
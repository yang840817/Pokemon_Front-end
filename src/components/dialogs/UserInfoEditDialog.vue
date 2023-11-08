<script setup>
const props = defineProps({
  userData: {
    type: Object,
    required: false,
    default: () => ({
      id: 0,
      name: '',
      email: '',
      photo: '',
    }),
  },
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits([
  'submit',
  'update:isDialogVisible',
])



const userData = ref(structuredClone(toRaw(props.userData)))

watch(props, () => {
  userData.value = structuredClone(toRaw(props.userData))
})

const onFormSubmit = () => {
  emit('update:isDialogVisible', false)

  const formData = new FormData()

  formData.append('name', userData.value.name)
  formData.append('email', userData.value.email)
  if (userData.value.file) {
    formData.append('userPhoto', userData.value.file)
  }
  emit('submit', formData)
}

const onFormReset = () => {
  emit('update:isDialogVisible', false)
  userData.value = structuredClone(toRaw(props.userData))
}

const dialogModelValueUpdate = val => {
  emit('update:isDialogVisible', val)
}



const changePhoto = e => {
  const file = e.target.files[0]
  const url = URL.createObjectURL(file)

  userData.value.photo = url
  userData.value.file = file

}

const onChangeName = input => {
  userData.value.name = input
}

const onChangeMail = input => {
  userData.value.email = input
}
</script>

<template>
  <VDialog
    :width="$vuetify.display.smAndDown ? 'auto' : 500"
    :model-value="props.isDialogVisible"
    @update:model-value="dialogModelValueUpdate"
  >
    <!-- Dialog close btn -->
    <DialogCloseBtn @click="dialogModelValueUpdate(false)" />

    <VCard class="pa-sm-8 pa-5">
      <VCardItem class="text-center">
        <VCardTitle class="text-h5 mb-3">
          Edit User Information
        </VCardTitle>
        <p class="mb-0">
          Updating user details will receive a privacy audit.
        </p>
      </VCardItem>

      <VCardText>
        <!-- 👉 Form -->
        <VForm
          class="mt-6"
          @submit.prevent="onFormSubmit"
        >
          <VRow>
            <VCol cols="12">
              <VImg
                v-if="userData.photo"
                md="8"
                :src="userData.photo"
                height="100"
              />
            </VCol>
            <VCol cols="12">
              <VLabel>Photo:</VLabel>
              <VFileInput
                md="4"
                accept="image/png, image/jpeg"
                prepend-icon="mdi-camera"
                @input="changePhoto($event)"
              />
            </VCol>
            <!-- 👉  Name -->
            <VCol cols="12">
              <VLabel>Username:</VLabel>
              <VTextField
                :value="userData.name"
                @input="onChangeName($event.target.value)"
              />
            </VCol>
            <!-- 👉  Email -->
            <VCol cols="12">
              <VLabel>Email:</VLabel>
              <VTextField
                :value="userData.email" 
                @input="onChangeMail($event.target.value)"
              />
            </VCol>

            <!-- 👉 Submit and Cancel -->
            <VCol
              cols="12"
              class="d-flex flex-wrap justify-center gap-4"
            >
              <VBtn type="submit">
                Submit
              </VBtn>

              <VBtn
                color="secondary"
                variant="tonal"
                @click="onFormReset"
              >
                Cancel
              </VBtn>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
</template>

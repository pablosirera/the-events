<script setup>
import BaseHeader from '@/components/BaseHeader.vue'
import BaseDatepicker from '@/components/form/BaseDatepicker.vue'
import BaseInput from '@/components/form/BaseInput.vue'
import BaseInputFile from '@/components/form/BaseInputFile.vue'
import { reactive, ref } from 'vue'
import { useFriends } from '@/composables/useFriends'
import { useToast } from '@/composables/useToast'
import { useRouter } from 'vue-router'
import { ROUTES_NAMES } from '@/constants/routes'
const { createFriend } = useFriends()
const { showSuccess, showError } = useToast()
const router = useRouter()

const form = reactive({
  name: '',
  phone: '',
  birthdate: '',
  photo: null,
  lastVisited: '',
})

const loading = ref(false)

function resetForm() {
  form.name = ''
  form.phone = ''
  form.birthdate = ''
  form.photo = null
  form.lastVisited = ''
}

async function submitForm() {
  loading.value = true
  try {
    await createFriend({
      name: form.name,
      phone: form.phone,
      birthdate: form.birthdate,
      last_visited: form.lastVisited,
      photoFile: form.photo && form.photo.length > 0 ? form.photo[0] : null,
    })
    showSuccess('Amigo creado correctamente.')
    resetForm()
    router.push({ name: ROUTES_NAMES.HOME })
  } catch (e) {
    console.error('Error al crear el amigo:', e)
    showError(e.message)
  }
  loading.value = false
}
</script>

<template>
  <BaseHeader title="Añadir amigo" :show-back="true" :show-add="false" />
  <main class="px-6 py-11">
    <form class="flex flex-col gap-6">
      <BaseInput
        v-model="form.name"
        placeholder="Pepico"
        name="name"
        id="friendName"
        label="Nombre"
      />

      <BaseInput
        v-model="form.phone"
        placeholder="555 555 555"
        name="phone"
        id="friendPhone"
        type="tel"
        label="Teléfono"
      />

      <BaseInput
        v-model="form.birthdate"
        placeholder="01/01/2000"
        name="birthdate"
        id="friendBirthdate"
        type="date"
        label="Fecha de nacimiento"
        input-class="custom-date"
      />

      <BaseInputFile
        v-model="form.photo"
        name="photo"
        id="friendPhoto"
        label="Sube la foto de tu amigo"
      />

      <BaseDatepicker v-model="form.lastVisited" placeholder="Última visita" />

      <div class="flex flex-col gap-4">
        <button
          type="button"
          @click="submitForm"
          class="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          <span v-if="loading">Guardando...</span>
          <span v-else>Guardar amigo</span>
        </button>
      </div>
    </form>
  </main>
</template>

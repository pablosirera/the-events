<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import useAuth from '@/composables/useAuth'
import { useRouter } from 'vue-router'
import BaseButton from '@/components/BaseButton.vue'
import { ROUTES_NAMES } from '@/constants/routes'

const { register, login, isAuthenticated } = useAuth()
const router = useRouter()

const haveAccount = ref(false)
const formData = ref({
  firstName: '',
  email: '',
  password: '',
  passwordConfirmation: '',
})

const isFormCorrect = computed(() => {
  if (haveAccount.value) {
    return formData.value.email && formData.value.password
  }
  return (
    formData.value.email &&
    formData.value.password &&
    formData.value.password === formData.value.passwordConfirmation
  )
})

const handleSubmit = async () => {
  try {
    if (haveAccount.value) {
      await login({ ...formData.value })
    } else {
      await register({ ...formData.value, name: formData.value.firstName })
    }
    router.push('/')
  } catch (error) {
    console.error('Error:', error)
  }
}

onMounted(() => {
  if (isAuthenticated.value) {
    router.replace({ name: ROUTES_NAMES.HOME })
  }
})

watch(isAuthenticated, isLogged => {
  if (isLogged) {
    router.replace({ name: ROUTES_NAMES.HOME })
  }
})
</script>

<template>
  <section class="light:bg-white dark:text-white">
    <div class="lg:grid lg:min-h-screen lg:grid-cols-12">
      <section
        class="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6"
      >
        <img
          alt=""
          src="https://images.unsplash.com/photo-1513682121497-80211f36a7d3?q=80&w=1588&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          class="absolute inset-0 h-full w-full object-cover opacity-80"
        />
      </section>

      <main
        class="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
      >
        <div class="w-full max-w-xl lg:w-auto lg:max-w-3xl">
          <form class="mt-8 grid grid-cols-6 gap-6" @submit.prevent="handleSubmit">
            <div v-if="!haveAccount" class="col-span-6">
              <label for="firstName" class="block text-sm font-medium light:text-gray-700">
                Nombre
              </label>

              <input
                v-model="formData.firstName"
                type="text"
                id="firstName"
                name="firstName"
                class="mt-1 w-full rounded-md border-gray-200 bg-zinc-800 light:bg-white text-sm text-white light:text-gray-700 shadow-sm p-3"
              />
            </div>

            <div class="col-span-6">
              <label for="email" class="block text-sm font-medium light:text-gray-700">
                Email
              </label>

              <input
                v-model="formData.email"
                type="email"
                id="email"
                name="email"
                class="mt-1 w-full rounded-md border-gray-200 bg-zinc-800 light:bg-white text-sm text-white light:text-gray-700 shadow-sm p-3"
              />
            </div>

            <div class="col-span-6" :class="{ 'sm:col-span-3': !haveAccount }">
              <label for="password" class="block text-sm font-medium light:text-gray-700">
                Contraseña
              </label>

              <input
                v-model="formData.password"
                type="password"
                id="password"
                name="password"
                class="mt-1 w-full rounded-md border-gray-200 bg-zinc-800 light:bg-white text-sm text-white light:text-gray-700 shadow-sm p-3"
              />
            </div>

            <div v-if="!haveAccount" class="col-span-6 sm:col-span-3">
              <label
                for="passwordConfirmation"
                class="block text-sm font-medium light:text-gray-700"
              >
                Confirmación contraseña
              </label>

              <input
                v-model="formData.passwordConfirmation"
                type="password"
                id="passwordConfirmation"
                name="passwordConfirmation"
                class="mt-1 w-full rounded-md border-gray-200 bg-zinc-800 light:bg-white text-sm text-white light:text-gray-700 shadow-sm p-3"
              />
            </div>

            <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
              <BaseButton :disabled="!isFormCorrect" type="submit">
                {{ haveAccount ? 'Iniciar sesión' : 'Crear cuenta' }}
              </BaseButton>

              <p v-if="!haveAccount" class="mt-4 text-sm light:text-gray-500 sm:mt-0">
                ¿Ya tienes cuenta?
                <button class="light:text-gray-700 underline" @click="haveAccount = true">
                  Inicia sesión
                </button>
              </p>

              <p v-else class="mt-4 text-sm light:text-gray-500 sm:mt-0">
                ¿No tienes cuenta todavía?
                <button class="light:text-gray-700 underline" @click="haveAccount = false">
                  Crear cuenta
                </button>
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  </section>
</template>

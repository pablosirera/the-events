<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useFriends } from '../composables/useFriends'
import BaseHeader from '../components/BaseHeader.vue'
import { PhoneIcon, CheckBadgeIcon } from '@heroicons/vue/24/outline'
import { useToast } from '../composables/useToast'
import UpdateVisitFriendModal from '@/components/friendDetail/UpdateVisitFriendModal.vue'

const route = useRoute()
const { getFriendById, updateLastVisited } = useFriends()
const { showError, showSuccess } = useToast()

const friend = ref(null)
const showUpdateVisitModal = ref(false)

onMounted(async () => {
  friend.value = await getFriendById(route.params.id)
})

const lastSeenFormatted = computed(() => {
  if (!friend.value?.lastVisited) return 'Desconocido'
  return new Date(friend.value.lastVisited).toLocaleDateString()
})

const birthDateFormatted = computed(() => {
  if (!friend.value?.birthdate) return 'Desconocida'
  return new Date(friend.value.birthdate).toLocaleDateString()
})

const age = computed(() => {
  if (!friend.value?.birthdate) return '-'
  const birth = new Date(friend.value.birthdate)
  const today = new Date()
  let years = today.getFullYear() - birth.getFullYear()
  const m = today.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) years--
  return years
})

const daysToBirthday = computed(() => {
  if (!friend.value?.birthdate) return '-'
  const today = new Date()
  const birth = new Date(friend.value.birthdate)
  const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate())
  if (nextBirthday < today) nextBirthday.setFullYear(today.getFullYear() + 1)
  const diff = nextBirthday - today
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
})

async function registerVisitToday() {
  if (!friend.value) return
  try {
    await updateLastVisited(friend.value.id, new Date())
    friend.value.lastVisited = new Date().toISOString()
    showSuccess('¡Última visita actualizada!')
  } catch (e) {
    showError('Hubo un error al actualizar la visita')
  }
}

async function registerDate(date) {
  if (!friend.value) return
  try {
    await updateLastVisited(friend.value.id, date)
    friend.value.lastVisited = new Date(date).toISOString()
    showSuccess('¡Última visita actualizada!')
  } catch (e) {
    showError('Hubo un error al actualizar la visita')
  }
}
</script>

<template>
  <BaseHeader title="" :show-add="false" />
  <main class="flex flex-col items-center px-4">
    <img
      v-if="friend?.avatar"
      :src="friend?.avatar"
      :alt="`foto de ${friend?.name}`"
      loading="lazy"
      class="w-40 h-40 rounded-full object-cover shadow-lg mb-4"
    />
    <img
      v-else
      src="@/assets/images/user-placeholder.png"
      alt="Foto de perfil por defecto"
      class="w-40 h-40 rounded-full object-cover shadow-lg mb-4"
    />
    <h2 class="text-2xl font-bold mb-2">{{ friend?.name }}</h2>
    <p class="text-gray-500 mb-6">Última vez visto: {{ lastSeenFormatted }}</p>
    <section class="w-full max-w-md mb-6">
      <h3 class="text-xl font-semibold mb-2 flex items-center">Contacto</h3>
      <div class="flex items-center p-3">
        <span class="p-2 border border-gray-200 mr-4 rounded-lg bg-[var(--vt-c-black-mute)]">
          <PhoneIcon class="w-6 h-6" />
        </span>
        <p class="flex flex-col">
          <span>Teléfono</span>
          <a :href="`tel:${friend?.phone}`">{{ friend?.phone || '-' }}</a>
        </p>
      </div>
    </section>
    <section class="w-full max-w-md">
      <h3 class="text-xl font-semibold mb-2">Datos de interés</h3>
      <div class="mb-2">
        Fecha de nacimiento: <span class="font-medium">{{ birthDateFormatted }}</span>
      </div>
      <div class="mb-2">
        Edad: <span class="font-medium">{{ age }}</span>
      </div>
      <div>
        Falta para su cumple: <span class="font-medium">{{ daysToBirthday }} días</span>
      </div>
    </section>
  </main>
  <div class="flex flex-col items-center mt-8 gap-3">
    <button
      class="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
      @click="showUpdateVisitModal = true"
    >
      Registrar visita
    </button>
    <button
      class="bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 transition flex items-center gap-2"
      @click="registerVisitToday"
    >
      Visitado hoy
      <CheckBadgeIcon class="w-5 h-5" />
    </button>
  </div>

  <UpdateVisitFriendModal
    v-if="showUpdateVisitModal"
    @close="showUpdateVisitModal = false"
    @select="registerDate"
  />
</template>

<style scoped>
.material-icons {
  font-family: 'Material Icons';
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  direction: ltr;
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
}
</style>

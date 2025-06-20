<script setup lang="ts">
import { ROUTES_NAMES } from '@/constants/routes'
import { PlusCircleIcon, ArrowLeftIcon } from '@heroicons/vue/24/outline'
import { computed, defineEmits } from 'vue'
import { useRoute } from 'vue-router'
import BaseDropdown from './form/BaseDropdown.vue'
import { useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

defineProps({
  title: {
    type: String,
    default: 'QuedUp',
  },
  showBack: {
    type: Boolean,
    default: true,
  },
  showAdd: {
    type: Boolean,
    default: true,
  },
})
const emit = defineEmits(['back', 'plus'])

const showArrowLeft = computed(() => {
  return route.name !== ROUTES_NAMES.HOME
})
</script>

<template>
  <header class="grid grid-cols-3 items-center justify-items-center py-5">
    <button
      @click="router.back()"
      :class="[showArrowLeft && showBack ? '' : 'invisible']"
      class="h-8 w-8 flex items-center justify-center"
      aria-label="Volver"
    >
      <ArrowLeftIcon />
    </button>
    <h1 class="font-bold text-xl">{{ title }}</h1>
    <BaseDropdown
      :items="[
        { label: '👤 Añadir amigo', action: () => router.push({ name: ROUTES_NAMES.NEW_FRIEND }) },
        { label: '🗓️ Añadir evento', action: () => router.push({ name: ROUTES_NAMES.NEW_EVENT }) },
      ]"
    >
      <template #trigger>
        <button
          @click="emit('plus')"
          class="h-8 w-8 flex items-center justify-center"
          :class="[showAdd ? '' : 'invisible']"
          aria-label="Añadir"
        >
          <PlusCircleIcon />
        </button>
      </template>
    </BaseDropdown>
  </header>
</template>

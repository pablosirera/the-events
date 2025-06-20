<script setup>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

defineProps({
  items: {
    type: Array,
    default: () => [],
  },
})

const open = ref(false)
const dropdown = ref('dropdown')

function toggleDropdown() {
  open.value = !open.value
}

onClickOutside(dropdown, () => {
  open.value = false
})
</script>

<template>
  <div class="relative inline-flex">
    <span @click="toggleDropdown" class="inline-flex cursor-pointer w-full">
      <slot name="trigger" />
    </span>

    <transition name="dropdown-fade">
      <div
        v-if="open"
        role="menu"
        ref="dropdown"
        class="absolute end-0 top-9 z-auto w-48 overflow-hidden rounded border border-gray-300 shadow-sm bg-[var(--color-background)]"
      >
        <ul class="flex flex-col">
          <li
            v-for="(item, index) in items"
            :key="index"
            class="border-b border-gray-200 last:border-0 px-4 py-2"
          >
            <button @click="item.action" class="w-full text-left">
              {{ item.label }}
            </button>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.size-4 {
  width: 1rem;
  height: 1rem;
}

.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition:
    opacity 0.2s,
    transform 0.2s;
}
.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
.dropdown-fade-enter-to,
.dropdown-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>

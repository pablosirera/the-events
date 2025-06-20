<script setup lang="ts">
import { ref } from 'vue'
import BaseModal from '../BaseModal.vue'
import BaseDatepicker from '../form/BaseDatepicker.vue'

const emit = defineEmits(['close', 'select'])
const selectedDate = ref('')
const isCalendarOpen = ref(true)

function onSave() {
  if (selectedDate.value) {
    emit('select', selectedDate.value)
    emit('close')
  }
}
</script>

<template>
  <BaseModal @close="$emit('close')">
    <h2 class="text-lg font-semibold mb-4">Selecciona una fecha</h2>
    <BaseDatepicker v-model="selectedDate" :isOpen="isCalendarOpen" />
    <div class="flex justify-end mt-6">
      <button
        class="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition disabled:opacity-50"
        :disabled="!selectedDate"
        @click="onSave"
      >
        Guardar
      </button>
    </div>
  </BaseModal>
</template>

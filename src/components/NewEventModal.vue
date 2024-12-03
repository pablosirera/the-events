<script setup>
import BaseModal from './BaseModal.vue'
const emit = defineEmits(['close'])
</script>

<template>
  <BaseModal @close="emit('close')">
    <form @submit.prevent="handleSubmit()" class="flex flex-col gap-4">
      <div class="flex flex-col">
        <label for="name" class="font-semibold text-lg">Nombre</label>
        <input
          id="name"
          type="text"
          class="bg-transparent border border-white rounded-md h-9 px-2 py-2 placeholder:font-light"
          placeholder="Visita a Pepito"
        />
      </div>

      <div class="flex flex-col">
        <label for="name" class="font-semibold text-lg">Localización</label>
        <input
          id="name"
          type="text"
          class="bg-transparent border border-white rounded-md h-9 px-2 py-2 placeholder:font-light"
          placeholder="Valencia, España"
        />
      </div>

      <div class="flex flex-col">
        <label for="name" class="font-semibold text-lg">Fecha evento</label>
        <input
          id="name"
          type="date"
          class="bg-transparent border border-white rounded-md h-9 px-2 py-2 placeholder:font-light"
        />
      </div>

      <button
        type="submit"
        class="mt-6 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 text-white font-semibold rounded-md h-9 ease-out duration-200 hover:scale-105"
      >
        Guardar
      </button>
    </form>
  </BaseModal>
</template>

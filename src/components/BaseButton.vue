<script setup>
defineProps({
  disabled: Boolean,
  customClass: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <button :disabled="disabled" :class="[customClass]" v-bind="$attrs">
    <slot />
  </button>
</template>

<style scoped>
button {
  display: inline-block;
  flex-shrink: 0;
  border-radius: 0.375rem;
  border: 1px solid theme('colors.blue.600');
  background-color: theme('colors.blue.600');
  padding: 0.75rem 3rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #fff;
  transition: all 0.2s;
  outline: none;
  cursor: pointer;
}

button:focus {
  box-shadow: 0 0 0 2px #2563eb33;
}

button:active {
  color: theme('colors.blue.500');
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.75;
  background-color: theme('colors.gray.800');
}

button:hover:not(:disabled) {
  background: transparent;
  color: theme('colors.blue.600');
  border-color: theme('colors.blue.600');
}
</style>

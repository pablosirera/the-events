<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: [String, Number],
  label: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    required: true,
  },
  wrapperClass: {
    type: String,
    default: '',
  },
  inputClass: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

const modelValueProxy = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
})
</script>

<template>
  <div :class="wrapperClass">
    <label v-if="label" :for="id" class="block text-sm font-medium light:text-gray-700">
      {{ label }}
    </label>
    <input
      v-model="modelValueProxy"
      :type="type"
      :id="id"
      :name="name"
      :placeholder="placeholder"
      :class="[
        'mt-1 w-full border rounded-md border-gray-200 dark:border-gray-200 dark:bg-transparent text-sm dark:text-white text-gray-700 p-3',
        inputClass,
      ]"
      v-bind="$attrs"
    />
  </div>
</template>

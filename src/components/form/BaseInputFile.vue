<script setup>
import { ref, watch, toRefs } from 'vue'
const props = defineProps({
  modelValue: FileList,
  label: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  iconClass: {
    type: String,
    default: '',
  },
  wrapperClass: {
    type: String,
    default: '',
  },
})
const emit = defineEmits(['update:modelValue'])
const { modelValue } = toRefs(props)
const previewUrl = ref(null)

function onFileChange(e) {
  const files = e.target.files
  emit('update:modelValue', files)
  if (files && files[0] && files[0].type.startsWith('image/')) {
    previewUrl.value = URL.createObjectURL(files[0])
  } else {
    previewUrl.value = null
  }
}

watch(modelValue, val => {
  if (!val || val.length === 0) {
    previewUrl.value = null
  }
})
</script>

<template>
  <label
    :for="id"
    :class="['block rounded-md border border-gray-300 p-4 shadow-sm sm:p-6', wrapperClass]"
  >
    <div class="flex items-center justify-center gap-4">
      <span class="font-medium">{{ label }}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        :class="['size-6', iconClass]"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75"
        />
      </svg>
    </div>
    <input :multiple="multiple" type="file" :id="id" class="sr-only" @change="onFileChange" />
    <div v-if="previewUrl" class="flex justify-center">
      <img :src="previewUrl" alt="Image preview" class="max-h-40 w-auto rounded-md" />
    </div>
  </label>
</template>

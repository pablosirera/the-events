<script setup>
import { MapPinIcon } from '@heroicons/vue/24/outline'

defineProps({
  image: {
    type: String,
    default:
      'https://images.pexels.com/photos/4992820/pexels-photo-4992820.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  name: {
    type: String,
  },
  location: {
    type: String,
  },
})
</script>

<template>
  <div class="rounded-lg p-4 shadow-sm shadow-indigo-100 max-h-64 w-60">
    <img :src="image" class="max-h-56 w-full rounded-md object-cover" />

    <div class="mt-2">
      <h4 class="font-medium text-base text-ellipsis overflow-hidden">{{ name }}</h4>

      <div class="mt-2 flex items-center gap-8 text-xs">
        <div class="inline-flex shrink-0 items-center gap-2">
          <MapPinIcon class="h-5 w-5" />

          <p class="mt-0 text-gray-500 text-xs">{{ location }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

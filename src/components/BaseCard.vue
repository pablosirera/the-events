<script setup>
import { MapPinIcon } from '@heroicons/vue/24/outline'

defineProps({
  visitDate: {
    type: [Date, String],
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
  <article
    class="hover:animate-background hover:scale-105 cursor-pointer rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]"
  >
    <div class="rounded-xl bg-gray-800 p-4 !pt-20 sm:p-6">
      <time datetime="2022-10-10" class="block text-xs text-white">{{ visitDate }}</time>

      <a href="#">
        <h3 class="mt-0.5 text-lg font-medium text-white">
          {{ name }}
        </h3>
      </a>

      <div class="inline-flex shrink-0 items-center gap-2">
        <MapPinIcon class="h-5 w-5" />

        <p class="mt-0 text-gray-500 text-xs">{{ location }}</p>
      </div>

      <!-- <div class="mt-4 flex flex-wrap gap-1">
        <span
          class="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600"
        >
          Snippet
        </span>

        <span
          class="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600"
        >
          JavaScript
        </span>
      </div> -->
    </div>
  </article>
</template>

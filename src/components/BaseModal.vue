<script setup>
const emit = defineEmits(['close'])
</script>

<template>
  <div
    tabindex="-1"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div class="fixed inset-0 bg-background-soft bg-opacity-70 z-40"></div>
    <div class="relative p-4 w-full max-w-md max-h-full my-0 mx-auto top-16 z-50">
      <div class="relative rounded-lg shadow min-h-32 bg-background-mute">
        <button
          type="button"
          class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          data-modal-hide="popup-modal"
          @click="emit('close')"
        >
          <svg
            class="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span class="sr-only">Close modal</span>
        </button>

        <section class="pt-14 px-4 pb-4">
          <slot />
        </section>
      </div>
    </div>
  </div>
</template>

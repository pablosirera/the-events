<script setup>
defineProps({
  events: {
    type: Array,
    required: true,
  },
  columns: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y-2 divide-gray-200 text-white text-sm">
      <thead class="text-left">
        <tr>
          <th
            v-for="(column, index) in columns"
            :key="index"
            class="whitespace-nowrap px-4 py-2 font-semibold text-base"
          >
            {{ column }}
          </th>
        </tr>
      </thead>

      <tbody class="divide-y divide-gray-200">
        <tr v-for="currentEvent in events" :key="currentEvent.id">
          <td class="whitespace-nowrap px-4 py-2 font-medium">
            {{ currentEvent.name }}
          </td>
          <td class="whitespace-nowrap px-4 py-2">{{ currentEvent.location }}</td>
          <td class="whitespace-nowrap px-4 py-2">{{ currentEvent.visitDate }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

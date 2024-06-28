<script setup>
import BaseCard from '@/components/BaseCard.vue'

const events = [
  {
    id: 1,
    name: 'Visita a Pepito',
    location: 'Valencia, España',
  },
  {
    id: 2,
    name: 'Visita a Loli Visita a Loli Visita a Loli',
    location: 'Madrid, España',
  },
]
</script>

<template>
  <main class="px-6">
    <h2>Últimos eventos</h2>
    <section class="overflow-x-auto overflow-y-hidden py-2 whitespace-nowrap">
      <BaseCard
        v-for="event in events"
        :key="event.id"
        v-bind="event"
        class="inline-block mr-4 last:mr-0"
      />
    </section>
  </main>
</template>

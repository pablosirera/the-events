<script setup>
import { ref } from 'vue'
import BaseCard from '@/components/BaseCard.vue'
import EventsTable from '@/components/EventsTable.vue'
import NewEventModal from '@/components/NewEventModal.vue'
import { PlusCircleIcon } from '@heroicons/vue/24/outline'
import useEvents from '@/composables/useEvents'

const showNewEventModal = ref(false)
const { listEvents } = useEvents()
const events = ref([])

const loadData = async () => {
  events.value = await listEvents()
}

loadData()
</script>

<template>
  <main class="px-6 py-11">
    <h2 class="text-3xl">Siguientes eventos</h2>
    <section class="my-6 grid grid-cols-2 gap-7">
      <BaseCard v-for="event in events" :key="event.id" v-bind="event" class="" />
    </section>

    <section class="mt-10">
      <div class="flex justify-between items-center">
        <h2 class="text-3xl">Todos los eventos</h2>

        <button
          class="flex items-center gap-2 border border-white px-4 py-2 rounded-md hover:bg-gray-800"
          @click="showNewEventModal = true"
        >
          Registrar evento
          <PlusCircleIcon class="h-8 w-8" />
        </button>
      </div>
      <EventsTable :events="events" :columns="['Nombre', 'Localización', 'Fecha']" />
    </section>

    <NewEventModal v-if="showNewEventModal" @close="showNewEventModal = false" />
  </main>
</template>

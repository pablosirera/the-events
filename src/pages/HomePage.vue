<script setup>
import { ref } from 'vue'
import BaseList from '@/components/BaseList.vue'
import NewEventModal from '@/components/NewEventModal.vue'
import { useFriends } from '@/composables/useFriends'
import BaseHeader from '@/components/BaseHeader.vue'

const { listFriends } = useFriends()

const showNewEventModal = ref(false)
const friends = ref([])
const loading = ref(true)

const loadData = async () => {
  loading.value = true
  friends.value = await listFriends()
  loading.value = false
}

loadData()
</script>

<template>
  <BaseHeader />
  <main class="px-6">
    <section>
      <div class="flex justify-between items-center">
        <h2 class="text-3xl font-bold">Últimos amigos</h2>
      </div>
      <BaseList :friends="friends" :loading="loading" />
    </section>

    <NewEventModal v-if="showNewEventModal" @close="showNewEventModal = false" />
  </main>
</template>

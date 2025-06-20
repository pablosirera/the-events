<script>
export default {
  name: 'BaseList',
  props: {
    friends: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    formatDate(date) {
      if (!date) return 'Nunca'
      const d = new Date(date)
      return d.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    },
  },
}
</script>

<template>
  <div class="py-4">
    <div v-if="loading" class="space-y-4">
      <div v-for="n in 3" :key="n" class="flex items-center py-4 animate-pulse">
        <div class="w-12 h-12 rounded-full bg-gray-700 mr-4"></div>
        <div class="flex-1">
          <div class="h-5 bg-gray-700 rounded w-1/3 mb-2"></div>
          <div class="h-4 bg-gray-800 rounded w-1/2"></div>
        </div>
      </div>
    </div>
    <div v-else-if="!friends.length" class="text-center text-gray-400">
      Aún no has añadido ningún amigo
    </div>
    <ul v-else class="divide-y divide-gray-200">
      <li v-for="friend in friends" :key="friend.id">
        <router-link
          :to="{ name: 'FriendDetailPage', params: { id: friend.id } }"
          class="flex items-center py-4 hover:bg-gray-800 rounded transition-colors"
        >
          <img
            :src="friend.avatar"
            alt="Foto de {{ friend.name }}"
            class="w-12 h-12 rounded-full object-cover mr-4"
            loading="lazy"
          />
          <div class="flex-1">
            <div class="font-semibold text-lg">{{ friend.name }}</div>
            <div class="text-gray-500 text-sm">
              <span class="font-bold">Última visita: </span>{{ formatDate(friend.lastVisited) }}
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'BaseList',
  props: {
    friends: {
      type: Array,
      required: true,
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
    <div v-if="!friends.length" class="text-center text-gray-400">
      Aún no has añadido ningún amigo
    </div>
    <ul v-else class="divide-y divide-gray-200">
      <li v-for="friend in friends" :key="friend.id" class="flex items-center py-4">
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
      </li>
    </ul>
  </div>
</template>

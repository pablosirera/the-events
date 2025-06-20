import { ref } from 'vue'

const user = ref(null)

const setUser = userInfo => {
  user.value = userInfo
}

export default function useUser() {
  return {
    user,
    setUser,
  }
}

import { ref, computed } from 'vue'
import { supabase } from '@/plugins/supabase'
import useUser from './useUser'

const session = ref(null)
const { setUser } = useUser()

const isAuthenticated = computed(() => !!session.value?.user)

async function init() {
  const { data } = await supabase.auth.getSession()
  applySession(data.session)
}

function listen() {
  supabase.auth.onAuthStateChange((_event, newSession) => {
    applySession(newSession)
  })
}

function applySession(newSession) {
  session.value = newSession
  setUser(newSession?.user ?? null)
}

export default function useAuth() {
  async function register({ email, password, name }) {
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    })

    if (error) {
      throw new Error(error.message)
    }

    setUser(user)
  }

  async function login({ email, password }) {
    const { user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      throw new Error(error.message)
    }

    return user
  }

  return {
    register,
    login,
    session,
    isAuthenticated,
  }
}

export function bootAuth() {
  init()
  listen()
}

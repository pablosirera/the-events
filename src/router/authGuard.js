import useAuth from '@/composables/useAuth'
import { ROUTES_NAMES } from '@/constants/routes'

export default function authGuard(to, from, next) {
  const { isAuthenticated } = useAuth()

  if (to.meta.requiresAuth && !isAuthenticated.value) {
    return next({ name: ROUTES_NAMES.AUTH })
  }

  if (isAuthenticated.value && to.name === ROUTES_NAMES.AUTH) {
    return next({ name: ROUTES_NAMES.HOME })
  }

  next()
}

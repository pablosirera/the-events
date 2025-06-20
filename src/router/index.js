import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import authGuard from './authGuard'
import { ROUTES_NAMES } from '@/constants/routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: ROUTES_NAMES.HOME,
      component: HomePage,
      meta: { requiresAuth: true },
    },
    {
      path: '/new-friend',
      name: ROUTES_NAMES.NEW_FRIEND,
      component: () => import('@/pages/NewFriendPage.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/auth',
      name: ROUTES_NAMES.AUTH,
      component: () => import('@/pages/AuthPage.vue'),
    },
    {
      path: '/friend/:id',
      name: ROUTES_NAMES.FRIEND_DETAIL,
      component: () => import('@/pages/FriendDetailPage.vue'),
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach(authGuard)

export default router

import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from '@ionic/vue-router'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/words',
    component: () => import('../views/WordsList.vue'),
  },
  {
    path: '/settings',
    component: () => import('../views/Settings.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/words',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router

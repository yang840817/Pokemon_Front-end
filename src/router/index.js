import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...setupLayouts(routes),
    {
      name: 'login',
      path: '/login',
      component: () =>  import('@/layouts/login.vue')
    },
    {
      name: 'register',
      path: '/register',
      component: () => import('@/layouts/register.vue')
    },
    {
      name: '404',
      path: '/:pathMatch(.*)*',
      component: () => import('@/layouts/404.vue')
    },
  ],
})


// Docs: https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards
export default router
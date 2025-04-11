import { createRouter, createWebHistory } from 'vue-router'
const lazyLoad = (p) => import(`@/views/${p}.vue`)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => lazyLoad('home'),
      meta: {
        layout: 'app',
        auth: false
      }
    },
    {
      path: "/list",
      name: "list",
      component: () => lazyLoad('list'),
      meta: {
        layout: 'app',
        auth: false
      }
    },
  ],
})

export default router

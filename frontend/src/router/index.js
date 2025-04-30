import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/alunos',
    name: 'Students',
    component: () => import('../views/Students.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 
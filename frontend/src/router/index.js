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
  },
  {
    path: '/alunos/novo',
    name: 'StudentCreate',
    component: () => import('../views/StudentCreate.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/alunos/:id/editar',
    name: 'StudentEdit',
    component: () => import('../views/StudentEdit.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 
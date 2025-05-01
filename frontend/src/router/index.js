import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/students',
    name: 'Students',
    component: () => import('../views/Students.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/students/new',
    name: 'StudentCreate',
    component: () => import('../views/StudentCreate.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/students/:id/edit',
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
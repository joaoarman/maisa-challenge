<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import AuthService from '../services/AuthService'

const router = useRouter()
const drawer = ref(false)
const user = computed(() => AuthService.getCurrentUser())

onMounted(() => {
  // Ajustar drawer baseado na largura da tela
  if (window.innerWidth >= 960) {
    drawer.value = true
  }
})

const menuItems = [
  {
    title: 'Alunos',
    icon: 'mdi-account-group',
    to: '/students'
  }
]

const navigateTo = (to) => {
  router.push(to)
  if (window.innerWidth < 960) {
    drawer.value = false
  }
}

const logout = () => {
  AuthService.logout()
  router.push('/')
}

</script>

<template>
  <!-- Top App Bar -->
  <v-app-bar color="primary">
    <v-app-bar-nav-icon @click="drawer = !drawer" class="d-flex d-md-none"></v-app-bar-nav-icon>
    <v-toolbar-title>Edtech</v-toolbar-title>
    <v-spacer></v-spacer>
    
    <div class="d-flex align-center">
      <span class="mr-2">{{ user?.name || 'Usuário' }}</span>
      <v-btn icon @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </div>
  </v-app-bar>

  <!-- Navigation Drawer -->
  <v-navigation-drawer
    v-model="drawer"
    :permanent="$vuetify.display.mdAndUp"
    :temporary="!$vuetify.display.mdAndUp"
  >
    <v-list>
      <v-list-item
        v-for="(item, i) in menuItems"
        :key="i"
        :value="item"
        :title="item.title"
        @click="navigateTo(item.to)"
      >
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <!-- Main Content -->
  <v-main>
    <v-container fluid>
      <slot></slot>
    </v-container>
  </v-main>

</template>

<style scoped>

</style>
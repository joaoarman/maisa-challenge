<script setup>
import { ref, onMounted, onBeforeMount, watch, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import DefaultLayout from './components/DefaultLayout.vue'
import AuthService from './services/AuthService';

const route = useRoute();
const router = useRouter();
const showLayout = ref(false);
const initialized = ref(false);

// Função para verificar e atualizar o estado de autenticação
const checkAuthentication = async () => {
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  
  if (token && userStr) {
    
    showLayout.value = route.path !== '/';
    
    if (route.path === '/' && initialized.value) {
      router.push('/students');
    }
  } else {
   
    showLayout.value = false;
    
    if (route.path !== '/' && initialized.value) {
      router.push('/');
    }
  }
};

onBeforeMount(async () => {
  await checkAuthentication();
  initialized.value = true;
});

onMounted(async () => {
  await nextTick();
  await checkAuthentication();
});

watch(() => route.path, async (newPath, oldPath) => {
  await nextTick();
  await checkAuthentication();
});

window.addEventListener('storage', (event) => {
  if (event.key === 'token' || event.key === 'user') {
    checkAuthentication();
  }
});

window.addEventListener('auth-changed', () => {
  checkAuthentication();
});
</script>

<template>
  <v-app>
    <template v-if="showLayout">
      <DefaultLayout>
        <router-view></router-view>
      </DefaultLayout>
    </template>
    <template v-else>
      <router-view></router-view>
    </template>
  </v-app>
</template>

<style scoped>

</style>

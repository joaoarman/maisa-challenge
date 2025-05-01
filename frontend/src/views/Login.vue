<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import AuthService from '../services/AuthService';

const router = useRouter();
const email = ref('');
const password = ref('');
const loading = ref(false);
const error = ref('');
const showSnackbar = ref(false);

onMounted(() => {
  if (AuthService.isAuthenticated()) {
    router.push('/students');
  }
});

const login = async () => {
  if (!email.value || !password.value) {
    error.value = 'Preencha email e senha';
    showSnackbar.value = true;
    return;
  }

  loading.value = true;
  error.value = '';
  
  try {
    await AuthService.login(email.value, password.value);
    
    router.push('/students');
  } catch (err) {
    error.value = 'Dados inválidos';
    showSnackbar.value = true;
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <v-container fluid class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="elevation-12 pa-8">
          <v-card-title class="text-h4 text-center mb-4">
            Login
          </v-card-title>
          
          <v-form @submit.prevent="login">
            <v-text-field
              v-model="email"
              label="Email"
              type="email"
              required
              prepend-icon="mdi-email"
              variant="outlined"
            ></v-text-field>
            
            <v-text-field
              v-model="password"
              label="Senha"
              type="password"
              required
              prepend-icon="mdi-lock"
              variant="outlined"
            ></v-text-field>
            
            <v-btn
              type="submit"
              color="primary"
              block
              class="mt-4"
              size="large"
              :loading="loading"
            >
              Entrar
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
    
    <v-snackbar
      v-model="showSnackbar"
      color="error"
      timeout="3000"
    >
      {{ error }}
    </v-snackbar>
  </v-container>
</template> 
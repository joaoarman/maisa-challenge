<template>
  <div>
    <div class="d-flex justify-space-between align-center mb-4">
      <h1 class="text-h4">Alunos</h1>
      <v-btn
        color="primary"
        prepend-icon="mdi-plus"
        @click="navigateToCreate()"
      >
        Novo Aluno
      </v-btn>
    </div>

    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Buscar"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="students"
        :search="search"
        :loading="loading"
        loading-text="Carregando... Aguarde"
        class="elevation-5"
      >
        <template v-slot:item.actions="{ item }">
          <v-icon 
            small 
            class="mr-2" 
            :color="isAdmin ? 'warning' : 'grey'" 
            @click="isAdmin ? navigateToEdit(item) : showPermissionDenied('editar')"
          >
            mdi-pencil
          </v-icon>
          <v-icon 
            small 
            :color="isAdmin ? 'red' : 'grey'" 
            @click="isAdmin ? deleteDialog.open(item) : showPermissionDenied('excluir')"
          >
            mdi-delete
          </v-icon> 
        </template>
      </v-data-table>
    </v-card>

    <DeleteDialog ref="deleteDialog" @deleted="handleStudentDeleted" />

    <v-snackbar
      v-model="snackbar"
      :color="snackbarColor"
      timeout="3000"
      location="bottom right"
    >
      {{ snackbarMessage }}
    </v-snackbar>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import studentsService from '../services/studentsService'
import authService from '../services/AuthService'
import DeleteDialog from '../components/student/DeleteDialog.vue'

const router = useRouter()
const students = ref([])
const loading = ref(true)
const search = ref('')
const deleteDialog = ref(null)

const snackbar = ref(false)
const snackbarMessage = ref('')
const snackbarColor = ref('success')

const isAdmin = computed(() => {
  const currentUser = authService.getCurrentUser();
  return currentUser && currentUser.isAdmin;
})

const showPermissionDenied = (action) => {
  snackbarMessage.value = `Você não tem permissão para ${action} alunos.`;
  snackbarColor.value = 'error';
  snackbar.value = true;
}

const headers = computed(() => {
  const baseHeaders = [
    { title: 'Nome', key: 'name', align: 'start', sortable: true },
    { title: 'RA', key: 'RA', align: 'start', sortable: true },
    { title: 'CPF', key: 'cpf', align: 'start', sortable: true },
    { title: 'Email', key: 'email', align: 'start', sortable: true },
    { title: 'Ações', key: 'actions', sortable: false }
  ];
  
  return baseHeaders;
})

onMounted(async () => {
  await getAllStudents()
})

const getAllStudents = async () => {
  loading.value = true
  try {
    const response = await studentsService.getAll()
    students.value = response.data.data
  } catch (error) {
    console.error('Erro ao carregar alunos:', error)
  } finally {
    loading.value = false
  }
}

const navigateToCreate = () => {
  router.push('/students/new')
}

const navigateToEdit = (item) => {
  router.push(`/students/${item.id}/edit`)
}

const handleStudentDeleted = async () => {
  await getAllStudents()
}

</script>

<style scoped>
.v-data-table {
  background: white;
  border-radius: 4px;
}

.v-card-title {
  padding: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}
</style> 
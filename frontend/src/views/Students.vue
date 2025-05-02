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

    <div class="table-container">
      <table class="custom-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>RA</th>
            <th>CPF</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td colspan="5" class="text-center">Carregando...</td>
          </tr>
          <tr v-else-if="students.length === 0">
            <td colspan="5" class="text-center">Nenhum aluno encontrado</td>
          </tr>
          <tr v-for="student in students" :key="student.id">
            <td>{{ student.name }}</td>
            <td>{{ student.RA }}</td>
            <td>{{ student.cpf }}</td>
            <td>{{ student.email }}</td>
            <td class="actions-cell">
              <v-icon 
                small 
                class="mr-2" 
                :color="isAdmin ? 'warning' : 'grey'" 
                @click="isAdmin ? navigateToEdit(student) : showPermissionDenied('editar')"
              >
                mdi-pencil
              </v-icon>
              <v-icon 
                small 
                :color="isAdmin ? 'red' : 'grey'" 
                @click="isAdmin ? deleteDialog.open(student) : showPermissionDenied('excluir')"
              >
                mdi-delete
              </v-icon>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="pagination-container">
        <div class="pagination-info">
          Mostrando {{ (currentPage - 1) * itemsPerPage + 1 }} - {{ Math.min(currentPage * itemsPerPage, totalStudents) }} de {{ totalStudents }} alunos
        </div>
        <div class="pagination-controls">
          <v-btn
            :disabled="currentPage === 1"
            @click="changePage(currentPage - 1)"
            icon="mdi-chevron-left"
            variant="text"
          ></v-btn>
          <span class="page-info">{{ currentPage }} de {{ totalPages }}</span>
          <v-btn
            :disabled="currentPage === totalPages"
            @click="changePage(currentPage + 1)"
            icon="mdi-chevron-right"
            variant="text"
          ></v-btn>
        </div>
      </div>
    </div>

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
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import studentsService from '../services/studentsService'
import authService from '../services/AuthService'
import DeleteDialog from '../components/student/DeleteDialog.vue'

const router = useRouter()
const route = useRoute()
const students = ref([])
const loading = ref(true)
const deleteDialog = ref(null)
const currentPage = ref(parseInt(route.query.page) || 1)
const totalStudents = ref(0)
const itemsPerPage = 10

const snackbar = ref(false)
const snackbarMessage = ref('')
const snackbarColor = ref('success')

const isAdmin = computed(() => {
  const currentUser = authService.getCurrentUser();
  return currentUser && currentUser.isAdmin;
})

const totalPages = computed(() => {
  return Math.ceil(totalStudents.value / itemsPerPage)
})

const showPermissionDenied = (action) => {
  snackbarMessage.value = `Você não tem permissão para ${action} alunos.`;
  snackbarColor.value = 'error';
  snackbar.value = true;
}

onMounted(async () => {
  await Promise.all([
    getTotalStudents(),
    getAllStudents()
  ])
})

const getTotalStudents = async () => {
  try {
    if (!authService.isAuthenticated()) {
      router.push('/');
      return;
    }
    const response = await studentsService.getTotal()
    totalStudents.value = response.data.data.total
  } catch (error) {
    console.error('Erro ao buscar total de alunos:', error)
    snackbarMessage.value = 'Erro ao buscar total de alunos. Por favor, tente novamente.'
    snackbarColor.value = 'error'
    snackbar.value = true
  }
}

const getAllStudents = async () => {
  loading.value = true
  try {
    if (!authService.isAuthenticated()) {
      router.push('/');
      return;
    }
    const response = await studentsService.getAll(currentPage.value, itemsPerPage)
    students.value = response.data.data
  } catch (error) {
    console.error('Erro ao carregar alunos:', error)
    snackbarMessage.value = 'Erro ao carregar alunos. Por favor, tente novamente.'
    snackbarColor.value = 'error'
    snackbar.value = true
  } finally {
    loading.value = false
  }
}

// Add watch for route.query.page changes
watch(() => route.query.page, (newPage) => {
  const page = parseInt(newPage) || 1
  if (currentPage.value !== page) {
    currentPage.value = page
    getAllStudents()
  }
})

const changePage = async (page) => {
  router.push({ query: { ...route.query, page } })
}

const navigateToCreate = () => {
  router.push('/students/new')
}

const navigateToEdit = (student) => {
  router.push({
    path: `/students/${student.id}/edit`,
    query: { page: currentPage.value }
  })
}

const handleStudentDeleted = async () => {
  await Promise.all([
    getTotalStudents(),
    getAllStudents()
  ])
}

</script>

<style scoped>
.table-container {
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.custom-table {
  width: 100%;
  border-collapse: collapse;
}

.custom-table th,
.custom-table td {
  padding: 16px;
  text-align: left;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.custom-table th {
  background-color: #f5f5f5;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.87);
}

.custom-table tbody tr:hover {
  background-color: #f5f5f5;
}

.actions-cell {
  white-space: nowrap;
}

.text-center {
  text-align: center;
}

.pagination-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
}

.pagination-info {
  color: rgba(0, 0, 0, 0.6);
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.page-info {
  margin: 0 8px;
  color: rgba(0, 0, 0, 0.87);
}
</style> 
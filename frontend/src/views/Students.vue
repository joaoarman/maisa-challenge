<template>
  <div>
    <div class="d-flex justify-space-between align-center mb-4">
      <h1 class="text-h4">Alunos</h1>
      <v-btn
        color="primary"
        prepend-icon="mdi-plus"
        @click="createDialog.open()"
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
          <v-icon small class="mr-2" @click="updateDialog.open(item)" color="warning">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteDialog.open(item)" color="red">
            mdi-delete
          </v-icon> 
        </template>
      </v-data-table>
    </v-card>

    <CreateDialog ref="createDialog" @saved="handleStudentSaved" />
    <UpdateDialog ref="updateDialog" @updated="handleStudentUpdated" />
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
import { ref, onMounted } from 'vue'
import studentsService from '../services/studentsService'
import CreateDialog from '../components/student/CreateDialog.vue'
import UpdateDialog from '../components/student/UpdateDialog.vue'
import DeleteDialog from '../components/student/DeleteDialog.vue'

const students = ref([])
const loading = ref(true)
const search = ref('')
const createDialog = ref(null)
const updateDialog = ref(null)
const deleteDialog = ref(null)

// Snackbar
const snackbar = ref(false)
const snackbarMessage = ref('')
const snackbarColor = ref('success')

// Cabeçalhos da tabela
const headers = [
  { title: 'Nome', key: 'name', align: 'start', sortable: true },
  { title: 'RA', key: 'RA', align: 'start', sortable: true },
  { title: 'CPF', key: 'cpf', align: 'start', sortable: true },
  { title: 'Email', key: 'email', align: 'start', sortable: true },
  { title: 'Ações', key: 'actions', sortable: false }
]

onMounted(async () => {
  await getAllStudents()
})

const getAllStudents = async () => {
  loading.value = true
  try {
    const response = await studentsService.getAll()
    students.value = response.data.data
    console.log('Dados dos alunos:', students.value)
  } catch (error) {
    console.error('Erro ao carregar alunos:', error)
  } finally {
    loading.value = false
  }
}

const handleStudentSaved = async () => {
  await getAllStudents()
}

const handleStudentUpdated = async () => {
  await getAllStudents()
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
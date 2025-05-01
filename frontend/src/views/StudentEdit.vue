<template>
  <div>
    <div class="d-flex align-center mb-4">
      <v-btn icon class="mr-4" @click="goBack">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <h1 class="text-h4">Editar Aluno</h1>
    </div>

    <v-card max-width="800px" class="mx-auto" v-if="studentLoaded">
      <v-card-text>
        <v-form ref="form" v-model="valid" @submit.prevent="updateStudent">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="student.name"
                  :rules="nameRules"
                  label="Nome"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="student.email"
                  :rules="emailRules"
                  label="Email"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="student.ra"
                  label="RA"
                  disabled
                  hint="Campo não editável"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="student.cpf"
                  label="CPF"
                  disabled
                  hint="Campo não editável"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions class="pb-6 px-6">
        <v-spacer></v-spacer>
        <v-btn color="error" variant="outlined" class="mr-4" @click="goBack">Cancelar</v-btn>
        <v-btn color="primary" variant="elevated" @click="updateStudent" :disabled="!valid">Salvar</v-btn>
      </v-card-actions>
    </v-card>

    <v-progress-circular 
      v-else 
      indeterminate 
      color="primary"
      size="64"
      class="mt-10 mx-auto d-block"
    ></v-progress-circular>

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
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import studentsService from '../services/studentsService'

const router = useRouter()
const route = useRoute()
const studentId = route.params.id

const valid = ref(false)
const form = ref(null)
const studentLoaded = ref(false)

// Snackbar
const snackbar = ref(false)
const snackbarMessage = ref('')
const snackbarColor = ref('success')

const student = reactive({
  id: null,
  name: '',
  email: '',
  ra: '',
  cpf: ''
})

const nameRules = [
  v => !!v || 'Nome é obrigatório',
  v => v.length >= 3 || 'Nome deve ter pelo menos 3 caracteres',
  v => v.length <= 100 || 'Nome deve ter no máximo 100 caracteres'
]

const emailRules = [
  v => !!v || 'Email é obrigatório',
  v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Email inválido'
]

onMounted(async () => {
  try {
    const response = await studentsService.getById(studentId)
    const studentData = response.data.data

    student.id = studentId;
    student.name = studentData.name
    student.email = studentData.email
    student.ra = studentData.RA || studentData.ra
    student.cpf = studentData.cpf
    
    studentLoaded.value = true
    valid.value = true
  } catch (error) {
    console.error('Erro ao carregar dados do aluno:', error)
    snackbarMessage.value = 'Erro ao carregar dados do aluno'
    snackbarColor.value = 'error'
    snackbar.value = true
    
    setTimeout(() => {
      router.push('/students')
    }, 1500)
  }
})

const goBack = () => {
  router.push('/students')
}

const updateStudent = async () => {
  if (!form.value.validate()) return
  
  try {
    const response = await studentsService.update(student.id, {
      name: student.name,
      email: student.email
    })
    
    snackbarMessage.value = response.data.message || 'Aluno atualizado com sucesso!'
    snackbarColor.value = 'success'
    snackbar.value = true
    
    setTimeout(() => {
      router.push('/students')
    }, 1000)
  } catch (error) {
    console.error('Erro ao atualizar estudante:', error)
    snackbarMessage.value = error.response?.data?.message || 'Erro ao atualizar aluno'
    snackbarColor.value = 'error'
    snackbar.value = true
  }
}
</script> 
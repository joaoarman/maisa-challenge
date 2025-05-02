<template>
  <div>
    <div class="d-flex align-center mb-4">
      <v-btn icon class="mr-4" @click="goBack">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <h1 class="text-h4">Cadastrar Aluno</h1>
    </div>

    <v-card max-width="800px" class="mx-auto">
      <v-card-text>
        <v-form ref="form" v-model="valid" @submit.prevent="saveStudent">
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
                  :rules="raRules"
                  label="RA"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="student.cpf"
                  :rules="cpfRules"
                  label="CPF"
                  hint="Apenas números"
                  required
                  maxlength="11"
                  @input="handleCpfInput"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions class="pb-6 px-6">
        <v-spacer></v-spacer>
        <v-btn color="error" variant="outlined" class="mr-4" @click="goBack">Cancelar</v-btn>
        <v-btn color="primary" variant="elevated" @click="saveStudent" :disabled="!valid">Salvar</v-btn>
      </v-card-actions>
    </v-card>

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
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import studentsService from '../services/studentsService'

const router = useRouter()
const valid = ref(false)
const form = ref(null)

const snackbar = ref(false)
const snackbarMessage = ref('')
const snackbarColor = ref('success')

const student = reactive({
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

const raRules = [
  v => !!v || 'RA é obrigatório'
]

const cpfRules = [
  v => !!v || 'CPF é obrigatório',
  v => /^[0-9]{11}$/.test(v) || 'CPF deve ter 11 dígitos numéricos'
]

const goBack = () => {
  router.push('/students')
}

const saveStudent = async () => {
  if (!form.value.validate()) return
  
  try {
    const response = await studentsService.create(student)
    snackbarMessage.value = response.data.message || 'Aluno cadastrado com sucesso!'
    snackbarColor.value = 'success'
    snackbar.value = true
    
    setTimeout(() => {
      router.push('/students')
    }, 1000)
  } catch (error) {
    console.error('Erro ao salvar estudante:', error)
    snackbarMessage.value = error.response?.data?.message || 'Erro ao cadastrar aluno'
    snackbarColor.value = 'error'
    snackbar.value = true
  }
}

const handleCpfInput = (event) => {
  student.cpf = event.target.value.replace(/\D/g, '')
}
</script> 
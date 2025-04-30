<template>
  <div>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Novo Aluno</span>
        </v-card-title>

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
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" variant="text" @click="close">Cancelar</v-btn>
          <v-btn color="primary" variant="text" @click="saveStudent" :disabled="!valid">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
import { ref, reactive, defineEmits, defineExpose } from 'vue'
import studentsService from '../../services/studentsService'

const emit = defineEmits(['saved', 'close'])
const dialog = ref(false)
const valid = ref(false)
const form = ref(null)

// Snackbar
const snackbar = ref(false)
const snackbarMessage = ref('')
const snackbarColor = ref('success')

const student = reactive({
  name: '',
  email: '',
  ra: '',
  cpf: ''
})

// Regras de validação conforme modelo da API
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

const resetForm = () => {
  student.name = ''
  student.email = ''
  student.ra = ''
  student.cpf = ''
  form.value?.resetValidation()
}

const open = () => {
  resetForm()
  dialog.value = true
}

const close = () => {
  dialog.value = false
  emit('close')
}

const saveStudent = async () => {
  if (!form.value.validate()) return
  
  try {
    const response = await studentsService.create(student)
    snackbarMessage.value = response.data.message || 'Aluno cadastrado com sucesso!'
    snackbarColor.value = 'success'
    snackbar.value = true
    emit('saved', response.data.message)
    dialog.value = false
  } catch (error) {
    console.error('Erro ao salvar estudante:', error)
    snackbarMessage.value = error.response?.data?.message || 'Erro ao cadastrar aluno'
    snackbarColor.value = 'error'
    snackbar.value = true
  }
}

// Expõe a função para abrir o diálogo
defineExpose({ open })
</script>

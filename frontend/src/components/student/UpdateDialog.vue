<template>
  <div>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Editar Aluno</span>
        </v-card-title>

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

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" variant="text" @click="close">Cancelar</v-btn>
          <v-btn color="primary" variant="text" @click="updateStudent" :disabled="!valid">Salvar</v-btn>
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

const emit = defineEmits(['updated', 'close'])
const dialog = ref(false)
const valid = ref(false)
const form = ref(null)

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

// Regras de validação
const nameRules = [
  v => !!v || 'Nome é obrigatório',
  v => v.length >= 3 || 'Nome deve ter pelo menos 3 caracteres',
  v => v.length <= 100 || 'Nome deve ter no máximo 100 caracteres'
]

const emailRules = [
  v => !!v || 'Email é obrigatório',
  v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Email inválido'
]

const open = (item) => {
  // Copia os dados do aluno selecionado para o objeto student
  student.id = item.id
  student.name = item.name
  student.email = item.email
  student.ra = item.RA || item.ra
  student.cpf = item.cpf
  
  form.value?.resetValidation()
  valid.value = true
  dialog.value = true
}

const close = () => {
  dialog.value = false
  emit('close')
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
    emit('updated', response.data.message)
    dialog.value = false
  } catch (error) {
    console.error('Erro ao atualizar estudante:', error)
    snackbarMessage.value = error.response?.data?.message || 'Erro ao atualizar aluno'
    snackbarColor.value = 'error'
    snackbar.value = true
  }
}

// Expõe a função para abrir o diálogo
defineExpose({ open })
</script>

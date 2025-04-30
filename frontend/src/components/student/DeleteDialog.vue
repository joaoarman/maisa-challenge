<template>
  <div>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Confirmar exclusão</v-card-title>
        <v-card-text>
          <p>Tem certeza que deseja excluir o aluno <strong>{{ student.name }}</strong> (RA: {{ student.RA }})?</p>
          <p class="text-caption text-red">Esta ação não pode ser desfeita.</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey-darken-1" variant="text" @click="close">Cancelar</v-btn>
          <v-btn color="red-darken-1" variant="text" @click="deleteStudent" :loading="loading">Excluir</v-btn>
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
import { ref, defineEmits, defineExpose } from 'vue'
import studentsService from '../../services/studentsService'

const emit = defineEmits(['deleted', 'close'])

const dialog = ref(false)
const student = ref({})
const loading = ref(false)

// Snackbar
const snackbar = ref(false)
const snackbarMessage = ref('')
const snackbarColor = ref('success')

const open = (selectedStudent) => {
  student.value = selectedStudent
  dialog.value = true
}

const close = () => {
  dialog.value = false
  emit('close')
}

const deleteStudent = async () => {
  loading.value = true
  try {
    const response = await studentsService.delete(student.value.id)
    dialog.value = false
    snackbarMessage.value = response.data.message || 'Aluno excluído com sucesso!'
    snackbarColor.value = 'success'
    snackbar.value = true
    emit('deleted')
  } catch (error) {
    console.error('Erro ao excluir aluno:', error)
    snackbarMessage.value = error.response?.data?.message || 'Erro ao excluir aluno'
    snackbarColor.value = 'error'
    snackbar.value = true
  } finally {
    loading.value = false
  }
}

// Expõe a função para abrir o diálogo
defineExpose({ open })
</script>

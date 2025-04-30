import httpClient from './HttpService'

const studentsService = {

  getAll() {
    return httpClient.get('/students')
  },

  getById(id) {
    return httpClient.get(`/students/${id}`)
  },

  create(data) {
    return httpClient.post('/students', data)
  },

  update(id, data) {
    return httpClient.put(`/students/${id}`, data)
  },

  delete(id) {
    return httpClient.patch(`/students/${id}`)
  },

} 

export default studentsService
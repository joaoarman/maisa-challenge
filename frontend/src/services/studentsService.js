import httpClient from './HttpService'

const studentsService = {

  getTotal() {
    return httpClient.get('/students/total')
  },

  getAll(page = 1, limit = 10, search = '') {
    return httpClient.get('/students', {
      params: {
        page,
        limit,
        search
      }
    })
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
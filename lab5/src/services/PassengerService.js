import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://api.instantwebtools.net/v1',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getEvents(perPage, page) {
    return apiClient.get('/passenger?page= ' + page + '&size=' + perPage)
  },
  //added new call
  getPassenger(id) {
    return apiClient.get('/passenger/' + id)
  }
}

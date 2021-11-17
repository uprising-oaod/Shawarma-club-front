import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://10.24.141.168:3000',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getOrders() {
    return apiClient.get('/api/orders')
  },
  submitOrder(order) {
    return apiClient.post('/api/orders', order)
  }
}
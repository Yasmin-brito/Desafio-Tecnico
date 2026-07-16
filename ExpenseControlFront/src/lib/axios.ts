import axios from 'axios'

/**
 * Instância centralizada do Axios para comunicação com a API do ExpenseControl.
 * Centraliza baseURL e headers para evitar duplicação em cada service.
 */
export const api = axios.create({
  baseURL: 'http://localhost:5084/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

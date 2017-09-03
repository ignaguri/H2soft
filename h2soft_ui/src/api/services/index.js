import auth from 'src/api/auth'
// const API_URL = process.env.API_URL
const authHeader = { headers: auth.getAuthHeader() }

// LISTA DE TODOS LAS LLAMADAS AL SERVIDOR
export default {
  getContratos (context) {
    return context.$http.get('http://localhost:3030/contratos', authHeader)
  }
}

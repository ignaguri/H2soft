import auth from '../auth'
const API_URL = process.env.API_URL
const authHeader = { headers: auth.getAuthHeader() }

// LISTA DE TODOS LAS LLAMADAS AL SERVIDOR PARA DIAS
export default {
  getDias (context) {
    return context.$http.get(API_URL + 'dias', authHeader)
      .then(res => { return res.body.data })
  },
  getDia (context, idDia) {
    return context.$http.get(API_URL + 'dias/?iddia=' + idDia, authHeader)
  }
}

import auth from '../auth'
const API_URL = process.env.API_URL
const authHeader = { headers: auth.getAuthHeader() }

// LISTA DE TODOS LAS LLAMADAS AL SERVIDOR PARA TURNOS
export default {
  getTurnos (context) {
    return context.$http.get(API_URL + 'turnos', authHeader)
      .then(res => { return res.body.data })
  },
  getturno (context, idDia) {
    return context.$http.get(API_URL + 'dias/?idturno=' + idDia, authHeader)
  }
}

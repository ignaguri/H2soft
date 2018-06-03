import auth from '../auth'
const API_URL = process.env.API_URL

// LISTA DE TODOS LAS LLAMADAS AL SERVIDOR PARA TURNOS
export default {
  getTurnos (context) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'turnos', authHeader)
      .then(res => { return res.body.data })
  },
  getturno (context, idDia) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'dias/?idturno=' + idDia, authHeader)
  }
}

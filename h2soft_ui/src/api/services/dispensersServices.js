import auth from '../auth'
const API_URL = process.env.API_URL

// LISTA DE TODOS LAS LLAMADAS AL SERVIDOR PARA DISPENSERS
export default {
  getDispensers (context) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'dispensers', authHeader)
      .then(res => { return res.body.data })
  },
  getDispensersXObjetivo (context, idObjetivo) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'dispensers/?idObjetivo=' + idObjetivo, authHeader)
      .then(res => { return res.body.data })
  },
  setObjetivoADispenser (context, idDispenser, IdObjetivo) {
    const authHeader = { headers: auth.getAuthHeader() }
    var dispenser = {
      'idObjetivo': IdObjetivo
    }
    return context.$http.patch(API_URL + 'dispensers/' + idDispenser, dispenser, authHeader)
      .then(res => { return res.body.data })
  },
  borrarObjetivoDeDispenser (context, idDispenser) {
    const authHeader = { headers: auth.getAuthHeader() }
    var dispenser = {
      'idObjetivo': null
    }
    return context.$http.patch(API_URL + 'dispensers/' + idDispenser, dispenser, authHeader)
      .then(res => { return res.body.data })
  }
}

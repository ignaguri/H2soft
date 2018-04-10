import auth from '../auth'
const API_URL = process.env.API_URL
const authHeader = { headers: auth.getAuthHeader() }

// LISTA DE TODOS LAS LLAMADAS AL SERVIDOR PARA DISPENSERS
export default {
  getDispensers (context) {
    return context.$http.get(API_URL + 'dispensers', authHeader)
      .then(res => { return res.body.data })
  },
  getDispensersXObjetivo (context, idObjetivo) {
    return context.$http.get(API_URL + 'dispensers/?idObjetivo=' + idObjetivo, authHeader)
      .then(res => { return res.body.data })
  },
  setObjetivoADispenser (context, idDispenser, IdObjetivo) {
    var dispenser = {
      'idObjetivo': IdObjetivo,
      'idEstadoDispenser': 2 // seteo el estado "En objetivo y limpio"
    }
    return context.$http.patch(API_URL + 'dispensers/' + idDispenser, dispenser, authHeader)
      .then(res => { return res.body.data })
  },
  borrarObjetivoDeDispenser (context, idDispenser) {
    var dispenser = {
      'idObjetivo': null,
      'idEstadoDispenser': 4 // al retirar el dispenser del objetivo seteo el estado "En mantenimiento"
    }
    return context.$http.patch(API_URL + 'dispensers/' + idDispenser, dispenser, authHeader)
      .then(res => { return res.body.data })
  }
}

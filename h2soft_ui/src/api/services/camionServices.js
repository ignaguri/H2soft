import auth from '../auth'
const API_URL = process.env.API_URL
const authHeader = { headers: auth.getAuthHeader() }

// LISTA DE TODOS LAS LLAMADAS AL SERVIDOR
export default {
  getCamiones (context) {
    return context.$http.get(API_URL + 'camiones', authHeader)
      .then(res => { return res.body.data })
  },
  asignarCamionARecorrido (context, idRecorridoHistorico, idCamion) {
    var recorrido = {
      'idCamionAsignado': idCamion
    }
    return context.$http.patch(API_URL + 'recorrido-historico/?idRecorridosHistoricos=' + idRecorridoHistorico, recorrido, authHeader)
  }
}

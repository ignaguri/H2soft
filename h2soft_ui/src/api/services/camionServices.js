import auth from '../auth'
const API_URL = process.env.API_URL

// LISTA DE TODOS LAS LLAMADAS AL SERVIDOR
export default {
  getCamiones (context) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'camiones', authHeader)
      .then(res => { return res.body.data })
  },
  asignarCamionARecorrido (context, idRecorridoHistorico, idCamion) {
    const authHeader = { headers: auth.getAuthHeader() }
    const recorrido = {
      'idCamionAsignado': idCamion
    }
    return context.$http.patch(API_URL + 'recorrido-historico/?idRecorridosHistoricos=' + idRecorridoHistorico, recorrido, authHeader)
  }
}

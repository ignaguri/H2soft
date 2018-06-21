import auth from '../auth'
const API_URL = process.env.API_URL

// LISTA DE TODOS LAS LLAMADAS AL SERVIDOR
export default {
  getCamiones (context) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'camiones', authHeader)
      .then(res => { return res.body.data })
  },
  getCamionesLibres (context) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'camiones/?libre=1', authHeader)
      .then(res => { return res.body.data })
  },
  getCamion (context, id) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'camiones/' + id, authHeader)
      .then(res => { return res })
  },
  asignarCamionARecorrido (context, idRecorridoHistorico, idCamion) {
    const authHeader = { headers: auth.getAuthHeader() }
    const recorrido = {
      'idCamionAsignado': idCamion
    }
    return context.$http.patch(API_URL + 'recorrido-historico/?idRecorridosHistoricos=' + idRecorridoHistorico, recorrido, authHeader)
  },
  postCamiones (context, camion) {
    const authHeader = { headers: auth.getAuthHeader() }
    camion.libre = 1
    return context.$http.post(API_URL + 'camiones', camion, authHeader)
      .then(res => { return res })
      .catch(err => {
        console.error(err)
        return false
      })
  },
  editCamion (context, camion) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.patch(API_URL + 'camiones/' + camion.idCamiones, camion, authHeader)
      .then(res => {
        return true
      })
      .catch(error => {
        console.log('algo falló en el edit' + JSON.stringify(error))
      })
  },
  deleteCamion (context, idICamion) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.delete(API_URL + 'camiones/' + idICamion, authHeader)
  }
}

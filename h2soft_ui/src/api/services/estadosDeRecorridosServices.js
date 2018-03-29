import auth from '../auth'
const API_URL = process.env.API_URL

// LISTA DE TODOS LAS LLAMADAS AL SERVIDOR PARA ESTADOS DE LOS RECORRIDOS
export default {
  getEstados (context) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'estados-recorrido', authHeader)
      .then(res => { return res.body.data })
  },
  getEstado (context, idEstado) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + '/estados-recorrido/?idEstadosRecorrido=' + idEstado, authHeader)
  },
  iniciarRecorrido (context, idRecorridoHistorico) {
    const authHeader = { headers: auth.getAuthHeader() }
    let recorrido = {
      'idEstado': 2,
      'fechaInicio': new Date()
    }
    return context.$http.patch(API_URL + 'recorrido-historico/?idRecorridosHistoricos=' + idRecorridoHistorico, recorrido, authHeader)
  },
  // el reanudar pone el recorrido en estado en proceso pero no setea la fecha de inicio. La fecha de inicio solo es seteada por el iniciar recorrido
  reanudarRecorrido (context, idRecorridoHistorico) {
    const authHeader = { headers: auth.getAuthHeader() }
    let recorrido = {
      'idEstado': 2
    }
    return context.$http.patch(API_URL + 'recorrido-historico/?idRecorridosHistoricos=' + idRecorridoHistorico, recorrido, authHeader)
  },
  finalizarRecorrido (context, idRecorridoHistorico) {
    const authHeader = { headers: auth.getAuthHeader() }
    let recorrido = {
      'idEstado': 4,
      'fechaFin': new Date()
    }
    return context.$http.patch(API_URL + 'recorrido-historico/?idRecorridosHistoricos=' + idRecorridoHistorico, recorrido, authHeader)
  },
  suspenderRecorrido (context, idRecorridoHistorico) {
    const authHeader = { headers: auth.getAuthHeader() }
    let recorrido = {
      'idEstado': 3
    }
    return context.$http.patch(API_URL + 'recorrido-historico/?idRecorridosHistoricos=' + idRecorridoHistorico, recorrido, authHeader)
  },
  anularRecorrido (context, idRecorridoHistorico) {
    const authHeader = { headers: auth.getAuthHeader() }
    let recorrido = {
      'idEstado': 5
    }
    return context.$http.patch(API_URL + 'recorrido-historico/?idRecorridosHistoricos=' + idRecorridoHistorico, recorrido, authHeader)
  }
}

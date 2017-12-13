import auth from '../auth'
const API_URL = process.env.API_URL
const authHeader = { headers: auth.getAuthHeader() }

// LISTA DE TODOS LAS LLAMADAS AL SERVIDOR PARA ESTADOS DE LOS RECORRIDOS
export default {
  getEstados (context) {
    return context.$http.get(API_URL + 'estados-recorrido', authHeader)
      .then(res => { return res.body.data })
  },
  getEstado (context, idEstado) {
    return context.$http.get(API_URL + '/estados-recorrido/?idEstadosRecorrido=' + idEstado, authHeader)
  },
  iniciarRecorrido (context, idRecorridoHistorico) {
    var recorrido = {
      'idEstado': 2,
      'fechaInicio': new Date()
    }
    return context.$http.patch(API_URL + 'recorrido-historico/?idRecorridosHistoricos=' + idRecorridoHistorico, recorrido, authHeader)
  },
  // el reanudar pone el recorrido en estado en proceso pero no setea la fecha de inicio. La fecha de inicio solo es seteada por el iniciar recorrido
  reanudarRecorrido (context, idRecorridoHistorico) {
    var recorrido = {
      'idEstado': 2
    }
    return context.$http.patch(API_URL + 'recorrido-historico/?idRecorridosHistoricos=' + idRecorridoHistorico, recorrido, authHeader)
  },
  finalizarRecorrido (context, idRecorridoHistorico) {
    var recorrido = {
      'idEstado': 4,
      'fechaFin': new Date()
    }
    return context.$http.patch(API_URL + 'recorrido-historico/?idRecorridosHistoricos=' + idRecorridoHistorico, recorrido, authHeader)
  },
  suspenderRecorrido (context, idRecorridoHistorico) {
    var recorrido = {
      'idEstado': 3
    }
    return context.$http.patch(API_URL + 'recorrido-historico/?idRecorridosHistoricos=' + idRecorridoHistorico, recorrido, authHeader)
  },
  anularRecorrido (context, idRecorridoHistorico) {
    var recorrido = {
      'idEstado': 5
    }
    return context.$http.patch(API_URL + 'recorrido-historico/?idRecorridosHistoricos=' + idRecorridoHistorico, recorrido, authHeader)
  }
}

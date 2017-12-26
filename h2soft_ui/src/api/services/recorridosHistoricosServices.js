import auth from '../auth'
const API_URL = process.env.API_URL
const authHeader = { headers: auth.getAuthHeader() }

// LISTA DE TODOS LAS LLAMADAS AL SERVIDOR PARA RECORRIDOS
export default {
  getRecorridosAsignados (context) {
    return context.$http.get(API_URL + 'recorrido-historico', authHeader)
  },
  getRecorridoAsignadoXId (context, idRecorridoAsignado) {
    return context.$http.get(API_URL + 'recorrido-historico/?idRecorridosHistoricos=' + idRecorridoAsignado, authHeader)
  },
  getRecorridosAsignadosXEmpleado (context, idEmpleado) {
    return context.$http.get(API_URL + 'recorrido-historico/?idEmpleadoAsignado=' + idEmpleado, authHeader)
  },
  getDetallesRecorridoAsignado (context, idRecorridoAsignado) {
    return context.$http.get(API_URL + 'detalle-recorrido-historico/?idRecorridoHistorico=' + idRecorridoAsignado, authHeader)
  },
  getDetalleRecorridoAsignado (context, idDetalleRecorridoHistorico) {
    return context.$http.get(API_URL + 'detalle-recorrido-historico/?idDetalleRecorridoHistorico=' + idDetalleRecorridoHistorico, authHeader)
  },
  getRecorrido (context, idRecorrido) {
    return context.$http.get(API_URL + 'recorridos/?idRecorridos=' + idRecorrido, authHeader)
  },
  /*
  getDetalleRecorrido (context, idRecorrido) {
    return context.$http.get(API_URL + 'detalle-recorrido/?idRecorrido=' + idRecorrido, authHeader)
  },
  */
  getObjetivoXId (context, idObjetivo) {
    return context.$http.get(API_URL + 'objetivos-x-cliente/?idObjetivosXCliente=' + idObjetivo, authHeader)
  },
  editarDetalleRecorridoHistorico (context, detalleRecorridoHistorico) {
    return context.$http.patch(API_URL + 'detalle-recorrido-historico/' + detalleRecorridoHistorico.idDetalleRecorridoHistorico, detalleRecorridoHistorico, authHeader)
      .then(det => {
        return true
      })
      .catch(error => {
        console.log('algo falló en el edit' + JSON.stringify(error))
      })
  },
  mostrarRecorridoEnMapa (context, data) {
    console.log('mapa', data)
    let url = 'https://www.google.com/maps/dir/?api=1&'
    url += 'origin='// San+Luis+188%2C+Cordoba%2C+Cordoba'
    url += '&'
    url += 'destination='// San+Luis+188%2C+Cordoba%2C+Cordoba'
    url += '&'
    url += 'travelmode=driving'
    url += '&'
    url += 'waypoints='// Buenos+Aires+750%2C+Cordoba%2C+Cordoba%7CObispo+Trejo+332%2C+Cordoba%2C+Cordoba'
    return url
  }
}

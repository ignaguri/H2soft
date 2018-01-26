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
  getDireccionXNombre (context, nombre) {
    return context.$http.get(API_URL + 'objetivos-x-cliente/?nombre=' + nombre, authHeader)
      .then(ob => {
        return (ob.body.data[0].direccion)
      })
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
    // console.table(data)
    return this.generarURLMaps(context, data)
  },
  async generarURLMaps (context, data) {
    let direcciones = []
    for (let i = 0; i < data.length; i++) {
      await this.getDireccionXNombre(context, data[i].objetivo)
        .then(ob => {
          direcciones.push(ob)
        })
    }
    let url = 'https://www.google.com/maps/dir/?api=1&'
    url += 'origin=Abreu+de+Albornoz+467%2C+Cordoba%2C+Cordoba'// San+Luis+188%2C+Cordoba%2C+Cordoba'
    url += '&'
    url += 'destination=Abreu+de+Albornoz+467%2C+Cordoba%2C+Cordoba'// San+Luis+188%2C+Cordoba%2C+Cordoba'
    url += '&'
    url += 'travelmode=driving'
    url += '&'
    url += 'waypoints='// Buenos+Aires+750%2C+Cordoba%2C+Cordoba%7CObispo+Trejo+332%2C+Cordoba%2C+Cordoba'
    for (let i = 0; i < direcciones.length; i++) {
      url += parsearDireccion(direcciones[i])
      if (i !== direcciones.length - 1) {
        url += '%7C'
      }
    }
    return url
  }
}

const parsearDireccion = dir => {
  return dir.replace(/\s/g, '+')
    .replace(/,/g, '%2C')
}

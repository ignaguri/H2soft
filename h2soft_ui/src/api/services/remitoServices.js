import auth from '../auth'
const API_URL = process.env.API_URL

// LISTA DE TODOS LAS LLAMADAS AL SERVIDOR PARA REMITOS
export default {
  getRemitos (context) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'remitos', authHeader)
      .then(res => { return res.body.data })
  },
  getRemito (context, idRemito) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'remitos/?idRemito=' + idRemito, authHeader)
      .then(res => { return res })
  },
  getRemitoXObjetivo (context, idObjetivo) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'remitos/?idObjetivo=' + idObjetivo, authHeader)
      .then(res => { return res.body.data })
  },
  getUltimoRemitoXObjetivo (context, idObjetivo) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'remitos/?idObjetivo=' + idObjetivo, authHeader)
      .then(res => {
        return res.body.data
      })
      .catch(error => {
        console.log('algo falló en el insert del remito' + JSON.stringify(error))
      })
  },
  nuevoRemito (context, remito) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.post(API_URL + 'remitos', remito, authHeader)
      .then(rem => {
        return rem
      })
      .catch(error => {
        console.log('algo falló en el insert del remito' + JSON.stringify(error))
      })
  },
  nuevoDetalleRemitoProducto (context, detalleRemitoProductos) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.post(API_URL + 'detalle-remito-productos', detalleRemitoProductos, authHeader)
      .then(rem => {
        return true
      })
      .catch(error => {
        console.log('algo falló en el insert del detalle del remito' + JSON.stringify(error))
      })
  },
  nuevoDetalleRemitoDispensers (context, detalleRemitoDispensers) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.post(API_URL + 'detalle-remito-dispensers', detalleRemitoDispensers, authHeader)
      .then(rem => {
        return true
      })
      .catch(error => {
        console.log('algo falló en el insert del detalle del remito' + JSON.stringify(error))
      })
  },
  getDetalleRemitoProducto (context, idRemito) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'detalle-remito-productos/?idRemito=' + idRemito, authHeader)
      .then(rem => {
        return rem
      })
      .catch(error => {
        console.log('algo falló en el get del detalle del remito' + JSON.stringify(error))
      })
  },
  getDetalleRemitoDispensers (context, idRemito) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'detalle-remito-dispensers/?idRemito=' + idRemito, authHeader)
      .then(rem => {
        return rem
      })
      .catch(error => {
        console.log('algo falló en el get del detalle del remito' + JSON.stringify(error))
      })
  }
}

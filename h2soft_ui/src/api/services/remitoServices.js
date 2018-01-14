import auth from '../auth'
const API_URL = process.env.API_URL
const authHeader = { headers: auth.getAuthHeader() }

// LISTA DE TODOS LAS LLAMADAS AL SERVIDOR PARA REMITOS
export default {
  getRemitos (context) {
    return context.$http.get(API_URL + 'remitos', authHeader)
      .then(res => { return res.body.data })
  },
  getRemito (context, idRemito) {
    return context.$http.get(API_URL + 'remitos/?idRemito=' + idRemito, authHeader)
      .then(res => { return res })
  },
  nuevoRemito (context, remito) {
    return context.$http.post(API_URL + 'remitos', remito, authHeader)
      .then(rem => {
        return rem
      })
      .catch(error => {
        console.log('algo falló en el insert del remito' + JSON.stringify(error))
      })
  },
  nuevoDetalleRemitoProducto (context, detalleRemitoProductos) {
    return context.$http.post(API_URL + 'detalle-remito-productos', detalleRemitoProductos, authHeader)
      .then(rem => {
        return true
      })
      .catch(error => {
        console.log('algo falló en el insert del detalle del remito' + JSON.stringify(error))
      })
  },
  nuevoDetalleRemitoDispensers (context, detalleRemitoDispensers) {
    return context.$http.post(API_URL + 'detalle-remito-dispensers', detalleRemitoDispensers, authHeader)
      .then(rem => {
        return true
      })
      .catch(error => {
        console.log('algo falló en el insert del detalle del remito' + JSON.stringify(error))
      })
  },
  getDetalleRemitoProducto (context, idRemito) {
    return context.$http.get(API_URL + 'detalle-remito-productos/?idRemito=' + idRemito, authHeader)
      .then(rem => {
        return rem
      })
      .catch(error => {
        console.log('algo falló en el get del detalle del remito' + JSON.stringify(error))
      })
  },
  getDetalleRemitoDispensers (context, idRemito) {
    return context.$http.get(API_URL + 'detalle-remito-dispensers/?idRemito=' + idRemito, authHeader)
      .then(rem => {
        return rem
      })
      .catch(error => {
        console.log('algo falló en el get del detalle del remito' + JSON.stringify(error))
      })
  }
}

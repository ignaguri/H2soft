import auth from '../auth'
const API_URL = process.env.API_URL

export default {
  getRemitos (context) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'remitos', authHeader)
  },
  getEmpleados (context) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'empleados', authHeader)
  },
  getDetallesRemito (context, id) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'detalle-remito-productos/?idRemito=' + id, authHeader)
  },
  getProductosRemitos (context) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'productos', authHeader)
        .then(res => { return res.body.data })
  },
  getDetallesRemitoDispensers (context, id) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'detalle-remito-dispensers/?idRemito=' + id, authHeader)
  }
}

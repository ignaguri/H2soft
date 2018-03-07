/**
 * Created by apple on 30/12/17.
 */
import auth from '../auth'
const API_URL = process.env.API_URL
const authHeader = { headers: auth.getAuthHeader() }

export default {
  getRemitos (context) {
    return context.$http.get(API_URL + 'remitos', authHeader)
  },
  getEmpleados (context) {
    return context.$http.get(API_URL + 'empleados', authHeader)
  },
  getDetallesRemito (context, id) {
    return context.$http.get(API_URL + 'detalle-remito-productos/?idRemito=' + id, authHeader)
  },
  getProductosRemitos (context) {
    return context.$http.get('http://localhost:3030/productos', authHeader)
        .then(res => { return res.body.data })
  },
  getDetallesRemitoDispensers (context, id) {
    return context.$http.get(API_URL + 'detalle-remito-dispensers/?idRemito=' + id, authHeader)
  }
}

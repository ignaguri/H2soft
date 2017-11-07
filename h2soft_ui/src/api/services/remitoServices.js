/**
 * Created by apple on 6/11/17.
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
    return context.$http.get(API_URL + 'detalle-remito/?idRemito=' + id, authHeader)
  }
}

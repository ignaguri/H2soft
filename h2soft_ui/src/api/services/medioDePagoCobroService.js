/**
 * Created by apple on 30/12/17.
 */
import auth from '../auth'
const API_URL = process.env.API_URL
const authHeader = { headers: auth.getAuthHeader() }

export default {
  getMedioDePagoCobro (context) {
    return context.$http.get(API_URL + 'medios-de-pago-cobro', authHeader)
  }
}

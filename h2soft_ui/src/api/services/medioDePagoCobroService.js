/**
 * Created by apple on 30/12/17.
 */
import auth from '../auth'
const API_URL = process.env.API_URL

export default {
  getMedioDePagoCobro (context) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'medios-de-pago-cobro', authHeader)
      .then(r => r.body.data)
  }
}

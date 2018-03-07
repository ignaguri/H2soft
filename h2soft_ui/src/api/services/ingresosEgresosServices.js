
import auth from 'src/api/auth'
// const API_URL = process.env.API_URL
const authHeader = { headers: auth.getAuthHeader() }

export default {
  postIngresoEgreso (context, ingresoEgreso) {
    return context.$http.post('http://localhost:3030/gastos', ingresoEgreso, authHeader)
        .then(ieinsert => { return true })
  .catch(error => {
    alert('algo falló en el insert ' + JSON.stringify(error) + '\n' + error)
    return false
  })
  },
  getIngresoEgreso (context) {
    return context.$http.get('http://localhost:3030/gastos', authHeader)
        .then(res => { return res })
  },
  deleteIngresoEgreso (context, idIngresoEgreso) {
    return context.$http.delete('http://localhost:3030/gastos/' + idIngresoEgreso, authHeader)
  }
}

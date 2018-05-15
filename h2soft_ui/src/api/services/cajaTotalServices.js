import auth from '../auth'
const authHeader = { headers: auth.getAuthHeader() }

export default {
  postCajaTotal (context, cajaTotal) {
    return context.$http.post('http://localhost:3030/caja-total', cajaTotal, authHeader)
      .then(ieinsert => {
        return true
      })
      .catch(error => {
        alert('algo falló en el insert ' + JSON.stringify(error) + '\n' + error)
        return false
      })
  }
}

import auth from '../auth'

export default {
  postCajaTotal (context, cajaTotal) {
    const authHeader = { headers: auth.getAuthHeader() }
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

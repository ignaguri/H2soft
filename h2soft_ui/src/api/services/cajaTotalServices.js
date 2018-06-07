import auth from '../auth'

export default {
  postCajaTotal (context, cajaTotal) {
    const authHeader = {headers: auth.getAuthHeader()}
    return context.$http.post('http://localhost:3030/caja-total', cajaTotal, authHeader)
      .then(ieinsert => {
        return true
      })
      .catch(error => {
        alert('algo falló en el insert ' + JSON.stringify(error) + '\n' + error)
        return false
      })
  },
  getTotalPorTipoDePago (context) {
    const authHeader = {headers: auth.getAuthHeader()}
    let totales = {}
    totales.efectivo = 0
    totales.cheque = 0
    totales.transferencia = 0
    return context.$http.get('http://localhost:3030/caja-total', authHeader)
      .then(res => {
        res.body.data.forEach(ct => {
          if (ct.idMedioDePago === 1) {
            totales.efectivo += ct.monto
          } else if (ct.idMedioDePago === 2) {
            totales.cheque += ct.monto
          } else if (ct.idMedioDePago === 3) {
            totales.transferencia += ct.monto
          }
        })
        return totales
      })
  }
}

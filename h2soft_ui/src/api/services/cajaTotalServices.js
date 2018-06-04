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
        // console.log('caja total:' + JSON.stringify(res))
        res.body.data.forEach(ct => {
          // console.log('entre a el each de cajaTotal')
          if (ct.idMedioDePago === 1) {
            totales.efectivo += ct.monto
            // console.log('efectivo: ' + ct.monto)
            // console.log('Totales efect: ' + totales.efectivo)
          } else if (ct.idMedioDePago === 2) {
            totales.cheque += ct.monto
            // console.log('cheque: ' + ct.monto)
            // console.log('Totales cheaue: ' + totales.cheque)
          } else if (ct.idMedioDePago === 3) {
            totales.transferencia += ct.monto
            // console.log('transferencia: ' + ct.monto)
            // console.log('Totales transferencia: ' + totales.transferencia)
          }
        })
        console.log('Totales:' + JSON.stringify(totales))
        return totales
      })
  }
}

import auth from 'src/api/auth'
// const API_URL = process.env.API_URL
const authHeader = { headers: auth.getAuthHeader() }

// LISTA DE TODOS LAS LLAMADAS AL SERVIDOR
export default {
  getLocalidades (context) {
    return context.$http.get('http://localhost:3030/localidades', authHeader)
      .then(res => { return res.body.data })
  },
  getContratos (context) {
    return context.$http.get('http://localhost:3030/contratos', authHeader)
  },
  postContratos (context, contrato, detalle) {
    return context.$http.post('http://localhost:3030/contratos', contrato, authHeader)
      .then(contratoInsertado => {
        detalle.forEach(det => {
          det.idContrato = contratoInsertado.body.idContratos
        })
        let promesas = []
        detalle.forEach(det => {
          promesas.push(context.$http.post('http://localhost:3030/detalles-contrato', detalle, authHeader))
        })
        return promise.all(promesas)
      })
      .then(detalleInsertado => {
        alert('detalle insertado')
        return true
      })
      .catch(error => {
        alert('algo falló en el insert ' + JSON.stringify(error))
        return false
      })
  },
  getClientesContratos (context) {
    return context.$http.get('http://localhost:3030/clientes', authHeader)
      .then(res => { return res.body.data })
  },
  getProductosContratos (context) {
    return context.$http.get('http://localhost:3030/productos', authHeader)
      .then(res => { return res.body.data })
  },
  editarContrato (context, contrato) {
    return context.$http.patch('http://localhost:3030/contratos/' + contrato.id, contrato, authHeader)
  },
  getContrato (context, idContrato) {
    return context.$http.get('http://localhost:3030/contratos/?idContratos=' + idContrato, authHeader)
  },
  getDetalleContrato (contex, idContrato) {
    return contex.$http.getDetalleContrato('http://localhost:3030/detalles-contrato/' + idContrato, authHeader)
  }
}

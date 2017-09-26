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
  postContratos (context, contrato) {
    return context.$http.post('http://localhost:3030/contratos', contrato, authHeader)
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
  }
}

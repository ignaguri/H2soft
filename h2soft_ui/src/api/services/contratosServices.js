import auth from 'src/api/auth'
// const API_URL = process.env.API_URL
const authHeader = { headers: auth.getAuthHeader() }

// LISTA DE TODOS LAS LLAMADAS AL SERVIDOR
export default {
  getClientes (context) {
    return context.$http.get('http://localhost:3030/clientes', authHeader)
  },
  postClientes (context, cliente, contacto, objetivo) {
    console.log('llegue a post con: \n' + JSON.stringify(cliente) + '\n' + JSON.stringify(contacto) + '\n' + JSON.stringify(objetivo))
    return context.$http.post('http://localhost:3030/clientes', cliente, authHeader)
      .then(clienteInsertado => {
        console.log('inserté el cliente wee \n' + JSON.stringify(clienteInsertado))
        contacto.idCliente = clienteInsertado.body.idClientes
        objetivo.idCliente = clienteInsertado.body.idClientes
        return context.$http.post('http://localhost:3030/contactos-x-cliente', contacto, authHeader)
      })
    .then(contactoInsertado => {
      console.log('inserté el contacto \n' + JSON.stringify(contactoInsertado))
      return context.$http.post('http://localhost:3030/objetivos-x-cliente', objetivo, authHeader)
    })
    .then(objetivoInsertado => {
      console.log('inserté el objetivo \n' + JSON.stringify(objetivoInsertado))
      console.log('inserte todo bien wa8')
      return true
    })
    .catch(error => {
      console.log('algo falló en el insert' + JSON.stringify(error))
    })
  },
  getLocalidades (context) {
    return context.$http.get('http://localhost:3030/localidades', authHeader)
      .then(res => { return res.body.data })
  },
  getContratos (context) {
    return context.$http.get('http://localhost:3030/contratos', authHeader)
  },
  postContratos (context, contrato) {
    return context.$http.post('http://localhost:3030/contratos', contrato, authHeader)
      .then(contratoInsertado => {
        console.log('se inserto el contrato' + JSON.stringify(contratoInsertado))
      })
      .catch(error => {
        console.log('algo falló en el insert' + JSON.stringify(error))
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
      .then(contrato => {
        console.log('edité el user \n' + JSON.stringify(contrato))
        return true
      })
      .error(error => {
        console.log('algo falló en el edit' + JSON.stringify(error))
      })
  },
  getContrato (context, idContrato) {
    return context.$http.get('http://localhost:3030/contratos/?idContratos=' + idContrato, authHeader)
      .then(res => { return res.body.data })
  }
}

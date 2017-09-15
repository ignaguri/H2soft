import auth from '../auth'
const API_URL = process.env.API_URL
const authHeader = { headers: auth.getAuthHeader() }

// LISTA DE TODOS LAS LLAMADAS AL SERVIDOR
export default {
  getClientes (context) {
    return context.$http.get(API_URL + 'clientes', authHeader)
  },
  postClientes (context, cliente, contacto, objetivo) {
    console.log('llegue a post con: \n' + JSON.stringify(cliente) + '\n' + JSON.stringify(contacto) + '\n' + JSON.stringify(objetivo))
    return context.$http.post(API_URL + 'clientes', cliente, authHeader)
      .then(clienteInsertado => {
        console.log('inserté el cliente wee \n' + JSON.stringify(clienteInsertado))
        contacto.idCliente = clienteInsertado.body.idClientes
        objetivo.idCliente = clienteInsertado.body.idClientes
        return context.$http.post(API_URL + 'contactos-x-cliente', contacto, authHeader)
      })
    .then(contactoInsertado => {
      console.log('inserté el contacto \n' + JSON.stringify(contactoInsertado))
      return context.$http.post(API_URL + 'objetivos-x-cliente', objetivo, authHeader)
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
    return context.$http.get(API_URL + 'localidades', authHeader)
      .then(res => { return res.body.data })
  }
}

import auth from '../auth'
const API_URL = process.env.API_URL
const authHeader = { headers: auth.getAuthHeader() }

// LISTA DE TODOS LAS LLAMADAS AL SERVIDOR
export default {
  getClientes (context) {
    return context.$http.get(API_URL + 'clientes', authHeader)
  },
  postClientes (context, cliente, contacto, objetivo) {
    Promise.all([
      context.$http.post(API_URL + 'clientes', cliente, authHeader),
      context.$http.post(API_URL + 'contactos-x-cliente', contacto, authHeader),
      context.$http.post(API_URL + 'objetivos-x-cliente', objetivo, authHeader)
    ]).then(res => {
      console.log('Cliente cargado \n' + res)
    }, error => {
      console.log(error)
    })
  }
}

import auth from '../auth'
const API_URL = process.env.API_URL

// LISTA DE TODOS LAS LLAMADAS AL SERVIDOR
export default {
  getUsuarios (context) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'users', authHeader)
  },
  getUsuario (context, idUser) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'users/?id=' + idUser, authHeader)
  },
  newUsuario (context, usuario) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.post(API_URL + 'users', usuario, authHeader)
      .then(user => {
        return true
      })
      .catch(error => {
        console.log('algo falló en el insert' + JSON.stringify(error))
      })
  },
  getRoles (context) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'roles', authHeader)
      .then(res => { return res.body.data })
  },
  getEmpleados (context) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'empleados', authHeader)
      .then(res => { return res.body.data })
  },
  editUsuario (context, usuario) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.patch(API_URL + 'users/' + usuario.id, usuario, authHeader)
      .then(user => {
        return true
      })
      .catch(error => {
        console.log('algo falló en el edit' + JSON.stringify(error))
      })
  }
}

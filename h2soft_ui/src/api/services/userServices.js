import auth from '../auth'
const API_URL = process.env.API_URL
const authHeader = { headers: auth.getAuthHeader() }

// LISTA DE TODOS LAS LLAMADAS AL SERVIDOR
export default {
  getUsuarios (context) {
    return context.$http.get(API_URL + 'users', authHeader)
  },
  getUsuario (context, idUser) {
    return context.$http.get(API_URL + 'users/?id=' + idUser, authHeader)
  },
  newUsuario (context, usuario) {
    return context.$http.post(API_URL + 'users', usuario, authHeader)
      .then(user => {
        console.log('inserté el user \n' + JSON.stringify(user))
        return true
      })
      .catch(error => {
        console.log('algo falló en el insert' + JSON.stringify(error))
      })
  },
  getRoles (context) {
    return context.$http.get(API_URL + 'roles', authHeader)
      .then(res => { return res.body.data })
  },
  getEmpleados (context) {
    return context.$http.get(API_URL + 'empleados', authHeader)
      .then(res => { return res.body.data })
  },
  editUsuario (context, usuario) {
    return context.$http.patch(API_URL + 'users/' + usuario.id, usuario, authHeader)
      .then(user => {
        console.log('edité el user \n' + JSON.stringify(user))
        return true
      })
      .catch(error => {
        console.log('algo falló en el edit' + JSON.stringify(error))
      })
  }
}

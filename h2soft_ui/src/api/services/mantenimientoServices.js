import auth from '../auth'
const API_URL = process.env.API_URL
const authHeader = { headers: auth.getAuthHeader() }

// LISTA DE TODOS LAS LLAMADAS AL SERVIDOR
export default {
  getMantenimientos (context) {
    return context.$http.get(API_URL + 'mantenimientos', authHeader)
      .then(res => { return res.body.data })
  },
  getMantenimiento (context, id) {
    return context.$http.get(API_URL + 'mantenimientos' + '/?idMantenimientos=' + id, authHeader)
      .then(res => { return res.body.data })
  },
  getEstadosMantenimiento (context) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'estados-mantenimiento', authHeader)
      .then(res => { return res.body.data })
  },
  getTipoMantenimiento (context) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'tipos-mantenimiento', authHeader)
      .then(res => { return res.body.data })
  },
  nuevoMantenimiento (context, mantenimiento) {
    return context.$http.post(API_URL + 'mantenimientos', mantenimiento, authHeader)
      .then(mant => {
        return true
      })
      .catch(error => {
        console.log('algo falló en el insert' + JSON.stringify(error))
      })
  }
}

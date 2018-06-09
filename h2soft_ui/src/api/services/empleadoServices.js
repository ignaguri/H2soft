import auth from '../auth'
const API_URL = process.env.API_URL

// LISTA DE TODOS LAS LLAMADAS AL SERVIDOR PARA DIAS
export default {
  getDias (context) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'dias', authHeader)
      .then(res => { return res.body.data })
  },
  getDia (context, idDia) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'dias/?iddia=' + idDia, authHeader)
  },
  getEmpleados (context) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'empleados', authHeader)
      .then(res => { return res.body.data })
  },
  deleteEmpleado (context, idEmpleado) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.delete(API_URL + 'empleados/' + idEmpleado, authHeader)
  },
  postEmpleado (context, empleados) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.post(API_URL + 'empleados', empleados, authHeader)
      .then(res => { return res })
      .catch(err => {
        console.error(err)
        return false
      })
  },
  editEmpleado (context, empleado) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.patch(API_URL + 'empleados/' + empleado.idEmpleados, empleado, authHeader)
      .then(res => {
        return true
      })
      .catch(error => {
        console.log('algo falló en el edit' + JSON.stringify(error))
      })
  },
  getEmpleadoo (context, idEmplead) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'empleados/' + idEmplead, authHeader)
      .then(res => { return res.body })
  },
  getLocalidad (context) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'localidades', authHeader)
      .then(res => { return res.body.data })
  }
}

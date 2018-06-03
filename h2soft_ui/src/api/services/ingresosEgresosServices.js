
import auth from 'src/api/auth'
// const API_URL = process.env.API_URL

export default {
  postIngresoEgreso (context, ingresoEgreso) {
    const authHeader = { headers: auth.getAuthHeader() }
    const user = JSON.parse(sessionStorage.getItem('user'))
    console.log('USER:' + JSON.stringify(user))
    console.log('idEMpleadoo:' + JSON.stringify(user.idEmpleado))
    ingresoEgreso.idEmpleado = JSON.stringify(user.idEmpleado)
    return context.$http.post('http://localhost:3030/gastos', ingresoEgreso, authHeader)
        .then(ieinsert => { return true })
  .catch(error => {
    alert('algo falló en el insert ' + JSON.stringify(error) + '\n' + error)
    return false
  })
  },
  getIngresoEgreso (context) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get('http://localhost:3030/gastos', authHeader)
        .then(res => { return res })
  },
  deleteIngresoEgreso (context, idIngresoEgreso) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.delete('http://localhost:3030/gastos/' + idIngresoEgreso, authHeader)
  },
  getIngresoEgresoById (context, id) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get('http://localhost:3030/gastos/' + id, authHeader)
        .then(res => { return res })
  },
  pathcIngresosEgresos (context, idIE, ingresoEgreso) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.patch('http://localhost:3030/gastos/' + idIE, ingresoEgreso, authHeader)
        .then(res => { return res })
  },
  getIngresoEgreso2 (context, idGasto) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get('http://localhost:3030/gastos/' + idGasto, authHeader)
        .then(res => { return res.body })
  },
  getIngresoEgresoSinImagen (context, id) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get('http://localhost:3030/gastos?$select[]=monto&$select[]=idEmpleado&$select[]=idMedioDePagoCobro&$select[]=fecha&$select[]=descripcion&$select[]=idGastos', authHeader)
      .then(res => { return res })
  },
  getIngresoEgresoSinImagenPorUsuario (context, id) {
    const authHeader = { headers: auth.getAuthHeader() }
    const user = JSON.parse(sessionStorage.getItem('user'))
    console.log('idEMpleadoo para get:' + JSON.stringify(user.idEmpleado))
    if (user.idRol === 1) {
      return context.$http.get('http://localhost:3030/gastos/?&$select[]=monto&$select[]=idEmpleado&$select[]=idMedioDePagoCobro&$select[]=fecha&$select[]=descripcion&$select[]=idGastos', authHeader)
        .then(res => { return res })
    }
    return context.$http.get('http://localhost:3030/gastos/?idEmpleado=' + user.idEmpleado + '&$select[]=monto&$select[]=idEmpleado&$select[]=idMedioDePagoCobro&$select[]=fecha&$select[]=descripcion&$select[]=idGastos', authHeader)
      .then(res => { return res })
  }
}

import auth from '../auth'
const API_URL = process.env.API_URL

// LISTA DE TODOS LAS LLAMADAS AL SERVIDOR PARA DISPENSERS
export default {
  getDispensers (context) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'dispensers', authHeader)
      .then(res => { return res.body.data })
  },
  getDispenser (context, idDispenser) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'dispensers/?iddispensers=' + idDispenser, authHeader)
      .then(res => { return res.body.data[0] })
  },
  getEstadosDispensers (context) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'estados-dispenser', authHeader)
      .then(res => { return res.body.data })
  },
  getDispensersXObjetivo (context, idObjetivo) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'dispensers/?idObjetivo=' + idObjetivo, authHeader)
      .then(res => { return res.body.data })
  },
  getDispensersXCliente (context, idCliente) {
    const authHeader = { headers: auth.getAuthHeader() }
    let dispensers = []
    return context.$http.get(API_URL + 'objetivos-x-cliente' + '/?idCliente=' + idCliente + '&activo=' + 1, authHeader)
      .then(res => {
        res = res.body.data
        res.forEach(o => {
          context.$http.get(API_URL + 'dispensers/?idObjetivo=' + res[0].idObjetivosXCliente, authHeader)
          .then(dis => {
            dispensers = dispensers + dis
            console.log(dispensers)
            return dispensers
          })
        })
      })
  },
  setObjetivoADispenser (context, idDispenser, IdObjetivo) {
    const authHeader = { headers: auth.getAuthHeader() }
    var dispenser = {
      'idObjetivo': IdObjetivo,
      'idEstadoDispenser': 2 // seteo el estado "En objetivo y limpio"
    }
    return context.$http.patch(API_URL + 'dispensers/' + idDispenser, dispenser, authHeader)
      .then(res => { return res.body.data })
  },
  postDispenser (context, dispenser) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.post(API_URL + 'dispensers', dispenser, authHeader)
      .then(dispenserInsertado => {
        console.log(dispenserInsertado)
        return dispenserInsertado
      })
      .catch(error => {
        console.log('error insertando dispenser', error)
        return false
      })
  },
  editDispenser (context, dispenser) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.patch(API_URL + 'dispensers/' + dispenser.id, dispenser, authHeader)
      .then(res => {
        return true
      })
      .catch(error => {
        console.log('algo falló en el edit' + JSON.stringify(error))
      })
  },
  borrarObjetivoDeDispenser (context, idDispenser) {
    const authHeader = { headers: auth.getAuthHeader() }
    var dispenser = {
      'idObjetivo': null,
      'idEstadoDispenser': 4 // al retirar el dispenser del objetivo seteo el estado "En mantenimiento"
    }
    return context.$http.patch(API_URL + 'dispensers/' + idDispenser, dispenser, authHeader)
      .then(res => { return res.body.data })
  },
  getCodigosDispensers (context) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'dispensers/', authHeader)
      .then(res => {
        if (res) {
          let codigos = []
          let disp = ''
          res.body.data.forEach(d => {
            disp = {
              id: d.idDispensers,
              codigo: d.codigo
            }
            codigos.push(disp)
          })
          return codigos
        }
      })
  }
}

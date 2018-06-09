import auth from '../auth'
const API_URL = process.env.API_URL

// LISTA DE TODOS LAS LLAMADAS AL SERVIDOR
export default {
  getAlertas (context) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'alertas', authHeader)
      .then(res => {
        let promesas = []
        res.body.data.forEach(a => promesas.push(this.populateCamposAlerta(context, a)))
        return Promise.all(promesas)
      })
      .then(r => {
        return r
      })
  },
  getAlertasPendientes (context) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'alertas' + '?idEstado=' + 1, authHeader)
      .then(res => {
        let promesas = []
        res.body.data.forEach(a => promesas.push(this.populateCamposAlerta(context, a)))
        return Promise.all(promesas)
      })
      .then(r => {
        return r
      })
  },
  getAlerta (context, id) {
    const authHeader = { headers: auth.getAuthHeader() }
    let result = {}
    return context.$http.get(API_URL + 'alertas/' + id, authHeader)
      .then(r => {
        result = r.data
        const bidones = Number(r.data.notificacion.split(' ')[1])
        result.bidones = !isNaN(bidones) ? bidones : null
        return context.$http.get(API_URL + 'objetivos-x-cliente/' + result.idObjetivo, authHeader)
      })
      .then(o => {
        result.idCliente = o.data.idCliente
        return result
      })
      .catch(err => {
        console.error(err)
        return false
      })
  },
  getAlertasPorObjetivo (context, idObjetivo) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'alertas' + '/?idObjetivo=' + idObjetivo, authHeader)
      .then(res => {
        let promesas = []
        res.body.data.forEach(a => promesas.push(this.populateCamposAlerta(context, a)))
        return Promise.all(promesas)
      })
      .then(r => {
        return r
      })
  },
  populateCamposAlerta (context, alerta) {
    const authHeader = { headers: auth.getAuthHeader() }
    let result = {}
    return context.$http.get(API_URL + 'objetivos-x-cliente/' + alerta.idObjetivo, authHeader)
      .then(objetivo => {
        result.objetivo = objetivo.data.nombre
        return context.$http.get(API_URL + 'clientes/' + objetivo.data.idCliente, authHeader)
      })
      .then(cliente => {
        result.cliente = cliente.data.razonSocial
        return context.$http.get(API_URL + 'tipos-alerta/' + alerta.idTipo, authHeader)
      })
      .then(tipo => {
        result.tipo = tipo.data.nombre
        return context.$http.get(API_URL + 'estados-alerta/' + alerta.idEstado, authHeader)
      })
      .then(estado => {
        result.estado = estado.data.nombre
        result.notificación = alerta.notificacion
        result.nro = alerta.idAlertas
        result.bidones = alerta.notificacion.split(' ')[1]
        return result
      })
  },
  getTipos (context) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'tipos-alerta', authHeader)
      .then(res => { return res.body.data })
  },
  getTipoAlerta (context, idTipo) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'tipos-alerta' + idTipo, authHeader)
      .then(res => { return res.body.data })
  },
  getEstados (context) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'estados-alerta', authHeader)
      .then(res => { return res.body.data })
  },
  getProductos (context) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'productos', authHeader)
      .then(res => { return res.body.data })
  },
  postAlerta (context, alerta) {
    // TODO: add logica desvinculacion
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.post(API_URL + 'alertas', alerta, authHeader)
      .then(res => {
        return res
      })
      .catch(err => {
        console.error(err)
        return false
      })
  },
  updateAlerta (context, id, alerta) {
    // TODO: add logica desvinculacion
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.put(API_URL + 'alertas/' + id, alerta, authHeader)
      .then(res => {
        return res
      })
      .catch(err => {
        console.error(err)
        return false
      })
  },
  deleteAlerta (context, id) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.delete(API_URL + 'alertas/' + id, authHeader)
      .then(res => {
        return res
      })
      .catch(err => {
        console.error(err)
        return false
      })
  },
  updateEstado (context, alerta) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.patch(API_URL + 'alertas/' + alerta.id, { idEstado: alerta.idEstado }, authHeader)
      .then(res => {
        return res
      })
      .catch(err => {
        console.error(err)
        return false
      })
  }
}

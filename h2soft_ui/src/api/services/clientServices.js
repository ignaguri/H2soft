import auth from '../auth'
const API_URL = process.env.API_URL

// LISTA DE TODOS LAS LLAMADAS AL SERVIDOR
export default {
  getClientes (context) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'clientes', authHeader)
  },
  getCliente (context, id) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'clientes' + '/?idClientes=' + id, authHeader)
      .then(res => { return res.body.data })
  },
  getClienteFull (context, id) {
    const authHeader = { headers: auth.getAuthHeader() }
    let info = {}
    return context.$http.get(API_URL + 'clientes/' + id, authHeader)
      .then(cl => {
        info['cliente'] = cl.body
        return context.$http.get(API_URL + 'contactos-x-cliente' + '/?idCliente=' + id, authHeader)
      })
      .then(cxc => {
        info['contacto'] = cxc.body.data[0]
        return context.$http.get(API_URL + 'objetivos-x-cliente' + '/?idCliente=' + id, authHeader)
      })
      .then(oxc => {
        info['objetivos'] = oxc.body.data
        return info
      })
      .catch(error => {
        console.log('algo falló en el get ', error)
        return false
      })
  },
  postClientes (context, cliente, contacto, objetivos) {
    const authHeader = { headers: auth.getAuthHeader() }
    console.log('llegue a post con: \n' + JSON.stringify(cliente) + '\n' + JSON.stringify(contacto) + '\n' + JSON.stringify(objetivos))
    return context.$http.post(API_URL + 'clientes', cliente, authHeader)
      .then(clienteInsertado => {
        console.log('inserté el cliente wee \n')
        contacto.idCliente = clienteInsertado.body.idClientes
        // objetivo.idCliente = clienteInsertado.body.idClientes
        objetivos.forEach(ob => {
          ob.idCliente = clienteInsertado.body.idClientes
        })
        return context.$http.post(API_URL + 'contactos-x-cliente', contacto, authHeader)
      })
    .then(contactoInsertado => {
      console.log('inserté el contacto \n')
      let promesas = []
      objetivos.forEach(objetivo => {
        promesas.push(context.$http.post(API_URL + 'objetivos-x-cliente', objetivo, authHeader))
      })
      return Promise.all(promesas)
    })
    .then(objetivoInsertado => {
      console.log('inserté los objetivos \n' + JSON.stringify(objetivoInsertado))
      console.log('inserte todo bien wa8')
      return true
    })
    .catch(error => {
      console.log('algo falló en el insert ', error)
      return false
    })
  },
  deleteClientes (context, id) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.delete(API_URL + 'contactos-x-cliente/?idCliente=' + id, authHeader)
      .then(() => {
        return context.$http.delete(API_URL + 'objetivos-x-cliente/?idCliente=' + id, authHeader)
      })
      .then(() => {
        return context.$http.delete(API_URL + 'clientes/' + id, authHeader)
      })
      .then(res => {
        console.log('borrado', res)
        return true
      })
      .catch(error => {
        console.log('error', error)
        return false
      })
  },
  getLocalidades (context) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'localidades', authHeader)
      .then(res => { return res.body.data })
  },
  getObjetivos (context, id) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'objetivos-x-cliente' + '/?idCliente=' + id, authHeader)
      .then(res => { return res.body.data })
  },
  getObjetivo (context, idObjetivo) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'objetivos-x-cliente' + '/?idObjetivosXCliente=' + idObjetivo, authHeader) //     .then(res => { return res })
  },
  postObjetivos (context, objetivo) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.post(API_URL + 'objetivos-x-cliente', objetivo, authHeader)
      .then(res => { return true })
      .catch(error => {
        console.log(error)
        return false
      })
  },
  editClientes (context, id, cliente, contacto, objetivos) {
    const authHeader = { headers: auth.getAuthHeader() }
    console.log('llegue a edit con: \n' + JSON.stringify(cliente) + '\n' + JSON.stringify(contacto) + '\n' + JSON.stringify(objetivos))
    return context.$http.patch(API_URL + 'clientes/' + id, cliente, authHeader)
      .then(clienteUpdated => {
        return context.$http.patch(API_URL + 'contactos-x-cliente' + '/?idCliente=' + id, contacto, authHeader)
      })
      .then(contactoUpdated => {
        return context.$http.delete(API_URL + 'objetivos-x-cliente' + '/?idCliente=' + id, authHeader)
      })
      .then(objsBorrados => {
        let promesas = []
        objetivos.forEach(objetivo => {
          objetivo.idCliente = id
          promesas.push(context.$http.post(API_URL + 'objetivos-x-cliente', objetivo, authHeader))
        })
        return Promise.all(promesas)
      })
      .then(objetivosUpdated => {
        console.log('updatee todo bien wa8')
        return true
      })
      .catch(error => {
        console.log('algo falló en el update ', error)
        return false
      })
  },
  getTiposCliente (context) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'tipos-cliente', authHeader)
      .then(res => { return res.body.data })
  },
  getClienteConContratos (context, id) {
    const authHeader = { headers: auth.getAuthHeader() }
    let info = {}
    return context.$http.get(API_URL + 'clientes/' + id, authHeader)
      .then(cl => {
        info['cliente'] = cl.body
        return context.$http.get(API_URL + 'objetivos-x-cliente' + '/?idCliente=' + id, authHeader)
      })
      .then(oxc => {
        info['objetivos'] = oxc.body.data
        return context.$http.get(API_URL + 'contratos' + '/?idCliente=' + id, authHeader)
      })
      .then(con => {
        info['contratos'] = con.body.data
        return info
      })
      .catch(error => {
        console.log('algo falló en el get ', error)
        return false
      })
  }
}

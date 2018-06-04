import auth from '../auth'
const API_URL = process.env.API_URL

// LISTA DE TODOS LAS LLAMADAS AL SERVIDOR
export default {
  test () {
    const authHeader = { headers: auth.getAuthHeader() }
    console.log('api de recorridos', API_URL, authHeader)
  },
  getTemporadas (context) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'temporada', authHeader)
      .then(res => { return res.body.data })
  },
  getDias (context) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'dias', authHeader)
      .then(res => { return res.body.data })
  },
  getTurnos (context) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'turnos', authHeader)
      .then(res => { return res.body.data })
  },
  getFrecuencias (context) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'frecuencia-recorridos', authHeader)
      .then(res => { return res.body.data })
  },
  getClientes (context) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'clientes', authHeader)
      .then(res => { return res.body.data })
  },
  getObjetivos (context, id) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'objetivos-x-cliente' + '/?idCliente=' + id, authHeader)
      .then(res => { return res.body.data })
  },
  postRecorrido (context, recorrido, detalle) {
    const authHeader = { headers: auth.getAuthHeader() }
    if (recorrido.idRecorridos === null) {
      delete recorrido.idRecorridos
      recorrido.activo = true
      console.log('recorrido sin id', recorrido)
      return context.$http.post(API_URL + 'recorridos', recorrido, authHeader)
        .then(recorridoInsertado => {
          console.log('inserté el recorrido', recorridoInsertado)
          detalle.idRecorrido = recorridoInsertado.body.idRecorridos
          return context.$http.post(API_URL + 'detalle-recorrido', detalle, authHeader)
        })
        .then(detalleInsertado => {
          console.log('inserté el detalle de recorrido', detalleInsertado)
          return true
        })
        .catch(error => {
          console.log('error insertando recorrido', error)
          return false
        })
    } else {
      console.log('recorrido con id', recorrido)
      detalle.idRecorrido = recorrido.idRecorridos
      return context.$http.post(API_URL + 'detalle-recorrido', detalle, authHeader)
        .then(detalleInsertado => {
          console.log('updatié el detalle de recorrido', detalleInsertado)
          return true
        })
        .catch(error => {
          console.log('error updating recorrido', error)
          return false
        })
    }
  },
  getRecorridos (context) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'recorridos', authHeader)
      .then(r => { return r.body.data })
  },
  getRecorrido (context, id) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'recorridos/' + id, authHeader)
      .then(r => { return r.body })
  },
  getRecorridosFull (context) {
    const authHeader = { headers: auth.getAuthHeader() }
    // TODO: guardar dia, freq, turno y temp en una variable y comparar con eso
    let info = {}
    let total = []
    let promesas = []
    return context.$http.get(API_URL + 'recorridos', authHeader)
      .then(r => {
        r.body.data.forEach(re => {
          info = {}
          info.recorrido = re.idRecorridos
          info.dia = re.idDia
          info.frecuencia = re.idFrecuencia
          info.turno = re.idTurno
          info.temporada = re.idTemporada
          promesas.push(this.populateCamposRecorrido(context, info).then(d => total.push(d)))
        })
        return Promise.all(promesas)
      })
      .then(() => {
        return total
      })
      .catch(err => {
        console.error('Error en getRecorridosFull', err)
        return false
      })
  },
  populateCamposRecorrido (context, info) {
    const authHeader = { headers: auth.getAuthHeader() }
    let res = {}
    res.recorrido = info.recorrido
    return context.$http.get(API_URL + 'dias/' + info.dia, authHeader)
      .then(dia => {
        res.dia = dia.body.nombre
        return context.$http.get(API_URL + 'frecuencia-recorridos/' + info.frecuencia, authHeader)
      })
      .then(freq => {
        res.frecuencia = freq.body.nombre
        return context.$http.get(API_URL + 'turnos/' + info.turno, authHeader)
      })
      .then(turno => {
        res.turno = turno.body.nombre
        return context.$http.get(API_URL + 'temporada/' + info.temporada, authHeader)
      })
      .then(temp => {
        res.temporada = temp.body.nombre
        return this.checkIfAsignado(context, info.recorrido)
      })
      .then(asignado => {
        res.asignado = asignado
        return res
      })
      .catch(error => {
        console.log('error en el populateCamposRecorrido', error)
        return false
      })
  },
  getDetalleRecorrido (context, id) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'detalle-recorrido' + '/?idRecorrido=' + id, authHeader)
      .then(r => { return r.body.data })
  },
  getDetalleRecorridosFull (context, id) {
    const authHeader = { headers: auth.getAuthHeader() }
    let info = {}
    let total = []
    let promesas = []
    return context.$http.get(API_URL + 'detalle-recorrido' + '/?idRecorrido=' + id, authHeader)
      .then(r => {
        r.body.data.forEach(re => {
          info = {}
          info.detalleRecorrido = re.idDetalleRecorrido
          info.recorrido = re.idRecorrido
          info.objetivo = re.idObjetivo
          info.orden = re.orden
          promesas.push(this.populateCamposDetalleRecorrido(context, info).then(d => total.push(d)))
        })
        return Promise.all(promesas)
      })
      .then(() => {
        return total
      })
  },
  populateCamposDetalleRecorrido (context, info) {
    const authHeader = { headers: auth.getAuthHeader() }
    let res = {}
    res.detalleRecorrido = info.detalleRecorrido
    res.recorrido = info.recorrido
    res.orden = info.orden
    return context.$http.get(API_URL + 'objetivos-x-cliente/' + info.objetivo, authHeader)
      .then(objetivo => {
        res.objetivo = objetivo.body.nombre
        res.direccion = objetivo.body.direccion
        res.localidad = objetivo.body.localidad
        return context.$http.get(API_URL + 'clientes/' + objetivo.body.idCliente, authHeader)
      })
      .then(cliente => {
        res.cliente = cliente.body.razonSocial
        return res
      })
      .catch(error => {
        console.log('error en el getRecorridosFull', error)
        return false
      })
  },
  getObjetivosSinPlanificar (context) {
    const authHeader = { headers: auth.getAuthHeader() }
    let objetivos = {}
    let planificados = {}
    let filtrados = {}
    return context.$http.get(API_URL + 'objetivos-x-cliente', authHeader)
      .then(res => {
        objetivos = res.body.data
        return context.$http.get(API_URL + 'detalle-recorrido', authHeader)
      })
      .then(planned => {
        planificados = planned.body.data
        filtrados = objetivos.filter(ob => {
          let flag = true
          planificados.forEach(pl => {
            if (pl.idObjetivo === ob.idObjetivosXCliente) {
              flag = false
            }
          })
          return flag
        })
        let promesas = []
        filtrados.forEach(f => {
          promesas.push(context.$http.get(API_URL + 'clientes/' + f.idCliente, authHeader).then(c => { f.cliente = c.body.razonSocial }))
        })
        return Promise.all(promesas)
      })
      .then(() => {
        return filtrados
      })
  },
  deleteObjetivoFromRecorrido (context, objetivo, recorrido) {
    const authHeader = { headers: auth.getAuthHeader() }
    // TODO: agregar el nombre del cliente como parametro por si 2 objetivos se llaman igual
    return context.$http.get(API_URL + 'objetivos-x-cliente' + '/?nombre=' + objetivo, authHeader)
      .then(obj => {
        let idObjetivo = obj.body.data[0].idObjetivosXCliente
        if (idObjetivo !== undefined) {
          return context.$http.delete(API_URL + 'detalle-recorrido' + '/?idObjetivo=' + idObjetivo + '&idRecorrido=' + recorrido, authHeader)
        } else {
          console.log('No se encontró el id del objetivo buscado')
          return false
        }
      })
      .then(r => {
        return true
      })
      .catch(error => {
        console.log('error al eliminar objetivo de recorrido', error)
        return false
      })
  },
  deleteRecorrido (context, id) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.delete(API_URL + 'detalle-recorrido' + '/?idRecorrido=' + id, authHeader)
      .then(noDetails => {
        console.log('se borraron los detalles', noDetails)
        return context.$http.delete(API_URL + 'recorridos/' + id, authHeader)
      })
      .then(r => {
        console.log('borrado el recorrido', r)
        return true
      })
      .catch(error => {
        console.log('error al borrar el recorrido', error)
        return false
      })
  },
  getEmpleados (context) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'empleados', authHeader)
      .then(res => { return res.body.data })
  },
  getRepartidores (context) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'users', authHeader)
      .then(users => {
        return users.body.data.filter(u => u.idRol === 3)
      })
      .then(filtrados => {
        let promesas = []
        filtrados.forEach(u => promesas.push(context.$http.get(API_URL + 'empleados/' + u.idEmpleado, authHeader).then(r => r.body)))
        return Promise.all(promesas)
      })
      .then(repartidores => {
        return repartidores
      })
  },
  postAsignacion (context, asignacion) {
    const authHeader = { headers: auth.getAuthHeader() }
    console.log('somehow asignar', asignacion)
    return context.$http.post(API_URL + 'recorrido-historico/asignar', asignacion, authHeader)
      .then(asignado => {
        console.log('asigné', asignado)
        return true
      })
      .catch(error => {
        console.log('error asignando el recorrido', error)
        return false
      })
  },
  checkIfAsignado (context, id) {
    const authHeader = { headers: auth.getAuthHeader() }
    const hoy = new Date()
    const enUnMes = new Date(hoy)
    enUnMes.setDate(hoy.getDate() + 30)
    return context.$http.get(API_URL + 'recorrido-historico/' + '?idRecorrido=' + id +
          '&fechaAsignacion[$gte]=' + hoy.toISOString() +
          '&fechaAsignacion[$lt]=' + enUnMes.toISOString(),
          authHeader)
      .then(r => {
        return context.$http.get(API_URL + 'empleados/' + r.body.data[r.body.data.length - 1].idEmpleadoAsignado, authHeader)
      })
      .then(emple => {
        return { nombre: emple.body.nombre, apellido: emple.body.apellido }
      })
      .catch(() => {
        return false
      })
  }
}

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
  calcularVentasPorCliente (context, cliente, fechaDesde, fechaHasta) {
    const authHeader = { headers: auth.getAuthHeader() }
    // PREPARO LAS FECHAS PARA SU USO
    console.log(fechaDesde, fechaHasta)
    const desde = fechaDesde.split('/')
    fechaDesde = new Date(desde[2], desde[1] - 1, desde[0])
    const hasta = fechaHasta.split('/')
    fechaHasta = new Date(hasta[2], hasta[1] - 1, hasta[0])
    fechaHasta.setDate(fechaHasta.getDate() + 1)
    let objetivosAux
    // BUSCO LOS OBJETIVOS DEL CLIENTE QUE VIENE POR PARAMETRO
    return this.getObjetivos(context, cliente)
      .then(objetivos => {
        objetivosAux = objetivos
        let promesas = []
        // POR CADA OBJETIVO, QUIERO SUS REMITOS, DENTRO DEL RANGO DE FECHAS PASADAS POR PARAMETRO
        objetivos.forEach(o => promesas.push(context.$http.get(API_URL + 'remitos/?idObjetivo=' +
                                            o.idObjetivosXCliente + '&fecha[$gte]=' + fechaDesde.toISOString() +
                                            '&fecha[$lt]=' + fechaHasta.toISOString(), authHeader)
                                            .then(res => res.body.data)))
        return Promise.all(promesas)
      })
      .then(remitosXObjetivo => {
        console.log('remitosXObjetivo', remitosXObjetivo)
        let promesas = []
        // LOS REMITOS VIENEN AGRUPADOS POR OBJETIVO. POR CADA UNO DE ESOS REMITOS QUIERO SU DETALLE-REMITO-PRODUCTOS
        // TENIENDO EN CUENTA SOLO LOS PRODUCTOS 'DEJADOS EN CLIENTE'
        remitosXObjetivo.forEach(obj => {
          obj.forEach(r => {
            promesas.push(context.$http.get(API_URL + 'detalle-remito-productos/?idRemito=' +
                                            r.idRemito + '&dejadoEnCliente=1', authHeader)
                                          .then(rem => {
                                            const result = {detalles: rem.body.data}
                                            result.objetivo = r.idObjetivo
                                            result.fecha = r.fecha
                                            result.firmaConforme = r.firmaConforme
                                            return result
                                          }))
          })
        })
        return Promise.all(promesas)
      })
      .then(detallesXRemito => {
        const productos = []
        // ESOS DETALLES SE COMPONEN DE UN ARRAY DE 'SUB'-DETALLES CORRESPONDIENTES A CADA UNO DE LOS TIPOS DE PRODUCTO
        // Y DE INFORMACIÓN COMÚN A TODOS LOS DETALLES [POR EL REMITO] (OBJETIVO, FECHA Y SI LO FIRMÓ CONFORME)
        detallesXRemito.forEach(dXr => {
          dXr.detalles.forEach(d => {
            const aux = productos.findIndex(p => p.idProducto === d.idProducto)
            if (aux < 0) {
              productos.push({
                idProducto: d.idProducto,
                cantidad: d.cantidad,
                ventas: [
                  {
                    objetivo: objetivosAux.find(o => o.idObjetivosXCliente === dXr.objetivo).nombre,
                    fecha: new Date(dXr.fecha).toLocaleDateString('es-AR', { year: '2-digit', month: '2-digit', day: '2-digit' }),
                    cantidad: d.cantidad,
                    firmadoconforme: dXr.firmaConforme === 1 ? 'Si' : 'No'
                  }
                ]
              })
            } else {
              productos[aux].cantidad += d.cantidad
              productos[aux].ventas.push({
                objetivo: objetivosAux.find(o => o.idObjetivosXCliente === dXr.objetivo).nombre,
                fecha: new Date(dXr.fecha).toLocaleDateString('es-AR', { year: '2-digit', month: '2-digit', day: '2-digit' }),
                cantidad: d.cantidad,
                firmadoconforme: dXr.firmaConforme === 1 ? 'Si' : 'No'
              })
            }
          })
        })
        return productos
      })
      .then(ventas => {
        return this.calcularTotalPorVenta(context, cliente, ventas)
      })
      .catch(error => {
        console.error('algo falló en el calculo de ventas por cliente ', error)
        return false
      })
  },
  calcularTotalPorVenta (context, cliente, ventas) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'contratos' + '/?idCliente=' + cliente, authHeader)
      .then(contratos => {
        contratos = contratos.body.data
        const contratoVigente = contratos.find(c => c.fechaVigenciaDesde < new Date().toISOString() &&
                                                    c.fechaVigenciaHasta > new Date().toISOString())
        if (contratoVigente) {
          return context.$http.get(API_URL + 'detalles-contrato/' + '?idContrato=' + contratoVigente.idContratos, authHeader)
        } else {
          throw new Error('No se encontraron contratos vigentes para el cliente seleccionado')
        }
      })
      .then(detalles => {
        detalles = detalles.body.data
        const detallesPorProducto = ventas.reduce((acc, obj) => {
          const key = obj.idProducto
          acc[key] = detalles.filter(d => d.idProducto === key)
          return acc
        }, {})
        Object.keys(detallesPorProducto).forEach(p => {
          const venta = ventas.find(v => v.idProducto === Number(p))
          detallesPorProducto[p].sort((a, b) => a.cantidadMaxima - b.cantidadMaxima)
          let detalleAlQueAplica
          detallesPorProducto[p].forEach((d, i) => {
            if (venta.cantidad >= d.cantidadMinima && venta.cantidad <= d.cantidadMaxima) {
              detalleAlQueAplica = d
            }
            if (venta.cantidad > d.cantidadMaxima) {
              if (i === detallesPorProducto[p].length - 1) {
                detalleAlQueAplica = d
              }
            }
          })
          venta.precioPorUnidad = detalleAlQueAplica.precioPorUnidad
          venta.total = venta.cantidad * detalleAlQueAplica.precioPorUnidad
        })
        return ventas
      })
      .catch(error => {
        console.error('Error en calcularTotalPorVenta', error)
        return false
      })
  }
}

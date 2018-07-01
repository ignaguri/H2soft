import auth from '../auth'
const API_URL = process.env.API_URL

// LISTA DE TODOS LAS LLAMADAS AL SERVIDOR
export default {
  getClientes (context) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'clientes' + '/?activo=' + 1, authHeader)
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
        return context.$http.get(API_URL + 'objetivos-x-cliente' + '/?idCliente=' + id + '&activo=' + 1, authHeader)
      })
      .then(oxc => {
        info['objetivos'] = oxc.body.data
        let promesas = []
        oxc.body.data.forEach(o => {
          console.log('o', o)
          promesas.push(context.$http.get(API_URL + 'objetivo-cantidad-producto' + '/?idObjetivo=' + o.idObjetivosXCliente, authHeader))
        })
        return Promise.all(promesas)
      })
      .then(oxpxc => {
        let array = []
        oxpxc.forEach(objprod => {
          objprod.body.data.forEach(objprodcant => {
            const opc = {
              'idObjetivo': objprodcant.idObjetivo,
              'idProducto': objprodcant.idProducto,
              'cantidad': objprodcant.cantidad
            }
            array.push(opc)
          })
        })
        info['objetivosProductosCantidad'] = array
        return info
      })
      .catch(error => {
        console.log('algo falló en el get ', error)
        return false
      })
  },
  postClientes (context, cliente, contacto, objetivos, productos) {
    const authHeader = { headers: auth.getAuthHeader() }
    console.log('llegue a post con: \n' + JSON.stringify(cliente) + '\n' + JSON.stringify(contacto) + '\n' + JSON.stringify(objetivos))
    cliente.activo = 1
    return context.$http.post(API_URL + 'clientes', cliente, authHeader)
      .then(clienteInsertado => {
        console.log('inserté el cliente: ', clienteInsertado)
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
        objetivo.activo = 1
        promesas.push(context.$http.post(API_URL + 'objetivos-x-cliente', objetivo, authHeader))
      })
      return Promise.all(promesas)
    })
    .then(objetivoInsertado => {
      console.log('inserté los objetivos: ', objetivoInsertado)
      let promesas = []
      productos.forEach(prod => {
        const objetivo = objetivoInsertado.find(x => x.body.nombre === prod.objetivo)
        const objCantProd = {
          idObjetivo: objetivo.body.idObjetivosXCliente,
          idProducto: prod.idProducto,
          cantidad: prod.cantidad
        }
        promesas.push(context.$http.post(API_URL + 'objetivo-cantidad-producto', objCantProd, authHeader))
      })
      return Promise.all(promesas)
    })
    .then(productosInsertados => {
      console.log('inserté los productos: ', productosInsertados)
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
    return context.$http.get(API_URL + 'contratos/?idCliente=' + id, authHeader)
      .then(contratos => {
        const contrato = contratos.body.data.length ? contratos.body.data[0] : []
        return context.$http.delete(API_URL + 'detalles-contrato' + '/?idContrato=' + contrato.idContratos, authHeader)
      })
      .then(() => {
        return context.$http.delete(API_URL + 'contratos/?idCliente=' + id, authHeader)
      })
      .then(() => {
        return context.$http.delete(API_URL + 'contactos-x-cliente/?idCliente=' + id, authHeader)
      })
      .then(() => {
        return context.$http.get(API_URL + 'objetivos-x-cliente/?idCliente=' + id, authHeader)
      })
      .then(objetivos => {
        let promesas = []
        objetivos.body.data.forEach(o => {
          promesas.push(context.$http.delete(API_URL + 'objetivo-cantidad-producto/?idObjetivo=' + o.idObjetivosXCliente, authHeader))
        })
        return Promise.all(promesas)
      })
      .then(() => {
        return context.$http.patch(API_URL + 'objetivos-x-cliente/?idCliente=' + id, { activo: 0 }, authHeader)
      })
      .then(() => {
        return context.$http.patch(API_URL + 'clientes/' + id, { activo: 0 }, authHeader)
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
    return context.$http.get(API_URL + 'objetivos-x-cliente' + '/?idCliente=' + id + '&activo=' + 1, authHeader)
      .then(res => { return res.body.data })
  },
  getObjetivo (context, idObjetivo) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'objetivos-x-cliente' + '/?idObjetivosXCliente=' + idObjetivo, authHeader) //     .then(res => { return res })
  },
  getObjetivoCantidadProducto (context, idObjetivo) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'objetivo-cantidad-producto' + '/?idObjetivo=' + idObjetivo, authHeader)
    .then(res => { return res.body.data })
    .catch(error => {
      console.log(error)
      return false
    })
  },
  postObjetivos (context, objetivo) {
    const authHeader = { headers: auth.getAuthHeader() }
    objetivo.activo = 1
    return context.$http.post(API_URL + 'objetivos-x-cliente', objetivo, authHeader)
      .then(res => { return true })
      .catch(error => {
        console.log(error)
        return false
      })
  },
  editClientes (context, id, cliente, contacto, objetivos, productos) {
    const authHeader = { headers: auth.getAuthHeader() }
    let objetivosDelCliente
    return context.$http.patch(API_URL + 'clientes/' + id, cliente, authHeader)
      .then(clienteUpdated => {
        return context.$http.patch(API_URL + 'contactos-x-cliente' + '/?idCliente=' + id, contacto, authHeader)
      })
      .then(contactoUpdated => {
        return context.$http.get(API_URL + 'objetivos-x-cliente' + '/?idCliente=' + id + '&activo=' + 1, authHeader)
      })
      .then(objetivosCliente => {
        objetivosDelCliente = objetivosCliente.body.data
        let promesas = []
        // Chequear si hay nuevos objetivos a agregar
        objetivos.forEach(objetivo => {
          const existente = objetivosDelCliente.some(o => o.nombre === objetivo.nombre && o.direccion === objetivo.direccion)
          // console.log(objetivo.nombre, 'existe en bd?', existente)
          if (!existente) {
            objetivo.idCliente = id
            objetivo.activo = 1
            // console.log('postear', objetivo)
            promesas.push(context.$http.post(API_URL + 'objetivos-x-cliente', objetivo, authHeader))
          }
        })
        // Chequear si hay objetivos borrados
        objetivosDelCliente.forEach(delCliente => {
          const existente = objetivos.filter(o => o.nombre === delCliente.nombre && o.direccion === delCliente.direccion)
          // console.log(delCliente.nombre, 'existe en front?', existente)
          if (!existente.length) {
            // console.log('borrar', delCliente)
            promesas.push(context.$http.patch(API_URL + 'objetivos-x-cliente/' + delCliente.idObjetivosXCliente, { activo: 0 }, authHeader))
          }
        })
        return Promise.all(promesas)
      })
      .then(objetivosUpdated => {
        const objetivosDesactivados = objetivosUpdated.filter(response => response.statusText === 'OK').map(response => response.body)
        let promesas = []
        objetivosDesactivados.forEach(o => {
          promesas.push(context.$http.get(API_URL + 'detalle-recorrido-historico' + '/?idObjetivo=' + o.idObjetivosXCliente, authHeader)
                        .then(detallesHistoricos => {
                          detallesHistoricos = detallesHistoricos.body.data
                          const promesas1 = detallesHistoricos.map(d => context.$http.get(API_URL + 'recorrido-historico/' + d.idRecorridoHistorico, authHeader)
                            .then(res => res.body))
                          return Promise.all(promesas1)
                        })
                        .then(recorridosHistoricos => {
                          const recorridosFuturos = recorridosHistoricos.filter(r => r.fechaAsignacion > new Date().toISOString())
                          const promesas2 = recorridosFuturos.map(r => context.$http.delete(API_URL + 'detalle-recorrido-historico' +
                                                              '/?idObjetivo=' + o.idObjetivosXCliente +
                                                              '&idRecorridoHistorico=' + r.idRecorridosHistoricos, authHeader)
                                                              .then(res => res.body.data))
                          return Promise.all(promesas2)
                        })
                        .then(detallesBorrados => detallesBorrados)
                      )
          promesas.push(context.$http.get(API_URL + 'detalle-recorrido' + '/?idObjetivo=' + o.idObjetivosXCliente, authHeader)
            .then(detalles => {
              detalles = detalles.body.data
              const promesas3 = detalles.map(d => context.$http.delete(API_URL + 'detalle-recorrido/' + d.idDetalleRecorrido, authHeader).then(r => r.body))
              return Promise.all(promesas3)
            })
            .then(detallesBorrados => detallesBorrados)
          )
        })
        return Promise.all(promesas)
      })
      .then(todoHecho => {
        console.log('editClientes. detalles borrados:', todoHecho)
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
  calcularVentasPorCliente (context, cliente, fechaDesde, fechaHasta, idEstadoFacturacion) {
    /* SI idEstadoFacturacion NO SE UTILIZA EL FILTRO */
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
        let filtrosConsulta = '&fecha[$gte]=' + fechaDesde.toISOString() +
                              '&fecha[$lt]=' + fechaHasta.toISOString()
        if (idEstadoFacturacion !== 0) {
          filtrosConsulta = filtrosConsulta + '&idEstadoRemito=' + idEstadoFacturacion
        }
        objetivos.forEach(o => promesas.push(context.$http.get(API_URL + 'remitos/?idObjetivo=' + o.idObjetivosXCliente +
                                            filtrosConsulta, authHeader)
                                            .then(res => res.body.data)))
        return Promise.all(promesas)
      })
      .then(remitosXObjetivo => {
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
                                            result.idEstadoRemito = r.idEstadoRemito
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
                    firmadoconforme: dXr.firmaConforme === 1 ? 'Si' : 'No',
                    idEstadoRemito: dXr.idEstadoRemito
                  }
                ]
              })
            } else {
              productos[aux].cantidad += d.cantidad
              productos[aux].ventas.push({
                objetivo: objetivosAux.find(o => o.idObjetivosXCliente === dXr.objetivo).nombre,
                fecha: new Date(dXr.fecha).toLocaleDateString('es-AR', { year: '2-digit', month: '2-digit', day: '2-digit' }),
                cantidad: d.cantidad,
                firmadoconforme: dXr.firmaConforme === 1 ? 'Si' : 'No',
                idEstadoRemito: dXr.idEstadoRemito
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
        throw error
        // return false
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
        throw error
        // console.error('Error en calcularTotalPorVenta', error)
        // return false
      })
  }
}

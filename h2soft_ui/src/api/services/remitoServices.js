import auth from '../auth'
import apiClientes from 'src/api/services/clientServices.js'

const API_URL = process.env.API_URL

// LISTA DE TODOS LAS LLAMADAS AL SERVIDOR PARA REMITOS
export default {
  getRemitos (context) {
    const authHeader = {headers: auth.getAuthHeader()}
    return context.$http.get(API_URL + 'remitos', authHeader)
      .then(res => {
        return res.body.data
      })
  },
  getRemito (context, idRemito) {
    const authHeader = {headers: auth.getAuthHeader()}
    return context.$http.get(API_URL + 'remitos/?idRemito=' + idRemito, authHeader)
      .then(res => {
        return res
      })
  },
  getRemitoXObjetivo (context, idObjetivo) {
    const authHeader = {headers: auth.getAuthHeader()}
    return context.$http.get(API_URL + 'remitos/?idObjetivo=' + idObjetivo, authHeader)
      .then(res => {
        return res.body.data
      })
  },
  getUltimoRemitoXObjetivo (context, idObjetivo) {
    const authHeader = {headers: auth.getAuthHeader()}
    return context.$http.get(API_URL + 'remitos/?idObjetivo=' + idObjetivo, authHeader)
      .then(res => {
        return res.body.data
      })
      .catch(error => {
        console.log('algo falló en el insert del remito' + JSON.stringify(error))
      })
  },
  getRemitosXclienteYfechas (context, idCliente, fechaDesde, fechaHasta) {
    const authHeader = {headers: auth.getAuthHeader()}
    const desde = fechaDesde.split('/')
    fechaDesde = new Date(desde[2], desde[1] - 1, desde[0])
    const hasta = fechaHasta.split('/')
    fechaHasta = new Date(hasta[2], hasta[1] - 1, hasta[0])
    fechaHasta.setDate(fechaHasta.getDate() + 1)
    // BUSCO LOS OBJETIVOS DEL CLIENTE QUE VIENE POR PARAMETRO
    return apiClientes.getObjetivos(context, idCliente)
      .then(objetivos => {
        let promesas = []
        // POR CADA OBJETIVO, QUIERO SUS REMITOS, DENTRO DEL RANGO DE FECHAS PASADAS POR PARAMETRO
        objetivos.forEach(o => promesas.push(context.$http.get(API_URL + 'remitos/?idObjetivo=' +
          o.idObjetivosXCliente + '&fecha[$gte]=' + fechaDesde.toISOString() +
          '&fecha[$lt]=' + fechaHasta.toISOString(), authHeader)
          .then(res => res.body.data)))
        return Promise.all(promesas)
      })
      .then(remitosXObjetivo => {
        remitosXObjetivo = [].concat.apply([], remitosXObjetivo)
        return remitosXObjetivo
      })
      .catch(error => {
        console.error('algo falló en la busqueda de remitos por cliente ', error)
        throw error
        // return false
      })
  },
  nuevoRemito (context, remito) {
    const authHeader = {headers: auth.getAuthHeader()}
    return context.$http.post(API_URL + 'remitos', remito, authHeader)
      .then(rem => {
        return rem.body
      })
      .catch(error => {
        console.log('algo falló en el insert del remito' + JSON.stringify(error))
      })
  },
  nuevoDetalleRemitoProducto (context, detalleRemitoProductos) {
    const authHeader = {headers: auth.getAuthHeader()}
    return context.$http.post(API_URL + 'detalle-remito-productos', detalleRemitoProductos, authHeader)
      .then(rem => {
        return true
      })
      .catch(error => {
        console.log('algo falló en el insert del detalle del remito' + JSON.stringify(error))
      })
  },
  nuevoDetalleRemitoDispensers (context, detalleRemitoDispensers) {
    const authHeader = {headers: auth.getAuthHeader()}
    return context.$http.post(API_URL + 'detalle-remito-dispensers', detalleRemitoDispensers, authHeader)
      .then(rem => {
        return true
      })
      .catch(error => {
        console.log('algo falló en el insert del detalle del remito' + JSON.stringify(error))
      })
  },
  editRemito (context, remito) {
    const authHeader = {headers: auth.getAuthHeader()}
    return context.$http.patch(API_URL + 'remitos/' + remito.idRemito, remito, authHeader)
      .then(remitoUpdated => {
        return remitoUpdated
      })
      .catch(error => {
        console.log('algo falló en el update ', error)
        return false
      })
  },
  getDetalleRemitoProducto (context, idRemito) {
    const authHeader = {headers: auth.getAuthHeader()}
    return context.$http.get(API_URL + 'detalle-remito-productos/?idRemito=' + idRemito, authHeader)
      .then(rem => {
        return rem
      })
      .catch(error => {
        console.log('algo falló en el get del detalle del remito' + JSON.stringify(error))
      })
  },
  getDetalleRemitoDispensers (context, idRemito) {
    const authHeader = {headers: auth.getAuthHeader()}
    return context.$http.get(API_URL + 'detalle-remito-dispensers/?idRemito=' + idRemito, authHeader)
      .then(rem => {
        return rem
      })
      .catch(error => {
        console.log('algo falló en el get del detalle del remito' + JSON.stringify(error))
      })
  },
  getCantidadesUltimoRemito (context, idObjetivo) {
    let cantidades = []
    return this.getUltimoRemitoXObjetivo(context, idObjetivo)
      .then(rem => {
        if (rem.length > 0) {
          rem = rem[rem.length - 1]
          return this.getDetalleRemitoProducto(context, rem.idRemito)
        } else {
          return cantidades
        }
      })
      .then(remDet => {
        if (remDet.length === 0) return cantidades
        remDet.body.data.forEach(r => {
          let cantidad = {
            idProducto: 0,
            cantidad: 0
          }
          if (r.dejadoEnCliente === 1) {
            cantidad.idProducto = r.idProducto
            cantidad.cantidad = r.cantidad
            cantidades.push(cantidad)
          }
        })
        return cantidades
      })
  },
  cantidadDeBidonesPorMes (context) {
    const authHeader = {headers: auth.getAuthHeader()}
    return context.$http.get(API_URL + 'remitos?$select[]=fecha&$select[]=idRemito', authHeader)
      .then(remitos => {
        remitos = remitos.body.data
        let promesas = []
        remitos.forEach(remito => {
          const mes = new Date(remito.fecha).getMonth()
          promesas.push(context.$http.get(API_URL + 'detalle-remito-productos/?idRemito=' + remito.idRemito, authHeader)
            .then(detRem => {
              const result = detRem.body.data.map(d => Object.assign({}, d, {mes: mes}))
              return result
            }))
        })
        return Promise.all(promesas)
      })
      .then(detallesXRemito => {
        const productos = []
        flatten(detallesXRemito).forEach(detalle => {
          // const dejadoEnCliente = dXr.find(d => d.dejadoEnCliente === 1)
          const cantidades = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0,
            10: 0,
            11: 0,
            12: 0
          }
          const mes = detalle.mes
          const idProducto = detalle.idProducto
          const aux = productos.findIndex(p => p.idProducto === idProducto)
          if (aux < 0) {
            const nuevoProducto = Object.assign({}, { idProducto }, { cantidades })
            nuevoProducto.cantidades[mes + 1] = detalle.cantidad
            productos.push(nuevoProducto)
          } else {
            productos[aux].cantidades[mes + 1] += detalle.cantidad
          }
        })
        console.log('PRODUCTOS POSTA:', productos)
        return productos
      })
      .catch(error => {
        console.error(error)
        console.log('algo falló en el get del detalle del remito' + JSON.stringify(error))
      })
  },
  deleteRemito (context, id) {
    const authHeader = {headers: auth.getAuthHeader()}
    return context.$http.delete(API_URL + 'detalle-remito-productos/?idRemito=' + id, authHeader)
      .then(() => {
        return context.$http.delete(API_URL + 'detalle-remito-dispensers/?idRemito=' + id, authHeader)
      })
      .then(() => {
        return context.$http.delete(API_URL + 'remitos/?idRemito=' + id, authHeader)
      })
      .then(res => {
        console.log('borrado', res)
        return true
      })
      .catch(error => {
        console.log('error', error)
        return false
      })
  }
}

const flatten = array => array.reduce((acc, val) => acc.concat(val), [])

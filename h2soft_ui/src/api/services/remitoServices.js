import auth from '../auth'
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
              detRem.body.data.push({mes: mes})
              return detRem.body.data
            }))
        })
        return Promise.all(promesas)
      })
      .then(detallesRemitoProducto => {
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
        detallesRemitoProducto.forEach(detalles => {
          // const mes = detalles.find(d => d.mes).mes
          const mes = detalles[1].mes
          const dejadoEnCliente = detalles.find(d => d.dejadoEnCliente === 1)
          cantidades[mes + 1] += dejadoEnCliente.cantidad
          console.log('MES:' + mes, 'CANT: ' + cantidades[mes + 1])
        })
        return cantidades
      })
      .catch(error => {
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

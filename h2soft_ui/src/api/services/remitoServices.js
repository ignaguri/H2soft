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
        return rem
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
    let mes
    let fecha
    let cantidades = {}
    cantidades.enero = 0
    cantidades.febrero = 0
    cantidades.marzo = 0
    cantidades.abril = 0
    cantidades.mayo = 0
    cantidades.junio = 0
    cantidades.julio = 0
    cantidades.agosto = 0
    cantidades.septiembre = 0
    cantidades.octubre = 0
    cantidades.noviembre = 0
    cantidades.diciembre = 0
    return context.$http.get(API_URL + 'remitos?$select[]=fecha&$select[]=idRemito', authHeader)
      .then(rem => {
        let i = 0
        let lengh = rem.body.data.length
        rem.body.data.forEach(remitos => {
          fecha = new Date(remitos.fecha)
          mes = fecha.getMonth()
          return context.$http.get(API_URL + 'detalle-remito-productos/?idRemito=' + remitos.idRemito, authHeader)
            .then(detRem => {
              detRem.body.data.forEach(detalle => {
                if (detalle.dejadoEnCliente === 1) {
                  switch (mes) {
                    case 1:
                      cantidades.enero += detalle.cantidad
                      break
                    case 2:
                      cantidades.febrero += detalle.cantidad
                      break
                    case 3:
                      cantidades.marzo += detalle.cantidad
                      break
                    case 4:
                      cantidades.abril += detalle.cantidad
                      break
                    case 5:
                      cantidades.mayo += detalle.cantidad
                      break
                    case 6:
                      cantidades.junio += detalle.cantidad
                      break
                    case 7:
                      cantidades.julio += detalle.cantidad
                      break
                    case 8:
                      cantidades.agosto += detalle.cantidad
                      break
                    case 9:
                      cantidades.septiembre += detalle.cantidad
                      break
                    case 10:
                      cantidades.octubre += detalle.cantidad
                      break
                    case 11:
                      cantidades.noviembre += detalle.cantidad
                      break
                    case 12:
                      cantidades.diciembre += detalle.cantidad
                      break
                  }
                }
              })
              i += 1
              if (i === lengh) {
                console.log('cantidades:' + JSON.stringify(cantidades.body.data)
                return cantidades
              }
            })
        })
      })
      .catch(error => {
        console.log('algo falló en el get del detalle del remito' + JSON.stringify(error))
      })
  }
}

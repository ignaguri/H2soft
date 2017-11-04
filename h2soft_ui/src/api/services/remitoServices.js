import auth from '../auth'
const API_URL = process.env.API_URL
const authHeader = { headers: auth.getAuthHeader() }

// LISTA DE TODOS LAS LLAMADAS AL SERVIDOR PARA REMITOS
export default {
  getRemitos (context) {
    return context.$http.get(API_URL + 'remitos', authHeader)
      .then(res => { return res.body.data })
  },
  getRemito (context, idRemito) {
    return context.$http.get(API_URL + 'remitos/?idremito=' + idRemito, authHeader)
  },
  nuevoRemito (context, remito) {
    return context.$http.post(API_URL + 'remitos', remito, authHeader)
      .then(rem => {
        return rem
      })
      .catch(error => {
        console.log('algo falló en el insert' + JSON.stringify(error))
      })
  },
  nuevoDetalleDeRemito (context, detalleRemito) {
    return context.$http.post(API_URL + 'detalle-remito', detalleRemito, authHeader)
      .then(rem => {
        return true
      })
      .catch(error => {
        console.log('algo falló en el insert' + JSON.stringify(error))
      })
  }
}

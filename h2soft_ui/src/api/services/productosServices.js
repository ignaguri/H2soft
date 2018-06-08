import auth from '../auth'
const API_URL = process.env.API_URL

// LISTA DE TODOS LAS LLAMADAS AL SERVIDOR
export default {
  getProductos (context) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'productos', authHeader)
      .then(res => { return res.body.data })
  },
  getProductoXId (context, idProducto) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'productos/?idProductos=' + idProducto, authHeader)
      .then(res => { return res.body.data })
  }
}

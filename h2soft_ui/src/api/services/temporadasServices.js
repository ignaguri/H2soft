import auth from '../auth'
const API_URL = process.env.API_URL

// LISTA DE TODOS LAS LLAMADAS AL SERVIDOR PARA LAS TEMPORADAS
export default {
  getTemporadas (context) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'temporada', authHeader)
      .then(res => { return res.body.data })
  },
  getTemporada (context, idTemporada) {
    const authHeader = { headers: auth.getAuthHeader() }
    return context.$http.get(API_URL + 'temporada/?idtemporadas=' + idTemporada, authHeader)
  }
}

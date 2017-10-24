import auth from '../auth'
const API_URL = process.env.API_URL
const authHeader = { headers: auth.getAuthHeader() }

// LISTA DE TODOS LAS LLAMADAS AL SERVIDOR PARA LAS TEMPORADAS
export default {
  getTemporadas (context) {
    return context.$http.get(API_URL + 'temporada', authHeader)
      .then(res => { return res.body.data })
  },
  getTemporada (context, idTemporada) {
    return context.$http.get(API_URL + 'temporada/?idtemporadas=' + idTemporada, authHeader)
  }
}

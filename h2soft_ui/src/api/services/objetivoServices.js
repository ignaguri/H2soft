import auth from '../auth'
const API_URL = process.env.API_URL

export default {
  getObjetivos (context) {
    const authHeader = {headers: auth.getAuthHeader()}
    return context.$http.get(API_URL + 'objetivos-x-cliente', authHeader)
      .then(res => {
        return res.body.data
      })
  }
}

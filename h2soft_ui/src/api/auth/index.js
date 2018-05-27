const API_URL = process.env.API_URL
const LOGIN_URL = API_URL + 'authentication'

export default {
  // User object will let us check authentication status
  user: {
    authenticated: false
  },
  // Send a request to the login URL and save the returned JWT
  login (context, creds, redirect) {
    context.$http.post(LOGIN_URL, creds).then(response => {
      sessionStorage.setItem('user', JSON.stringify(response.body.user))
      sessionStorage.setItem('access_token', response.body.accessToken)
      this.user.authenticated = true
      if (response.body.user.idEmpleado) {
        context.$http.get(API_URL + 'empleados/' + response.body.user.idEmpleado, { headers: {'Authorization': response.body.accessToken} })
          .then(r => {
            response.body.user.nombre = r.body.nombre
            response.body.user.apellido = r.body.apellido
            sessionStorage.setItem('user', JSON.stringify(response.body.user))
            // Redirect to a specified route
            if (redirect) {
              context.$router.push(redirect)
            }
          })
      }
    }, response => {
      context.error = response.body.message
    })
  },

  // To log out, we just need to remove the token
  logout (context) {
    sessionStorage.removeItem('id_token')
    sessionStorage.removeItem('access_token')
    sessionStorage.removeItem('user')
    this.user.authenticated = false
    context.$router.push('/login')
  },

  checkAuth () {
    var jwt = sessionStorage.getItem('id_token')
    if (jwt) {
      this.user.authenticated = true
    } else {
      this.user.authenticated = false
    }
  },

  // The object to be passed as a header for authenticated requests
  getAuthHeader () {
    return {
      'Authorization': sessionStorage.getItem('access_token')
    }
  },
  isLoggedIn () {
    return sessionStorage.getItem('user')
  }
}

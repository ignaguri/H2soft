const API_URL = process.env.API_URL
const LOGIN_URL = 'http://localhost:3030/' + 'authentication'

export default {
  // User object will let us check authentication status
  user: {
    authenticated: false
  },
  // Send a request to the login URL and save the returned JWT
  login (context, creds, redirect) {
    context.$http.post(LOGIN_URL, creds).then(response => {
      sessionStorage.setItem('id_token', creds.email)
      sessionStorage.setItem('access_token', response.body.accessToken)

      this.user.authenticated = true

      // Redirect to a specified route
      if (redirect) {
        context.$router.push(redirect)
      }
    }, response => {
      context.error = response.body.message
    })
  },

  // To log out, we just need to remove the token
  logout () {
    sessionStorage.removeItem('id_token')
    sessionStorage.removeItem('access_token')
    this.user.authenticated = false
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
  }
}

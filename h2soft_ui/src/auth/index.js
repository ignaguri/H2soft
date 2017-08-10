const API_URL = 'http://localhost:3030/'
const LOGIN_URL = API_URL + 'authentication/'

export default {
  // User object will let us check authentication status
  user: {
    authenticated: false
  },
  // Send a request to the login URL and save the returned JWT
  login (context, creds, redirect) {
    context.$http.post(LOGIN_URL, creds).then(response => {
      localStorage.setItem('id_token', creds.email)
      localStorage.setItem('access_token', response.body.accessToken)

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
    localStorage.removeItem('id_token')
    localStorage.removeItem('access_token')
    this.user.authenticated = false
  },

  checkAuth () {
    var jwt = localStorage.getItem('id_token')
    if (jwt) {
      this.user.authenticated = true
    } else {
      this.user.authenticated = false
    }
  },

  // The object to be passed as a header for authenticated requests
  getAuthHeader () {
    return {
      'Authorization': localStorage.getItem('access_token')
    }
  }
}
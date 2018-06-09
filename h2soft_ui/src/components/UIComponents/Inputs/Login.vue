<template>
  <div class="col-sm-4 col-sm-offset-4">
    <h2>Iniciar sesión</h2>
    <div class="alert alert-danger" v-if="error">
      <p>{{ error }}</p>
    </div>
    <div class="form-group">
      <input
        type="text"
        class="form-control"
        placeholder="Ingrese su usuario"
        v-model="credentials.email"
        v-focus
      />
    </div>
    <div class="form-group">
      <input
        type="password"
        class="form-control"
        placeholder="Ingrese su contraseña"
        v-model="credentials.password"
        @keyup.enter="submit"
      />
    </div>
    <button class="btn btn-info btn-fill" @click="submit()">Entrar</button>
  </div>
</template>

<!--<style>
  ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
    color:    #122b40;
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color:    #122b40;
    opacity:  1;
  }
  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color:    #122b40;
    opacity:  1;
  }
  :-ms-input-placeholder { /* Internet Explorer 10-11 */
    color:    #122b40;
  }
  ::-ms-input-placeholder { /* Microsoft Edge */
    color:    #122b40;
  }
</style>-->
<script>
  import auth from '../../../api/auth'
  export default {
    data () {
      return {
        credentials: {
          email: '',
          password: ''
        },
        error: ''
      }
    },
    methods: {
      submit () {
        const credentials = {
          strategy: 'local',
          email: this.credentials.email,
          password: this.credentials.password
        }
        auth.login(this, credentials, 'planificacion')
        // alert(JSON.stringify(credentials))
      }
    },
    directives: {
      focus: {
        // directive definition
        inserted: function (el) {
          el.focus()
        }
      }
    }
  }
</script>

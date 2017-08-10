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
        placeholder="Ingrese su email"
        v-model="credentials.email"
      />
    </div>
    <div class="form-group">
      <input
        type="password"
        class="form-control"
        placeholder="Ingrese su contraseña"
        v-model="credentials.password"
      />
    </div>
    <button class="btn btn-info btn-fill" @click="submit()">Entrar</button>
  </div>
</template>

<script>
  import auth from '../../../auth'
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
        var credentials = {
          strategy: 'local',
          email: this.credentials.email,
          password: this.credentials.password
        }
        auth.login(this, credentials, 'admin')
        // alert(JSON.stringify(credentials))
      }
    }

  }
</script>

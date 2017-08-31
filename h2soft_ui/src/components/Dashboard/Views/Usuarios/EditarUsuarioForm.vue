<template>
  <div class="card">
    <div class="header">
      <h4 class="title">Usuario</h4>
    </div>
    <div class="content">
      <form>
        <div class="row">
          <div class="col-md-6">
            <fg-input type="text"
                      label="Email"
                      :disabled="false"
                      placeholder="Email"
                      v-model="user.email">
            </fg-input>
          </div>
          <div v-if="!edit" class="col-md-3">
            <fg-input type="password"
                      label="Contraseña"
                      placeholder="Contraseña"
                      v-model="user.password">
            </fg-input>
          </div>
          <div v-if="!edit" class="col-md-3">
            <fg-input type="password"
                      label="Reingrese Contraseña"
                      placeholder="Reingrese Contraseña">
            </fg-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <fg-input type="text"
                      label="Empleado"
                      placeholder="Empleado"
                      v-model="user.idEmpleado">
            </fg-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <fg-input type="text"
                      label="Rol"
                      placeholder="Rol"
                      v-model="user.idRol">
            </fg-input>
          </div>
        </div>
        <div class="text-center">
          <button type="submit" class="btn btn-info btn-fill btn-wd" @click.prevent="updateProfile">
            Guardar
          </button>
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
  </div>
</template>
<script>
  import auth from 'src/api/auth'
  import api from 'src/api/services'
  export default {
    data () {
      return {
        id: localStorage.getItem('IdUsuarioEdit'),
        edit: false,
        user: {
          idUsuarios: '',
          email: '',
          password: '',
          repassword: '',
          idEmpleado: '',
          idRol: ''
        }
      }
    },
    mounted () {
      if (this.id !== '0') {
        this.edit = true
        this.getUsuario()
      } else {
        console.log('asdf')
      }
      this.getRoles()
      this.getEmpleados()
    },
    methods: {
      updateProfile () {
        this.nuevoUsuario().then(res => {
          this.user.idUsuarios = res.data.idUsuarios
          this.$router.push('usuarios')
          this.$notifications.notify(
            {
              message: res.message,
              icon: 'ti-gift',
              horizontalAlign: 'right',
              verticalAlign: 'top',
              type: 'success'
            })
        }, error => {
          console.log('error ' + error)
          this.$notifications.notify(
            {
              message: error.message,
              icon: 'ti-gift',
              horizontalAlign: 'right',
              verticalAlign: 'top',
              type: 'error'
            })
        })
      },
      getRoles () {
        this.cargarRoles().then(res => {
          console.log(res)
        }, error => {
          console.log('error ' + error)
        })
      },
      getEmpleados () {
        this.cargarEmpleados().then(res => {
          console.log(res)
        }, error => {
          console.log('error ' + error)
        })
      },
      getUsuario () {
        this.cargarUsuario().then(res => {
          console.log(res)
          res = res.body.data[0]
          this.user.idUsuarios = res.idUsuarios
          this.user.email = res.email
          this.user.password = ''
          this.user.idEmpleado = res.idEmpleado
          this.user.idRol = res.idRol
        }, error => {
          console.log('error ' + error)
        })
      },
      cargarUsuario () {
        return this.$http.get('http://localhost:3030/users/?idUsuarios=' + '1', { headers: auth.getAuthHeader() })
      },
      cargarRoles () {
        return this.$http.get('http://localhost:3030/roles', { headers: auth.getAuthHeader() })
      },
      cargarEmpleados () {
        return this.$http.get('http://localhost:3030/empleados', { headers: auth.getAuthHeader() })
      },
      nuevoUsuario () {
        this.usuario = {
          'email': this.user.email,
          'idEmpleado': null,
          'idRol': this.user.idRol,
          'password': this.user.password
        }
        return this.$http.post('http://localhost:3030/users', this.usuario, { headers: auth.getAuthHeader() })
      },
      getAuthHeader () {
        return {
          'Authorization': sessionStorage.getItem('access_token')
        }
      }
    }
  }

</script>
<style>

</style>

<template>
  <div class="card">
    <div class="header">
      <h4 class="title">Usuario</h4>
    </div>
    <div class="content">
      <form @submit.prevent="guardarUsuario">
        <div class="row">
          <div class="col-md-6">
            <fg-input type="text"
                      label="Usuario"
                      :disabled="false"
                      placeholder="Usuario"
                      v-model="user.usuario"
                      required>
            </fg-input>
          </div>
          <div v-if="this.id === 0" class="col-md-3">
            <fg-input type="password"
                      label="Contraseña"
                      placeholder="Contraseña"
                      v-model="user.password">
            </fg-input>
          </div>

        </div>
        <div class="row">
          <div class="col-md-6">
            <label for="Empleado">Empleado</label>
            <select id="Empleado" v-model="user.idEmpleado">
              <option value="">Seleccione</option>
              <option v-for="emp in empleados" v-bind:value="emp.idEmpleados">
                {{ emp.nombre + ' ' + emp.apellido }}
              </option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <label for="rol">Rol</label>
            <select id="rol" v-model="user.idRol" required>
              <option value="">Seleccione</option>
              <option v-for="rol in roles" v-bind:value="rol.idRoles">
                {{ rol.nombre }}
              </option>
            </select>
          </div>
        </div>
        <hr>
        <div class="text-center">
          <button type="submit" class="btn btn-success btn-fill btn-wd">
            Guardar
          </button>
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
  </div>
</template>
<script>
  // import auth from 'src/api/auth'
  import api from 'src/api/services/userServices'
  import noti from 'src/api/notificationsService'

  // import fgdrop from 'components/UIComponents/Inputs/formGroupDropDown.vue'

  export default {
    data () {
      return {
        // id: 0, // alta
        // id: 1, // edit
        // edit: true,
        user: {
          idUsuarios: '',
          usuario: '',
          password: '',
          repassword: '',
          idEmpleado: '',
          idRol: ''
        },
        empleados: {},
        roles: {}
      }
    },
    props: ['id'],
    mounted () {
      this.cargarRoles()
      this.cargarEmpleados()
      if (this.id === 0) {
        // this.edit = false
      } else {
        this.getUsuario()
      }
    },
    methods: {
      guardarUsuario () { // metodo para gurdar usuaria, tanto nuevos como edición
        if (this.id === 0) {
          this.usuario = {
            'email': this.user.usuario,
            'idEmpleado': this.user.idEmpleado,
            'idRol': this.user.idRol,
            'password': this.user.password,
            'activo': true
          }
          api.newUsuario(this, this.usuario).then(res => {
            console.log('res es ' + res)
            if (res) {
              // noti.success(this)
              this.$parent.current = 'UsersList'
              this.$parent.isUserList = true
            } else {
              noti.danger(this)
            }
          })
          noti.exitoConTexto(this, 'Éxito', 'Usuario guardado con éxito!')
         // noti.exito(this)
        } else {
          console.log(this.id)
          this.usuario = {
            'id': this.user.id,
            'email': this.user.usuario,
            'idEmpleado': this.user.idEmpleado,
            'idRol': this.user.idRol
          }
          api.editUsuario(this, this.usuario).then(res => {
            console.log('res es ' + res)
            if (res) {
              noti.exitoConTexto(this, 'Éxito', 'Usuario guardado con éxito!')
             // noti.success(this)
              this.$parent.current = 'UsersList'
              this.$parent.isUserList = true
            } else {
              noti.danger(this)
            }
          })
        }
      },
      cargarRoles () { // devuelve el listado de roles
        api.getRoles(this).then(res => {
          this.roles = res
        }, error => {
          console.log('error ' + error)
        })
      },
      cargarEmpleados () { // devuelve el listado de empleados
        api.getEmpleados(this).then(res => {
          this.empleados = res
        }, error => {
          console.log('error ' + error)
        })
      },
      getUsuario () { // trae los datos de un usuario
        api.getUsuario(this, this.id).then(res => {
          res = res.body.data[0]
          this.user.id = res.id
          this.user.usuario = res.email
          this.user.idEmpleado = res.idEmpleado
          this.user.idRol = res.idRol
        }, error => {
          console.log('error ' + error)
        })
      }
    }
  }
</script>
<style>

</style>

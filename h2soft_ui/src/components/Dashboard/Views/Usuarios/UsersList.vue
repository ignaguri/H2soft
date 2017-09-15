<template>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <paper-table :title="table1.title" :sub-title="table1.subTitle" :data="table1.data" :columns="table1.columns" >

          </paper-table>
        </div>
      </div>
    </div>

</template>
<script>
  import auth from 'src/api/auth'
  import api from 'src/api/services/userServices'
  import PaperTable from 'components/UIComponents/PaperTable.vue'
  const tableColumns = ['Id', 'Email', 'Empleado', 'Rol']
  const dataColumns = []

  export default {
    components: {
      PaperTable
    },
    data () {
      return {
        table1: {
          title: 'Usuarios',
          subTitle: 'Listado de usuarios del sistema',
          columns: [...tableColumns],
          data: [...dataColumns]
        }
      }
    },
    mounted () {
      this.cargarRoles()
      this.cargarUsuarios()
      // this.getEmpleado()
    },
    methods: {
      cargarUsuarios () {
        api.getUsuarios(this)
        .then(resUs => {
          resUs.body.data.forEach(us => {
            this.cargarEmpleado(us.idEmpleado)
              .then(res => {
                res = res.body.data[0]
                this.nombreRol = this.getRol(us.idRol)
                this.table1.data.push({
                  id: us.id,
                  email: us.email,
                  empleado: res === undefined ? '' : res.nombre + ' ' + res.apellido,
                  rol: this.nombreRol
                })
              })
          })
        }, error => {
          console.log('error al cargar los usuarios ' + error)
        })
      },
      cargarRoles () {
        api.getRoles(this).then(res => {
          this.roles = res
        }, error => {
          console.log('error ' + error)
        })
      },
      getRol (idRol) {
        for (var i = 0, len = this.roles.length; i < len; i++) {
          if (this.roles[i].idRoles === idRol) {
            return this.roles[i].nombre
          }
        }
      },
      getEmpleado (idEmpleado) {
        this.cargarEmpleado(idEmpleado).then(res => {
          this.empleados = res.doby
        }, error => {
          console.log('error ' + error)
        })
      },
      cargarEmpleado (idEmpleado) {
        return this.$http.get('http://localhost:3030/empleados/?idEmpleados=' + idEmpleado, { headers: auth.getAuthHeader() })
      },
      deleteUsuario (idUsuario) {
        this.usuario = {
          'id': this.id,
          'activo': false
        }
        api.editUsuario(this, this.usuario).then(res => {
          if (res) {
            noti.success(this)
            this.$parent.current = 'UsersList'
            this.$parent.isUserList = true
          } else {
            noti.danger(this)
          }
        })
      }
    }
  }
</script>

<style>

</style>

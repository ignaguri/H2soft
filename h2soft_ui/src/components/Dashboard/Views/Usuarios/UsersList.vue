<template>
  <div class="col-md-12">
    <div class="card">
      <paper-table type="hover" :title="table1.title" :sub-title="table1.subTitle" :data="table1.data"
                   :columns="table1.columns" :edit="editarUsuario" :erase="borrarUsuario" :goButton="false"
                   :go="verUsuario">

      </paper-table>
    </div>
  </div>
</template>
<script>
  import auth from 'src/api/auth'
  import api from 'src/api/services/userServices'
  import PaperTable from 'components/UIComponents/PaperTablePlus.vue'
  import noti from 'src/api/notificationsService'
  const tableColumns = ['#', 'Usuario', 'Empleado', 'Rol']
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
            resUs.body.data.sort((a, b) => a.id - b.id)
            resUs.body.data.forEach(us => {
              if (us.activo === 1) {
                this.cargarEmpleado(us.idEmpleado)
                  .then(res => {
                    res = res.body.data[0]
                    this.nombreRol = this.getRol(us.idRol)
                    this.table1.data.push({
                      '#': us.id,
                      'usuario': us.email,
                      'empleado': res === undefined ? '' : res.nombre + ' ' + res.apellido,
                      'rol': this.nombreRol
                    })
                  })
              }
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
        return this.$http.get('http://localhost:3030/empleados/?idEmpleados=' + idEmpleado, {headers: auth.getAuthHeader()})
      },
      editarUsuario (e) {
        let id = e.target.parentNode.parentNode.getElementsByTagName('td')[0].innerHTML
        this.$parent.userId = id
        this.$parent.isUserList = false
      },
      verUsuario (e) {
        let id = e.target.parentNode.parentNode.getElementsByTagName('td')[0].innerHTML
        // console.log('ver usuario', id)
        this.$parent.userId = id
        this.$parent.isUserList = false
      },
      borrarUsuario (e) {
        let id = e.target.parentNode.parentNode.getElementsByTagName('td')[0].innerHTML
        if (!confirm('¿Desea eliminar a este usuarios?')) return
        this.usuario = {
          'id': id,
          'activo': false
        }
        api.editUsuario(this, this.usuario).then(res => {
          if (res) {
            noti.exitoConTexto(this, 'Éxito', 'El usuario se ha eliminado!')
            this.table1.data = []
            this.cargarUsuarios()
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

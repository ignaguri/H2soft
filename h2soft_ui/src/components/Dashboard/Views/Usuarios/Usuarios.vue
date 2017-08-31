<template>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <paper-table :title="table1.title" :sub-title="table1.subTitle" :data="table1.data" :columns="table1.columns" >

          </paper-table>
        </div>
        <div class="text-center">
          <button type="submit" class="btn btn-info btn-fill btn-wd" @click.prevent="redirectToForm()">
            Agregar Usuario
          </button>
        </div>
        <div class="text-center">
          <button type="submit" class="btn btn-info btn-fill btn-wd" @click.prevent="redirectToFormEdit()">
            Editar Usuario 1
          </button>
        </div>
      </div>
    </div>

</template>
<script>
  import auth from 'src/api/auth'
  import api from 'src/api/services'
  import PaperTable from 'components/UIComponents/PaperTable.vue'
  const tableColumns = ['Id', 'Email', 'Empleado', 'Roles']
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
      this.getUsuarios()
      this.getRoles()
      this.getEmpleados()
    },
    methods: {
      getUsuarios () {
        this.cargarUsuarios().then(res => {
          res.body.data.forEach(us => {
            getEmpleado(us.idEmpleado).then(res => {
              this.table1.data.push({
                id: us.idUsuarios,
                email: us.email,
                empleado: res.apellido,
                roles: us.idRol
              })
            }, error => {
              console.log('error ' + error)
            })
          })
        }, error => {
          console.log('error ' + error)
        })
      },
      cargarUsuarios () {
        return this.$http.get('http://localhost:3030/users', { headers: auth.getAuthHeader() })
      },
      getRoles () {
        this.cargarRoles().then(res => {
          localStorage.setItem('Roles', res.body.data)
        }, error => {
          console.log('error ' + error)
        })
      },
      getEmpleado () {
        this.cargarEmpleados().then(res => {
          console.log(res.body)
          this.empleados = res.doby
        }, error => {
          console.log('error ' + error)
        })
      },
      cargarRoles () {
        return this.$http.get('http://localhost:3030/roles', { headers: auth.getAuthHeader() })
      },
      cargarEmpleado () {
        return this.$http.get('http://localhost:3030/empleados/?idEmpleados=' +  , { headers: auth.getAuthHeader() })
      },
      redirectToForm () {
        this.$router.push('editusuarios')
      },
      redirectToFormEdit () {
        localStorage.setItem('IdUsuarioEdit', 1)
        this.$router.push('editusuarios')
      }
    }
  }
</script>

<style>

</style>

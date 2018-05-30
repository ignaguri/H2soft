<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <paper-table type="hover" :title="table1.title" :sub-title="table1.subTitle" :data="table1.data" :columns="table1.columns" :editButton="false" :eraseButton="false" :goButton="true" :go="verRecorridoAsignado" >

        </paper-table>
      </div>
    </div>
  </div>

</template>
<script>
  import api from 'src/api/services/recorridosHistoricosServices'
  import apiDias from 'src/api/services/DiasServices'
  import apiTurnos from 'src/api/services/TurnosServices'
  import apiTemporadas from 'src/api/services/TemporadasServices'
  import apiEstados from 'src/api/services/estadosDeRecorridosServices'
  import PaperTable from 'components/UIComponents/TablaRecorridos.vue'
  // import noti from 'src/api/notificationsService'
  const tableColumns = ['Nro', 'Día', 'Turno', 'Fecha', 'Temp.']
  const dataColumns = []

  export default {
    components: {
      PaperTable
    },
    data () {
      return {
        table1: {
          title: 'Recorridos a realizar',
          subTitle: 'Listado de los recorridos de la última semana que te fueron asignados',
          columns: [...tableColumns],
          data: [...dataColumns]
        }
      }
    },
    mounted () {
      // Promise.a
      apiDias.getDias(this).then(res => {
        this.dias = res
        apiTurnos.getTurnos(this).then(res => {
          this.turnos = res
          apiTemporadas.getTemporadas(this).then(res => {
            this.temporadas = res
            apiEstados.getEstados(this).then(res => {
              this.estados = res
              this.cargarRecorridosAsignados()
            })
          })
        })
      }, error => {
        console.log('error al cargar los dias' + error)
      })
//      this.cargarDias()
//      this.cargarTurnos()
//      this.cargarTemporadas()
//      this.cargarEstadosRecorrido()
//      this.cargarRecorridosAsignados()
    },
    methods: {
      cargarRecorridosAsignados () {
        var idEmpleado = JSON.parse(sessionStorage.getItem('user')).idEmpleado
        if (idEmpleado === null) {
          this.table1.subTitle = 'Empleado no asignado al usuario logueado. No se podrán mostrar recorridos'
          return
        }
        api.getRecorridosAsignadosUltimaSemanaXEmpleado(this, idEmpleado)
          .then(resRxE => {
            resRxE.forEach(RxE => {
              let d = new Date(RxE.fechaAsignacion)
              this.table1.data.push({
                'nro': RxE.idRecorridosHistoricos,
                'día': this.getDia(RxE.idDia),
                'turno': this.getTurno(RxE.idTurno),
                'fecha': d.toLocaleDateString(),
                'temp.': this.getTemporada(RxE.idTemporada),
                'estado': RxE.idEstado
              })
            })
            if (this.table1.data.length === 0) {
              this.table1.subTitle = 'No hay recorridos asignados para el día de hoy'
            }
          }, error => {
            console.log('error al cargar los recorridos asignados ' + error)
          })
      },
      verRecorridoAsignado (e) {
        let id = e.target.parentNode.getElementsByTagName('td')[0].innerHTML
        this.$parent.recorridoAsignadoId = id
        this.$parent.verLista = false
        this.$parent.verDetalle = true
        api.getRecorridoAsignadoXId(this, id)
          .then(res => {
            res = res.body.data[0]
            this.$parent.dia = this.getDia(res.idDia)
            this.$parent.turno = this.getTurno(res.idTurno)
            var d = new Date(res.fechaAsignacion)
            this.$parent.fecha = d.toLocaleDateString() // d.getUTCDate() + '/' + d.getUTCMonth() + '/' + d.getFullYear()
            this.$parent.temporada = this.getTemporada(res.idTemporada)
            this.$parent.estado = this.getEstado(res.idEstado)
            this.$parent.idEstado = res.idEstado
            this.$parent.camionid = res.idCamionAsignado
          })
      },
      getDia (idDia) {
        for (var i = 0, len = this.dias.length; i < len; i++) {
          if (this.dias[i].idDias === idDia) {
            return this.dias[i].nombre
          }
        }
      },
      getTurno (idTurno) {
        for (var i = 0, len = this.turnos.length; i < len; i++) {
          if (this.turnos[i].idTurnos === idTurno) {
            return this.turnos[i].nombre
          }
        }
      },
      getTemporada (idTemporada) {
        for (var i = 0, len = this.temporadas.length; i < len; i++) {
          if (this.temporadas[i].idTemporadas === idTemporada) {
            return this.temporadas[i].nombre
          }
        }
      },
      getEstado (idEstado) {
        for (var i = 0, len = this.estados.length; i < len; i++) {
          if (this.estados[i].idEstadosRecorrido === idEstado) {
            return this.estados[i].nombre
          }
        }
      },
      cargarDias () {
        apiDias.getDias(this).then(res => {
          this.dias = res
        }, error => {
          console.log('error al cargar los dias' + error)
        })
      },
      cargarTurnos () {
        apiTurnos.getTurnos(this).then(res => {
          this.turnos = res
        }, error => {
          console.log('error al cargar los turnos' + error)
        })
      },
      cargarTemporadas () {
        apiTemporadas.getTemporadas(this).then(res => {
          this.temporadas = res
        }, error => {
          console.log('error al cargar las temporadas' + error)
        })
      },
      cargarEstadosRecorrido () {
        apiEstados.getEstados(this).then(res => {
          this.estados = res
        }, error => {
          console.log('error al cargar las temporadas' + error)
        })
      }
    }
  }

</script>

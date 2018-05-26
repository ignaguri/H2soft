<template>
  <div>

    <!--Stats cards-->
<!--    <div class="row">
      <div class="col-lg-3 col-sm-6" v-for="stats in statsCards">
        <stats-card>
          <div class="icon-big text-center" :class="`icon-${stats.type}`" slot="header">
            <i :class="stats.icon"></i>
          </div>
          <div class="numbers" slot="content">
            <p>{{stats.title}}</p>
            {{stats.value}}
          </div>
          <div class="stats" slot="footer">
            <i :class="stats.footerIcon"></i> {{stats.footerText}}
          </div>
        </stats-card>
      </div>
    </div>

    <! -- Charts-->
    <div class="row">
      <div class="col-md-12">
        <repartos :rep="reparts"></repartos>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 col-xs-12">
        <chart-card :chart-data="estadosChart.data" chart-type="Bar">
          <h4 class="title" slot="title">Objetivos por empleado</h4>
          <span slot="subTitle"> Estado de objetivos a visitar en el día de hoy por empleado</span>
          <span slot="footer">
              <i class="ti-check"></i> Información actualizada</span>
          <div slot="legend">
            <i class="fa fa-circle text-info"></i> Ya visitados
            <i class="fa fa-circle text-danger"></i> Pendientes de visitar
          </div>
        </chart-card>
      </div>
      <div class="col-md-6 col-xs-12">
        <chart-card :chart-data="preferencesChart.data"  chart-type="Pie">
          <h4 class="title" slot="title">Estados de objetivos</h4>
          <span slot="subTitle"> Estado actual de los objetivos a visitar el día hoy</span>
          <span slot="footer">
              <i class="ti-check"></i> Información actualizada</span>
          <div slot="legend">
            <i class="fa fa-circle text-info"></i> Ya visitados
            <i class="fa fa-circle text-danger"></i> Pendientes de visitar
          </div>
        </chart-card>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6 col-xs-12">
        <chart-card :chart-data="activityChart.data" :chart-options="activityChart.options">
          <h4 class="title" slot="title">Objetivos por temporada</h4>
          <span slot="subTitle">Cantidad objetivos visitados en cada día por temporada</span>
          <span slot="footer">
              <i class="ti-check"></i> Información actualizada</span>
          <div slot="legend">
            <i class="fa fa-circle text-info"></i> Temporada baja
            <i class="fa fa-circle text-danger"></i> Temporada alta
          </div>
        </chart-card>
      </div>
      <div class="col-md-6 col-xs-12">
        <chart-card :chart-data="usersChart.data" :chart-options="usersChart.options">
          <h4 class="title" slot="title">Ventas de bidones</h4>
          <span slot="subTitle"> Ventas realizadas por mes en el último año</span>
          <span slot="footer">
            <i class="ti-check"></i> Información actualizada</span>
          <div slot="legend">
            <i class="fa fa-circle text-info"></i> Cantidad de bidones
          </div>
        </chart-card>
      </div>
    </div>

  </div>
</template>
<script>
  import api from 'src/api/services/recorridosHistoricosServices'
  import apiCliente from 'src/api/services/clientServices'
  import apiUsuario from 'src/api/services/userServices'
  import StatsCard from 'components/UIComponents/Cards/StatsCard.vue'
  import ChartCard from 'components/UIComponents/Cards/ChartCard.vue'
  import repartos from 'components/Dashboard/Views/Reportes/Repartos.vue'
  import auth from 'src/api/auth'
  export default {
    components: {
      StatsCard,
      ChartCard,
      repartos
    },
    /**
     * Chart data used to render stats, charts. Should be replaced with server data
     */
    data () {
      return {
        /* reparts: {
          reps: [
            { objetivos: [{nombre: 'obj1', idestado: 1, orden: 1}, {nombre: 'obj2', idestado: 1, orden: 2}, {nombre: 'obj3', idestado: 2, orden: 3}],
              repartidor: 'ema'
            },
            { objetivos: [{nombre: 'obj4', idestado: 1, orden: 1}, {nombre: 'obj5', idestado: 1, orden: 2}, {nombre: 'obj6', idestado: 2, orden: 3}],
              repartidor: 'cami'
            },
            { objetivos: [{nombre: 'obj7', idestado: 1, orden: 1}, {nombre: 'obj8', idestado: 1, orden: 2}, {nombre: 'obj9', idestado: 2, orden: 3}],
              repartidor: 'nico'
            }
          ]}, */
        reparts: {
          reps: [] },
        statsCards: [
          {
            type: 'warning',
            icon: 'ti-server',
            title: 'Capacity',
            value: '105GB',
            footerText: 'Updated now',
            footerIcon: 'ti-reload'
          },
          {
            type: 'success',
            icon: 'ti-wallet',
            title: 'Revenue',
            value: '$1,345',
            footerText: 'Last day',
            footerIcon: 'ti-calendar'
          },
          {
            type: 'danger',
            icon: 'ti-pulse',
            title: 'Errors',
            value: '23',
            footerText: 'In the last hour',
            footerIcon: 'ti-timer'
          },
          {
            type: 'info',
            icon: 'ti-twitter-alt',
            title: 'Followers',
            value: '+45',
            footerText: 'Updated now',
            footerIcon: 'ti-reload'
          }
        ],
        usersChart: {
          data: {
            labels: ['Dic', 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov'],
            series: [
              [825, 830, 815, 750, 680, 510, 450, 455, 400, 480, 610, 756]
            ]
          },
          options: {
            low: 1,
            high: 1000,
            showArea: true,
            // height: '245px',
            axisX: {
              showGrid: true
            },
            lineSmooth: this.$Chartist.Interpolation.simple({
              divisor: 3
            }),
            showLine: true,
            showPoint: false
          }
        },
        activityChart: {
          data: {
            labels: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'],
            series: [
              [8, 7, 8, 6, 10],
              [18, 16, 15, 22, 19]
            ]
          },
          options: {
            seriesBarDistance: 10,
            axisX: {
              showGrid: false
            },
            fullWidth: true,
            chartPadding: {
              right: 50
            }
            // height: '245px'
          }
        },
        preferencesChart: {
          data: {
            labels: ['12', '8'],
            series: [60, 40]
          },
          options: {}
        },
        estadosChart: {
          data: {
            labels: ['Ignacio Gomez', 'Ricardo Lopez'],
            series: [
              [6, 4],
              [7, 1]
            ]
          },
          options: {
            low: 1,
            high: 1000,
            showArea: true,
            // height: '245px',
            axisX: {
              showGrid: true
            },
            lineSmooth: this.$Chartist.Interpolation.simple({
              divisor: 3
            }),
            showLine: true,
            showPoint: false
          }
        }

      }
    },
    mounted () {
      this.cargarRecorridos()
    },
    methods: {
      cargarRecorridos () {
//        const options = {
//          weekday: 'short',
//          year: 'numeric',
//          month: '2-digit',
//          day: 'numeric'
//        }
        // console.log(new Date().toISOString(options))
        const hoy = new Date().toISOString().substring(0, 10).split('-')
        console.log(hoy)
        api.getRecorridosAsignadosXFecha(this, hoy[0], hoy[1], hoy[2])
        // api.getRecorridosAsignadosXFecha(this, '2018', '05', '22')
          .then(res => {
            if (res) {
              // console.log(res)
              // console.log(new Date().toISOString())
              res.forEach(rec => {
                apiUsuario.getEmpleado(this, rec.idEmpleadoAsignado)
                .then(emps => {
                  let reparto = {
                    repartidor: emps[0].nombre,
                    objetivos: []
                  }
                  api.getDetallesRecorridoAsignado(this, rec.idRecorridosHistoricos)
                  .then(dets => {
                    dets.forEach(det => {
                      apiCliente.getObjetivo(this, det.idObjetivo)
                      .then(obj => {
                        obj = obj.body.data[0]
                        let objetivo = {
                          nombre: obj.nombre,
                          idestado: det.entregado,
                          orden: det.orden
                        }
                        reparto.objetivos.push(objetivo)
                      })
                    })
                  })
                  this.reparts.reps.push(reparto)
                })
              })
            }
          })
      },
      route: {
        canActivate () {
          return auth.user.authenticated
        }
      }
    }
  }
</script>
<style>

</style>

<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <estadoDeCaja></estadoDeCaja>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <repartos></repartos>
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
  import apiRemitos from 'src/api/services/remitoServices'
  import apiRecHistoricos from 'src/api/services/recorridosHistoricosServices'
  import StatsCard from 'components/UIComponents/Cards/StatsCard.vue'
  import ChartCard from 'components/UIComponents/Cards/ChartCard.vue'
  import repartos from 'components/Dashboard/Views/Reportes/Repartos.vue'
  import estadoDeCaja from 'components/Dashboard/Views/Reportes/EstadoDeCaja.vue'
  //  import auth from 'src/api/auth'
  export default {
    components: {
      StatsCard,
      ChartCard,
      repartos,
      estadoDeCaja
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
          reps: []
        },
        cantidadDeBidonesPorMes: {},
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
      this.cantBidonesPorMes()
      this.cantObjetivosPorTemporada()
    },
    methods: {
      cantBidonesPorMes () {
        apiRemitos.cantidadDeBidonesPorMes(this)
          .then(resp => {
            var consumo = []
            console.log('CANTI:', resp)
            consumo.push(resp[1])
            consumo.push(resp[2])
            consumo.push(resp[3])
            consumo.push(resp[4])
            consumo.push(resp[5])
            consumo.push(resp[6])
            consumo.push(resp[7])
            consumo.push(resp[8])
            consumo.push(resp[9])
            consumo.push(resp[10])
            consumo.push(resp[11])
            consumo.push(resp[12])
            this.usersChart.data.series.push(consumo)
          })
          .catch(err => {
            console.log('ERRRO:' + err)
          })
      },
      cantObjetivosPorTemporada () {
        apiRecHistoricos.objetivosPorTemporada(this)
            .then(resp => {
              var consumoVerano = []
              var consumoInvierno = []
              var consumos = []
              console.log('CANTI:', resp)
              consumoVerano.push(resp[1])
              consumoVerano.push(resp[2])
              consumoVerano.push(resp[3])
              consumoVerano.push(resp[4])
              consumoVerano.push(resp[5])
              consumoVerano.push(resp[6])
              consumoVerano.push(resp[7])
              consumoInvierno.push(resp[8])
              consumoInvierno.push(resp[9])
              consumoInvierno.push(resp[10])
              consumoInvierno.push(resp[11])
              consumoInvierno.push(resp[12])
              consumoInvierno.push(resp[13])
              consumoInvierno.push(resp[14])
              console.log('CONSUMO INVUERNO:' + JSON.stringify(consumoInvierno))
              console.log('CONSUMO VERANO:' + JSON.stringify(consumoVerano))
              consumos.push(consumoInvierno)
              consumos.push(consumoVerano)
              console.log('CONSUMOS:' + JSON.stringify(consumos))
              return consumos
            })
      }
    }
  }
</script>
<style>

</style>

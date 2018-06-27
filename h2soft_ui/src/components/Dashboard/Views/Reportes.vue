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
        <chart-card :chart-data="activityChart.data" :chart-options="activityChart.options" :modif="this.modif2">
          <h4 class="title" slot="title">Objetivos por temporada</h4>
          <span slot="subTitle">Cantidad objetivos visitados en cada día por temporada</span>
          <span slot="footer">
              <i class="ti-check"></i> Información actualizada</span>
          <div slot="legend">
            <i class="fa fa-circle text-info"></i> Invierno
            <i class="fa fa-circle text-danger"></i> Verano
          </div>
        </chart-card>
      </div>
      <div class="col-md-6 col-xs-12">
        <chart-card :chart-data="usersChart.data" :chart-options="usersChart.options" :modif="this.modif">
          <h4 class="title" slot="title">Ventas de productos</h4>
          <span slot="subTitle"> Ventas realizadas en los últimos 12 meses</span>
          <span slot="footer">
            <i class="ti-check"></i> Información actualizada</span>
          <div slot="legend">
            <i class="fa fa-circle text-info"></i> Bidones de 20L
            <i class="fa fa-circle text-danger"></i> Bidones de 10L
          </div>
        </chart-card>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 col-xs-12">
        <chart-card :chart-data="mantenimientosChart.data" :chart-options="mantenimientosChart.options"
                    :modif="this.modif3">
          <h4 class="title" slot="title">Mantenimientos de dispensers</h4>
          <span slot="subTitle"> Mantenimientos realizados por mes en el último año</span>
          <span slot="footer">
            <i class="ti-check"></i> Información actualizada</span>
          <div slot="legend">
            <i class="fa fa-circle text-info"></i> Manteniemientos
          </div>
        </chart-card>
      </div>
    </div>
  </div>
</template>
<script>
  import apiRemitos from 'src/api/services/remitoServices'
  import apiRecHistoricos from 'src/api/services/recorridosHistoricosServices'
  import apiMantenimientos from 'src/api/services/mantenimientoServices'
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
        modif: false,
        modif2: false,
        modif3: false,
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
            labels: [],
            series: []
          },
          options: {
            low: 1,
            high: 250,
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
        mantenimientosChart: {
          data: {
            labels: [],
            series: []
          },
          options: {
            low: 0,
            high: 10,
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
            labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
            series: []
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
      this.cantMantenimientosPorMes()
    },
    methods: {
      cantBidonesPorMes () {
        apiRemitos.cantidadDeBidonesPorMes(this)
          .then(resp => {
            let consumoOrdenadoP1 = []
            let consumoOrdenadoP2 = []
            let meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
            const mes = new Date().getMonth()
            // console.log('?MESSS:' + mes)
            let cantMeses = []
            let i
            for (i = 0; i < 12; i++) {
              if (i <= mes && i < 12) {
                cantMeses[i + 6] = meses[i]
                consumoOrdenadoP1[i + 6] = resp[i + 1]
              } else {
                cantMeses[i - 6] = meses[i]
                consumoOrdenadoP1[i - 6] = resp[i + 1]
              }
            }
            for (i = 0; i < 12; i++) {
              if (i <= mes) {
                consumoOrdenadoP2[i + 6] = resp[i + 13]
              } else {
                consumoOrdenadoP2[i - 6] = resp[i + 13]
              }
            }
            // console.log('MESES ORDENADOS:' + JSON.stringify(cantMeses))
            // console.log('Consumo ORDENADOS P1:' + JSON.stringify(consumoOrdenadoP1))
            // console.log('Consumo ORDENADOS P2:' + JSON.stringify(consumoOrdenadoP2))
            this.usersChart.data.labels = (cantMeses)
            this.usersChart.data.series.push(consumoOrdenadoP1)
            this.usersChart.data.series.push(consumoOrdenadoP2)
            this.modif = !this.modif
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
            // console.log('CANTI:', resp)
            consumoVerano.push(resp[1])
            consumoVerano.push(resp[2])
            consumoVerano.push(resp[3])
            consumoVerano.push(resp[4])
            consumoVerano.push(resp[5])
            consumoInvierno.push(resp[8])
            consumoInvierno.push(resp[9])
            consumoInvierno.push(resp[10])
            consumoInvierno.push(resp[11])
            consumoInvierno.push(resp[12])
            // console.log('CONSUMO INVUERNO:' + JSON.stringify(consumoInvierno))
            // console.log('CONSUMO VERANO:' + JSON.stringify(consumoVerano))
            consumos.push(consumoInvierno)
            consumos.push(consumoVerano)
            // console.log('CONSUMOS:' + JSON.stringify(consumos))
            this.activityChart.data.series.push(consumoInvierno)
            this.activityChart.data.series.push(consumoVerano)
            this.modif2 = !this.modif2
          })
      },
      cantMantenimientosPorMes () {
        apiMantenimientos.cantidadDeMantenimientosPorMes(this)
          .then(resp => {
            let consumoMantenimiento = []
            let consumoOrdenadoMantenimiento = []
            let mesesMantenimiento = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
            consumoMantenimiento.push(resp[1])
            consumoMantenimiento.push(resp[2])
            consumoMantenimiento.push(resp[3])
            consumoMantenimiento.push(resp[4])
            consumoMantenimiento.push(resp[5])
            consumoMantenimiento.push(resp[6])
            consumoMantenimiento.push(resp[7])
            consumoMantenimiento.push(resp[8])
            consumoMantenimiento.push(resp[9])
            consumoMantenimiento.push(resp[10])
            consumoMantenimiento.push(resp[11])
            consumoMantenimiento.push(resp[12])
            const mes = new Date().getMonth()
            let cantMeses = []
            let i
            for (i = 0; i < 12; i++) {
              if (i <= mes) {
                cantMeses[i + 6] = mesesMantenimiento[i]
                consumoOrdenadoMantenimiento[i + 6] = resp[i + 1]
              } else {
                cantMeses[i - 6] = mesesMantenimiento[i]
                consumoOrdenadoMantenimiento[i - 6] = resp[i + 1]
              }
            }
            // console.log('MESES ORDENADOS MANTENIMIENTO:' + JSON.stringify(cantMeses))
            // console.log('Consumo ORDENADOS MANTENIMIENTO:' + JSON.stringify(consumoOrdenadoMantenimiento))
            this.mantenimientosChart.data.labels = (cantMeses)
            this.mantenimientosChart.data.series.push(consumoOrdenadoMantenimiento)
            this.modif3 = !this.modif3
          })
          .catch(err => {
            console.log('ERRRO:' + err)
          })
      }
    }
  }
</script>
<style>

</style>

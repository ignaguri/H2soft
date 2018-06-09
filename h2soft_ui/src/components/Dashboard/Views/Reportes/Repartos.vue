<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="header">
            <h4 class="title">Estado de repartos</h4>
            <p class="category" >Repartos  del día de hoy</p>
          </div>
          <objetivos v-for="reparto in reps" :reparto="reparto"></objetivos>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import objetivos from 'components/Dashboard/Views/Reportes/Objetivos.vue'
  import api from 'src/api/services/recorridosHistoricosServices'
  import apiCliente from 'src/api/services/clientServices'
  import apiUsuario from 'src/api/services/userServices'
  
  export default {
    components: {
      objetivos
    },
    data () {
      return {
        reps: []
      }
    },
    mounted () {
      this.cargarRecorridos()
    },
    methods: {
      cargarRecorridos () {
        const hoy = new Date().toISOString().substring(0, 10).split('-')
        console.log(hoy)
        api.getRecorridosAsignadosParaHoy(this)
          .then(res => {
            if (res) {
              res.forEach(rec => {
                apiUsuario.getEmpleado(this, rec.idEmpleadoAsignado)
                .then(emps => {
                  let reparto = {
                    repartidor: emps[0].nombre,
                    objetivos: []
                  }
                  api.getDetallesRecorridoAsignado(this, rec.idRecorridosHistoricos)
                  .then(dets => {
                    const ultimovisitado = dets.filter(x => x.entregado === 1).sort((a, b) => b.updatedAt > a.updatedAt)[0]
                    dets.forEach(det => {
                      apiCliente.getObjetivo(this, det.idObjetivo)
                      .then(obj => {
                        obj = obj.body.data[0]
                        let objetivo = {
                          id: det.idDetalleRecorridoHistorico,
                          nombre: obj.nombre,
                          idestado: det.entregado,
                          orden: det.orden,
                          ultimovisitado: false
                        }
                        if (ultimovisitado !== undefined && det.idDetalleRecorridoHistorico === ultimovisitado.idDetalleRecorridoHistorico) {
                          objetivo.ultimovisitado = true
                        }
                        reparto.objetivos.push(objetivo)
                        reparto.objetivos.sort((a, b) => a.orden - b.orden) // a medida que voy insertando, voy ordenando por el campo Orden
                      })
                    })
                  })
                  this.reps.push(reparto)
                })
              })
            }
          })
      }
    }
  }

</script>
<style>

</style>

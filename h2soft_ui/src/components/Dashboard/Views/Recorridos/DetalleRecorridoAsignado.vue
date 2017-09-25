<template>
<div>
  <div class="row">
    <div class="col-md-3 left">
      <div class="text-left">
          <h4>Dia: {{this.dia}} </h4>
      </div>
    </div>
    <div class="col-md-3">
      <div class="typo-line">
        <h4>Turno: {{this.turno}} </h4>
      </div>
    </div>
    <div class="col-md-3">
      <div class="typo-line">
        <h4>Fecha: {{this.fecha}} </h4>
      </div>
    </div>

  </div>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <paper-table type="hover" :title="table1.title" :data="table1.data" :columns="table1.columns" :editButton="false" :eraseButton="false" :goButton="false"  >

        </paper-table>
      </div>
    </div>

  </div>
  <div class="row">
  <div class="col-md-3">
    <div class="text-center">
      <button type="button" class="btn btn-info btn-fill btn-wd" @click="alert('hola! soy el mapa!')">
        Ver mapa
      </button>
    </div>
  </div>
  </div>

</div>
</template>
<script>
  import api from 'src/api/services/recorridosServices'
  import PaperTable from 'components/UIComponents/PaperTablePlus.vue'
  // import noti from 'src/notificationsService/notificationsService.js'
  const tableColumns = ['Orden', 'Objetivo', 'Horario', 'Entrega']
  const dataColumns = []
  export default {
    components: {
      PaperTable
    },
    data () {
      return {
        fecha: '',
        dia: '',
        turno: '',
        table1: {
          title: 'Objetivos del recorrido',
          subTitle: '',
          columns: [...tableColumns],
          data: [...dataColumns]
        }
      }
    },
    props: ['id'],
    mounted () {
      this.cargarRecorridoAsignado()
    },
    methods: {
      cargarRecorridoAsignado () {
        api.getRecorridoAsignadoXId(this, this.id)
          .then(resRxE => {
            api.getRecorrido(this, resRxE.idRecorrido)
              .then(resRec => {
                resRec = resRec.body.data[0]
                console.log(resRec)
                this.fecha = resRec.fecha
                this.turno = resRec.turno
                this.dia = resRec.dia
                api.getDetalleRecorrido(this, resRec.idRecorridos)
                  .then(resDet => {
                    resDet.body.data.forEach(det => {
                      api.getObjetivoXId(this, det.idObjetivo)
                        .then(resObj => {
                          this.table1.data.push({
                            orden: det.orden,
                            objetivo: resObj.nombre,
                            horario: '',
                            entrega: det.cantidad
                          })
                        })
                    })
                  })
              })
          }, error => {
            console.log('error al cargar los recorridos asignados ' + error)
          })
      }
    }
  }

</script>

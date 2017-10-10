<template>
<div>
  <div class="row">
    <div class="col-md-2 left">
      <div class="text-line">
          <h5>{{temporada}}  -  {{turno}}</h5>
      </div>
    </div>
    <div class="col-md-2 left">
      <div class="text-line">
        <h5>{{dia}} {{fecha}} {{estado}}  </h5>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <paper-table type="hover" :title="table1.title" :data="table1.data" :columns="table1.columns" :editButton="false" :eraseButton="false" :goButton="true" :go="verdetalle" >

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
  import api from 'src/api/services/recorridosHistoricosServices'
  import PaperTable from 'components/UIComponents/TablaRecorridos.vue'
  // import noti from 'src/notificationsService/notificationsService.js'
  const tableColumns = ['Orden', 'Objetivo']
  const dataColumns = []
  export default {
    components: {
      PaperTable
    },
    data () {
      return {
        // fecha: '',
        // dia: '',
        // turno: '',
        table1: {
          title: 'Objetivos del recorrido',
          subTitle: '',
          columns: [...tableColumns],
          data: [...dataColumns]
        }
      }
    },
    props: {
      'id': String,
      dia: String,
      turno: String,
      temporada: String,
      fecha: String,
      estado: String
    },
    mounted () {
      this.cargarRecorrido()
      this.cargarRecorridoAsignado()
    },
    methods: {
      cargarRecorridoAsignado () {
        api.getDetalleRecorridoAsignado(this, this.id)
          .then(resDet => {
            // console.log(resDet)
            resDet.body.data.forEach(det => {
              api.getObjetivoXId(this, det.idObjetivo)
              .then(resObj => {
                resObj = resObj.body.data[0]
                console.log(det)
                this.table1.data.push({
                  orden: det.orden,
                  objetivo: resObj.nombre,
                  horario: '',
                  estado: det.entregado
                })
              })
            })
          }, error => {
            console.log('error al cargar los recorridos asignados ' + error)
          })
      },
      cargarRecorrido () {
        api.getRecorrido(this, this.id)
        .then(res => {

        })
      },
      verdetalle () {
        alert('ver!')
      }
    }
  }

</script>

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
  import auth from 'src/api/auth'
  import api from 'src/api/services/recorridosServices'
  import apiDias from 'src/api/services/DiasServices'
  import PaperTable from 'components/UIComponents/PaperTablePlus.vue'
  // import noti from 'src/notificationsService/notificationsService.js'
  const tableColumns = ['Día', 'Turno', 'Fecha', 'Estado']
  const dataColumns = []

  export default {
    components: {
      PaperTable
    },
    data () {
      return {
        table1: {
          title: 'Recorridos a realizar',
          subTitle: 'Listado de recorridos que te fueron asignados',
          columns: [...tableColumns],
          data: [...dataColumns]
        }
      }
    },
    mounted () {
      this.cargarDias()
      this.cargarRecorridosAsignados()
    },
    methods: {
      cargarRecorridosAsignados () {
        api.getRecorridosAsignadosXEmpleado(this, 1) // TODO: sacar el hardcode del empleado 1
          .then(resRxE => {
            resRxE.body.data.forEach(RxE => {
              api.getRecorrido(this, RxE.idRecorrido)
                  .then(resRec => {
                    resRec = resRec.body.data[0]
                    this.table1.data.push({
                      día: this.getDia(resRec.idDia),
                      turno: resRec.turno,
                      fecha: resRec.fecha,
                      estado: 'Estado'
                    })
                  })
            })
          }, error => {
            console.log('error al cargar los recorridos asignados ' + error)
          })
      },
      verRecorridoAsignado (e) {
        // alert('detalle del recorrido')
        let id = e.target.parentNode.parentNode.getElementsByTagName('td')[0].innerHTML
        this.$parent.recorridoAsignadoId = id
        this.$parent.isRecorridoList = false
      },
      getDia (idDia) {
        for (var i = 0, len = this.dias.length; i < len; i++) {
          if (this.dias[i].idDias === idDia) {
            return this.dias[i].nombre
          }
        }
      },
      cargarDias () {
        apiDias.getDias(this).then(res => {
          this.dias = res
        }, error => {
          console.log('error al cargar los dias' + error)
        })
      }
    }
  }

</script>

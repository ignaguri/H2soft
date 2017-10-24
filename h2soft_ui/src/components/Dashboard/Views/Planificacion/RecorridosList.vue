<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card" v-if="verCompleto() == true">
        <paper-table type="hover" :title="table1.title" :sub-title="table1.subTitle" :data="table1.data" :columns="table1.columns" :editButton="false" :erase="borrarRecorrido" :goButton="true" :go="ver">

        </paper-table>
        <div class="text-center">
          <button type="button" class="btn btn-info btn-fill btn-wd" @click="addClient">
            Nuevo Recorrido
          </button>
        </div>
        <br>
      </div>
      <div class="card" v-if="verCompleto() == false">
        <paper-table type="hover" :title="table2.title" :sub-title="table2.subTitle" :data="table2.data" :columns="table2.columns" :editButton="false" :erase="borrarDetalle">

        </paper-table>
        <div class="text-center">
        <button type="button" class="btn btn-danger btn-fill btn-wd" @click="seeList">
          Cancelar
        </button>
        </div>
        <br>
      </div>
    </div>
  </div>
</template>
<script>
  import PaperTable from 'components/UIComponents/PaperTablePlus.vue'
  import api from 'src/api/services/recorridoServices'

  const table1Columns = ['Id', 'Temporada', 'Dia', 'Turno', 'Frecuencia']
  const table2Columns = ['Orden', 'Objetivo', 'Direccion', 'Localidad', 'Cliente']
  export default {
    components: {
      PaperTable
    },
    data () {
      return {
        table1: {
          title: 'Planificacion',
          subTitle: 'Lista de recorridos programados',
          columns: [...table1Columns],
          data: []
        },
        table2: {
          title: 'Recorrido',
          columns: [...table2Columns],
          data: []
        },
        recorrido: this.idRecorrido
      }
    },
    props: {
      idRecorrido: Number
    },
    mounted () {
      this.cargarRecorridos()
    },
    watch: {
      recorrido: function () {
        this.verEspecifico()
      }
    },
    methods: {
      cargarRecorridos () {
        this.table1.data = []
        api.getRecorridosFull(this)
          .then(r => {
            r.forEach(recs => {
              this.table1.data.push({
                id: recs.recorrido,
                temporada: recs.temporada,
                dia: recs.dia,
                turno: recs.turno,
                frecuencia: recs.frecuencia
              })
            })
          })
      },
      verEspecifico () {
        this.table2.data = []
        api.getDetalleRecorridosFull(this, this.recorrido)
          .then(r => {
            r.forEach(recs => {
              this.table2.data.push({
                id: recs.detalleRecorrido,
                recorrido: recs.recorrido,
                objetivo: recs.objetivo,
                orden: recs.orden,
                direccion: recs.direccion,
                localidad: recs.localidad,
                cliente: recs.cliente
              })
            })
          })
      },
      editar (e) {
        let id = e.target.parentNode.parentNode.getElementsByTagName('td')[0].innerHTML
        console.log(id)
      },
      borrarRecorrido (e) {
        let id = e.target.parentNode.parentNode.getElementsByTagName('td')[0].innerHTML
        if (!confirm('Desea eliminar a este recorrido y todos sus objetivos planificados?')) return
        api.deleteRecorrido(this, id).then(res => {
          if (res) {
            alert('Borrado con éxito')
            this.cargarRecorridos()
          } else {
            alert('error al borrar')
          }
        })
      },
      borrarDetalle (e) {
        let id = e.target.parentNode.parentNode.getElementsByTagName('td')[1].innerHTML
        api.deleteObjetivoFromRecorrido(this, id, this.recorrido)
          .then(r => {
            if (r) {
              alert('Se borró con éxito el objetivo del recorrido')
              this.verEspecifico()
            } else {
              alert('Hubo un error. check consola')
            }
          })
      },
      ver (e) {
        let id = e.target.parentNode.parentNode.getElementsByTagName('td')[0].innerHTML
        console.log('ver', id)
        this.recorrido = id
        this.table2.title = 'Recorrido n°: ' + id
      },
      verCompleto () {
        if (this.recorrido === 0) {
          return true
        } else {
          return false
        }
      },
      seeList () {
        this.recorrido = 0
      },
      addClient () {
        this.$parent.edit = false
        this.$parent.isRecorridoList = false
      }
    }
  }

</script>
<style>

</style>

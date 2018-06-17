<template>
  <div>
    <div class="header">
      <slot name="header">
        <h4 class="title">{{title}}</h4>
        <p class="category">{{subTitle}}</p>
      </slot>
    </div>
    <div class="content table-responsive table-full-width">
      <div class="text-right">
        <span>Referencias:</span>
        <span class="badge badge-pill badge-danger">Sin facturar</span>
        <span class="badge badge-pill badge-success">Ya facturado</span>
      </div> 
      <table class="table" :class="tableClass">
        <thead>
        <th v-for="column in columns"><a @click.prevent="sort(column)">{{column}}</a></th>
        </thead>
        <tbody>
        <tr v-for="item in this.tableData" @click="clickInCheck" v-bind:class="{ 'success': item['facturado'] === true, 'danger': item['facturado'] === false }">
          <td v-for="column in columns" v-if="hasValue(item, column)" >{{itemValue(item, column)}}</td>
          <td v-if="editButton|eraseButton|goButton">
            <span class="ti-pencil-alt" @click="edit" v-if="editButton"></span>
            &nbsp;
            <span class="ti-trash" @click="erase" v-if="eraseButton"></span>
            &nbsp;
            <span class="ti-new-window" @click="go" v-if="goButton"></span>
          </td>
        </tr>
        </tbody>
      </table>  
    </div>
  </div>
</template>
<script>
  import bsInput from 'src/components/UIComponents/Inputs/InputPlus'
  import Dropdown from 'vue-strap/src/Dropdown'
  import { checkbox } from 'vue-strap'

  export default {
    components: {
      bsInput,
      Dropdown,
      checkbox
    },
    props: {
      columns: Array,
      data: Array,
      type: {
        type: String, // striped | hover
        default: 'Striped'
      },
      title: {
        type: String,
        default: ''
      },
      subTitle: {
        type: String,
        default: ''
      },
      editButton: {
        type: Boolean,
        default: true
      },
      edit: {
        type: Function
      },
      eraseButton: {
        type: Boolean,
        default: true
      },
      erase: {
        type: Function
      },
      goButton: {
        type: Boolean,
        default: false
      },
      go: {
        type: Function
      },
      filter: {
        type: Boolean,
        default: true
      }
    },
    mounted () {
      this.sort(this.columns[0])
    },
    watch: {
      data: function () {
        this.tableData = this.data
      }
    },
    data () {
      return {
        sortedAsc: false,
        filterText: '',
        filterOption: 'Sin filtro',
        tableData: this.data,
        selected: []
      }
    },
    computed: {
      tableClass () {
        return `table-${this.type}`
      }
    },
    methods: {
      clickInCheck (e) {
        let id = Number(e.target.parentNode.parentNode.parentNode.getElementsByTagName('td')[0].innerHTML)
        // console.log('i', e, id)
        if (this.selected.includes(id)) {
          this.selected.splice(this.selected.findIndex(v => v === id), 1)
        } else {
          this.selected.push(id)
        }
        this.$parent.seleccionados = this.selected
      },
      hasValue (item, column) {
        // column = column.replace(' ', '')
        // alert(JSON.stringify(column)) // console.log('item: ' + JSON.stringify(item) + 'columna: ' + JSON.stringify(item))
        return item[column.toLowerCase().replace(' ', '').replace(' ', '')] !== 'undefined'
      },
      itemValue (item, column) {
        return item[column.toLowerCase().replace(' ', '').replace(' ', '')]
      },
      prueba (elem) {
        console.log(elem.target.parentNode.getElementsByTagName('td')[0].innerHTML)
      },
      sort (col) {
        if (col === undefined) return
        // col = col.toLowerCase().replace(new RegExp(' ', 'g'), '')
        col = this.normalize(col)
        if (!this.sortedAsc) {
          this.data = this.data.sort((item1, item2) => {
            if (isNaN(item1[col])) {
              if (item1[col].split('/').length > 1) { // es una fecha
                let f1 = item1[col].split('/')
                let f2 = item2[col].split('/')
                let fecha1 = new Date(f1[2], f1[1] - 1, f1[0])
                let fecha2 = new Date(f2[2], f2[1] - 1, f2[0])
                if (fecha1 > fecha2) return 1
                if (fecha1 < fecha2) return -1
                return 0
              } else {
                if (item1[col].toLowerCase() > item2[col].toLowerCase()) return 1
                if (item1[col].toLowerCase() < item2[col].toLowerCase()) return -1
                return 0
              }
            } else {
              return item1[col] - item2[col]
            }
          })
          this.sortedAsc = true
        } else {
          this.data = this.data.sort((item1, item2) => {
            if (isNaN(item1[col])) {
              if (item1[col].split('/').length > 1) { // es una fecha
                let f1 = item1[col].split('/')
                let f2 = item2[col].split('/')
                let fecha1 = new Date(f1[2], f1[1] - 1, f1[0])
                let fecha2 = new Date(f2[2], f2[1] - 1, f2[0])
                if (fecha1 < fecha2) return 1
                if (fecha1 > fecha2) return -1
                return 0
              } else {
                if (item1[col].toLowerCase() < item2[col].toLowerCase()) return 1
                if (item1[col].toLowerCase() > item2[col].toLowerCase()) return -1
                return 0
              }
            } else {
              return item2[col] - item1[col]
            }
          })
          this.sortedAsc = false
        }
      },
      filterButton () {
        this.tableData = this.data.filter(item => {
          if (item[this.filterOption.toLowerCase()]) {
            if (isNaN(item[this.filterOption.toLowerCase()])) {
              const itemAux = item[this.filterOption.toLowerCase()].toLowerCase()
              const filterAux = this.filterText.toLowerCase()
              return itemAux.includes(filterAux)
            } else {
              const itemAux = Number(item[this.filterOption.toLowerCase()])
              const filterAux = Number(this.filterText)
              return itemAux === filterAux
            }
          } else {
            return true
          }
        })
      },
      marcarTodos () {
        this.data.forEach(r => {
          r.facturar = true
          this.selected.push(r['#'])
        })
        this.$parent.seleccionados = this.selected
      },
      changeFilter (filter) {
        if (filter === 'Sin filtro') {
          // No anda ¯\_(ツ)_/¯
          // this.filterText = ''
        }
        this.filterOption = filter
      },
      normalize (cadena) {
        // Definimos los caracteres que queremos eliminar
        let specialChars = '!@$^&%*()+=\\-[]/{}|:<>?,.'
        // Los eliminamos todos
        for (var i = 0; i < specialChars.length; i++) {
          cadena = cadena.replace(new RegExp('\\' + specialChars[i], 'gi'), '')
        }
        // Lo queremos devolver limpio en minusculas
        cadena = cadena.toLowerCase()
        // Quitamos espacios y los sustituimos por _ porque nos gusta mas asi
        cadena = cadena.replace(/ /g, '')
        // Quitamos acentos y "ñ". Fijate en que va sin comillas el primer parametro
        cadena = cadena.replace(/á/gi, 'a')
        cadena = cadena.replace(/é/gi, 'e')
        cadena = cadena.replace(/í/gi, 'i')
        cadena = cadena.replace(/ó/gi, 'o')
        cadena = cadena.replace(/ú/gi, 'u')
        cadena = cadena.replace(/ñ/gi, 'n')
        return cadena
      }
    }
  }
</script>
<style>
</style>

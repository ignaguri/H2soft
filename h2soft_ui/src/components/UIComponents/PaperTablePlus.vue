<template>
  <div>
    <div class="header">
      <slot name="header">
        <h4 class="title">{{title}}</h4>
        <p class="category">{{subTitle}}</p>
      </slot>
    </div>
    <div class="content table-responsive table-full-width">
      <div class="row">
        <div class="col-md-5 col-md-offset-7">
        <bs-input v-if="filter" :label="'Filtrar por:'" type="text" :placeholder="'Escriba algo'" v-model="filterText">
          <dropdown slot="before" type="info" :text="filterOption">
            <li><a @click="changeFilter('Sin filtro')">Sin filtro</a></li>
            <li v-for="column in columns"><a @click="changeFilter(column)">{{column}}</a></li>
          </dropdown>
          <span slot="after" class="input-group-btn">
            <button type="button" class="btn btn-success" @click="filterButton">Actualizar</button>
          </span>
        </bs-input>
      </div>
      </div>
      <table class="table" :class="tableClass">
        <thead>
        <th v-for="column in columns"><a @click.prevent="sort(column)">{{column}}</a></th>
        </thead>
        <tbody>
        <tr v-for="item in this.tableData">
          <td v-for="column in columns" v-if="hasValue(item, column)">{{itemValue(item, column)}}</td>
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
  import bsInput from '../UIComponents/Inputs/InputPlus'
  import Dropdown from 'vue-strap/src/Dropdown'

  export default {
    components: {
      bsInput,
      Dropdown
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
        tableData: this.data
      }
    },
    computed: {
      tableClass () {
        return `table-${this.type}`
      }
    },
    methods: {
      hasValue (item, column) {
        // return item[column.toLowerCase().replace(new RegExp(' ', 'g'), '')] !== 'undefined'
        return item[this.normalize(column)] !== 'undefined'
      },
      itemValue (item, column) {
        // return item[column.toLowerCase().replace(new RegExp(' ', 'g'), '')]
        return item[this.normalize(column)]
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
        const filter = this.normalize(this.filterOption)
        if (filter === 'sinfiltro') {
          this.tableData = this.data
          return
        }
        this.tableData = this.data.filter(item => {
          if (item[filter]) {
            if (isNaN(item[filter])) {
              const itemAux = item[filter].toLowerCase()
              const filterAux = this.filterText.toLowerCase()
              return itemAux.includes(filterAux)
            } else {
              const itemAux = Number(item[filter])
              const filterAux = Number(this.filterText)
              return itemAux === filterAux
            }
          } else {
            return true
          }
        })
      },
      changeFilter (filter) {
//        if (filter === 'Sin filtro') {
//          // No anda ¯\_(ツ)_/¯
//          // this.filterText = ''
//        }
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
        // Quitamos espacios y los sustituimos por ''
        cadena = cadena.replace(/ /g, '')
        // Quitamos acentos y "ñ".
        cadena = cadena.replace(/á/gi, 'a')
        cadena = cadena.replace(/é/gi, 'e')
        cadena = cadena.replace(/í/gi, 'i')
        cadena = cadena.replace(/ó/gi, 'o')
        cadena = cadena.replace(/ú/gi, 'u')
        // cadena = cadena.replace(/ñ/gi, 'n')
        return cadena
      }
    }
  }
</script>
<style>
</style>

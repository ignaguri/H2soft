<template>
  <div>
    <div class="header">
      <slot name="header">
        <h4 class="title">{{title}}</h4>
        <p class="category">{{subTitle}}</p>
      </slot>
    </div>
    <div class="text-right">
        <span>Referencias:</span>
        <span class="badge badge-pill badge-danger">No iniciado</span>
        <span class="badge badge-pill badge-success">En proceso</span>
        <span class="badge badge-pill badge-info">Suspendido</span>
        <span class="badge badge-pill badge-no-color">Finalizado</span>
    </div>
    <div class="content table-responsive table-full-width">
      <table class="table" :class="tableClass">
        <thead>
          <th v-for="column in columns">{{column}}</th>
        </thead>
        <tbody>
          <tr v-for="item in data" @click="go" >
            <td v-for="column in columns" v-if="hasValue(item, column)" v-bind:class="{ 'danger': item['estado'] === 1, 'success': item['estado'] === 2, 'info': item['estado'] === 3 }">{{itemValue(item, column)}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
  export default {
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
      goButton: {
        type: Boolean,
        default: false
      },
      go: {
        type: Function
      }
    },
    computed: {
      tableClass () {
        return `table-${this.type}`
      }
    },
    methods: {
      hasValue (item, column) {
        return item[this.normalize(column)] !== 'undefined'
      },
      itemValue (item, column) {
        return item[this.normalize(column)]
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
  span.badge.badge-pill.badge-success {
    background-color: #8EF3C5;
    color: #000;
  }
  span.badge.badge-pill.badge-info {
    background-color: #7CE4FE;
    color: #000;
  }
  span.badge.badge-pill.badge-danger {
    background-color: #FF8F5E;
    color: #000;
  }
  span.badge.badge-pill.badge-warning {
    background-color: #FFE28C;
    color: #000;
  }
  span.badge.badge-pill.badge-no-color {
    background-color: white;
    border-style: solid;
    border-width: thin;
    color: #000;
  }
</style>

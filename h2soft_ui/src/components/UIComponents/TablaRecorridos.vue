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
        return item[column.toLowerCase()] !== 'undefined'
      },
      itemValue (item, column) {
        return item[column.toLowerCase()]
      },
      prueba (elem) {
        console.log(elem.target.parentNode.getElementsByTagName('td')[0].innerHTML)
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

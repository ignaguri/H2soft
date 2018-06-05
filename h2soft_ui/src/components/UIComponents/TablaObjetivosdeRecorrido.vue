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
        <span class="badge badge-pill badge-danger">No visitado</span>
        <span class="badge badge-pill badge-no-color">Ya visitado</span>
    </div>
    <div class="content table-responsive table-full-width">
      <table class="table" :class="tableClass">
        <thead>
          <th v-for="column in columns"><a @click.prevent="sort(column)">{{column}}</a></th>
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
        return item[column.toLowerCase().replace(' ', '')] !== 'undefined'
      },
      itemValue (item, column) {
        return item[column.toLowerCase().replace(' ', '')]
      },
      sort (col) {
        console.log(col)
        if (col === undefined) return
        if (!this.sortedAsc) {
          this.data = this.data.sort((item1, item2) => {
            if (isNaN(item1[col.toLowerCase()])) {
              // return item1[col.toLowerCase()].toLowerCase() >= item2[col.toLowerCase()].toLowerCase()
              if (item1[col.toLowerCase()].toLowerCase() > item2[col.toLowerCase()].toLowerCase()) return 1
              if (item1[col.toLowerCase()].toLowerCase() < item2[col.toLowerCase()].toLowerCase()) return -1
              return 0
            } else {
              return item1[col.toLowerCase()] - item2[col.toLowerCase()]
            }
          })
          this.sortedAsc = true
        } else {
          this.data = this.data.sort((item1, item2) => {
            if (isNaN(item1[col.toLowerCase()])) {
              // return item1[col.toLowerCase()].toLowerCase() < item2[col.toLowerCase()].toLowerCase()
              if (item1[col.toLowerCase()].toLowerCase() < item2[col.toLowerCase()].toLowerCase()) return 1
              if (item1[col.toLowerCase()].toLowerCase() > item2[col.toLowerCase()].toLowerCase()) return -1
              return 0
            } else {
              return item2[col.toLowerCase()] - item1[col.toLowerCase()]
            }
          })
          this.sortedAsc = false
        }
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

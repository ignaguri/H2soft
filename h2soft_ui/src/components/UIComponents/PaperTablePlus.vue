<template>
  <div>
    <div class="header">
      <slot name="header">
        <h4 class="title">{{title}}</h4>
        <p class="category">{{subTitle}}</p>
      </slot>
    </div>
    <div class="content table-responsive table-full-width">
      <table class="table" :class="tableClass">
        <thead>
        <th v-for="column in columns"><a @click.prevent="sort(column)">{{column}}</a></th>
        </thead>
        <tbody>
          <tr v-for="item in data">
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
      }
    },
    data () {
      return {
        sortedAsc: false
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
      },
      sort (col) {
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
      }
    }
  }
</script>
<style>
</style>

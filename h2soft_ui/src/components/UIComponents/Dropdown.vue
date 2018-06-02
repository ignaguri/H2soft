<template>
  <li class="dropdown" :class="{open:isOpen}" @click="toggleDropDown">
    <a class="dropdown-toggle btn-rotate" data-toggle="dropdown" >
      <slot name="title">
        <i :class="icon" :style="colorStyle"></i>
        <p class="notification" :style="colorStyle">{{title}}
          <b class="caret"></b>
        </p>
      </slot>
    </a>
    <ul class="dropdown-menu">
      <slot></slot>
    </ul>
  </li>
</template>
<script>
  export default{
    props: {
      title: String,
      icon: String,
      color: String
    },
    computed: {
      colorStyle () {
        return `color: ${this.color}`
      }
    },
    data () {
      return {
        isOpen: false
      }
    },
    methods: {
      toggleDropDown () {
        this.isOpen = !this.isOpen
      },
      closeDropDown () {
        this.isOpen = false
      }
    }
  }
</script>

<template>
  <a type="button" class="btn btn-default btn-block"
          style="margin: 5px 0px; border-radius: 12px"
          :style="status"
          href="#/bidonesdispensers">
    <span :class="icon"></span> {{message}}
    <button type="button" class="btn btn-sm btn-success" @click.prevent="handleClick">Listo</button>
  </a>
</template>
<script>
  import api from 'src/api/services/alertasServices'
  export default {
    props: {
      notification: Object,
      icon: {
        type: String,
        default: 'ti-alert'
      }
    },
    data () {
      return {
        status: `background-color: white`,
        message: this.notification.notificacion
      }
    },
    methods: {
      handleClick () {
        const alerta = {
          id: this.notification.nro,
          idEstado: 2
        }
        api.updateEstado(this, alerta)
          .then(r => {
            if (r) {
              alert('exito')
              this.$emit('notiUpdate', { alerta: this.notification.nro })
            } else {
              alert('error')
            }
          })
      }
    }
  }

</script>
<style>
</style>
